import React, { useContext, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { UserContext } from './UserContext'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'

const Mypage = ({history}) => {
    const {user, setUser} = useContext(UserContext);

    const [form, setForm] = useState({
        name: user.name,
        address: user.address,
        photo: user.photo
    });

    const {name, address, photo} = form;

    const [file, setFile] = useState('');

    const onChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    };

    const db = getFirestore(app);

    const storage = getStorage(app);

    const email = sessionStorage.getItem('email');

    const onChangeFile = (e) => {
        setForm({...form, photo: URL.createObjectURL(e.target.files[0])});
        setFile(e.target.files[0]);
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        if(!window.confirm('수정할까요')) return;
        let url = '';
        if(file) {
            const fileName = `images/${Date.now()}_${file.name}`;
            const result = await uploadBytes(ref(storage, fileName), file);
            url = await getDownloadURL(result.ref)
        }
        await setDoc(doc(db, 'users', email), {
            ...form, photo:url
        });
        setUser({...form, photo:url});
        history.push('/');
    };

    return (
        <div>
            <Row className='justify-content-center mt-4'>
                <Col xl={8}>
                    <Card className='text-center'>
                        <Card.Title className='mt-3'>
                            <h3>내 정보수정</h3>
                        </Card.Title>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Control placeholder='이름' className='my-2' name='name' value={name} onChange={onChange} />
                                <Form.Control placeholder='주소' className='my-2' name='address' value={address} onChange={onChange} />
                                <img src={photo ? photo : "http://via.placeholder.com/120x150"} alt="" style={{width:'120px'}} />
                                <Form.Control type='file' className='my-2' onChange={onChangeFile} />
                                <hr />
                                <Button type='submit'>정보수정</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Mypage