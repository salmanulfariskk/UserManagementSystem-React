import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initializeUser } from '../../../redux/slices/userSlice';
import Header from '../../partials/header/Header';
import './Home.css';

const Home = () => {
  const username = useSelector(state => state.user.username);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <>
      <Header user={username} role={'user'} />
      <div className='main-div'>
        <h1>Welcome, {username}</h1>
        <p>Go to <Link to="/profile">Profile</Link></p>
      </div>
    </>
  );
};

export default Home;
