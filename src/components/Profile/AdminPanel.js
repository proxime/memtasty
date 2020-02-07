import React from 'react';
import { addAdmin, removeAdmin, disableUser } from '../../store/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const AdminPanel = ({ id, isAdmin }) => {
    const isHeadAdmin = useSelector(state => state.auth.user.headAdmin);
    const dispatch = useDispatch();
    const handleAddAdmin = () => {
        dispatch(addAdmin(id));
    };
    const handleRemoveAdmin = () => {
        dispatch(removeAdmin(id));
    };

    const handleDisableUser = () => {
        dispatch(disableUser(id));
    };

    return (
        <div className="user__admin-panel">
            <div className="admin-panel">
                <div className="admin-panel__options">
                    <div
                        className="admin-panel__option"
                        onClick={handleDisableUser}
                    >
                        Zablokuj
                    </div>
                    {isHeadAdmin ? (
                        isAdmin ? (
                            <div
                                className="admin-panel__option"
                                onClick={handleRemoveAdmin}
                            >
                                Odbierz administratora
                            </div>
                        ) : (
                            <div
                                className="admin-panel__option"
                                onClick={handleAddAdmin}
                            >
                                Dodaj administratora
                            </div>
                        )
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
