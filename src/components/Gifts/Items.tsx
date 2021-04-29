import React from 'react';
import GiftEdit from './Edit';
import {Table} from 'reactstrap';


const ItemsTable = (props: any) => {
    

    const deleteItems = (rev: any) => {
        fetch(`http://localhost:8081/gifts/${props.rev.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then(() => props.fetchGifts())
    }


    return (
        <div className='giftsTable'>
            <Table dark>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Purchased</th>
                        <th>Person</th>
                        <th>From</th>
                        <th>Owner</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        {/* <th>{props.rev.giftName}</th> */}
                    </tr>
                    {/* {props.userId === props.userId ? <GiftEdit fetchGifts = {props.fetchGifts} rev={props.rev} /> : <div></div>} */}
                </tbody>
            </Table>
        </div>
    )
}

export default ItemsTable
