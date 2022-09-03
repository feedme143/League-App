import React from 'react';
import MatchCard from "./MatchCard";

export default function MatchHistory(props) {

    const displayMatchHistory = props.games.map((game, index)=> <MatchCard puuid={props.puuid} match={game} key={index}/>);

    return(
        <div className="matchHistory">
            <div className="matchHistoryHeader">
                <div className="matchHistoryTitle">Match History</div>
            </div>
            {displayMatchHistory}
        </div>
    )
}