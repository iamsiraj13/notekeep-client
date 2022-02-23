 
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../../actions/userActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainLayout from "../../components/MainLayout";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const history = useHistory();

  const dispatch = useDispatch();

  const userLogin = useSelector((state)=> state.userLogin)

  const { loading, error, userInfo } = userLogin;


  useEffect(()=>{
    if( userInfo ){
      history.push("/mynotes")
    }
  },[history, userInfo])

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(login(email, password))

  };


  return (
    <MainLayout title="LOGIN">
      <div className="loginContainer">
        { error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        { loading && <Loading/>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}

export default LoginPage;
