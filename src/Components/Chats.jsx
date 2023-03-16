import React, { useContext, useEffect, useRef, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import './chat.css'
import { UserContext } from './UserContext'
import { app } from '../firebaseInit'
import { getDatabase, ref, set, push, onValue, remove } from 'firebase/database'
import moment from 'moment'
import LoadingPage from './LoadingPage'

const Chats = () => {
    const { user } = useContext(UserContext);

    const [text, setText] = useState('');

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const ref_bottom = useRef(null);

    const db = getDatabase(app);

    const onSend = async (e) => {
        e.preventDefault();
        if (text == "") {
            alert("보낼내용을 입력하세요");
            return;
        };
        const key = push(ref(db, 'chats')).key;
        const message = {
            key: key,
            email: user.email,
            name: user.name,
            photo: user.photo,
            text: text,
            date: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        };
        await set(ref(db, `chats/${key}`), message);
        setText('');
        ref_bottom.current.scrollIntoView({behavior:'smooth'});
    };

    const getMessage = () => {
        setLoading(true);
        onValue(ref(db, 'chats'), (result) => {
            let rows = [];
            result.forEach(row => {
                rows.push(row.val());
            });
            // console.log(rows);
            setMessages(rows);
            setLoading(false);
        });
    };

    useEffect(() => {
        getMessage();
    }, []);

    const onDelete = (e) => {
        e.preventDefault();
        const key = e.target.getAttribute('href');
        // alert(key);
        if(!window.confirm(`${key} 데이터를 삭제할까요`)) return;
        remove(ref(db, `chats/${key}`));
    }

    if (loading) return <LoadingPage />
    return (
        <div>
            <Row className='justify-content-center'>
                <Col xl={8}>
                    <Card className='text-center my-4 p-3'>
                        <Card.Title className=''>
                            <img src={user.photo} alt="" className='profile_image' />
                            <h4>대나무숲</h4>
                        </Card.Title>
                        <Card.Body>
                            <div className='wrap'>
                                {messages.map(msg =>
                                    <div className={user.email === msg.email ? 'chat ch2' : 'chat ch1'} key={msg.key}>
                                        {msg.email !== user.email &&
                                        <div className='icon'>
                                            <img src={msg.photo} alt="" />
                                            <div className='sender'>{msg.name}</div>
                                        </div>
                                        }
                                        <div className='textbox'>
                                            {msg.text}
                                            {(msg.email === user.email)&&<a href={msg.key} className='delete' onClick={onDelete}>x</a>}
                                            <br />
                                            {msg.date}
                                        </div>
                                    </div>
                                )}
                                <div ref={ref_bottom}/>
                            </div>
                            <Form onSubmit={onSend} className='mt-1'>
                                <Form.Control placeholder='내용을 입력하세요' value={text} onChange={(e) => setText(e.target.value)} />
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Chats