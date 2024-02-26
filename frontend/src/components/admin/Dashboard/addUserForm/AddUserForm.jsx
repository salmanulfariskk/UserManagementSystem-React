import { useSelector } from 'react-redux';

import Header from "../../../partials/header/Header";
import UserDataForm from '../UserDataForm';
import './AddUserForm.css';

const AddUserForm = () => {
    const username = useSelector(state => state.admin.username);

    return (
        <>
            <Header user={username} role={'admin'} />
            <UserDataForm todo={'Add User'} />
        </>
    );
};

export default AddUserForm;