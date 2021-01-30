import React from 'react';
import GiftEdit from './Edit';
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
    deleteItems: (e: any) => void;

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
    itemId: number;
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
            itemId: 0,

        }
    }

    componentDidMount() {
        this.props.fetchGifts()
    }
    toggleEdit = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }


    displayItems() {
        return (
            <div>
                <Row className="testing">{this.props.setGifts?.map((item: any, index: any) => {
                    <br />
                    
                    return (
                        <Col className="col-sm-3">
                            <br />
                            <Card className="cards" key={item.id}
                                onMouseEnter={() => { this.setState({ itemId: item.id }) }}>
                                <CardHeader className="item-name" tag="h2">{item.giftName}</CardHeader>
                                <CardBody className="card-text">
                                    <CardSubtitle tag="h6" >From: {item.from}</CardSubtitle>
                                    <CardSubtitle tag="h6" >Description: {item.description}</CardSubtitle>
                                    <CardSubtitle tag="h6" >Purchased: {item.purchased}</CardSubtitle>
                                    <CardSubtitle tag="h6" >Cost: {item.price}</CardSubtitle>
                                </CardBody>
                                <CardFooter>Date Purchased: {item.date}</CardFooter>
                                <ButtonToggle id="editGift" onClick={this.toggleEdit}>Edit Gift </ButtonToggle>
                                <Collapse isOpen={!this.state.collapsed && this.state.itemId === item.id} >
                                    <GiftEdit itemId={item.id} key={item.id}
                                        fetchGifts={this.props.fetchGifts}
                                        sessionToken={this.props.sessionToken}
                                        setShowEdit={this.props.setShowEdit}
                                        showEdit={this.state.showEdit}
                                        isLoggedIn={this.props.isLoggedIn}
                                        giftName={this.props.giftName}
                                        description={this.props.description}
                                        date={this.props.date}
                                        purchased={this.props.purchased}
                                        from={this.props.from}
                                        price={this.props.price}>
                                    </GiftEdit>
                                </Collapse>
                                {true ?
                                    <Button id="deleteGift" onClick={e => window.confirm("Are you sure you want to delete this item?") && this.props.deleteItems(item.id)}>{this.props.deleteItems}Delete</Button> : <div></div>}
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



