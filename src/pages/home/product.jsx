import axios from 'axios';
import { useState } from 'react';

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    await axios.post('api/cart-items', {
      productId: product.id,
      quantity: quantity,
    });
    await loadCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // optional auto-hide
  };

  return (
    <div className="product-container home-page">
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
          alt={`${product.rating.stars} stars`}
        />
        <div className="product-rating-count link-primary">
          {product.ratingCount}
        </div>
      </div>

      <div className="product-price">
        Rs-{product.priceCents}
      </div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={(event) => {
            const quantitySelected = Number(event.target.value);
            setQuantity(quantitySelected); // ensure camelCase
          }}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="product-spacer"></div>

      <div
        className="added-to-cart"
        style={{ opacity: added ? 1 : 0, transition: 'opacity 0.3s ease' }}
      >
        <img src="images/icons/checkmark.png" alt="added" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}