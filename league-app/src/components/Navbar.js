import React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

export default function Input(props){
    //State vairable for input
    const [input, setInput] = React.useState("");
    //axios setup
    const api = axios.create({
        baseURL: `http://localhost:3001`
    });

    //const navigate = useNavigate();
    //const bySummonerName = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + props.summonerName + "?api_key=" + API_KEY;

    async function handleSubmit(event){
        props.search(input);
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
                        onChange={event => setInput(event.target.value)}
                        value={input}
                    />
                    <button>Search</button>
                </form>
            </div>
        </div>
    )
}



