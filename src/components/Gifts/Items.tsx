import React, { Fragment, useState } from 'react';
import GiftEdit from './Edit';
import GiftsList from './List';
import {
    Card, CardHeader, CardColumns, CardFooter, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col, Container, CardDeck
} from 'reactstrap';
import '../Gifts/items.css';


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
            .then(rArr => {
                this.setState({
                    setGifts: rArr
                })
                console.log(this.state.setGifts)
            })

    }

    // fetchGifts2 = async() => {
    //     const response = await fetch(`http://localhost:8081/gifts`, {
    //         method: 'GET'
    //     })
    //     const json = await response.json()
    //     this.setState({
    //         setGifts: json
    //     })
    // }


    // deleteItems = () => {
    //     fetch(`http://localhost:8081/gifts/${this.props.userId}`, {
    //         method: 'DELETE',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': 'token'
    //         })
    //     }).then(() => this.fetchGifts())
    // }
    componentDidMount() {
        this.fetchGifts()
    }

    displayItems() {
        return (
            <div >
                <Row className="testing">{this.state.setGifts?.map((item: any, index) => {
                    console.log(item, index)
                    return (
                        <Col sm="4">
                        <Card className="cards" key={item.id}>
                            <CardHeader className="item-name"tag="h2">{item.giftName}</CardHeader>
                            <CardBody>
                                <CardSubtitle tag="h6" >{item.description}</CardSubtitle>
                                <CardSubtitle tag="h6" >{item.purchased}</CardSubtitle>
                                <CardSubtitle tag="h6" >{item.description}</CardSubtitle>
                                <CardSubtitle tag="h6" >{item.person}</CardSubtitle>
                                <CardSubtitle tag="h6" >{item.from}</CardSubtitle>
                                <CardSubtitle tag="h6" >{item.owner}</CardSubtitle>
                                <CardSubtitle tag="h6" >{item.price}</CardSubtitle>
                            </CardBody>
                            <CardFooter>Date Purchased: {item.date}</CardFooter>
                        </Card>
                        </Col>)
                })}
                </Row>
                <br />
            </div>
        )
}


render() {
    return (
        <div>
            {this.displayItems()}
        </div>

    )
}
}



export default ItemsTable;


//need to render after clicking create gift entry button
//style cards - alphabetical order?, hover, search

