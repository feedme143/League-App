import React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

export default function Input(props){

    //axios setup
    const api = axios.create({
        baseURL: `http://localhost:3001`
    })

    const navigate = useNavigate();
    //const bySummonerName = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + props.summonerName + "?api_key=" + API_KEY;

    async function handleSubmit(event){
        if (props.summonerName && props.summonerName.length>2) {
            const res = await api.get(`/summoners/${props.summonerName}`);
            const data = res.data;
            console.log(data);
            if (data) {
                props.setSummonerData(data);
                navigate('/display');
            } else {
                console.log("Summoner not Found");
            }
        }
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



