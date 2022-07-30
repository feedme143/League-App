import React from 'react'
import MatchHistory from './MatchHistory'

export default function DisplayCard(props){

    return(
        <div className="infoContainer">
            <div className="topLeft">
                <div>Name: {props.data.name}</div>
                <div>Level: {props.data.summonerLevel}</div>
            </div>

            <div className="topRight">
                TOP RIGHT
            </div>

            <div className="botLeft">
                BOT LEFT
            </div>

            <div className="botRight">
                <MatchHistory puuid={props.data.puuid}/>
            </div>
        </div>
    )
}