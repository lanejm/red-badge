import React from 'react';
import ItemsTable from './Items';

const GiftsSearch = (props: any) => { 

    return (
        <div>
            {props.rev.map((revObj: any, i: any) => <ItemsTable rev={revObj} key={i} userId={props.userId} />)}
        </div>
    )
}

export default GiftsSearch