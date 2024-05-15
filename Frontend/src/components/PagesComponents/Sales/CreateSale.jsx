import Joi from 'joi';
import Swal from 'sweetalert2';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import './SalesListTable.css';

export const CreateSale = ({ onAddSale, token }) => {
  // Aqui hace la peticion al servidor
  const handleSaleCreatedAccion = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/sales/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        //si la peticion es correcta
        const responseData = await response.json();
        console.log('Venta satisfactorio:', responseData);

        onAddSale(responseData.data);

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
          title: 'Venta Realizada con exito !',
        });
      } else {
        // si la peticion es incorrecta
        const errorData = await response.json();
        console.error('Venta fallido:', errorData);
        // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
      }
    } catch (error) {
      // si la peticion falla
      console.error('Error durante la venta:', error);
      // Aquí podrías mostrar un mensaje de error con Swal.fire si lo deseas
    }
  };

  // Titulo de la ventana, CAMBIARLO SI ES NECESARIO
  const title = 'Crear Venta';

  // Nombre que se muestra en el botón de submit, CAMBIARLO SI ES NECESARIO
  const nameButton = 'Crear';

  // Campos del formulario personalizables
  const saleFormFields = [
    {
      name: 'product',
      label: 'Producto ',
      type: 'text',
      placeholder: 'Introduce el producto...',
      idLabel: 'labelNameSaleCreate',
      idInput: 'inputNameSaleCreate',
      required: true,
    },
    {
      name: 'quantity',
      label: 'Cantidad ',
      type: 'text',
      placeholder: 'Introduce la cantidad de producto...',
      idLabel: 'labelQuantitySaleCreate',
      idInput: 'inputQuantitySaleCreate',
      required: true,
    },
    {
      name: 'customer',
      label: 'Cliente',
      type: 'text',
      placeholder: 'Introduce el cliente...',
      idLabel: 'labelCustomerSaleCreate',
      idInput: 'inputCustomerSaleCreate',
      required: true,
    },
  ];

  const saleSchema = Joi.object({
    product: Joi.string().required(),
    quantity: Joi.string().required(),
    customer: Joi.string().required(),
  });

  const handleClickCreateSale = () => {
    DynamicFormPopUp(
      title,
      saleFormFields,
      saleSchema,
      handleSaleCreatedAccion,
      nameButton
    );
  };
  return (
    <>
      <button
        id="btnSalesCreate"
        className=" mainCreateBtn"
        onClick={handleClickCreateSale}
      >
        <img
          id="imgUserCreate"
          src="../../../../list_alt_add_24dp_FILL0_wght400_GRAD0_opsz24.svg"
          alt="Boton agregar usuario"
        />
      </button>
    </>
  );
};
