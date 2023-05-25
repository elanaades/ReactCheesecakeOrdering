import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Home = () => {



    return (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgb(238,238,238)', height: '100vh'}}>
            <div className='text-center'>
                <h1 className="display-4">Welcome to the Cheesecake Factory</h1>
                <p className="lead">
                    <Link to='/Order'>
                        <button className="btn btn-dark btn-lg">
                            Click Here to Order Your Own Custom Cheesecake
                        </button>
                    </Link>
                </p>
            </div>
        </div>
    );


}

export default Home;
