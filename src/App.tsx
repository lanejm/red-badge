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
import GiftEdit from './components/Gifts/Edit';


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
  setShowEdit: (e: any) => void;
  showEdit: boolean;
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
      giftName: '',
      description: '',
      date: '',
      purchased: '',
      person: '',
      from: '',
      owner: '',
      price: '',
      sessionToken: '',
      userId: '',
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
      },
      showEdit: false,
      setShowEdit: (e) => {
        this.setState({
          showEdit: e
        })
      }
    }
  }

  handleSearch = (e: any) => {
    fetch(`http://localhost:8081/gifts/${this.state.giftName}`, {
      method: 'GET',
    })
      .then(r => r.json())
      .then(rArr => {
        this.setState({
          setGifts: rArr
        })
      }).catch(err => console.log(err))
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
      }).catch(err => console.log(err))

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
      <div className='App' style={{backgroundColor: 'blueviolet', height: '100%'}}>
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
          {/* <input placeholder='Ex: gift name' id="searchBar" value={this.state.giftName} onChange={e => this.handleSearch(e)}></input>
          <br />
          <Button id='search' onClick={this.handleSearch}>Search</Button> */}
          {this.state.isLoggedIn ?
            <React.Fragment>
            <Search giftName={this.state.giftName} />
                <input placeholder="Ex. Mackbook Pro" id="giftSearch" value={this.state.giftName} />
            <Button id="searchButton" onClick={this.handleSearch}>Search</Button>
            <ItemsTable
              setShowEdit={this.state.setShowEdit}
              description={this.state.description}
              date={this.state.date}
              purchased={this.state.purchased}
              from={this.state.from}
              price={this.state.price}
              person={this.state.person}
              fetchGifts={this.fetchGifts}
              setGifts={this.state.setGifts}
              isLoggedIn={this.state.isLoggedIn}
              giftName={this.state.giftName}
              owner={this.state.owner}
              sessionToken={this.state.sessionToken}
              userId={this.state.userId} />
            </React.Fragment>
            : null
          }
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
//add holidays table
//logout auto login problem
//styling