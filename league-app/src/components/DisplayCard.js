import React from 'react'
import MatchHistory from './MatchHistory'

export default function DisplayCard(props){

    return(
        <div className="displayCard">
            <div className="top">
                <div className="topContainer">
                    <div className="accountName">Name: {props.data.name}</div>
                    <div className="accountLevel">Level: {props.data.level}</div>
                    <button className="update" onClick={props.update}>Update</button>
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