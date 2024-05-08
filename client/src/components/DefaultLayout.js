import React from "react";
import { Menu, Dropdown, Button, Space,Row , Col } from "antd";
import {Link} from 'react-router-dom'

function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('user'))
    const mailid = "navateja88011@gmail.com"
  const menu = (
    <Menu>
        <Menu.Item>
        <a
         
          href="/"
        >
          Home
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          
          href="/userbookings"
        >
          Bookings
        </a>
      </Menu.Item>
      {user.isAdmin &&
      <Menu.Item>
      <a
       
        href="/admin"
      >
        Actions
      </a>
    </Menu.Item>}
        {!user.isAdmin && 
        <Menu.Item>
        <a
          target="_blank"
          href={`mailto:${mailid}`}
          rel="noopener noreferrer"
        >
          Contact Us
        </a>
      </Menu.Item>}
      <Menu.Item onClick={()=>{
          localStorage.removeItem('user');
          window.location.href='/login'
      }}>
          <li style={{color:'orangered'}}>Logout</li>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div className="header bs1">
          <Row gutter={16} justify='center'>
              <Col lg={20} sm={24} xs={24}>
              <div className="d-flex justify-content-between">
             <h4><b><Link to='/' style={{color:'orangered'}}>RentWheels </Link></b><br></br><p style={{color:'black',fontSize:"12px"}}>wheels at your fingertips</p></h4>
             
             
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button style={{marginTop: 'auto', marginBottom: 'auto'}}>{user.username}</Button>
          </Dropdown>
        </div>
              </Col>
          </Row>
        
      </div>
      <div className="content">{props.children}</div>

      <div className="footer text-center">
        <p>For any queires Contact {" "}
          <a href="tel:+918464952745">+918464952745</a>
        </p>
      </div>
    </div>
  );
}

export default DefaultLayout;
