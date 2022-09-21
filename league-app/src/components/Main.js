import Navbar from './Navbar.js'
import DisplayCard from './DisplayCard.js'
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

export default function Main(){
    const [summonerName, setSummonerName] = React.useState("")
    const [summonerData, setSummonerData] = React.useState()

    return(
        <Router>
            <main>
                <Navbar summonerName={summonerName} updateName={setSummonerName} setSummonerData={setSummonerData}/>
        
                {/* {summonerData && (summonerData.name ? <DisplayCard data={summonerData} /> : <div>Summoner Not Found</div>)} */}
                <Routes>
                    <Route path="/" element={
                        <div className = "welcome">Welcome, Search For a Summoner in the Top Right!</div>
                    } />
                    <Route path="/display" element={<DisplayCard data={summonerData} />} />
                    
                </Routes>
            </main>
        </Router>
    )
}