import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import NavFile from './components/Navbar/Navbar';
import GiftsCreate from './components/Gifts/Create';
// import GiftsList from './components/Gifts/List';
import Search from './components/Gifts/Search';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from 'reactstrap';
import ItemsTable from './components/Gifts/Items';



interface State {
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
  updateToken: string;
  isLoggedIn: boolean;
  clearToken: any;
}

// const clearToken = () => {
//   userId('')
//   sessionToken('')
//   localStorage.clear()
// }

// const updateToken = (newToken: string, id: any) => {
//   sessionToken(newToken)
//   userId(id)
//   localStorage.setItem('id', id)
//   localStorage.setItem('token', newToken)
// }


class App extends React.Component<{}, State> {
  constructor(props: {}) {
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
      sessionToken: '',
      userId: 'userId',
      setGifts: [],
      isLoggedIn: false,
      updateToken: '',
      clearToken: () => {
        this.setState({
          isLoggedIn: false
        })
      }
    }
  }

  handleSearch = () => {
    fetch(`http://localhost:8081/gifts/${this.state.giftName}`, {
      method: 'GET',
    })
      .then(r => r.json())
      .then(rArr => {
        this.setState({
          setGifts: rArr
        })
      })
  }

  componentDidMount() {
    if (this.state.sessionToken.length > 0) {
      this.setState({
        // isLoggedIn: true
      })
      localStorage.clear()
    }
  }

  // clearToken() {
  //   this.setState({
  //     isLoggedIn:false
  //   })
  //   console.log("test of clear token")
  //   localStorage.clear()
  // }

  updateToken = (newToken: string, id: any) => {
    this.setState({sessionToken: newToken, userId: id, isLoggedIn: true})
    localStorage.setItem('id', id)
    localStorage.setItem('token', newToken)
  }


  // this.componentDidMount() {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     this.state.sessionToken
  //     // setUserId(parseInt(localStorage.getItem('id')))  //parseInt makes user id an integer
  //   }
  // handleSearch() //outside of if statement so code is running
  render() {
    return (
      <div className='App' >
        <Router>
          <NavFile clearToken={this.state.clearToken} />
          {!this.state.isLoggedIn ? <Auth updateToken={this.updateToken} /> :
            <Switch>
              <Route path="/create">
                <GiftsCreate
                  giftName={this.state.giftName}
                  description={this.state.description}
                  date={this.state.date}
                  purchased={this.state.purchased}
                  person={this.state.person}
                  from={this.state.from}
                  owner={this.state.owner}
                  price={this.state.price}
                  sessionToken={this.state.sessionToken} />
              </Route>
              <Route path="/">

              </Route>
            </Switch>}
            <Button onClick={()=>{this.setState({isLoggedIn: true})}}></Button>
          {this.state.isLoggedIn ? 
            <ItemsTable
              isLoggedIn={this.state.isLoggedIn}
              giftName={this.state.giftName}
              owner={this.state.owner}
              sessionToken={this.state.sessionToken}
              userId={this.state.userId} />
              : null
          }
          <Button id='search' onClick={this.handleSearch}>Search</Button>
          <Search />

          <br />
          {/* <GiftsList userId={userId} fetchGifts={fetchGifts} gifts={gifts} /> */}
        </Router>
      </div>
    )
  }
}

export default App;


//add in "reviews.js" file
//search not working. 