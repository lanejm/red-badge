import React, { useState } from 'react';
import GiftEdit from './Edit';
import GiftsList from './List';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';


interface ItemsProp {
    userId: string
}

interface ItemsState {
    giftName: string;
    description: string;
    date: string;
    purchased: string;
    person: string;
    from: string;
    owner: string;
    price: string;
    sessionToken: string;
    setGifts: [];
    userId: string
}

class ItemsTable extends React.Component<ItemsProp, ItemsState> {
    constructor(props: ItemsProp) {
        super(props)
        this.state = {
            giftName: 'gift',
            description: 'description',
            date: 'date',
            purchased: 'purchased',
            person: 'person',
            from: 'from',
            owner: 'owner',
            price: 'price',
            sessionToken: 'sessionToken',
            userId: 'userId',
            setGifts: []
        }
    }
    fetchGifts = () => {
        fetch(`http://localhost:8081/gifts`, {
            method: 'GET'
        }).then(r => r.json())
            .then(rArr => this.setState({
                setGifts: rArr
            }))
    }

    deleteItems = () => {
        fetch(`http://localhost:8081/gifts/${this.props.userId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'token'
            })
        }).then(() => this.fetchGifts())
    }
    displayItems = () => {
        return this.state.setGifts?.map((item, index) => {
            console.log(item, index)
            return (
                <div></div>
            )
        }) 

    
    }
    render() {
        return (
            <div>
                <button onClick={this.fetchGifts}>Show my gifts!</button>
                <p>
                    {this.fetchGifts}
                    {this.state.description} 
                    {/* showing as text only */}
                </p>
            </div>
        )
    }
}



export default ItemsTable;



