import React, {useState, useEffect} from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import NavFile from './components/Navbar/Navbar';
import GiftsCreate from './components/Gifts/Create';
import GiftsList from './components/Gifts/List';
// import GiftsSearch from './components/Gifts/Search';
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import {Button} from 'reactstrap';
import ItemsTable from './components/Gifts/Items';

function App() {

    const [sessionToken, setSessionToken] = useState<string>('');
    const [userId, setUserId] = useState<number | undefined>(undefined);
    const [gifts, setGifts] = useState([])
    const [rev, setRev] = useState([])
    const [name, setName] = useState('')
    const [giftName, setGiftName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [purchased, setPurchased] = useState('')
    const [person, setPerson] = useState('')
    const [from, setFrom] = useState('')
    const [owner, setOwner] = useState('')
    const [price, setPrice] = useState('')

    
    const handleSearch = () => {
      fetch(`http://localhost:8081/gifts/${name}`, {
          method: 'GET',
      }).then(r => r.json())
        .then(rArr => setRev(rArr))
  }

    
    const fetchGifts = () => {
      fetch(`http://localhost:8081/gifts`, {
          method: 'GET'
      }).then(r => r.json())
        .then(rArr => setGifts(rArr))
    } //showing in console, not displaying to DOM.

    useEffect(
      () => {
        const token = localStorage.getItem('token')
        if (token) {
          setSessionToken(token)
          // setUserId(parseInt(localStorage.getItem('id')))  //parseInt makes user id an integer
        }
        handleSearch()
      }, []
    )

    
    const updateToken = (newToken: any, id: any) => {
      setSessionToken(newToken)
      setUserId(id)
      localStorage.setItem('id', id)
      localStorage.setItem('token', newToken)
    }
  
    const clearToken = () => {
    setUserId(undefined)
    setSessionToken('')
    localStorage.clear()
  }

  return (
    <div className='App'>
            <Router>
              <NavFile clearToken={clearToken} />
              { !sessionToken ? <Auth updateToken={updateToken} /> :
              <Switch> 
                <Route path="/create"> 
                  <GiftsCreate 
                   giftName={giftName}
                   description={description} 
                   date={date}
                   purchased={purchased}
                   person={person}
                   from={from}
                   owner={owner}
                   price={price} 
                  sessionToken={sessionToken} ></GiftsCreate>
                </Route>
                <Route path="/">
                  <GiftsList 
                   name={giftName}
                   description={description} 
                   date={date}
                   purchased={purchased}
                   person={person}
                   from={from}
                   owner={owner}
                   price={price} 
                  sessionToken={sessionToken} 
                  {...fetchGifts} />
                </Route>
              </Switch> }
            <input placeholder='Search Gifts' 
            style={{borderRadius: '10px', marginLeft:'35vw', width:'200px', marginBottom:'20px', fontFamily:'Roboto'}} 
            id='name' onChange={e => setName(e.target.value)} />
            {/* <ItemsTable
            giftName={giftName}
             description={description} 
             date={date}
             purchased={purchased}
             person={person}
             from={from}
             owner={owner}
             price={price} 
            sessionToken={sessionToken} /> */}
            <Button id='search' style={{marginLeft: '44vw', fontFamily:'Roboto'}} onClick={handleSearch}>Search</Button>
            <br />
            {/* {name ? <GiftsSearch rev={rev} /> : 
            <GiftsList userId={userId} fetchReviews={fetchGifts} reviews={reviews} />} */}
            </Router>
          </div>
  );
}

export default App;


//add in "reviews.js" file