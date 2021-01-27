import React from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import NavFile from './components/Navbar/Navbar';
import GiftsCreate from './components/Gifts/Create';
// import GiftsList from './components/Gifts/List';
import Search from './components/Gifts/Search';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import ItemsTable from './components/Gifts/Items';
import HolidaysCreate from './components/Gifts/HolidaysCreate';
// import Logout from './components/Navbar/Logout/Logout';
// import GiftEdit from './components/Gifts/Edit';


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
  setHolidays: [];
  userId: string;
  updateToken: string;
  isLoggedIn: boolean;
  // clearToken: any;
  setIsLoggedIn: (e: any) => void;
  showCreate: boolean;
  setShowCreate: (e: any) => void;
  setShowEdit: (e: any) => void;
  showEdit: boolean;
  holidays: string;
  showHoliday: boolean;
  setShowHoliday: (e: any) => void;
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
      holidays: '',
      sessionToken: '',
      userId: '',
      setGifts: [],
      isLoggedIn: false,
      updateToken: '',
      setHolidays: [],
      // clearToken: () => {
      //   this.setState({
      //     isLoggedIn: false,
      //     sessionToken: '',
      //     userId: ''
      //   })
      // },
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
      },
      showHoliday: false,
      setShowHoliday: (e) => {
        this.setState({
          showHoliday: e
        })
      },
    }
    this.clearToken = this.clearToken.bind(this)
    this.fetchGifts = this.fetchGifts.bind(this)
    this.fetchHolidays = this.fetchHolidays.bind(this)
  }

  handleSearch = (e: any) => {
    this.setState({
      setGifts: e
    })
  }

  // handleSearch = (e: any) => {
  //   fetch(`http://localhost:8081/gifts/name/${this.state.giftName}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': this.state.sessionToken
  //     }
  //   })
  //     .then(r => r.json())
  //     .then(rArr => {
  //       this.setState({
  //         setGifts: rArr
  //       })
  //     }).catch(err => console.log(err))
  // }
  handleSearchChange = (e: any) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  deleteItems = (item: number) => {
    fetch(`http://localhost:8081/gifts/delete/${item}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.state.sessionToken
      })

    }).then(() => this.fetchGifts())
    console.log('item deleted')
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
      isLoggedIn: false,
      sessionToken: '',
      userId: ''
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
  fetchHolidays = () => {
    fetch(`http://localhost:8081/holidays/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.sessionToken
      }
    }).then(r => r.json())
      .then(rArr => {
        this.setState({
          setHolidays: rArr
        })
        console.log(this.state.setHolidays)
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
      <div className='App' style={{ backgroundColor: 'black rgb(20, 20, 20)', height: '100%' }}>
        <Router>
          <Switch>
            <NavFile
              clearToken={this.clearToken}
              isLoggedIn={this.state.isLoggedIn}
              setShowCreate={this.state.setShowCreate}
              setHolidayCreate={this.state.setShowHoliday}
            />

            {/* <Logout 
              clearToken={this.state.clearToken}/> */}
            {/* <Route exact path="/create"> */}

            {/* </Route> */}
          </Switch>
          <HolidaysCreate
            showHoliday={this.state.showHoliday}
            setShowHoliday={this.state.setShowHoliday}
            fetchHolidays={this.fetchHolidays}
            holiday={this.state.holidays}
            date={this.state.date}
            sessionToken={this.state.sessionToken} />
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
              <Search
                fetchGifts={this.fetchGifts}
                handleSearch={this.handleSearch}
                setGifts={this.state.setGifts}
                giftName={this.state.giftName} />


              <h1 className="mainText">Here are your gifts!</h1>
              <ItemsTable
                deleteItems={this.deleteItems}
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


//add holidays table
//styling
//mobile friendly
//admin functionality - be able to delete user
//login and password verification logic & user verification
//readme file
//db associations
//display holidays
//clean up code


//heroku deployment