import React from 'react'
import MatchHistory from './MatchHistory'
import axios from 'axios'

export default function DisplayCard(props){

    const api = axios.create({ //axios setup
            baseURL: `http://localhost:3001`
        })

    const [data, setData] = React.useState(props.data);

    async function update(){
        const res = await setData(api.put(`/summoners/${data.name}`)); //update summoner in database
    }

    return(
        <div className="displayCard">
            <div className="top">
                <div className="topContainer">
                    <div className="accountName">Name: {props.data.name}</div>
                    <div className="accountLevel">Level: {props.data.level}</div>
                    <button className="update" onClick={update}>Update</button>
                </div>
            </div>
            <MatchHistory puuid={props.data.puuid} name={props.data.name} games={props.data.games}/>
            {/* <div className="infoContainer">
                <div className="topLeft">
                    TOP LEFT
                </div>

                <div className="topRight">
                    TOP RIGHT
                </div>

                <div className="botLeft">
                    BOT LEFT
                </div>

                <MatchHistory puuid={props.data.puuid}/>
            </div> */}
        </div>  
    )
}