import React from 'react';
import { Button} from 'reactstrap';

interface HolidayEditProps {
    holiday: string,
    date: string,
    received: string,
    sessionToken: string,
    itemId: any,
    fetchHolidays: () => void,
    isLoggedIn: boolean,
    setShowEdit: (e:any) => void,
}

interface HolidayEditState {
    holiday: string,
    date: string,
    received: string,
}

class HolidaysEdit extends React.Component<HolidayEditProps, HolidayEditState> {
    constructor(props: HolidayEditProps) {
        super(props)
        this.state = {
            holiday: '',
            date: '',
            received: '',
        }
    }

    handleHolidayEdit = (e: any) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    editHolidays = (e:any) => {
        e.preventDefault()
        const body ={
            holiday: this.state.holiday,
            date: this.state.date,
            received: this.state.received,
    
        }
        fetch(`http://localhost:8081/holidays/edit/${this.props.itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            },
            body: JSON.stringify(body)
        }).then(r =>r.json())
        .then(rObj => {
            console.log(rObj) 
        })
        .then(() => this.props.fetchHolidays())
        .catch(err => console.log(err))
        console.log('holiday edited')
    
    }

    editHolidaysForm() {
        return (
            <div>
                <form id='createHoliday' className='createHoliday'>
                    <label htmlFor='holidayName'>Holiday: </label>
                    <input name='holiday' placeholder='Ex: Labor Day' id='holiday' value={this.state.holiday} onChange={e => this.handleHolidayEdit(e)} required />
                    <br />
                    <label htmlFor='date'>Date: </label>
                    <input name='date' placeholder='Ex: 5/25/2020' id='date' value={this.state.date} onChange={e => this.handleHolidayEdit(e)} required />
                    <br />
                    <label htmlFor='received'>Items Received: </label>
                    <input name='received' placeholder='Ex: Computer, Gift Card, etc.' id='received' value={this.state.received} onChange={e => this.handleHolidayEdit(e)} required />
                    <Button id="submitEditGift" style={{marginTop: '10px', backgroundColor:"rgb(130, 217, 87)"}} onClick={this.editHolidays} type="button">Update Gift!</Button>
                </form>
            </div>
        )
    }


    render (){
        return (
            <div>
                {this.props.isLoggedIn ? 
                <div>
                    {this.editHolidaysForm()}
                </div>
                : null}
            </div>
        
        )
    }
}

export default HolidaysEdit