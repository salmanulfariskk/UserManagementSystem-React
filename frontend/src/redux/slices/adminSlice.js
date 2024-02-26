import { createSlice } from '@reduxjs/toolkit';
import { checkAuth, fetchUsers } from '../../services/api';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        isLoggedIn: false,
        username: null,
        loading: false,
        users: [],
        isFiltered: false,
        filteredUsers: [],
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setIsFiltered: (state, action) => {
            state.isFiltered = action.payload;
        },
        setFilteredUsers: (state, action) => {
            state.filteredUsers = action.payload;
        },
    },
});

// export admin actions and reducer
export const { setLoggedIn, setUsername, setLoading, setUsers, setIsFiltered, setFilteredUsers } = adminSlice.actions;
export default adminSlice.reducer;

// Asynchronous initialization function
export const initializeAdmin = () => async (dispatch) => {
    try {
        const response = await checkAuth({ role: 'admin' });
        if (response && response.data.status === 'success' && response.data.role === 'admin') {
            dispatch(setLoggedIn(true));
            dispatch(setUsername(response.data.currentUser.username));

            dispatch(setLoading(true));

            const usersResponse = await fetchUsers();
            if (usersResponse && usersResponse.status === 200) {
                const users = usersResponse.data.users;
                dispatch(setUsers(users));
                dispatch(setLoading(false));
            }
        } else {
            dispatch(setLoggedIn(false));
        }
    } catch (error) {
        // Handle error if the authentication check fails
        console.error('Authentication check failed:', error);
        dispatch(setLoggedIn(false));
    }
};