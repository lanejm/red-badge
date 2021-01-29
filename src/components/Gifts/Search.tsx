import React from 'react';
import '../Gifts/search.css'

import {
     Button, 
} from 'reactstrap';


interface SearchProps {
    giftName: string;
    setGifts: any;
    handleSearch: (e: any) => void;
    fetchGifts: any;
    isLoggedIn: boolean;
    userId: string;
    
}

interface SearchState {
    giftName: string;
    itemId: number;
    searchTerm: string;
    searchComplete: boolean;
    testArray: [];
}

class Search extends React.Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);
        this.state = {
            giftName: '',
            itemId: 0,
            searchTerm: '',
            searchComplete: false,
            testArray: [],

        };
    }

    fetchGiftsName = () => {
        fetch(`http://localhost:8081/gifts/name/${this.state.searchTerm}`, {
            method: 'GET'
        }).then(r => r.json())
            .then(rArr => {
                // if(rArr.owner === this.props.userId) {
                this.props.handleSearch(rArr)
                this.setState({
                    searchComplete: true
                })
            })
            .catch(err => alert('Enter a search term!'))

        }


    render() {
        return (
            <div>
                <input id="inputBar" type="text" name="search" placeholder="Search..." value={this.state.searchTerm} onChange={e => this.setState({searchTerm: e.target.value})} />
                <Button id="searchButton" onClick={this.fetchGiftsName}>Search</Button>
                <Button id="cancelButton" onClick={this.props.fetchGifts}>Cancel</Button>
            </div>
        );
    }
}

export default Search;
