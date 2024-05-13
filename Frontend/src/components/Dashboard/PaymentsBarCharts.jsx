import { useEffect, useMemo, useState } from 'react';
import { useUser } from '../../context/authContext.jsx';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './Charts.css';

export const PaymentsBarCharts = () => {
  const token = useUser();
  const [paymentsList, setPaymentsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSaleList = async () => {
    try {
      const response = await fetch(`http://localhost:3000/payments/list`, {
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
        setPaymentsList(responseData.data);
      } else {
        const errorData = await response.json();
        console.error('Obetener fallido:', errorData);
      }
    } catch (error) {
      console.error('Error al obtener la lista de pagos:', error);
    }
  };
  useEffect(() => {
    getSaleList();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const error = console.error;
    console.error = (...args) => {
      if (/defaultProps/.test(args[0])) return;
      error(...args);
    };
  }, []);

  const chartData = useMemo(
    () => (loading ? <p>Loading...</p> : paymentsList),
    [loading, paymentsList]
  );

  return (
    <>
      <section id="payments-charts">
        <h2 id="stock-charts">Pagos</h2>
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <ResponsiveContainer>
            <BarChart data={chartData} width={500} height={300}>
              <CartesianGrid strokeDasharray="4 2 1" />
              <XAxis dataKey="customer" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="paid_amount" fill="#0e8743" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </section>
    </>
  );
};
