import Navbar from './Navbar.js'
import DisplayCard from './DisplayCard.js'
import React from 'react'
import {API_KEY} from"../RIOT_API"

export default function Main(){
    const [summonerName, setSummonerName] = React.useState("")
    const [summonerData, setSummonerData] = React.useState()

    const bySummonerName = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key=" + API_KEY
    
    function updateName(event){
        setSummonerName(event.target.value)
    }

    function getInfo(event){
        summonerName && summonerName.length>2 && fetch(bySummonerName)
        .then(response => response.json())
        .then(data => setSummonerData(data))
        .catch(error => console.log('Error:', error))
    }


    return(
        <main>
            <Navbar summonerName={summonerName} updateName={updateName} getInfo={getInfo}/>
            {summonerData && (summonerData.name ? <DisplayCard data={summonerData} /> : <div>Summoner Not Found</div>)}
            {/* <Footer/> */}
      </main>
    )
}