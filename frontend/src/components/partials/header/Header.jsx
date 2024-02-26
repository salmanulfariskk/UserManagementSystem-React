import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { setLoggedIn } from '../../../redux/slices/userSlice';
import { setLoggedIn as setAdminLoggedIn } from '../../../redux/slices/adminSlice';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../../../services/api";
import "./Header.css";

const Header = ({ user, role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    const response = await logoutUser();
    if (response && response.data.status === "success") {
      if (role === "user") {
        dispatch(setLoggedIn(false));
        navigate("/");
      } else {
        dispatch(setAdminLoggedIn(false));
        navigate("/admin/login");
      }
    }
  };

  return (
    <header>
      <div className="container">
        <h1>StylesCraze</h1>
        <div className="header-right">
          <h3 className='display-name'>{user}</h3>
          <Button
            className="logout-btn"
            variant="contained"
            size="small"
            style={{ backgroundColor: '#821e15', color: 'white' }}
            onClick={() => logout()}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
