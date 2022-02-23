import React, { useEffect } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const history = useHistory();
    useEffect(()=>{
        const userInfo = localStorage.getItem('userInfo');
    
        if( userInfo ){
          history.push('/mynotes')
        }
    
      },[history])
    
    return (
        <div className='main'>
            <Container>
               <Row>
                   <div className="intro-text">
                       <div>
                           <h1 className='title'>Welcome to Note Keep</h1>
                           <p className='subtitle'>One Safe place for all you notes.</p>
                       </div>
                       <div className="buttonContainer">
                           <Link to="/login">
                               <Button size='lg'>
                                   Login
                               </Button>
                           </Link>
                           <Link to="/register">
                               <Button size="lg" variant="outline-primary">
                                    Register
                               </Button>
                           </Link>
                       </div>
                   </div>
               </Row>
            </Container>
        </div>
    );
};

export default LandingPage;