import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../buttons/Profile/LogoutButton.jsx';
import './ProfileNav.css';
import { useSetUser, useUser } from '../../context/authContext.jsx';
import { getUserDataFromToken } from '../../Services/GetUserDataToken.js';
import { getFullName } from '../../Services/getFullName.js';
import { getRoleName } from '../../Services/getRoleName.js';

export const ProfileNav = () => {
  const token = useUser();
  const setUser = useSetUser();
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (token) {
      // Obtener datos del usuario desde el token
      const userDataFromToken = getUserDataFromToken(token);
      
      // Guarda los datos del usuario en el estado
      setUserData(userDataFromToken);
    }
  }, [token]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const avatar = userData ? userData.avatar : './profile.svg';

  return (
    <nav className="profileNavContainer">
      <button
        className={`dropdown-toggle btn-profile ${isOpen ? 'open' : ''} ${isClicked ? 'clicked' : ''}`}
        onClick={() => {
          toggleDropdown();
          handleClick();
        }}
      >
        {userData && (
          <img
            className="avatarProfileNav"
            src={avatar}
            alt="Avatar del usuario"
          />
        )}
      </button>

      <ul className={`menuProfileNav ${isOpen ? 'open' : ''}`}>
        {userData && (
          <>
            <li className="nameBar navli navLink" key="nameBar">
              <p className="nameProfileNav">
                {getFullName(userData.name, userData.lastName)}
              </p>
            </li>
            <li className="roleBar navli navLink" key="roleBar">
              <p className="roleProfileNav">{getRoleName(userData.role)}</p>
            </li>
          </>
        )}

        <NavLink  exact="true" to="/Profile" className="btn-home navli btn-perfilNav" key="profile">
          <p>Settings</p>
          <img
            className="iconProfileNavSettings iconProfileNav"
            src="./settings.svg"
            alt="Imagen de configuración de perfil"
          />
        </NavLink>
        <li className="btn-logout navli btn-perfilNav" key="logout">
          <LogoutButton setUser={setUser} />
          <img className="iconProfileNavLogout iconProfileNav" src="./iconLogout.svg" alt="Imagen de configuración de perfil" />
        </li>
      </ul>
    </nav>
  );
};

