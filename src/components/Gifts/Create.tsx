import React, {useState} from 'react';
import {Button} from 'reactstrap';
import  '../Gifts/create.css'


const GiftsCreate = (props: any) => {

    const [giftName, setGiftName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [purchased, setPurchased] = useState('')
    const [person, setPerson] = useState('')
    const [from, setFrom] = useState('')
    const [owner, setOwner] = useState('')
    const [price, setPrice] = useState('')

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
            name: giftName,
            description: description,
            date: date,
            purchased: purchased,
            person: person,
            from: from,
            owner: owner,
            price: price
        }
        fetch('http://localhost:8081/gifts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            },
            body: JSON.stringify(body)
        }).then(r => r.json())
        .then(rObj => {
            console.log(rObj)
            resetForm(null)
        })
    }

    return (
        <div>
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
            <br />
        </div>
    )
}

export default GiftsCreate
