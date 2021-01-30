import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../Gifts/create.css'
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
            // figure out how to get dynamic sessionToken
            body: JSON.stringify(body)
        }).then(r => r.json())
            .then(rObj => {
                console.log(rObj)
                // this.resetForm()
                // history.push('/')
                this.props.fetchGifts()
                this.props.setShowCreate(false)
                alert('Gift Added!')
            })
    
    }
    //this is clearing input when button is, but values are remaining from last entry
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

    // componentDidMount() {
    //     ontoggle = () => (!Modal)
    // }
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
    /* // return (
    //     <div>
            <form id='createGift' className='createGift'>
                <label htmlFor='giftName'>Gift Name: </label>
                <input placeholder='Ex: Necktie' id='giftName' value={this.giftName} onChange={e => this.state.giftName(e.target.value)} required />
                <br />
                <label htmlFor='description'>Description: </label>
                <input placeholder='Write a brief description' id='description' value={description} onChange={e => setDescription(e.target.value)} />
                <br />
                <label htmlFor='date'>Date: </label>
                <input placeholder='Ex: 12/25/2020' id='date' value={date} onChange={e => setDate(e.target.value)} required />
                <br />
                <label htmlFor='purchased'>Purchased: </label>
                <input placeholder='Where was this purchased?' id='purchased' value={purchased} onChange={e => setPurchased(e.target.value)} />
                <br />
                <label htmlFor='person'>Person: </label>
                <input placeholder='Who was this for?' id='person' value={person} onChange={e => setPerson(e.target.value)} required />
                <br />
                <label htmlFor='from'>From: </label>
                <input placeholder='Who was this from?' id='from' value={from} onChange={e => setFrom(e.target.value)} required />
                <br />
                <label htmlFor='owner'>Owner: </label>
                <input placeholder='Onwer of List' id='owner' value={owner} onChange={e => setOwner(e.target.value)} required />
                <br />
                <label htmlFor='price'>Price: </label>
                <input placeholder='Ex: $200' id='price' value={price} onChange={e => setPrice(e.target.value)} required />
    //             <br />
    //             <Button color='secondary' style={{ marginLeft: '20px' }} id='resetForm' onClick={this.resetForm} type='button'>Reset Gift Form</Button>
    //             <Button color='success' style={{ marginLeft: '15px' }} id="submitGift" onClick={this.handleSubmit} type="submit" >Submit Gift!</Button>
    //             {/* <Alert color="success">Gift submitted!</Alert> */
    /* //         </form> */
    /* //         <br />
    //     </div > */


}

export default GiftsCreate

//make this a modal? 
//notes entry
//alert when gift submitted?
//styling for input fields.