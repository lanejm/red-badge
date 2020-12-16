import React, {useState, useEffect} from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import NavFile from './components/Navbar/Navbar';
import GiftsCreate from './components/Gifts/Create';
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import {Button} from 'reactstrap';

function App() {

    const [sessionToken, setSessionToken] = useState(undefined);
    const [userId, setUserId] = useState(undefined);
    const [reviews, setReviews] = useState([])
    const [rev, setRev] = useState([])
    const [name, setName] = useState('')

    
    
    const updateToken = (newToken: any, id: any) => {
      setSessionToken(newToken)
      setUserId(id)
      localStorage.setItem('id', id)
      localStorage.setItem('token', newToken)
    }
  
    const clearToken = () => {
    setUserId(undefined)
    setSessionToken(undefined)
    localStorage.clear()
  }

  return (
    <div className='App'>
            <Router>
              <NavFile clearToken={clearToken} />
              { !sessionToken ? <Auth updateToken={updateToken} /> :
              <Switch> 
                <Route path="/create"> 
                  <GiftsCreate  sessionToken={sessionToken} />
                </Route>
                <Route path="/">
                  {/* <ReviewsList userId={userId} fetchReviews={fetchReviews} /> */}
                </Route>
              </Switch> }
            <input placeholder='Search Gifts' style={{borderRadius: '10px', marginLeft:'35vw', width:'200px', marginBottom:'20px', fontFamily:'Roboto'}} id='name' onChange={e => setName(e.target.value)} />
            {/* <Button id='search' style={{marginLeft: '44vw', fontFamily:'Roboto'}} onClick={handleSearch}>Search</Button>
            <br />
            {name ? <ReviewsSearch rev={rev} /> : <ReviewsList userId={userId} fetchReviews={fetchReviews} reviews={reviews} />} */}
            </Router>
          </div>
  );
}

export default App;
