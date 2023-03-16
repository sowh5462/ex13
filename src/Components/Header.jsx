import React, { useContext, useEffect } from 'react'
import { Button, Container, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link, withRouter } from 'react-router-dom';
import { UserContext } from './UserContext';
import { app } from '../firebaseInit';
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { ColorContext } from './ColorContext';

const Header = ({ history }) => {
    const { user, setUser } = useContext(UserContext);

    const { color, setColor } = useContext(ColorContext);

    const email = sessionStorage.getItem('email');

    const db = getFirestore(app);

    const onLogout = () => {
        sessionStorage.removeItem('email');
        setUser(null);
        history.push('/')
    };

    const getUser = async () => {
        const result = await getDoc(doc(db, 'users', email));
        // console.log(result.data());
        setUser(result.data());
    };

    useEffect(()=>{
        getUser();
    }, [email])

    return (
        <div className='header'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeMHjAWkFeiNdqiFmn6JE8gR2LiAIzMSQN2g&usqp=CAU" alt="" className='banner' />
            <Navbar bg={color} variant="dark">
                <Container>
                    <Nav>
                        <Link to='/'>홈</Link>
                        <Link to='/users'>사용자목록</Link>
                        {user && <Link to='/chats'>채팅</Link>}
                        {email ? 
                            <Link to='/' onClick={onLogout}>로그아웃</Link>
                            :
                            <Link to='/login'>로그인</Link>
                        }
                    </Nav>
                    <div>
                        {(user && user.photo) && <img src={user.photo} alt="" className='profile_image' />}
                        {(user && user.name) && <Link to='/mypage' >{user.name}님</Link>}
                    </div>
                </Container>
            </Navbar>
        </div>
    )
}

export default withRouter(Header)