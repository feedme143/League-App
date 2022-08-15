import React from 'react';

export default function Input(props){

    return(
        <div className="navbar">
            <div className="navElements">
                <div className="title">League of Legends Player Search</div>
                <form 
                    className='form' 
                    onSubmit={event => {
                        event.preventDefault()
                        props.getInfo(event)}}
                >
                    <input 
                        type='text' 
                        placeholder='Enter Player Name' 
                        onChange={event => props.updateName(event)}
                        value={props.summonerName}
                    />
                    <button>Search</button>
                </form>
            </div>
        </div>
    )
}



