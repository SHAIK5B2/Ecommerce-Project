
import dayjs from 'dayjs';
import axios from 'axios';

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
  

   

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>

      {deliveryOptions.map((deliveryOption) => {
        let priceString = 'free shipping';
        
  const updateDeliveryOption = async () => {
     
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      deliveryOptionId: deliveryOption.id,
    });

    await loadCart(); // backend sync
  };
        if (deliveryOption.priceCents > 0) {
          priceString = `$${(deliveryOption.priceCents / 100).toFixed(2)} - Shipping`;
        }

        return (
          <label key={deliveryOption.id} className="delivery-option">
            <input
              type="radio"
              name={`delivery-option-${cartItem.productId}`}
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => updateDeliveryOption(deliveryOption.id)}
            />

            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('MMM D')}
              </div>
              <div className="delivery-option-price">
                {priceString}
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}
