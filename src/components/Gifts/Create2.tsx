import React from 'react';

type AcceptedProps={
    testProp:string,
    optionalProp?:string
}

type MyState={
    count:number,
}


class Blog extends React.Component <AcceptedProps, MyState> {
    state: MyState= {
        count: 0
    
    }
    constructor(props:AcceptedProps){
        super(props)
    }


    render () {
        return (
            <div>
                {this.props.testProp} 
                {this.props.optionalProp}
                {this.state.count}
            </div>
        );
    }
}

export default Blog;