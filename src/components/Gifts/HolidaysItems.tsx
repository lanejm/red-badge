import React from 'react';
import {
    Card, CardHeader, CardBody, CardSubtitle, Row, Col, Button, ButtonToggle, Collapse
} from 'reactstrap';
import HolidayEdit from './HolidayEdit';
import '../Gifts/items.css';

interface HolidayItemsProp {
    holiday: string,
    date: string,
    sessionToken: string,
    fetchHolidays: () => void,
    setHolidays: any,
    setShowEdit: (e: any) => void,
    isLoggedIn: boolean,
    deleteHolidays: (e: any) => void,
    received: string

}

interface HolidayItemsState {
    holiday: string,
    date: string,
    collapsed: boolean,
    itemId: number,
    received: string,
}

class HolidayItemsTable extends React.Component<HolidayItemsProp, HolidayItemsState> {
    constructor(props: HolidayItemsProp) {
        super(props)
        this.state = {
            holiday: '',
            date: '',
            collapsed: true,
            itemId: 0,
            received: ''
        }
    }

    componentDidMount() {
        this.props.fetchHolidays()
    }
    toggleHolidayEdit = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }

    displayHolidays() {
        return (
            <div>
                <Row className="holidays">{this.props.setHolidays?.map((item: any, index: any) => {
                    <br />

                    return (
                        <Col className="col-sm-3">
                            <br />
                            <Card className="cards" key={item.id}
                                onMouseEnter={() => { this.setState({ itemId: item.id }) }}>
                                <CardHeader className="item-name" tag="h2">{item.holiday}</CardHeader>
                                <CardBody className="card-text">
                                    <CardSubtitle tag="h6">Date: {item.date}</CardSubtitle>
                                    <CardSubtitle tag="h6">Items Received: {item.received}</CardSubtitle>
                                </CardBody>
                                <ButtonToggle id="editHoliday" onClick={this.toggleHolidayEdit}>Edit Holiday</ButtonToggle>
                                <Collapse isOpen={!this.state.collapsed && this.state.itemId === item.id}>
                                    <HolidayEdit itemId={item.id} key={item.id}
                                        fetchHolidays={this.props.fetchHolidays}
                                        sessionToken={this.props.sessionToken}
                                        setShowEdit={this.props.setShowEdit}
                                        isLoggedIn={this.props.isLoggedIn}
                                        holiday={this.props.holiday}
                                        date={this.props.date}
                                        received={this.props.received}>
                                        </HolidayEdit>
                                </Collapse>
                                {true ?
                                    <Button id="deleteHoliday" onClick={e => window.confirm("Are you sure you want ot delete this holiday?") && this.props.deleteHolidays(item.id)}>
                                        {this.props.deleteHolidays} Delete
                                        </Button> : <div></div>
                                }
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
                        {this.displayHolidays()}
                    </div>
                    : null}
            </div>
        )
    }
}


export default HolidayItemsTable

