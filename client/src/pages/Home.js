import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { Col, Row , Divider , DatePicker, Checkbox, Button, Input} from 'antd'

import {Link} from 'react-router-dom'
import Spinner from '../components/Spinner';
import moment from 'moment'
import { SearchOutlined } from '@ant-design/icons';
// import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;
const {RangePicker} = DatePicker

function Home() {
    const {cars} = useSelector(state=>state.carsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const [totalCars , setTotalcars] = useState([])
    const [search,setSearch] = useState("");
   
    const [dateRange,setDateRange] = useState(null);

    const dispatch = useDispatch()
    
    const filteredCars = totalCars.filter((product) => {
        if (
          product?.name.toLowerCase().includes(search)
        ) {
          return product;
        }
    });

    useEffect(() => {
        dispatch(getAllCars())
    }, [])

    useEffect(() => {
        setTotalcars(cars)
    }, [cars])

    async function setFilter(values){

        var selectedFrom = moment(values[0] , 'MMM DD yyyy HH:mm')
        var selectedTo = moment(values[1] , 'MMM DD yyyy HH:mm')

        await setDateRange({
            startDate: selectedFrom,
            endDate: selectedTo,
        })

        var temp=[]

        for(var car of cars){

              if(car.bookedTimeSlots.length == 0){
                  temp.push(car)
              }
              else{

                   for(var booking of car.bookedTimeSlots) {

                       if(selectedFrom.isBetween(booking.from , booking.to) ||
                       selectedTo.isBetween(booking.from , booking.to) || 
                       moment(booking.from).isBetween(selectedFrom , selectedTo) ||
                       moment(booking.to).isBetween(selectedFrom , selectedTo)
                       )
                       {

                       }
                       else{
                           temp.push(car)
                       }

                   }

              }

        }


        setTotalcars(temp)


    }
    

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current.valueOf() < Date.now()-86400000;
    }

    

    return (
        <DefaultLayout>

             <Row className='mt-3' justify='center'>
                 
                 <Col lg={20} sm={24} style={{display: 'flex',justifyContent: 'space-between'}}>

                    <RangePicker 
                        disabledDate={disabledDate}
                        showTime={{format: 'HH:mm'}} 
                        format='MMM DD yyyy HH:mm' 
                        onChange={setFilter}
                    />

                    <div>
                    <Input
                            placeholder="Search"
                            style={{width: '100%', color: '#791314',padding: '5px'}}
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            // endAdornment={
                            //     <InputAdornment position="end">
                            //         <SearchIcon color="primary"/>
                            //     </InputAdornment>
                            // }
                            suffix={<SearchOutlined />}
                        />

                    </div>
                 </Col>

             </Row>

              {loading == true && (<Spinner/>)}


              
              <Row justify='center' gutter={16}>

                   {filteredCars.map(car=>{
                       return <Col lg={5} sm={24} xs={24}>
                            <div className="car p-2 bs1">
                               <img src={car.image} className="carimg"/>

                               <div className="car-content d-flex align-items-center justify-content-between">

                                    <div className='text-left pl-2'>
                                        <p>{car.name}</p>
                                        <p> Rent Per Hour {car.rentPerHour} /-</p>
                                    </div>

                                    <div>
                                        <button className="btn1 mr-2" onClick={() => dateRange === null && window.alert("Select Dates")}>
                                            {dateRange === null ? "Book Now" : 
                                            <Link to={{pathname : `/booking/${car._id}/${JSON.stringify(dateRange)}`}}>Book Now</Link>}
                                        </button>
                                    </div>

                               </div>
                            </div>
                       </Col>
                   })}

              </Row>

        </DefaultLayout>
    )
}

export default Home
