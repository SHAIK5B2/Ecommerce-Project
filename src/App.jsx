import React from 'react'
 import axios from 'axios'
 import {useEffect,useState} from 'react'
import { HomePage } from './pages/home/homePage.jsx'
import {Routes ,Route} from 'react-router'
import {CheckoutPage} from './pages/checkout/checkoutPage.jsx'
 import { OrdersPage } from './pages/orders/ordersPage.jsx'
import './App.css'
 

function App() {

   const [cart , setCart]=useState([]);
   const loadCart=async()=>{
        const response= await axios.get('/api/cart-items?expand=product')
               setCart(response.data)
      };
    useEffect(()=>{
       
      loadCart();
      
            

    },[]);
  


  return (
    <Routes>
          <Route path='/' element={<HomePage  cart={cart} loadCart={loadCart} />}/>
          <Route path='/checkout' element={<CheckoutPage cart={cart} loadCart={loadCart} />}/>
          <Route path='/orders' element={<OrdersPage cart={cart} loadCart={loadCart}/>}/>
    </Routes>
       
    
  )
}

export default App
