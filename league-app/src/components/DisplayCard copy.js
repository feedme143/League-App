import React from 'react';
import MatchHistory from './MatchHistory';
import {useParams} from 'react-router-dom';

export default function DisplayCard(props){
    const {name} = useParams();
    console.log(name);
    //Convert last updated time
    function convertTime(t){
        function isOne(n){
            if (parseInt(n)===1)
                return ""
            return "s"
        }

        t=parseInt(t/60000)
        if (t<60) {
            return (t === 0 ? 'Just Now' : t + ` minute${isOne(t)} ago`)
        } else if (t<1440) {
            return parseInt(t/60) + ` hour${isOne(t/60)} ago`
        } else if (t<43200) {
            return parseInt(t/1440) + ` day${isOne(t/1440)} ago`
        } else {
            return parseInt(t/43200) + ` month${isOne(t/43200)} ago`
        }
    }
        
    return(
        <div className="displayCard">
            <div className="top">
                <div className="topContainer">
                    <div className="accountName">Name: {props.data.name}</div>
                    <div className="accountLevel">Level: {props.data.level}</div>
                    <button className="update" onClick={props.update}>Update</button>
                    <div className="lastUpdated">{props.data.lastUpdated && "Last Updated: " + convertTime(Date.now()-props.data.lastUpdated)}</div>
                </div>
            </div>
            <MatchHistory puuid={props.data.puuid} name={props.data.name} games={props.data.games} search={props.search}/>
            <div className="showMore">
                <div>Show More</div>
            </div>
        </div>  
    )
}