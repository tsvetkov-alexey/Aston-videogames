import logo from '../assets/img/logo.png';
import { useAuth } from '../hooks/useAuth';
import { clearFavourite } from '../redux/favourite/slice';
import { setCurrentPage, setSearchValue } from '../redux/filter/slice';
import { clearHistory } from '../redux/history/slice';
import { useAppDispatch } from '../redux/store';
import { removeUser } from '../redux/users/slice';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const { isAuth, signOut } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogo = () => {
    dispatch(setSearchValue(''));
    dispatch(setCurrentPage(1));
  };

  const handleLogOut = () => {
    dispatch(removeUser());
    dispatch(clearFavourite());
    dispatch(clearHistory());
    dispatch(setSearchValue(''));
    signOut();
    navigate('/');
  };

  return (
    <header>
      <Link to={'/'}>
        <div className="logo" onClick={handleLogo}>
          <img src={logo} alt="logo" />
          <h1>PlaySphere</h1>
        </div>
      </Link>
      <div className="auth">
        {isAuth ? (
          <ul className="loggedIn">
            <Link to="/history">
              <li>History</li>
            </Link>
            <Link to="/favourite">
              <li>Liked</li>
            </Link>
            <li onClick={handleLogOut}>Log out</li>
          </ul>
        ) : (
          <ul className="loggedOut">
            <Link to="/signIn">
              <li>Sign in</li>
            </Link>
            <Link to="/signUp">
              <li>Sing up</li>
            </Link>
          </ul>
        )}
      </div>
    </header>
  );
};
