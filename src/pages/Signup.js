import React, {useState} from "react";
import Container from "../components/Container";
import Col from "../components/Col";
import Row from "../components/Row";
import Jump from 'react-reveal/Jump';
import { Link, useLocation } from "react-router-dom";
import Rotate from 'react-reveal/Rotate'

const Signup = () => {
  const [username,setusername] = useState("")
  const [password,setpassword] = useState("")
  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password)
    setusername("");
    setpassword("");
  };

  const location = useLocation();
  
  

  return (
    <div className='logInScreen'>
      <Link to="/NewUser" className={location.pathname === "/NewUser" ? "nav-link active" : "nav-link NewUser"}>
          New User
        </Link>
      
      <Rotate>
      <Jump> <h2 className='logIn'>Log in</h2> </Jump>
      <form onSubmit={handleSubmit}>
        <Container className="signInForm">
          <Row className="form-group">
            <Col size="12">
              <input className="form-control" type="text" placeholder="Username" name="username" value={username} onChange={event=>setusername(event.target.value)} />
            </Col>
          </Row>
          <Row className="form-group">
            <Col size="12">
              <input className="form-control"  type="password"  placeholder="Password"  name="password" value={password} onChange={event=>setpassword(event.target.value)}
              />
            </Col>
          </Row>
          <button className="btn btn-success" type="submit">
            Log in
          </button>
        </Container>
      </form>
      </Rotate>
      

    </div>
  );
};

export default Signup;