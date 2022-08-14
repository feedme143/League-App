import React from 'react'

export default function MatchCard(props){
        
        const metadata = props.match.metadata
        const info = props.match.info
        
        const playerIndex = metadata.participants.indexOf(props.puuid)


        //Champion Played Info
        let champPlayed = info.participants[playerIndex].championName
        let displayPlayed=champPlayed
        if(displayPlayed==="MonkeyKing"){
            displayPlayed="Wukong"
        }

        //Champion image
        const processedName=nameProcess(champPlayed)
        let champIconPath = `https://opgg-static.akamaized.net/images/lol/champion/${processedName}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_auto&v=1659072303149`;

        function nameProcess(name){
            if(name==="Renata Glasc")
                return "Renata"
            let str=name;
            str.replace(/[^a-zA-Z0-9]/g, '')
            return str;
        }

        //Outcome of Game
        let outcome
        props.match.info.participants[playerIndex].win ? outcome = "WIN" : outcome = "LOSS"
        let className=`matchCard ${outcome}`
        
        //Type of Queue
        const qTypeMap = {
            0: "Custom",
            100: "ARAM",
            400: "Draft Pick",
            420: "Ranked Solo",
            430: "Blind Pick",
            440: "Ranked Flex",
            450: "ARAM",
            700: "Clash",
            1400: "Ultimate Spellbook"
        }
        const id=info.queueId
        const qType=qTypeMap[id]

        //Date Played & Time Ago
        const time=info.gameCreation
        const dt=new Date(time)
        const printDt=dt.toDateString()
        const timeAgo=Date.now()-time
        const dtAgo=convertTime(timeAgo)

        function convertTime(t){
            function isOne(n){
                if (parseInt(n)===1)
                    return ""
                return "s"
            }

            t=parseInt(t/60000)
            if (t<60) {
                return t + ` minutes ago`
            } else if (t<1440) {
                return parseInt(t/60) + ` hour${isOne(t/60)} ago`
            } else if (t<43200) {
                return parseInt(t/1440) + ` day${isOne(t/1440)} ago`
            } else {
                return parseInt(t/43200) + ` month${isOne(t/43200)} ago`
            }
        }

        //Time played
        const totalSeconds=info.gameDuration
        const minutes=parseInt(totalSeconds/60)
        const seconds=totalSeconds-minutes*60

        //kda info
        const playerKills=info.participants[playerIndex].kills
        const playerDeaths=info.participants[playerIndex].deaths
        const playerAssists=info.participants[playerIndex].assists
        const playerKda = `${playerKills}/${playerDeaths}/${playerAssists}`
        const ratio = `${((playerKills+playerAssists)/playerDeaths).toFixed(2)}:1 KDA`
    return(
        <div className={className}>

            <div className="matchType">
                <div className="qType">{qType}</div>
                {/* <div className="datePlayed">{printDt}</div> */}
                <div className="timeAgo">{dtAgo}</div>
                <div className="outcome">{outcome}</div> 
                <div className="gameLength">{minutes}m {seconds}s</div>
            </div>

            <div className="champPlayed">
                <img src={champIconPath} alt={displayPlayed} className="champIcon"/>
                <div className="sum-spells"></div>
                <div className="runes"></div>
                <div className="champName">{displayPlayed}</div>
            </div>

            <div className="kda">
                <div className="scoreline">{playerKda}</div>
                <div className="kda-ratio">{ratio}</div>
            </div>

            <div className="level-cs-tier">
                <div className="championLevel"></div>
                <div className="cs"></div>
                <div className="kp"></div>
                <div className="Tier"></div>
            </div>

            <div className="items">
                <div className="item-1"></div>
                <div className="item-2"></div>
                <div className="item-3"></div>
                <div className="item-4"></div>
                <div className="item-5"></div>
                <div className="item-6"></div>
                <div className="ward"></div>
            </div>

            <div className="allPlayers">
                <div className="player-1"></div>
                <div className="player-2"></div>
                <div className="player-3"></div>
                <div className="player-4"></div>
                <div className="player-5"></div>
                <div className="player-6"></div>
                <div className="player-7"></div>
                <div className="player-8"></div>
                <div className="player-9"></div>
                <div className="player-10"></div>
            </div>

        </div>
    )
}