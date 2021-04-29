import React from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import NavFile from './components/Navbar/Navbar';
import GiftsCreate from './components/Gifts/Create';
import Search from './components/Gifts/Search';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import ItemsTable from './components/Gifts/Items';
import HolidaysCreate from './components/Gifts/HolidaysCreate';
import HolidayItemsTable from './components/Gifts/HolidaysItems';
import APIURL from './helpers/environment';

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
  setIsLoggedIn: (e: any) => void;
  showCreate: boolean;
  setShowCreate: (e: any) => void;
  setShowEdit: (e: any) => void;
  showEdit: boolean;
  holiday: string;
  showHolidays: boolean;
  setShowHolidays: (e: any) => void;
  received: string;
}



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
      holiday: '',
      sessionToken: '',
      userId: '',
      setGifts: [],
      isLoggedIn: false,
      updateToken: '',
      setHolidays: [],
      received: '',
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
      showHolidays: false,
      setShowHolidays: (e) => {
        this.setState({
          showHolidays: e
        })
      },
    }
    this.clearToken = this.clearToken.bind(this)
    this.fetchGifts = this.fetchGifts.bind(this)
    this.fetchHolidays = this.fetchHolidays.bind(this)
    this.deleteItems = this.deleteItems.bind(this)
    this.fetchHolidays = this.fetchHolidays.bind(this)
  }

  handleSearch = (e: any) => {
    this.setState({
      setGifts: e
    })
  }

  deleteItems = (item: number) => {
    fetch(`${APIURL}/gifts/delete/${item}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.state.sessionToken
      })

    }).then(() => this.fetchGifts())
    console.log('item deleted')
  }

  deleteHolidays = (item: number) => {
    fetch(`${APIURL}/holidays/delete/${item}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.state.sessionToken
      })

    }).then(() => this.fetchHolidays())
    console.log('item deleted')
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({
        isLoggedIn: true,
      })
    }
  }

  clearToken() {
    this.setState({
      isLoggedIn: false,
      sessionToken: '',
      userId: ''
    })
    console.log("cleared the token has")
    localStorage.clear()
  }

  updateToken = (newToken: string, id: any) => {
    this.setState({ sessionToken: newToken, userId: id, isLoggedIn: true })
    localStorage.setItem('id', id)
    localStorage.setItem('token', newToken)
  }
  fetchGifts = () => {
    fetch(`${APIURL}/gifts/${localStorage.getItem('id')}`, {
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
    fetch(`${APIURL}/holidays/${localStorage.getItem('id')}`, {
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

  render() {
    return (
      <div className='App' style={{ backgroundColor: 'black rgb(20, 20, 20)', height: '100%' }}>
        <Router>
          <Switch>
            <NavFile
              clearToken={this.clearToken}
              isLoggedIn={this.state.isLoggedIn}
              setShowCreate={this.state.setShowCreate}
              setHolidayCreate={this.state.setShowHolidays}
            />
          </Switch>
          <HolidaysCreate
            showHolidays={this.state.showHolidays}
            setShowHolidays={this.state.setShowHolidays}
            fetchHolidays={this.fetchHolidays}
            holiday={this.state.holiday}
            date={this.state.date}
            sessionToken={this.state.sessionToken}
            received={this.state.received} />
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
          {this.state.isLoggedIn === false ? <Auth
            setIsLoggedIn={this.state.setIsLoggedIn}
            updateToken={this.updateToken} /> : null}
          {this.state.isLoggedIn ?
            <React.Fragment>
              <Search
                sessionToken={this.state.sessionToken}
                userId={this.state.userId}
                isLoggedIn={this.state.isLoggedIn}
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
              <h1 className="mainText">Here are your holidays!</h1>
              <HolidayItemsTable
                holiday={this.state.holiday}
                date={this.state.date}
                received={this.state.received}
                sessionToken={this.state.sessionToken}
                fetchHolidays={this.fetchHolidays}
                deleteHolidays={this.deleteHolidays}
                isLoggedIn={this.state.isLoggedIn}
                setHolidays={this.state.setHolidays}
                setShowEdit={this.state.setShowEdit} />
            </React.Fragment>
            : null
          }
          <br />
        </Router>
      </div>
    )
  }
}

export default App;
