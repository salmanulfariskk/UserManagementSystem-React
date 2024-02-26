import axios from 'axios';

axios.defaults.withCredentials = true;

const URL = 'http://localhost:3000';

export const checkAuth = async (data) => {
    try {
        return await axios.post(`${URL}/auth/checkauth`, data);
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);
    }
};

export const registerUser = async (data) => {
    try {
        return await axios.post(`${URL}/register`, data);
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);
    }
};

export const loginUser = async (data) => {
    try {
        if (data.role === "user") {
            return await axios.post(`${URL}/login`, data);
        } else {
            return await axios.post(`${URL}/admin/login`, data);
        }
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);
    }
};

export const logoutUser = async () => {
    try {
        return await axios.post(`${URL}/logout`);
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);
    }
};

export const fetchUsers = async () => {
    try {
        return await axios.get(`${URL}/admin/fetch-users`);
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);
    }
};

export const addUser = async (data) => {
    try {
        return await axios.post(`${URL}/admin/add-user`, data);
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);
    }
};

export const editUser = async (data) => {
    try {
        return await axios.post(`${URL}/admin/edit-user`, data);
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);
    }
};

export const deleteUser = async (id) => {
    try {
        return await axios.post(`${URL}/admin/delete-user`, id);
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);
    }
};

export const editProfile = async (data, size) => {
    try {
        if (size) {
            return await axios.post(`${URL}/edit-full-profile`, data);
        } else {
            return await axios.post(`${URL}/edit-profile`, data);
        }
    } catch (error) {
        alert(error.response.data.message);
        console.log(error);
    }
};