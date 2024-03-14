import logo from '../assets/img/logo.png';
import { useAuth } from '../hooks/useAuth';
import { setSearchValue } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { removeUser } from '../redux/users/slice';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();

  const handleLogo = () => {
    dispatch(setSearchValue(''));
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
            <li>History</li>
            <li>Liked</li>
            <li onClick={() => dispatch(removeUser())}>Log out</li>
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
