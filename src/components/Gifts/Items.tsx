import React, { useState} from 'react';
import GiftEdit from './Edit';
import GiftsList from './List';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
  } from 'reactstrap';


type ItemsProp = {
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

class ItemsTable extends React.Component<ItemsProp> {
    constructor(props:ItemsProp){
        super (props)
    }

    state = {
        giftName: 'gift',
        description: 'description',
        date: 'date',
        purchased: 'purchased',
        person: 'person',
        from: 'from',
        owner: 'owner',
        price: 'price',
        userId: 'userId',
        setGifts: []
    }
    
    render () {

    const fetchGifts = () => {
        fetch(`http://localhost:8081/gifts`, {
            method: 'GET'
        }).then(r => r.json())
          .then(rArr => this.setState(rArr))
      }

    const deleteItems = () => {
        fetch(`http://localhost:8081/gifts/${this.state.userId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'token'
            })
        }).then(() => fetchGifts())
    }
    return (
        <div>
            <button onClick={fetchGifts}>Show my gifts!</button>
        </div>
    )
    }}

export default ItemsTable;



