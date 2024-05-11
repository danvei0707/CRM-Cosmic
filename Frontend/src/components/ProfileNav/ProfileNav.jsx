import { useSetUser, useUser } from '../../context/authContext.jsx';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserDataFromToken } from '../../Services/GetUserDataToken.js';
import LogoutButton from '../buttons/Profile/LogoutButton.jsx';
import './ProfileNav.css';

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

  // Convertir el rol
  const getRoleName = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'deliverer':
        return 'Repartidor';
      case 'salesAgent':
        return 'Comercial';
      default:
        return role;
    }
  };

  return (
    <nav className="profileNavContainer">
      <button 
        className={`dropdown-toggle btn-profile ${isOpen ? 'open' : ''} ${isClicked ? 'clicked' : ''}`} 
        onClick={() => {toggleDropdown(); handleClick();}}
      >
        {userData && <img className="avatarProfileNav" src={userData.avatar || './profile.svg'} alt="Avatar del usuario" />}
      </button>

      <ul className={`menuProfileNav ${isOpen ? 'open' : ''}`}>
        {userData && (
          <>
            <li className="nameBar navli navLink" key="nameBar">
              <p className="nameProfileNav">{userData.name}</p>
            </li>
            <li className="roleBar navli navLink" key="roleBar">
              <p className="roleProfileNav">{getRoleName(userData.role)}</p>
            </li>
          </>
        )}
        <NavLink exact to="/Profile" className="btn-home navli btn-perfilNav" key="profile">
          <p>Settings</p>
        </NavLink>
        <li className="btn-logout navli btn-perfilNav" key="logout">
          <LogoutButton setUser={setUser} />
        </li>
      </ul>
    </nav>
  );
};
