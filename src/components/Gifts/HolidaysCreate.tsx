import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import APIURL from '../../helpers/environment';

interface HolidaysCreateProp {
    holiday: string,
    date: string,
    sessionToken: string,
    fetchHolidays: () => void,
    showHolidays: boolean,
    setShowHolidays: (e: any) => void,
    received: string,
}

interface HolidaysCreateState {
    holiday: string,
    date: string,
    modal: boolean,
    setHolidays: [],
    received: string,
}

class HolidaysCreate extends React.Component<HolidaysCreateProp, HolidaysCreateState> {
    constructor(props: HolidaysCreateProp) {
        super(props)
        this.state = {
            holiday: '',
            date: '',
            received: '',
            modal: false,
            setHolidays: [],
        }
        this.holidayClear = this.holidayClear.bind(this);
    }

    holidayHandleSubmit = () => {
        const body = {
            holiday: this.state.holiday,
            date: this.state.date,
            received: this.state.received
        }
        fetch(`${APIURL}/holidays/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify(body)
        }).then(r => r.json())
            .then(rObj => {
                console.log(rObj)
                this.props.fetchHolidays()
                this.props.setShowHolidays(false)
                alert('You just added a holiday!')
            })
            .catch(err => console.log(err))
    }

    holidayToggle = () => {
        this.props.setShowHolidays(false)
    }

    holidayHandleChange = (e: any) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    holidayClear() {
        this.setState({
            holiday: '',
            date: '',
            received: '',
        })
    }


    render() {
        return (
            <Modal id="modalWindow" isOpen={this.props.showHolidays} toggle={this.holidayToggle} >
                <ModalHeader id="addHolidayText" style={{ backgroundColor: "rgb(64, 173, 206)", }}>Add Holiday</ModalHeader>
                <ModalBody>
                    <form id='addHoliday' className='addHoliday'>
                        <label htmlFor='addHoliday'>Holiday: </label>
                        <input name='holiday' placeholder='Ex: Christmas' id='holiday' value={this.state.holiday} onChange={e => this.holidayHandleChange(e)} required />
                        <br />
                        <label htmlFor='date'>Date: </label>
                        <input name='date' placeholder='Ex: 12/25/2020' id='date' value={this.state.date} onChange={e => this.holidayHandleChange(e)} required />
                        <br />
                        <label htmlFor='items'>Gifts Received: </label>
                        <input name='received' placeholder='Ex: Computer, Monitor, etc.' id='items' value={this.state.received} onChange={e => this.holidayHandleChange(e)} required />
                    </form>
                </ModalBody>
                <ModalFooter id="modalFooter" style={{ backgroundColor: "rgb(64, 173, 206)" }}>
                    <Button id='clearForm' onChange={e => this.holidayHandleChange(e)} onClick={this.holidayClear} style={{ backgroundColor: 'rgb(236, 99, 30)' }}>Reset Gift Form</Button>
                    <Button id="submitGift" type="button" onClick={this.holidayHandleSubmit} style={{ backgroundColor: "rgb(130, 217, 87)", float: 'left' }} >Add Holiday!</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default HolidaysCreate

