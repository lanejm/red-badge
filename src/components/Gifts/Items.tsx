import React, { useState} from 'react';
import GiftEdit from './Edit';
import GiftsList from './List';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
  } from 'reactstrap';

interface ItemsProp {
    giftName: string;
    description: string;
    date: string;
    purchased: string;
    person: string;
    from: string;
    owner: string;
    price: string;
    sessionToken: string;
}

const ItemsTable: React.FC<ItemsProp> = () => {
    
    const [gifts, setGifts] = useState([])
    const [name, setName] = useState('')
    const [giftName, setGiftName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [purchased, setPurchased] = useState('')
    const [person, setPerson] = useState('')
    const [from, setFrom] = useState('')
    const [owner, setOwner] = useState('')
    const [price, setPrice] = useState('')
    const [userId, setUserId] = useState(undefined)
    const [sessionToken, setSessionToken] = useState<string>('');

    const fetchGifts = () => {
        fetch(`http://localhost:8081/gifts`, {
            method: 'GET'
        }).then(r => r.json())
          .then(rArr => setGifts(rArr))
      }

    const deleteItems = () => {
        fetch(`http://localhost:8081/gifts/${userId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'token'
            })
        }).then(() => fetchGifts())
    }


    return (
        <div className="cardDiv">
            <Row>
                <Col xs="7">
                <Card body inverse style={{backgroundColor: '#333', borderColor: '#333', opacity:'0.8', borderRadius:'75px', fontFamily:'Roboto'}}>
                    <CardBody body className="text-center">
                    <CardTitle tag='h6'>Gift Name: {name}</CardTitle>
                    <br />
                    <CardSubtitle tag="h6">Description: {description}</CardSubtitle>
                    <br />
                    <CardSubtitle tag="h6">Date: {date}</CardSubtitle>
                    <br />
                    <CardText tag="h6">Purchased: {purchased}</CardText>
                    <br />
                    <CardSubtitle tag="h6">Person: {person}</CardSubtitle>
                    <br />
                    <CardSubtitle tag="h6">From: {person}</CardSubtitle>
                    <br />
                    <CardSubtitle tag="h6">Owner: {person}</CardSubtitle>
                    <br />
                    <CardSubtitle tag="h6">Price: {person}</CardSubtitle>
                    <br />
                    {owner ===  userId ? <Button color= "danger" id='deleteReview' onClick={e =>
                    window.confirm("Are you sure you wish to delete this item?") && deleteItems()} type='button'>Delete Review</Button>  : <div></div>}
                    <br />
                    <br />
                    {owner ===  userId ? <GiftEdit fetchGifts={fetchGifts}  /> : <div></div>}
                    </CardBody>
                </Card>
            </Col>
            </Row>
            <br />
        </div>
    )
}

export default ItemsTable

//autofill with today's date