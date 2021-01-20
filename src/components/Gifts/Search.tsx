import * as React from 'react';


export interface SearchProps {
    giftName: string;
}

export interface SearchState {
    giftName?: string;
    setGiftsName: []
}

class Search extends React.Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);
        this.state = {
            giftName: 'gift',
            setGiftsName: []

        };
    }

    fetchGiftsName = () => {
        fetch(`http://localhost:8081/gifts/${this.props.giftName}`, {
            method: 'GET'
        }).then(r => r.json())
            .then(rArr => {
                this.setState({
                    setGiftsName: rArr
                })
                // console.log(this.state.setGifts)
            })

    }

    // componentDidMount() {
    //     this.fetchGiftsName()
    // }
    render() {
        return (
            <div>
                {this.props.giftName}
            </div>
        );
    }
}

export default Search;