import './checkoutPage.css';
import './checkout-header.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderSummary } from './orderSummary.jsx';
import { PaymentSummary } from './paymentsummary.jsx';

export function CheckoutPage({ cart ,loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchDeliveryOptions=async()=>{
      let response= await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
             setDeliveryOptions(response.data)
              response= await axios.get('/api/payment-summary')
             setPaymentSummary(response.data)
   
    };
    fetchDeliveryOptions();
  }, [cart]);

  return (
    <>
      <title>Checkout Page</title>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" alt="logo" />
              <img className="mobile-logo" src="images/mobile-logo.png" alt="mobile logo" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link" href="/">3 items</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" alt="lock" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

          {paymentSummary && (
             <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
          )}
        </div>
      </div>
    </>
  );
}