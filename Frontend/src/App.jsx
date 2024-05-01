import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { SalesPage } from './pages/SalesPage.jsx';
import { Visitpage } from './pages/Visitpage.jsx';
import { DeliveryNotePage } from './pages/DeliveryNotePage.jsx';
import { InvoicePage } from './pages/InvoicePage.jsx';
import { PaymentPage } from './pages/PaymentPage.jsx';
import { ShipmentPage } from './pages/ShipmentPage.jsx';
import { AboutPage } from './pages/About/AboutPage.jsx';

function App() {
  return (
    <>
      <h1>Cosmic CRM</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sale" element={<SalesPage />} />
        <Route path="/visit" element={<Visitpage />} />
        <Route path="/deliveryNote" element={<DeliveryNotePage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/shipment" element={<ShipmentPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;