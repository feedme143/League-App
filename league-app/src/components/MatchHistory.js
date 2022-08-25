import React from 'react'
import {API_KEY} from "../RIOT_API"
import MatchCard from "./MatchCard"
import axios from 'axios'

export default function MatchHistory(props){
//axios setup
    const api = axios.create({
        baseURL: `http://localhost:3001/posts`
    })
//State variable containing array of match history info
    const [matches, setMatches] = React.useState()
//State variable displayMatchHistory is the mapped variable that displays the info for each match
    const [displayMatchHistory, setDisplayMatchHistory] = React.useState("")

    let byMatchHistory = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + props.puuid + "/ids?start=0&count=10&api_key=" + API_KEY


//API call function, returns array of match infos for the past x matches

    React.useEffect(()=>{
        async function getMatchIds(){
            const idPromise = await fetch(byMatchHistory)
            const ids = await idPromise.json()

            const responses = await Promise.all(
                ids.map(async id => {
                    //call to my own api
                    const res = await fetch(`http://localhost:3001/posts/${id}`)
                    const d = await res.json()
                    //console.log(d[0])
                    const data = d[0] ? d[0].data : await getData()
                    
                    async function getData() {
                        const res = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${API_KEY}`)
                        const dat = await res.json()
                        let r = await api.post('/', {matchId: id, data: dat})
                        //console.log(r)
                        return dat
                    }
               
                    // const playerIndex = data.metadata.participants.indexOf(props.puuid)
                    // const champPlayed = data.info.participants[playerIndex].championName
                    // return champPlayed
                    return data
                })
            ) 

            setMatches(responses)
        }

        getMatchIds()

    }, [props.puuid, byMatchHistory])


//function that creates displayMatchHistory

React.useEffect(()=>{
    let placeholderData = ""
    matches && (placeholderData = matches.map((match, index) => {
        return (
            <MatchCard key={index} match={match} puuid={props.puuid}/>
        )
    }))
    
    setDisplayMatchHistory(placeholderData)
}, [matches])


    return(
        <div className="matchHistory">
            <div className="matchHistoryHeader">
                <div className="matchHistoryTitle">Match History</div>
            </div>
            {displayMatchHistory}
        </div>
    )
}