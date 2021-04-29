import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Button} from 'reactstrap';


const GiftEdit = (props: any) => {

    const [giftName, setGiftName] = useState(props.rev.giftName);
    const [description, setDescription] = useState(props.rev.description);
    const [date, setDate] = useState(props.rev.date);
    const [purchased, setPurchased] = useState(props.rev.purchased);
    const [person, setPerson] = useState(props.rev.person);
    const [from, setFrom] = useState(props.rev.from);
    const [owner, setOwner] = useState(props.rev.owner);
    const [price, setPrice] = useState(props.rev.price);
    const history = useHistory()

    const [showEdit, setShowEdit] = useState(false);

    const toggle = () => setShowEdit(!showEdit);


    const resetForm = (e: any) => {
        setGiftName('')
        setDescription('')
        setDate('')
        setPurchased('')
        setPerson('')
        setFrom('')
        setOwner('')
        setPrice('')
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const body = {
            giftName: giftName || props.rev.giftName,
            description: description || props.rev.description,
            date: date || props.rev.date,
            purchased: purchased || props.rev.purchased,
            person: person || props.rev.person,
            from: from || props.rev.person,
            owner: owner || props.rev.owner,
            price: price || props.rev.price

        }

        fetch(`http://localhost:8081/gifts/${props.rev.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            },
            body: JSON.stringify(body)
        }).then(r => r.json())
        .then(rObj => {
            console.log(rObj)
            resetForm(e)
            history.push('/')
            props.fetchGifts()
        })
    }

    return (
        <div>
            <Button color="warning" type="button" onClick={toggle}>Edit Gift</Button>
            {showEdit?
            <form id='createGift' className='createGift'>
                <label htmlFor='giftName'>Gift Name: </label>
                <input placeholder='Ex: Necktie'  id='giftName' value={giftName} onChange={e => setGiftName(e.target.value)} required/>
                <br />
                <label htmlFor='description'>Description: </label>
                <input placeholder='Write a brief description' id='description' value={description} onChange={e => setDescription(e.target.value)} />
                <br />
                <label htmlFor='date'>Date: </label>
                <input placeholder='Ex: 12/25/2020'  id='date' value={date} onChange={e => setDate(e.target.value)} required/>
                <br />
                <label htmlFor='purchased'>Purchased: </label>
                <input placeholder='Where was this purchased?' id='purchased' value={purchased} onChange={e => setPurchased(e.target.value)} />
                <br />
                <label htmlFor='person'>Person: </label>
                <input placeholder='Who was this for?' id='person' value={person} onChange={e => setPerson(e.target.value)} required/>
                <br />
                <label htmlFor='from'>From: </label>
                <input placeholder='Who was this from?' id='from' value={from} onChange={e => setFrom(e.target.value)} required/>
                <br />
                <label htmlFor='owner'>Owner: </label>
                <input placeholder='Onwer of List' id='owner' value={owner} onChange={e => setOwner(e.target.value)} required/>
                <br />
                <label htmlFor='price'>Price: </label>
                <input placeholder='Ex: $200' id='price' value={price} onChange={e => setPrice(e.target.value)} required/>
                <br />
                <Button color='secondary' style={{marginLeft: '20px'}} id='resetForm' onClick={resetForm} type='button'>Reset Gift Form</Button>
                <Button color='success' style={{marginLeft: '15px'}} id="submitReview" onClick={handleSubmit} type="submit" >Submit Gift!</Button>
            </form>
            : null}
        </div>
    )
}

export default GiftEdit;