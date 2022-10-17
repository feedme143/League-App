import Navbar from './Navbar.js';
import DisplayCard from './DisplayCard.js';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';

export default function Main(){
    const api = axios.create({ //axios setup
        baseURL: `http://localhost:3001`
    })  

    const [summonerName, setSummonerName] = React.useState(""); //State for summoner name and summoner data
    const [summonerData, setSummonerData] = React.useState();

    async function update(){
        const res = await api.put(`/summoners/${summonerName}`); //update summoner in database
        setSummonerData(res.data);
    }

    return(
        <Router>
            <main>
                <Navbar summonerName={summonerName} updateName={setSummonerName} setSummonerData={setSummonerData}/>
                
                {/* {summonerData && (summonerData.name ? <DisplayCard data={summonerData} /> : <div>Summoner Not Found</div>)} */}
                <Routes>
                    <Route path="/" element={
                        <div className = "welcome">Welcome, Search For a Summoner in the Top Right!</div>
                    } />
                    <Route path="/display" element={<DisplayCard data={summonerData} update={update}/>} />
                    
                </Routes>
            </main>
        </Router>
    )
}