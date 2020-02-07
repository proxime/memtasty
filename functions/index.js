const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    if (!context.auth.token.headAdmin) {
        return { error: 'Błąd' };
    }

    return admin
        .auth()
        .getUser(data.id)
        .then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true,
            });
        })
        .then(() => {
            admin
                .database()
                .ref(`/users/${data.id}`)
                .update({ admin: true });
            return 'Success';
        })
        .catch(err => {
            return err;
        });
});

exports.removeAdminRole = functions.https.onCall((data, context) => {
    if (!context.auth.token.headAdmin) {
        return { error: 'Błąd' };
    }

    return admin
        .auth()
        .getUser(data.id)
        .then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: false,
            });
        })
        .then(() => {
            admin
                .database()
                .ref(`/users/${data.id}`)
                .update({ admin: false });
            return 'Success';
        })
        .catch(err => {
            return err;
        });
});

exports.createHeadAdmin = functions.https.onCall((data, context) => {
    if (!context.auth.token.headAdmin) {
        return { error: 'Błąd' };
    }

    return admin
        .auth()
        .getUser(data.id)
        .then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                headAdmin: true,
            });
        })
        .then(() => {
            admin
                .database()
                .ref(`/users/${data.id}`)
                .update({ headAdmin: true });
            return 'Success';
        })
        .catch(err => {
            return err;
        });
});

exports.disableUser = functions.https.onCall((data, context) => {
    if (!context.auth.token.admin && !context.auth.token.headAdmin) {
        return { error: 'Błąd' };
    }

    return admin
        .auth()
        .getUser(data.id)
        .then(user => {
            if (user.customClaims.admin || user.customClaims.headAdmin) {
                return 'isAdmin';
            } else {
                admin.auth().updateUser(user.uid, {
                    disabled: true,
                });
                return 'Success';
            }
        })
        .catch(err => {
            return err;
        });
});
