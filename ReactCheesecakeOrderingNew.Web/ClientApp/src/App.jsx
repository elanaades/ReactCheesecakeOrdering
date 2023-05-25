import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';
import Home from './Pages/Home';
import Order from './Pages/Order';
import Success from './Pages/Success';
import OrderDetails from './Pages/OrderDetails';
import ViewOrders from './Pages/ViewOrders';
import { Routes, Route } from 'react-router-dom';

class App extends React.Component {

   render() {
        return (
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/Order' element={<Order />} />
                    <Route exact path='/ViewOrders' element={<ViewOrders />} />
                    <Route exact path='/success' element={<Success />} />
                    <Route exact path='/orderdetails/:id' element={<OrderDetails />} />
                </Routes>
            </Layout>
        );
    }
};

export default App;