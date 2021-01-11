import React from 'react';
// import GiftEdit from './Edit';
// import GiftsList from './List';
import {
    Card, CardHeader, CardFooter, CardBody,CardSubtitle, Row, Col, Button } from 'reactstrap';
import '../Gifts/items.css';


interface ItemsProp {
    userId: string;
    sessionToken: string;
    owner: string;
    giftName: string;
    isLoggedIn: boolean;
    // id: number 
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
    userId: string;
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
            setGifts: [],
        }
    }
    fetchGifts = () => {
        fetch(`http://localhost:8081/gifts/${localStorage.getItem('id')}`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                // 'Authorization': this.props.sessionToken
            }
        }).then(r => r.json())
            .then(rArr => {
                this.setState({
                    setGifts: rArr
                })
                // console.log(this.state.setGifts)
            })

    }

    deleteItems = (item: number) => {
        fetch(`http://localhost:8081/gifts/delete/${item}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
            
        }).then(() => this.fetchGifts())
        console.log('item deleted')
    }
    componentDidMount() {
        this.fetchGifts()
    }

    displayItems() {
        return (
            <div >
                <Row className="testing">{this.state.setGifts?.map((item: any, index) => {
                    
                    return (
                        <Col className="card-column" sm="3">
                        <Card className="cards" key={item.id}
                        onMouseEnter={() => {console.log(item.id)}}>
                            <CardHeader className="item-name"tag="h2">{item.giftName}</CardHeader>
                            <CardBody className="card-text">
                                <CardSubtitle tag="h6" >{item.description}</CardSubtitle>
                                <CardSubtitle tag="h6" >{item.purchased}</CardSubtitle>
                                <CardSubtitle tag="h6" >{item.description}</CardSubtitle>
                                <CardSubtitle tag="h6" >{item.person}</CardSubtitle>
                                <CardSubtitle tag="h6" >{item.from}</CardSubtitle>
                                <CardSubtitle tag="h6" >{item.owner}</CardSubtitle>
                                <CardSubtitle tag="h6" >{item.price}</CardSubtitle>
                            </CardBody>
                            <CardFooter>Date Purchased: {item.date}</CardFooter>
                            <br/>
                            {/* {this.props.owner === this.props.giftName ? */}
                            {true?
                            <Button color="danger" id="deleteReview" onClick={e => window.confirm("Are you sure you want to delete this item?") && this.deleteItems(item.id)}>{this.deleteItems}Delete</Button> : <div></div> }
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
        {this.props.isLoggedIn ?
        <div>
            {this.displayItems()}
            
        </div>
        : null}
        </div>
    )
}
}



export default ItemsTable;


//need to render after clicking create gift entry button
//style cards - alphabetical order?, hover, search

//delete not deleting on front end. 

