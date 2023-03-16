import React, { useContext, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { UserContext } from './UserContext'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import LoadingPage from './LoadingPage'

const Login = ({history}) => {
    const auth = getAuth(app);

    const db = getFirestore(app);

    const {user, setUser} = useContext(UserContext);

    const [form, setForm] = useState({
        email: 'user01@email.com',
        password: '12341234'
    });

    const [loading, setLoading] = useState(false);

    const {email, password} = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const onLogin = (e) => {
        setLoading(true);
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((success)=>{
            //getUser();
            sessionStorage.setItem('email', email);
            setLoading(false);
            alert('성공');
            history.push('/');  
        })
        .catch((error)=>{
            setLoading(false);
            alert('실패'+error.message);
        })
    };
    
    const getUser = async () => {
        const result = await getDoc(doc(db, 'users', email));
        // console.log(result.data());
        setUser(result.data());
    };

    if(loading) return <LoadingPage/>
    return (
        <div>
            <Row className='justify-content-center my-5'>
                <Col xl={8}>
                    <Card className='text-center py-3'>
                        <Card.Title><h3>로그인<i class="bi bi-door-open"></i></h3></Card.Title>
                        <Card.Body>
                            <Form onSubmit={onLogin}>
                                <Form.Control placeholder='Email' className='my-2' name='email' value={email} onChange={onChange} />
                                <Form.Control placeholder='PassWord' type='password' className='my-3' name='password' value={password} onChange={onChange} />
                                <Button type='submit' variant='primary'>로그인</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Login