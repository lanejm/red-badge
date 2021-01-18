import React from 'react';
import GiftEdit from './Edit';
// import GiftsList from './List';
import {
    Card, CardHeader, CardFooter, CardBody, CardSubtitle, Row, Col, Button, ButtonToggle, Collapse
} from 'reactstrap';
import '../Gifts/items.css';


interface ItemsProp {
    userId: string;
    sessionToken: string;
    owner: string;
    giftName: string
    description: string;
    date: string;
    purchased: string;
    person: string;
    from: string;
    price: string;
    isLoggedIn: boolean;
    fetchGifts: () => void;
    setGifts: any;
    setShowEdit: (e: any) => void;

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
    userId: string;
    showEdit: boolean;
    collapsed: boolean;
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
            showEdit: false,
            collapsed: true,

        }
    }


    deleteItems = (item: number) => {
        fetch(`http://localhost:8081/gifts/delete/${item}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })

        }).then(() => this.props.fetchGifts())
        console.log('item deleted')
    }

    componentDidMount() {
        this.props.fetchGifts()
    }
    toggleEdit = () => {
        this.setState({ collapsed: !this.state.collapsed })
        // this.props.setShowEdit(true)
    }



    displayItems() {
        return (
            <div >
                <Row className="testing">{this.props.setGifts?.map((item: any, index: any) => {

                    return (
                        <Col className="card-column" sm="3">
                            <Card className="cards" key={item.id}
                                onMouseEnter={() => { console.log(item.id) }}>
                                <CardHeader className="item-name" tag="h2">{item.giftName}</CardHeader>
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
                                <ButtonToggle color="warning" id="editGift" onClick={this.toggleEdit}>Edit Gift </ButtonToggle>
                                <Collapse isOpen={!this.state.collapsed} >
                                    <GiftEdit key={item.id}
                                        fetchGifts={this.props.fetchGifts}
                                        sessionToken={this.props.sessionToken}
                                        setShowEdit={this.props.setShowEdit}
                                        showEdit={this.state.showEdit}
                                        isLoggedIn={this.props.isLoggedIn}
                                        giftName={this.props.giftName}
                                        description={this.props.description}
                                        date={this.props.date}
                                        purchased={this.props.purchased}
                                        person={this.props.person}
                                        from={this.props.from}
                                        owner={this.props.owner}
                                        price={this.props.price}>
                                    </GiftEdit>
                                </Collapse>
                                {true ?
                                    <Button color="danger" id="deleteReview" onClick={e => window.confirm("Are you sure you want to delete this item?") && this.deleteItems(item.id)}>{this.deleteItems}Delete</Button> : <div></div>}
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

//edit toggle is showing showing on all cards with clicked.  Way to make this into just one? 

