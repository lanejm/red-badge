import React from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import NavFile from './components/Navbar/Navbar';
import GiftsCreate from './components/Gifts/Create';
// import GiftsList from './components/Gifts/List';
import Search from './components/Gifts/Search';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import ItemsTable from './components/Gifts/Items';
import Logout from './components/Navbar/Logout/Logout';


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
  setIsLoggedIn: (e: any) => void;
  showCreate: boolean;
  setShowCreate: (e: any) => void;
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
      },
      setIsLoggedIn: (e) => {
        this.setState({
          isLoggedIn: e
        })
      },
      showCreate: false,
      setShowCreate: (e) => {
        this.setState({
          showCreate: e
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
    if (localStorage.getItem('token')) {
      this.setState({
        isLoggedIn: true
      })
    }
  }

  clearToken() {
    this.setState({
      isLoggedIn: false
    })
    console.log("test of clear token")
    localStorage.clear()
  }

  updateToken = (newToken: string, id: any) => {
    this.setState({ sessionToken: newToken, userId: id, isLoggedIn: true })
    localStorage.setItem('id', id)
    localStorage.setItem('token', newToken)
  }
  fetchGifts = () => {
    fetch(`http://localhost:8081/gifts/${localStorage.getItem('id')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.sessionToken
      }
    }).then(r => r.json())
      .then(rArr => {
        this.setState({
          setGifts: rArr
        })
        console.log(this.state.setGifts)
      })

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
          <Switch>
            <NavFile
              clearToken={this.state.clearToken}
              isLoggedIn={this.state.isLoggedIn}
              setShowCreate={this.state.setShowCreate}
            />
            {/* <Logout 
              clearToken={this.state.clearToken}/> */}
            {/* <Route exact path="/create"> */}

            {/* </Route> */}
          </Switch>
          <GiftsCreate
            fetchGifts={this.fetchGifts}
            showCreate={this.state.showCreate}
            setShowCreate={this.state.setShowCreate}
            giftName={this.state.giftName}
            description={this.state.description}
            date={this.state.date}
            purchased={this.state.purchased}
            person={this.state.person}
            from={this.state.from}
            owner={this.state.owner}
            price={this.state.price}
            sessionToken={this.state.sessionToken} />
          {/* <Auth updateToken={this.updateToken} />  */}
          {this.state.isLoggedIn === false ? <Auth
            setIsLoggedIn={this.state.setIsLoggedIn}
            updateToken={this.updateToken} /> : null}
          {/* <Button onClick={() => { this.setState({ isLoggedIn: true }) }}>Test</Button> */}
          {this.state.isLoggedIn ?
            <ItemsTable
              fetchGifts={this.fetchGifts}
              setGifts={this.state.setGifts}
              isLoggedIn={this.state.isLoggedIn}
              giftName={this.state.giftName}
              owner={this.state.owner}
              sessionToken={this.state.sessionToken}
              userId={this.state.userId} />
            : null
          }
          <Button id='search' onClick={this.handleSearch}>Search</Button>
          {/* <Search /> */}

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