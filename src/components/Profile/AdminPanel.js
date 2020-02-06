import React from 'react';
import { addAdmin } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';

const AdminPanel = ({ id, isAdmin }) => {
    const dispatch = useDispatch();

    const handleAddAdmin = () => {
        dispatch(addAdmin(id));
    };

    return (
        <div className="user__admin-panel">
            <div className="admin-panel">
                <div className="admin-panel__options">
                    <div className="admin-panel__option">Zablokuj</div>
                    {isAdmin ? (
                        <div className="admin-panel__option">
                            Odbierz administratora
                        </div>
                    ) : (
                        <div
                            className="admin-panel__option"
                            onClick={handleAddAdmin}
                        >
                            Dodaj administratora
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
