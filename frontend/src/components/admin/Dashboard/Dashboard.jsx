import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeAdmin } from '../../../redux/slices/adminSlice';
import Header from '../../partials/header/Header';
import SearchComponent from './Search';
import TableComponent from './Table';
import './Dashboard.css';

export default function Dashboard() {
  const username = useSelector(state => state.admin.username);
  const dispatch = useDispatch();
  const users = useSelector(state => state.admin.users);
  const isFiltered = useSelector(state => state.admin.isFiltered);
  const searchResult = useSelector(state => state.admin.filteredUsers);

  useEffect(() => {
    dispatch(initializeAdmin());
  }, [dispatch]);

  return (
    <>
      <Header user={username} role={'admin'} />
      <div className='tableContainer'>
        <div>
          <SearchComponent />
        </div>
        <TableComponent data={isFiltered ? searchResult : users} />
      </div>
    </>
  );
};