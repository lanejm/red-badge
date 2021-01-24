import React from 'react';
import { Button} from 'reactstrap';

interface EditProps {
    giftName: string,
    description: string,
    date: string,
    purchased: string,
    person: string,
    from: string,
    price: string
    isLoggedIn: boolean;
    showEdit: boolean;
    setShowEdit: (e:any) => void;
    sessionToken: string;
    fetchGifts: () => void;
    itemId: any;
}

interface EditState {
    giftName: string,
    description: string,
    date: string,
    purchased: string,
    person: string,
    from: string,
    price: string,
    showEdit: boolean,
    collapsed: boolean,
    sessionToken: string;
}

class GiftEdit extends React.Component<EditProps, EditState> {
    constructor(props: EditProps) {
        super(props)
        this.state = {
            giftName: '',
            description: '',
            date: '',
            purchased: '',
            person: '',
            from: '',
            price: '',
            showEdit: true,
            collapsed: true,
            sessionToken: ''
        }
    }

    handleEdit = (e: any) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    toggleEdit = () => {
        this.setState({ collapsed: !this.state.collapsed })
        // this.props.setShowEdit(true)
    }

    editItems = (e:any) => {
        //when green update button is clicked, this fires. Not updating though. Need to pull id from gift, not user? 
        e.preventDefault()
        const body ={
            giftName: this.state.giftName,
            description: this.state.description,
            date: this.state.date,
            purchased: this.state.purchased,
            person: this.state.person,
            from: this.state.from,
            price: this.state.price
        }
        fetch(`http://localhost:8081/gifts/edit/${this.props.itemId}`, {
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
        .then(() => this.props.fetchGifts())
        .catch(err => console.log(err))
        console.log('item edited')
    
    }

    editItemsForm() {
        return (
            <div>
                {/* <Button isOpen={this.props.showEdit} onClick={this.toggleEdit}></Button> */}
                <form id='createGift' className='createGift'>
                    <label htmlFor='giftName'>Gift Name: </label>
                    <input name='giftName' placeholder='Ex: Necktie' id='giftName' value={this.state.giftName} onChange={e => this.handleEdit(e)} required />
                    <br />
                    <label htmlFor='description'>Description: </label>
                    <input name='description' placeholder='Write a brief description' id='description' value={this.state.description} onChange={e => this.handleEdit(e)} />
                    <br />
                    <label htmlFor='date'>Date: </label>
                    <input name='date' placeholder='Ex: 12/25/2020' id='date' value={this.state.date} onChange={e => this.handleEdit(e)} required />
                    <br />
                    <label htmlFor='purchased'>Purchased: </label>
                    <input name='purchased' placeholder='Where was this purchased?' id='purchased' value={this.state.purchased} onChange={e => this.handleEdit(e)} />
                    <br />
                    <label htmlFor='person'>Person: </label>
                    <input name='person' placeholder='Who was this for?' id='person' value={this.state.person} onChange={e => this.handleEdit(e)} required />
                    <br />
                    <label htmlFor='from'>From: </label>
                    <input name='from' placeholder='Who was this from?' id='from' value={this.state.from} onChange={e => this.handleEdit(e)} required />
                    <br />
                    <label htmlFor='price'>Price: </label>
                    <input name='price' placeholder='Ex: $200' id='price' value={this.state.price} onChange={e => this.handleEdit(e)} required />
                    <Button id="submitEditGift" style={{marginTop: '10px', backgroundColor:"rgb(130, 217, 87)"}} onClick={this.editItems} type="button">Update Gift!</Button>
                </form>
            </div>
        )
    }


    render() {
        return (
            <div>
                {this.props.isLoggedIn ?
                    <div>
                        {this.editItemsForm()}
                    </div>
                    : null}
            </div>
        )
    }
}


export default GiftEdit;


 // const [showEdit, setShowEdit] = useState(false);

    // const toggle = () => setShowEdit(!showEdit);


    // const resetForm = (e: any) => {
    //     setGiftName('')
    //     setDescription('')
    //     setDate('')
    //     setPurchased('')
    //     setPerson('')
    //     setFrom('')
    //     setOwner('')
    //     setPrice('')
    // }

    // const handleSubmit = (e: any) => {
    //     e.preventDefault()
    //     const body = {
    //         giftName: giftName || props.rev.giftName,
    //         description: description || props.rev.description,
    //         date: date || props.rev.date,
    //         purchased: purchased || props.rev.purchased,
    //         person: person || props.rev.person,
    //         from: from || props.rev.person,
    //         owner: owner || props.rev.owner,
    //         price: price || props.rev.price

    //     }

    //     fetch(`http://localhost:8081/gifts/${props.rev.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': props.sessionToken
    //         },
    //         body: JSON.stringify(body)
    //     }).then(r => r.json())
    //     .then(rObj => {
    //         console.log(rObj)
    //         resetForm(e)
    //         history.push('/')
    //         props.fetchGifts()
    //     })
    // }

    // return (
    //     <div>
    //         <Button color="warning" type="button" onClick={toggle}>Edit Gift</Button>
    //         {showEdit?
    //         <form id='createGift' className='createGift'>
    //             <label htmlFor='giftName'>Gift Name: </label>
    //             <input placeholder='Ex: Necktie'  id='giftName' value={giftName} onChange={e => setGiftName(e.target.value)} required/>
    //             <br />
    //             <label htmlFor='description'>Description: </label>
    //             <input placeholder='Write a brief description' id='description' value={description} onChange={e => setDescription(e.target.value)} />
    //             <br />
    //             <label htmlFor='date'>Date: </label>
    //             <input placeholder='Ex: 12/25/2020'  id='date' value={date} onChange={e => setDate(e.target.value)} required/>
    //             <br />
    //             <label htmlFor='purchased'>Purchased: </label>
    //             <input placeholder='Where was this purchased?' id='purchased' value={purchased} onChange={e => setPurchased(e.target.value)} />
    //             <br />
    //             <label htmlFor='person'>Person: </label>
    //             <input placeholder='Who was this for?' id='person' value={person} onChange={e => setPerson(e.target.value)} required/>
    //             <br />
    //             <label htmlFor='from'>From: </label>
    //             <input placeholder='Who was this from?' id='from' value={from} onChange={e => setFrom(e.target.value)} required/>
    //             <br />
    //             <label htmlFor='owner'>Owner: </label>
    //             <input placeholder='Onwer of List' id='owner' value={owner} onChange={e => setOwner(e.target.value)} required/>
    //             <br />
    //             <label htmlFor='price'>Price: </label>
    //             <input placeholder='Ex: $200' id='price' value={price} onChange={e => setPrice(e.target.value)} required/>
    //             <br />
    //             <Button color='secondary' style={{marginLeft: '20px'}} id='resetForm' onClick={resetForm} type='button'>Reset Gift Form</Button>
    //             <Button color='success' style={{marginLeft: '15px'}} id="submitReview" onClick={handleSubmit} type="submit" >Submit Gift!</Button>
    //             {/* <Alert color="success">Gift submitted!</Alert> */}
    //         </form>
    //         : null}
    //     </div>
    // )