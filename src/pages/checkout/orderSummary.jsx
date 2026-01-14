import dayjs from 'dayjs';
import axios from 'axios';
import { DeliveryOptions } from './deliveryOptions.jsx';

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption =
            deliveryOptions.find(
              (deliveryOption) =>
                deliveryOption.id === cartItem.deliveryOptionId
            ) || deliveryOptions[0];
            const deleteCartItem=async()=>{
              await axios.delete(`/api/cart-items/${cartItem.productId}`,{
                
              });
             await loadCart();
            }

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{' '}
                {dayjs(
                  selectedDeliveryOption.estimatedDeliveryTimeMs
                ).format('dddd, MMMM D')}
              </div>

              <div className="cart-item-details-grid">
                <img
                  className="product-image"
                  src={cartItem.product.image}
                  alt={cartItem.product.name}
                />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    ${cartItem.product.priceCents / 100}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{' '}
                      <span className="quantity-label">
                        {cartItem.quantity}
                      </span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                    onClick={deleteCartItem}>
                      Delete
                    </span>
                  </div>
                </div>

                <DeliveryOptions
                  loadCart={loadCart}
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
