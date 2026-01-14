import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // ✅ needed for matchers
import { Product } from './product.jsx';

describe('Product Component', () => {
  it('renders product details correctly',  () => {
    const product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: { stars: 4.5 },
      ratingCount: 87,
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"]
    };

    const loadCart = vi.fn();
    render(<Product product={product} loadCart={loadCart} />);

    // Assertions
    expect(
      screen.getByText(/Black and Gray Athletic Cotton Socks/i)
    ).toBeInTheDocument();

    expect(screen.getByAltText(/4.5 stars/i)).toBeInTheDocument(); // ✅ regex safer
    expect(screen.getByText("87")).toBeInTheDocument();
    expect(screen.getByText("Rs-1090")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add to Cart/i })).toBeInTheDocument();
     
  });
});