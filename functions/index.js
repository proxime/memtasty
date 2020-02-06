const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    if (!context.auth.token.admin) {
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
