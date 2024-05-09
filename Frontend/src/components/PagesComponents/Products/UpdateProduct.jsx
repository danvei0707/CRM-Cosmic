import Joi from 'joi';
import DynamicFormPopUp from '../../forms/DynamicFormPopUp.js';
import { useUser } from '../../../context/authContext.jsx';
import Swal from 'sweetalert2';

export const UpdateProduct = ({ product, onUpdateProduct }) => {
  // Asi obtienes el token del usuario de la sesión
  const token = useUser();

const handleButtonUpdateProduct = async (formData) => {
    try {
        const response = await fetch(
        `http://localhost:3000/product/update/${product}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(formData), // aqui va el formData lo que le envio lo del body
        }
    );
    if (response.ok){
        // Si la petición es correcta
        const responseData = await response.json();
        console.log('Producto actualizado correctamente', responseData);

        onUpdateProduct(responseData);

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
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
            title: 'Producto actualizado con exito! ',
          });
    } else {
        // Si la peticion es incorrecta
        const errorData = await response.json();
        console.error('El producto no ha podido ser actualizado:', errorData);
    }
  } catch (error) {
    // Si la peticion falla
    console.error('Error durante la actualización del producto:', error);
  }
}; 
// Titulo de la ventana
const title = 'Modificar producto';

// Nombre que se muestra en el botón de submit.
const nameButton = 'Modificar';


//Campos del formulario productos

const updateProductFormFields = [
    {
        name: 'name',
        description: 'description',
        price: 'price',
        stock: 'stock',
        product_status: 'product_status',
        creation_at: 'creation_at',
        update_at: 'update_at',
    },
];

// Esquema de validación, sacado de la base de datos.
const UpdateProductSchema = Joi.object({
    name: Joi.string().guid().optional(),
    description: Joi.string().guid().optional(),
    price: Joi.string().guid().optional(),
    stock: Joi.number().optional().min(1).max(100),
    product_status: Joi.string().optional().valid('active', 'inactive')
});

// Crea el modal POP e inserta los campos y el esquema de validación, y luego retorna la informacion que tiene que introducir en el body
const handleUpdateProduct = () => {
    DynamicFormPopUp(
        title,
        updateProductFormFields,
        UpdateProductSchema,
        handleButtonUpdateProduct,
        nameButton 
    );
};

return (
    <div>
        <button onClick={handleUpdateProduct}>Actualizar Producto</button>
    </div>
);

} 