import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { initializeUser } from './redux/slices/userSlice';
import { initializeAdmin } from './redux/slices/adminSlice';
import Home from './components/users/home/Home';
import Profile from './components/users/Profile/Profile';
import Dashboard from './components/admin/Dashboard/Dashboard';
import AddUserForm from "./components/admin/Dashboard/addUserForm/AddUserForm";
import EditUserForm from "./components/admin/Dashboard/editUserForm/EditUserForm";
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the asynchronous initialization functions on component mount
    dispatch(initializeUser());
    dispatch(initializeAdmin());
  }, [dispatch]);

  // Use selectors to get the logged-in status of admin and user
  const isAdminLoggedIn = useSelector(state => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector(state => state.user.isLoggedIn);

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={isUserLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isUserLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isAdminLoggedIn ? <Dashboard /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/add-user" element={isAdminLoggedIn ? <AddUserForm /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/edit-user/:userId" element={isAdminLoggedIn ? <EditUserForm /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/login" element={!isAdminLoggedIn ? <Login role={'admin'} /> : <Navigate to="/admin" />} />
          <Route path="/login" element={!isUserLoggedIn ? <Login role={'user'} /> : <Navigate to="/" />} />
          <Route path="/sign-up" element={!isUserLoggedIn ? <Register /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;
