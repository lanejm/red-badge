import React from 'react';

import {
     Button, 
} from 'reactstrap';


interface SearchProps {
    giftName: string;
    setGifts: any;
    handleSearch: (e: any) => void;
    
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
                this.props.handleSearch(rArr)
                this.setState({
                    searchComplete: true
                })
            })

    }


    render() {
        return (
            <div>
                <input placeholder="Ex. Macbook Pro" id="giftSearch" value={this.state.searchTerm} onChange={e => this.setState({searchTerm: e.target.value})} />
                <Button id="searchButton" onClick={this.fetchGiftsName}>Search</Button>
            </div>
        );
    }
}

export default Search;

//add logic to make all items re-appear via 'reset' button.  