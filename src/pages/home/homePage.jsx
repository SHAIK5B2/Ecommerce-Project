import './homePage.css';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { ProductGrid } from './productGrid.jsx';   
import {Header} from '../../components/Header.jsx';
 

export function HomePage( {cart,loadCart} ) {
  const [products, setProducts] = useState([]);
    

  useEffect(() => {
    const HomeData=async()=>{
      const response=await axios.get('/api/products');
      setProducts(response.data);
    };
    HomeData();
    
        
       
  }, []);
  return (
    <>
    <title>Ecommerce Project</title>
    <Header cart={cart}/>
       

    <div className="home-page">
      <ProductGrid products={products} loadCart={loadCart} />
    </div>
    </>
  );
}