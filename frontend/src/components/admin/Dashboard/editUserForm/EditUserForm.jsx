import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from "../../../partials/header/Header";
import UserDataForm from '../UserDataForm';

const EditUserForm = () => {
    const { userId } = useParams();
    const users = useSelector(state => state.admin.users);
    const username = useSelector(state => state.admin.username);
    
    // Find the user with the specified userId
    const userToEdit = users.find(user => user._id === userId);
    return (
        <>
            <Header user={username} role={'admin'} />
            <UserDataForm todo={'Edit User'} user={userToEdit} />
        </>
    );
};

export default EditUserForm;