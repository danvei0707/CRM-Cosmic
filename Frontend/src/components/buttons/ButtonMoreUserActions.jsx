import './StyleModalUserEdit.css';
import './StyleButtonMoreActions.css';
import './DeleteButtomStyle.css';
import './ActiveButtonStyle.css';
import '../User/UserInfoButtonStyle.css'
import Swal from 'sweetalert2';

export const ButtonMoreUserActions = ( id, onDelete) => {

    const handleClick = () => {
        // Mostrar el modal con los botones adicionales usando SweetAlert2
        Swal.fire({
            title: 'Acciones adicionales',
            html: `
            <div class="container-checkboxes">
                <div class="checkbox-wrapper-8">
                    <input type="checkbox" id="cb3-8" class="tgl tgl-skewed">
                    <label for="cb3-8" data-tg-on="Active" data-tg-off="Inactive" class="tgl-btn"></label>
                </div>  
                <button class="setting-btn" onClick={handleClick}>
                    <span class="bar bar1"></span>
                    <span class="bar bar2"></span>
                    <span class="bar bar1"></span>
                </button>
                <button class="bin-button" id="bin-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 39 7"
                        class="bin-top"
                    >
                        <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                        <line
                        stroke-width="3"
                        stroke="white"
                        y2="1.5"
                        x2="26.0357"
                        y1="1.5"
                        x1="12"
                        ></line>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 33 39"
                        class="bin-bottom"
                    >
                        <mask fill="white" id="path-1-inside-1_8_19">
                        <path
                            d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                        ></path>
                        </mask>
                        <path
                        mask="url(#path-1-inside-1_8_19)"
                        fill="white"
                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                        ></path>
                        <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                        <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 89 80"
                        class="garbage"
                    >
                        <path
                        fill="white"
                        d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                        ></path>
                    </svg>
                    </button>
            </div>

            `,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        });

        // // Manejar acciones de los botones dentro del modal
        // document.getElementById('activateBtn').addEventListener('click', () => {
        //     handleActivate(); // Llama a la función para activar/desactivar el usuario
        // });

        // document.getElementById('editBtn').addEventListener('click', () => {
        //     handleEdit(); // Llama a la función para editar el perfil del usuario
        // });

        document.getElementById('bin-button').addEventListener('click', () => {
            // Mostrar el modal de confirmación para borrar el usuario
            Swal.fire({
                title: "¿Estas seguro?",
                text: "¡No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "¡Si, borrar!"
              }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await fetch(
                          `http://localhost:3000/user/delete/${id.id}`,
                          {
                            method: 'DELETE',
                            credentials: 'include',
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `${id.token}`,
                            },
                          }
                        );
                  
                        if (response.ok) {
                          //si la peticion es correcta
                          const responseData = await response.json();
                          console.log(`Usuario borrado con éxito:`, responseData);
                  
                          onDelete(id.id);
                  
                          // Aqui puedes mostrar un mensaje de exito con Swal que sale abajo a la derecha de la pantalla y dura 3 segundos
                          const Toast = Swal.mixin({
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.onmouseenter = Swal.stopTimer;
                              toast.onmouseleave = Swal.resumeTimer;
                            },
                          });
                  
                          Toast.fire({
                            icon: 'success',
                            title: `Usuario eliminado con exito`,
                          });
                        } else {
                          // si la peticion es incorrecta
                          const errorData = await response.json();
                          console.error(`Error al borra al usuario:`, errorData);
                          // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
                        }
                      } catch (error) {
                        // si la peticion falla
                        console.error(`Error al borra al usuario:`, error);
                        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    
                      }
                }
              });
    });

    }

    return (
        <button className="editBtn" onClick={handleClick}>
            <svg height="1em" viewBox="0 0 512 512">
                <path
                d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                ></path>
            </svg>
            </button>
    )
}