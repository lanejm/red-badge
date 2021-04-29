import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../App.css'
import APIURL from '../../helpers/environment';

interface GiftCreateProp {
    giftName: string;
    description: string;
    date: string;
    purchased: string;
    person: string;
    from: string;
    owner: string;
    price: string;
    sessionToken: string;
    showCreate: boolean;
    setShowCreate: (e:any) => void;
    fetchGifts: () => void;

}

interface GiftCreateState {
    giftName: string;
    description: string;
    date: string;
    purchased: string;
    person: string;
    from: string;
    owner: string;
    price: string;
    setGifts: [];
    userId: string;
    modal: boolean;
}

class GiftsCreate extends React.Component<GiftCreateProp, GiftCreateState> {
    constructor(props: GiftCreateProp) {
        super(props)
        this.state = {
            giftName: '',
            description: '',
            date: '',
            purchased: '',
            person: '',
            from: '',
            owner: '',
            price: '',
            userId: '',
            setGifts: [],
            modal: false,
        }
        this.clearInput = this.clearInput.bind(this);

    }

    handleSubmit = () => {
        const body = {
            giftName: this.state.giftName,
            description: this.state.description,
            date: this.state.date,
            purchased: this.state.purchased,
            person: this.state.person,
            from: this.state.from,
            price: this.state.price,
        }
        fetch(`${APIURL}/gifts/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') || ''
            },
            body: JSON.stringify(body)
        }).then(r => r.json())
            .then(rObj => {
                console.log(rObj)
                this.props.fetchGifts()
                this.props.setShowCreate(false)
                alert('Gift Added!')
            })
    
    }
    clearInput() {
        this.setState({ 
            giftName: '',
            description: '',
            date: '',
            purchased: '',
            person: '',
            from: '',
            owner: '',
            price: ''
        });
    }

    toggle = () => {
        this.props.setShowCreate(false)
       
    }
    handleChange = (e:any) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
                <Modal id="modalWindow" isOpen={this.props.showCreate} toggle={this.toggle} >
                    <ModalHeader id="createGiftText" style={{backgroundColor: "rgb(64, 173, 206)",}}>Create Gift</ModalHeader>
                    <ModalBody>
                        <form id='createGift' className='createGift'>
                            <label htmlFor='giftName'>Gift Name: </label>
                            <input name='giftName' placeholder='Ex: Necktie' id='giftName' value={this.state.giftName} onChange={e => this.handleChange(e)} required />
                            <br />
                            <label htmlFor='description'>Description: </label>
                            <input name='description' placeholder='Write a brief description' id='description' value={this.state.description} onChange={e => this.handleChange(e)} />
                            <br />
                            <label htmlFor='date'>Date: </label>
                            <input name='date' placeholder='Ex: 12/25/2020' id='date' value={this.state.date} onChange={e => this.handleChange(e)} required />
                            <br />
                            <label htmlFor='purchased'>Purchased: </label>
                            <input name='purchased' placeholder='Where was this purchased?' id='purchased' value={this.state.purchased} onChange={e => this.handleChange(e)} />
                            <br />
                            <label htmlFor='from'>From: </label>
                            <input name='from' placeholder='Who was this from?' id='from' value={this.state.from} onChange={e => this.handleChange(e)} required />
                            <br />
                            <label htmlFor='price'>Price: </label>
                            <input name='price' placeholder='Ex: $200' id='price' value={this.state.price} onChange={e => this.handleChange(e)} required />
                        </form>
                    </ModalBody>
                    <ModalFooter id="modalFooter" style={{backgroundColor: "rgb(64, 173, 206)"}}>
                        <Button id='clearForm' onChange={e => this.handleChange(e)} onClick={this.clearInput} style={{backgroundColor: 'rgb(236, 99, 30)'}}>Reset Gift Form</Button>
                        <Button color='success' id="submitGift" type="button" onClick={this.handleSubmit} style={{backgroundColor:"rgb(130, 217, 87)"}} >Submit Gift!</Button>
                    </ModalFooter>
                </Modal>
    
        )
    }

}

export default GiftsCreate
