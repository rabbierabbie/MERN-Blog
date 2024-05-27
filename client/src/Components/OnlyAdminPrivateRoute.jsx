import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return (currentUser&&currentUser.isAdmin) ? <Outlet /> : <Navigate to='/signin' />;
  {/*There are many built in components in React router version 6 and Navigate component is one of them. It is a wrapper for the useNavigate hook, and used to change the current location on rendering it */}
}