import React, {useEffect} from 'react';
import ItemsTable from './Items';

const GiftsList = (props: any) => {

    useEffect(
        () => {
            props.fetchGifts()
        }, []
    )


//not working currently
    return (
        <div className="listItem">
            {props.gifts.map((revObj: any, i:any) => <ItemsTable fetchGifts={props.fetchGifts} rev={revObj} key={i} userId={props.userId} />)}
        </div>
    )
}

export default GiftsList