import React from 'react';
import MatchHistory from './MatchHistory';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export default function DisplayCard(props){

    const api = axios.create({ //axios setup
        baseURL: process.env.REACT_APP_API_ENDPOINT
    })  

    const {name} = useParams(); //params for this component

    const [summonerData, setSummonerData] = React.useState(); //params for the summonerData
    
    //Search for the summoner every time the params path changes
    React.useEffect(() => {
        async function search(){
            if (name && name.length>2) {
                const res = await api.get(`/summoners/${name}`);
                const d = res.data;
                //console.log(d);
                if (d) {
                    setSummonerData(d);
                } else {
                    console.log("Summoner not Found");
                }
            }
        }

        search();
    },[name]);
    
    //This is the update function for when you are on a page and you update a summoner
    async function update(){
        const res = await api.put(`/summoners/${name}`); //update summoner in database
        setSummonerData(res.data);
    }

    //Convert last updated time
    function convertTime(lastUpdatedTime){
        let t = Date.now() - lastUpdatedTime;
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
            {summonerData && <div className="top">
                <div className="topContainer">
                    <div className="profileIcon">{summonerData.profileIcon}</div>
                    <div className="accountName">Name: {summonerData.name}</div>
                    <div className="accountLevel">Level: {summonerData.level}</div>
                    <button className="update" onClick={update}>Update</button>
                    <div className="lastUpdated">{"Last Updated: " + (summonerData.lastUpdated ? convertTime(summonerData.lastUpdated) : "N/A")}</div>
                    <div className="ranked solo/duo">{"Ranked Solo/Duo: " + (summonerData?.ranked?.[0] ? (summonerData.ranked[0].tier + " " + summonerData.ranked[0].rank) : "Unranked")}</div>
                    <div className="ranked flex">{"Ranked Flex: " + (summonerData?.ranked?.[1] ? (summonerData.ranked[1].tier + " " + summonerData.ranked[1].rank) : "Unranked")}</div>
                </div>
            </div>}
            {summonerData && <MatchHistory puuid={summonerData.puuid} name={summonerData.name} games={summonerData.games}/>}
            {summonerData && <div className="showMore">
                <div>Show More</div>
            </div>}
        </div>  
    )
}