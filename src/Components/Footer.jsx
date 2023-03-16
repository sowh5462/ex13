import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ColorContext } from './ColorContext';

const Footer = () => {
    const {color, setColor} = useContext(ColorContext)
    return (
        <div>
            <Navbar bg={color} variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Button onClick={()=>setColor('primary')}>dark</Button> &nbsp;
                    <Button onClick={()=>setColor('light')}>primary</Button>
                </Container>
            </Navbar>
        </div>
    )
}

export default Footer