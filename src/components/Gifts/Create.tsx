import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Alert, CardBody} from 'reactstrap';
import  '../Gifts/create.css'
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

interface sessionToken {
    sessionToken: string;
}
//make this like items class
const GiftsCreate: React.FC<GiftCreateProp> = () => {

    const [giftName, setGiftName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [purchased, setPurchased] = useState('')
    const [person, setPerson] = useState('')
    const [from, setFrom] = useState('')
    const [owner, setOwner] = useState('')
    const [price, setPrice] = useState('')
    const [sessionToken, setSessionToken] = useState('');
    const history = useHistory()
    const [gifts, setGifts] = useState('')

    const resetForm = (e:any) => {
        setGiftName('')
        setDescription('')
        setDate('')
        setPurchased('')
        setPerson('')
        setFrom('')
        setOwner('')
        setPrice('')
    }

    const fetchGifts = () => {
        fetch(`http://localhost:8081/gifts`, {
            method: 'GET'
        }).then(r => r.json())
          .then(rArr => setGifts(rArr))
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
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjEwMDU5MjU1LCJleHAiOjE2MTAxNDU2NTV9.HBaRk9xH7aT1evT8Ed_O4CDSFKo1UltCTOyvD19u9-w'
            },
            // figure out how to get dynamic sessionToken
            body: JSON.stringify(body)
        }).then(r => r.json())
        .then(rObj => {
            console.log(rObj)
            resetForm('null')
            history.push('/')
            fetchGifts()
        })
    }

    // let addGiftEntry = document.getElementById('submitGift')?.addEventListener("click", (rObj) => {
    //     let giftName = document.getElementById('giftName');
    //     let description = document.getElementById('description');
    //     let date = document.getElementById('date');
    //     let purchased = document.getElementById('purchased');
    //     let person = document.getElementById('person');
    //     let from = document.getElementById('from');
    //     let owner = document.getElementById('owner');
    //     let price = document.getElementById('price');
    // })

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
                <Button color='success' style={{marginLeft: '15px'}} id="submitGift" onClick={handleSubmit} type="submit" >Submit Gift!</Button>
                {/* <Alert color="success">Gift submitted!</Alert> */}
            </form>
            <br />
            {/* {fetchGifts} */}
            {/* <GiftsList
            name={giftName}
            description={description} 
            date={date}
            purchased={purchased}
            person={person}
            from={from}
            owner={owner}
            price={price} 
           sessionToken={sessionToken}
             /> */}
        </div>
        
    )
}

export default GiftsCreate

//make this a modal? 
//notes entry
//alert when gift submitted?
//styling for input fields.