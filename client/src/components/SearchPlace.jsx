import React from 'react';

const SearchPlace = (props) => {
    return (
        <div>
            <div>Name: {props.result.name}</div>
            <div>Address: {props.result.formatted_address}</div>
            Types: {props.result.types.map((type, i) => {
                return (<div key={i}>{type}</div>)
            })}
            <br />
        </div>
    )
}

export default SearchPlace;
