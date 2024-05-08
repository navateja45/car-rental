import { Col , Row , Form , Input, Button} from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { addCar } from '../redux/actions/carsActions'
function AddCar() {
    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.alertsReducer)

    const [year,setYear] = useState(2024);
    const [carprice, setCarPrice] = useState(1000000);
    const [capacity,setCapacity] = useState(0);
    const [rentalvalue,setRentalValue] = useState(0);
    const [mileage,setMileage] = useState(0);

    function onFinish(values){

        values.bookedTimeSlots=[]
        values.rentPerHour = parseFloat(rentalvalue/24).toFixed(2);
        dispatch(addCar(values))
        console.log(values)
    }

    const calculateRentalPrice = async() => {
        let rentprice = 3;
    
        // Calculate age factor
        const d = new Date();
        let yearsOwned = d.getFullYear() - year;
        let ageFactor = 1 - (yearsOwned * 0.05); // Example decay factor
        
        // Calculate car price factor
        let carPriceFactor = carprice * 0.001; // Example scaling factor
        
        // Calculate seating capacity factor
        let seatingCapacityFactor = 1 + (capacity * 0.1); // Example increase factor
        
        // Calculate mileage factor
        let mileageFactor = 1 - (mileage * 0.0001); // Example decrease factor
        
        // Combine factors to get final rent price
        let finalRentPrice = rentprice * ageFactor * carPriceFactor * seatingCapacityFactor * mileageFactor;

        console.log(finalRentPrice);

        setRentalValue(finalRentPrice);
    }

    return (
        <DefaultLayout>
               {loading && (<Spinner />)}
               <Row justify='center mt-5'>
                   <Col lg={12} sm={24} xs={24} className='p-2'>
                       <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                           <h3>Add New Car</h3>
                           <hr />
                            <Form.Item name='name' label='Car name' rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name='image' label='Image url' rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name='year' label='Car Bought year' rules={[{required: true}]}>
                                <Input value={year} onChange={(e) => setYear(e.target.value)}/>
                            </Form.Item>
                            <Form.Item name='carprice' label='Car Price' rules={[{required: true}]}>
                                <Input value={carprice} onChange={(e) => setCarPrice(e.target.value)}/>
                            </Form.Item>
                            <Form.Item name='capacity' label='Capacity' rules={[{required: true}]}>
                                <Input  value={capacity} onChange={(e) => setCapacity(e.target.value)}/>
                            </Form.Item>
                            <Form.Item name='mileage' label='Mileage' rules={[{required: true}]}>
                               <Input value={mileage} onChange={(e) => setMileage(e.target.value)}/>
                            </Form.Item>
                            <Form.Item name='fuelType' label='Fuel Type' rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Button onClick={calculateRentalPrice}>Calculate Rent Per Hour</Button>
                            
                            <Form.Item>
                                <Input value={parseFloat(rentalvalue/24).toFixed(2)} />
                            </Form.Item>
                            <div className='text-right'>
                                <button className='btn1'>ADD CAR</button>
                            </div>

                       </Form>
                   </Col>
               </Row>

        </DefaultLayout>
    )
}

export default AddCar
