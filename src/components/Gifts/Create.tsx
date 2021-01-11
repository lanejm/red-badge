import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../Gifts/create.css'
import GiftsList from './List';

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
    sessionToken: string;
    setGifts: [];
    userId: string;
    modal: boolean;
    toggle: boolean
}

interface ModalProps {
    isShown: boolean;
    hide: () => void;
    modalContent: JSX.Element;
    headerText: string;
}

//make this like items class
class GiftsCreate extends React.Component<GiftCreateProp, GiftCreateState> {
    constructor(props: GiftCreateProp) {
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
            modal: false,
            toggle: true
        }
       
    }
    // resetForm() {
    //     this.setState = {
    //         giftName: (null),
    //         description: ('null')
    //     }
    // }

    fetchGifts = () => {
        fetch(`http://localhost:8081/gifts`, {
            method: 'GET'
        }).then(r => r.json())
            .then(rArr => {
                this.setState({
                    setGifts: rArr
                })
            })
    }
    handleSubmit = (e: GiftCreateProp) => {
        const body = {
            giftName: 'Gift',
            description: 'description',
            date: 'date',
            purchased: 'purchased',
            person: 'person',
            from: 'from',
            owner: 'owner',
            price: 'price',
            sessionToken: 'sessionToken',
        }
        fetch('http://localhost:8081/gifts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            },
            // figure out how to get dynamic sessionToken
            body: JSON.stringify(body)
        }).then(r => r.json())
            .then(rObj => {
                console.log(rObj)
                // this.resetForm()
                // history.push('/')
                this.fetchGifts()
            })
    }

   componentDidMount() {
       ontoggle = () => (!Modal)
   }


    render() {
        return (
            <div>
                <Button color="success" onclick={ontoggle}>Launch Modal</Button>
                <Modal isOpen={this.state.modal} onclick={this.state.toggle} >
                    <ModalHeader MouseEvent={this.state.toggle}>Create Gift</ModalHeader>
                    <ModalBody>
                        <form id='createGift' className='createGift'>
                            <label htmlFor='giftName'>Gift Name: </label>
                            <input placeholder='Ex: Necktie' id='giftName' value={this.props.giftName} onChange={e => this.state.giftName} required />
                            <br />
                            <label htmlFor='description'>Description: </label>
                            <input placeholder='Write a brief description' id='description' value={this.props.description} onChange={e => this.state.description} />
                            <br />
                            <label htmlFor='date'>Date: </label>
                            <input placeholder='Ex: 12/25/2020' id='date' value={this.props.date} onChange={e => this.state.date} required />
                            <br />
                            <label htmlFor='purchased'>Purchased: </label>
                            <input placeholder='Where was this purchased?' id='purchased' value={this.props.purchased} onChange={e => this.state.purchased} />
                            <br />
                            <label htmlFor='person'>Person: </label>
                            <input placeholder='Who was this for?' id='person' value={this.props.person} onChange={e => this.state.person} required />
                            <br />
                            <label htmlFor='from'>From: </label>
                            <input placeholder='Who was this from?' id='from' value={this.props.from} onChange={e => this.state.from} required />
                            <br />
                            <label htmlFor='owner'>Owner: </label>
                            <input placeholder='Onwer of List' id='owner' value={this.props.owner} onChange={e => this.state.owner} required />
                            <br />
                            <label htmlFor='price'>Price: </label>
                            <input placeholder='Ex: $200' id='price' value={this.props.price} onChange={e => this.state.price} required />
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='secondary' style={{ marginLeft: '20px' }} id='resetForm'  type='button'>Reset Gift Form</Button>
                        <Button color='success' style={{ marginLeft: '15px' }} id="submitGift" type="submit" >Submit Gift!</Button>
                    </ModalFooter>
                </Modal>
            </div>
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