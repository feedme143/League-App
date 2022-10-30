import Navbar from './Navbar.js';
import DisplayCard from './DisplayCard.js';
import React from 'react';
import {Routes, Route} from 'react-router-dom';

export default function Main(){

    return(

        <main>
            <Navbar/>
            
            {/* {summonerData && (summonerData.name ? <DisplayCard data={summonerData} /> : <div>Summoner Not Found</div>)} */}
            <Routes>
                <Route path="/" element={
                    <div className = "welcome">Welcome, Search For a Summoner in the Top Right!</div>
                } />
                <Route path={`/display/:name`} element={<DisplayCard/>} />
            </Routes>
        </main>

    )
}