import React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {API_KEY} from"../RIOT_API";

export default function Input(props){

    const navigate = useNavigate();
    const bySummonerName = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + props.summonerName + "?api_key=" + API_KEY;

    function handleSubmit(event){
        props.summonerName && props.summonerName.length>2 && fetch(bySummonerName)
        .then(response => response.json())
        .then(data => {
            props.updateData(data);
            navigate("/display");
        })
        .catch(error => console.log('Error:', error));
    }

    return(
        <div className="navbar">
            <div className="navElements">
                <Link to="/"  style={{ textDecoration: 'none', color: 'white' }}>
                    <div className="title">League of Legends Player Search</div>
                </Link>
                <form 
                    className='form' 
                    onSubmit={event => {
                        event.preventDefault()
                        handleSubmit(event)}}
                >
                    <input 
                        type='text' 
                        placeholder='Enter Player Name' 
                        onChange={event => props.updateName(event.target.value)}
                        value={props.summonerName}
                    />
                    <button>Search</button>
                </form>
            </div>
        </div>
    )
}



