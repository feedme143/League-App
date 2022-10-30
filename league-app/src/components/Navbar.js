import React from 'react';
import {useNavigate, Link} from 'react-router-dom';

export default function Input(props){
    //setup react navigation
    const navigate = useNavigate();
    //State vairable for input
    const [input, setInput] = React.useState("");

    //const navigate = useNavigate();
    //const bySummonerName = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + props.summonerName + "?api_key=" + API_KEY;

    async function handleSubmit(event){
        if (input && input.length > 2)
            navigate(`/display/${input}`);
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



