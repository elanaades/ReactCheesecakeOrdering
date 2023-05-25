import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { produce } from 'immer';


const baseFlavors = ['Choose...', 'Classic', 'Chocolate', 'Red Velvet', 'Brownie'];

const toppings = [
    "Chocolate Chips",
    "Caramel Drizzle",
    "Whipped Cream",
    "Pecans",
    "Almonds",
    "Toasted Coconut",
    "Graham Cracker Crumble",
    "Cookie Dough",
    "Mint Chocolate Chips",
    "Caramelized Bananas",
    "Rainbow Sprinkles",
    "Powdered Sugar",
    "White Chocolate Shavings",
    "Peanut Butter Drizzle",
    "Dark Chocolate Drizzle"
];

const Order = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [base, setBase] = useState(baseFlavors[0]);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [specialRequest, setSpecialRequest] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const onFlavorChange = e => {
        setBase(e.target.value);
    }

    const onToppingsChange = topping => {
        if (selectedToppings.includes(topping)) {
            setSelectedToppings(selectedToppings.filter(t => t !== topping));
        } else {
            setSelectedToppings([...selectedToppings, topping]);
        }
    }

    const computeTotal = () => {
        if (base === baseFlavors[0]) {
            return 0;
        }

        return (49.99 + (selectedToppings.length * 3.95)) * quantity;
    }

    const isFormValid = !!name && !!email && base !== baseFlavors[0] && quantity > 0 && !!deliveryDate;

    const onSubmitClick = async () => {
        setIsSubmitting(true);
        await axios.post('/api/cheesecake/addorder', {
            name,
            email,
            base,
            toppings: selectedToppings.join(', '),
            specialRequest,
            quantity,
            deliveryDate,
            price: computeTotal()
        });
        setIsSubmitting(false);
        navigate('/success');
    }

    return (
        <div className="container">
            <h1 className="text-center my-4" style={{ paddingTop: '30px' }}>Cheesecake Factory Form</h1>
            <div className="row" style={{ paddingTop: '30px' }}>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Cheesecake Base Flavor ($49.99)</label>
                        <select className="form-select" onChange={onFlavorChange} value={base}>
                            <option>Choose...</option>
                            <option>Classic</option>
                            <option>Chocolate</option>
                            <option>Red Velvet</option>
                            <option>Brownie</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Toppings (each topping adds an additional $3.95)</label>
                        {toppings.map(t => {
                            return <div key={t} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={selectedToppings.includes(t)}
                                    onChange={() => onToppingsChange(t)}
                                />
                                <label className="form-check-label">{t}</label>
                            </div>
                        })}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Special Requests</label>
                        <textarea className="form-control" rows="3" onChange={e => setSpecialRequest(e.target.value)} value={specialRequest}>
                        </textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input type="number" className="form-control" min="1" onChange={e => setQuantity(e.target.value)} value={quantity} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Delivery Date</label>
                        <input type="date" className="form-control" onChange={e => setDeliveryDate(e.target.value)} name="deliveryDate" value={deliveryDate} />
                    </div>
                    <button type="submit" disabled={!isFormValid || isSubmitting} className="btn btn-primary" onClick={onSubmitClick}>
                        {isSubmitting ? 'Submitting...' : 'Submit Order'}
                    </button>
                </div>


                <div className="col-md-6 position-sticky" style={{ top: '2rem' }} >
                    <h2 className="mb-4">Live Preview</h2>
                    <div className="card" style={{ width: '18rem' }} >
                        <img src="/cheesecake.png" className="card-img-top" alt="Cheesecake" />
                        <div className="card-body">
                            <h5 className="card-title">Your Custom Cheesecake</h5>
                            <p className="card-text">Base: {base}</p>
                            <p className="card-text">Toppings: {selectedToppings.join(', ')}</p>
                            <p className="card-text">Special Requests: {specialRequest}</p>
                            <p className="card-text">Quantity: {quantity}</p>
                            <p className="card-text">Delivery Date: {deliveryDate}</p>
                            <p className="card-text fw-bold">Total: ${computeTotal().toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>)
}

export default Order;