import { MainLayout } from '../../layout/MainLayout.jsx';
import { useUser } from '../../context/authContext.jsx';
import { useEffect, useState } from 'react';
import { CreateInvoice } from '../../components/PagesComponents/Invoces/CreateInvoice.jsx';
import { InvoicesList } from '../../components/PagesComponents/Invoces/InvoicesList.jsx';
import { ClosedInvoice } from '../../components/PagesComponents/Invoces/ClosedInvoice.jsx';
import { DeleteGenericModal } from '../../components/forms/DeleteGenericModal.jsx';
import { Toast } from '../../components/alerts/Toast.jsx';
const URL = import.meta.env.VITE_URL;

export const InvoicePage = () => {
  const token = useUser();
  const [invoiceList, setInvoiceList] = useState([]);

  // Tipo de Modulo para que la ruta URL de la peticion sea dinamica
  const typeModule = 'invoice';

  // Tipo de modulo para el nombre de los mensajes al cliente
  const typeModuleMessage = 'Factura';

  const getSaleList = async () => {
    try {
      const response = await fetch(`${URL}/${typeModule}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Obtener satisfactorio:', responseData);

        // Actualizar el estado con los datos obtenidos
        setInvoiceList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Obetener fallido:', errorData);
        // Mostrar un mensaje de error al usuario
        Toast.fire({
          icon: 'error',
          title: 'Error al obtener la lista de facturas',
      });
      }
    } catch (error) {
      console.error('Error al obtener la lista de facturas:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de facturas',
    });
    }
  };

  useEffect(() => {
    getSaleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Actualizo el estado con la venta añadida
  const addInvoice = async () => {
    try {
      await getSaleList();
    } catch (error) {
      console.error('Error al agregar la factura:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al agregar la factura',
    });
    }
  };

  // Actualizo el estado con la venta eliminada
  const deleteInvoice = async (id_invoice) => {
    try {
      setInvoiceList((prevSales) =>
        prevSales.filter((invoice) => invoice.id_invoice !== id_invoice)
      );

      await getSaleList();
    } catch (error) {
      console.error('Error al eliminar la factura:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al eliminar la factura',
    });
    }
  };

  // Actualizo el estado con la venta eliminada
  const updateInvoice = async (id_invoice) => {
    try {
      setInvoiceList((prevSales) =>
        prevSales.filter((invoice) => invoice.id_invoice !== id_invoice)
      );

      await getSaleList();
    } catch (error) {
      console.error('Error al actualizar la factura:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar la factura',
    });
    }
  };

  return (
    <MainLayout>
      <section id="invoice_container" className=" mainContainer">
        <h1 id="invoice_title" className=" mainTitle">
          Facturas
        </h1>
        <CreateInvoice onAddInvoice={addInvoice} token={token} />
        <ol id="invoice_list" className=" main_olist">
          {invoiceList.map((data) => {
            return (
              <li
                key={data.id_invoice}
                id="element_invoice_container"
                className=" main_ilist"
              >
                <InvoicesList invoice={data} />
                <span id="invoice_actions" className="main_actions">
                  <ClosedInvoice
                    invoice={data.id_invoice}
                    onUpdateInvoice={updateInvoice}
                    token={token}
                  />
                  <DeleteGenericModal
                    id={data.id_invoice}
                    onDelete={deleteInvoice}
                    token={token}
                    typeModule={typeModule}
                    typeModuleMessage={typeModuleMessage}
                  />
                </span>
              </li>
            );
          })}
        </ol>
      </section>
    </MainLayout>
  );
};
