import { useState, useEffect } from 'react';
import { Toast } from '../../components/alerts/Toast.jsx';
const URL = import.meta.env.VITE_URL;
const typeModule = 'shipment';

const useShipmentList = (token) => {
  const [shipmentList, setShipmentList] = useState([]);
  const [initialShipmentList, setInitialShipmentList] = useState([]);
  const [filteredShipmentList, setFilteredShipmentList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    getShipmentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters, shipmentList]);

  useEffect(() => {
    if (filteredShipmentList.length > 0) {
      sortShipments(filteredShipmentList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption]);

  const getShipmentList = async () => {
    try {
      const response = await fetch(`${URL}/${typeModule}/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setShipmentList(responseData.data);
        setInitialShipmentList(responseData.data);
        setFilteredShipmentList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Error al obtener la lista:', errorData);
        Toast.fire({
          icon: 'error',
          title: 'Error al obtener la lista de envíos',
        });
      }
    } catch (error) {
      console.error('Error al obtener la lista de envíos:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al obtener la lista de envíos',
      });
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`${URL}/${typeModule}/search?searchTerm=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setShipmentList(responseData.data);
        setFilteredShipmentList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Búsqueda fallida:', errorData);
      }
    } catch (error) {
      console.error('Error al buscar envíos:', error);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (option) => {
    setSortOption(option ? option.value : null);
    if (!option) {
      setFilteredShipmentList([...initialShipmentList]);
    }
  };

  const applyFilters = () => {
    let filtered = shipmentList;

    if (selectedFilters.length > 0) {
      filtered = shipmentList.filter((shipment) => selectedFilters.includes(shipment.delivery_status));
    }

    setFilteredShipmentList(filtered);
  };

  const sortShipments = (list) => {
    if (!sortOption) {
      setFilteredShipmentList(list);
      return;
    }

    let sortedList = [...list];

    switch (sortOption) {
      case 'fecha-asc':
        sortedList.sort((a, b) => new Date(a.shipment_create_at) - new Date(b.shipment_create_at));
        break;
      case 'fecha-desc':
        sortedList.sort((a, b) => new Date(b.shipment_create_at) - new Date(a.shipment_create_at));
        break;
    }

    setFilteredShipmentList(sortedList);
  };

  const addShipment = async () => {
    try {
      await getShipmentList();
    } catch (error) {
      console.error('Error al agregar el envío:', error);
    }
  };

  const deleteShipment = async (id_shipment) => {
    try {
      setFilteredShipmentList((prevShipments) =>
        prevShipments.filter((shipment) => shipment.id_shipment !== id_shipment)
      );
      await getShipmentList();
    } catch (error) {
      console.error('Error al eliminar el envío:', error);
    }
  };

  const updateShipment = async (updatedShipment) => {
    try {
      // Actualiza la lista de envíos con los datos actualizados
      setFilteredShipmentList((prevShipments) =>
        prevShipments.map((shipment) =>
          shipment.id_shipment === updatedShipment.id_shipment ? updatedShipment : shipment
        )
      );
      setShipmentList((prevShipments) =>
        prevShipments.map((shipment) =>
          shipment.id_shipment === updatedShipment.id_shipment ? updatedShipment : shipment
        )
      );
      setInitialShipmentList((prevShipments) =>
        prevShipments.map((shipment) =>
          shipment.id_shipment === updatedShipment.id_shipment ? updatedShipment : shipment
        )
      );
      console.log('State updated successfully.');
    } catch (error) {
      console.error('Error al actualizar el envío:', error);
    }
  };

  return {
    filteredShipmentList,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    getShipmentList,
    setFilteredShipmentList,
    addShipment,
    deleteShipment,
    updateShipment,
  };
};

export default useShipmentList;
