import React from 'react';
import './App.css';
import {Card} from 'reactstrap';
import Blog from './components/Gifts/Create2';


let testProp:string = 'test';
let optionalProp:string = 'This is optional';

class Home extends React.Component {
    render () {
        return(
            <div>
                <Blog testProp={testProp} optionalProp={optionalProp} />
            </div>
        )
    }
}


export default Home; 