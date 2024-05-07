import Swal from 'sweetalert2';
import defaultAvatar from '/profile.svg'; 
import '../User/UserInfoButtonStyle.css'
import './StyleProfileButton.css'

// Define la función para mostrar la información del usuario
const showUserInfo = (userData) => {
    // Construye el contenido del modal con la información del usuario
    const addressConcatenated = userData.address ? `${userData.address} ${userData.number}, ${userData.floor ? 'Piso ' + userData.floor : ''} ${userData.letter_number ? 'Letra ' + userData.letter_number : ''}, ${userData.city}` : 'Dirección no disponible';
  
    const isActive = userData.active === 1 ? 'Activo' : 'Inactivo';
    const activeClass = userData.active === 1 ? 'active' : 'inactive'; // Clase para el estado activo o inactivo
  
    const userInfoHtml = `
      <div>
        <div class="container-avatar-active-inside ${activeClass}">
          <img src="${userData.avatar || defaultAvatar}" alt="Avatar del usuario" class="avatar-inside" />
        </div>
        <p><strong>Nombre:</strong> ${userData.name}</p>
        <p><strong>Apellidos:</strong> ${userData.last_name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Teléfono:</strong> ${userData.phone}</p>
        <p><strong>Dirección:</strong> ${addressConcatenated}</p>
        <p><strong>Rol en la empresa:</strong> ${userData.role}</p>
        <p><strong>Estado:</strong> ${isActive}</p>
        <p><strong>Biografía:</strong> ${userData.biography}</p>
      </div>
    `;
  
    // Muestra el modal con la información del usuario
    Swal.fire({
      title: 'Información del Usuario',
      html: userInfoHtml,
      allowOutsideClick: false,
      showCancelButton: false,
      confirmButtonText: 'Cerrar',
    });
  };
  
  // Define el componente UserButtonMoreInfo
  export const ProfileButton = ({ userData }) => {
    // Define la función que maneja el clic en el botón
    const handleClick = () => {
      // Muestra la información del usuario al hacer clic en el botón
      showUserInfo(userData);
    };
  
    return (
        <button className="tab" onClick={handleClick}>
            <svg
            width="104"
            height="100"
            viewBox="0 0 104 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <rect
                x="21.5"
                y="3.5"
                width="60"
                height="60"
                rx="30"
                stroke="grey"
                strokeWidth="7"
            ></rect>
            <g clipPath="url(#clip0_41_27)">
                <mask
                id="mask0_41_27"
                style={{ maskType: "luminance" }} // Aquí se usa un objeto de estilo válido en JSX
                maskUnits="userSpaceOnUse"
                x="0"
                y="61"
                width="104"
                height="52"
                >
                <path
                    d="M0 113C0 84.2812 23.4071 61 52.1259 61C80.706 61 104 84.4199 104 113H0Z"
                    fill="white"
                ></path>
                </mask>
                <g mask="url(#mask0_41_27)">
                <path
                    d="M-7 113C-7 80.4152 19.4152 54 52 54H52.2512C84.6973 54 111 80.3027 111 112.749H97C97 88.0347 76.9653 68 52.2512 68H52C27.1472 68 7 88.1472 7 113H-7ZM-7 113C-7 80.4152 19.4152 54 52 54V68C27.1472 68 7 88.1472 7 113H-7ZM52.2512 54C84.6973 54 111 80.3027 111 112.749V113H97V112.749C97 88.0347 76.9653 68 52.2512 68V54Z"
                    fill="grey"
                ></path>
                </g>
            </g>
            <defs>
                <clipPath id="clip0_41_27">
                <rect
                    width="104"
                    height="39"
                    fill="white"
                    transform="translate(0 61)"
                ></rect>
                </clipPath>
            </defs>
            </svg>
        </button>
    )
}