import React from 'react'
import {API_KEY} from "../RIOT_API"
import MatchCard from "./MatchCard"

export default function MatchHistory(props){
//State variable containing array of match history info
    const [matches, setMatches] = React.useState()
//State variable displayMatchHistory is the mapped variable that displays the info for each match
    const [displayMatchHistory, setDisplayMatchHistory] = React.useState("")

    //const API_KEY = "RGAPI-ac8f24ef-42df-4b02-a52f-9c654a39b9b1"
    let byMatchHistory = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + props.puuid + "/ids?start=0&count=3&api_key=" + API_KEY


//API call function, returns array of match infos for the past x matches

    React.useEffect(()=>{
        async function getMatchIds(){
            const idPromise = await fetch(byMatchHistory)
            const ids = await idPromise.json()

            const responses = await Promise.all(
                ids.map(async id => {
                    const res = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${API_KEY}`)
                    const data = await res.json()
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
        <div>
            <h5 className="matchHistoryTitle">Match History</h5>
            {displayMatchHistory}
        </div>
    )
}