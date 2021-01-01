import React, {useState, useEffect} from 'react';
import ItemsTable from './Items';


interface GiftsProps {
    name: string,
    description: string,
    date: string,
    purchased: string,
    person: string,
    from: string,
    owner: string,
    price: string,
    sessionToken: string,
}
const GiftsList: React.FC<GiftsProps> = () => {

    const [gifts, setGifts] = useState([])
    const [giftName, setGiftName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [purchased, setPurchased] = useState('')
    const [person, setPerson] = useState('')
    const [from, setFrom] = useState('')
    const [owner, setOwner] = useState('')
    const [price, setPrice] = useState('')
    const [sessionToken, setSessionToken] = useState<string>('');
    

    useEffect(
        () => {
            fetchGifts()
        }, []
    )

    const fetchGifts = () => {
        fetch(`http://localhost:3000/gifts`, {
            method: 'GET'
        }).then(r => r.json())
          .then(rArr => setGifts(rArr))
    }


//not working currently
    return (
        <div className="listItem">
            {/* {props.gifts.map((revObj: string, i:any) => <ItemsTable fetchGifts={props.fetchGifts} rev={revObj} key={i} userId={userId} />)} */}
            <ItemsTable 
             giftName={giftName}
             description={description} 
             date={date}
             purchased={purchased}
             person={person}
             from={from}
             owner={owner}
             price={price} 
            sessionToken={sessionToken} />
        </div>
    )
}

export default GiftsList