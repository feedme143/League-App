import React from 'react'

export default function MatchCard(props){
        
        const metadata = props.match.metadata
        const info = props.match.info
        
        const playerIndex = metadata.participants.indexOf(props.puuid)
        const player = info.participants[playerIndex]

        //Champion Played Info
        let champPlayed = player.championName
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

        //Player Summoner Spells
        const ssmap = {
            21: "Barrier",
            1: "Boost", //name: "Cleanse", cleanse summoner
            14: "Dot", //name: "Ignite", ignite summoner
            3: "Exhaust",
            4: "Flash",
            6: "Haste", //name: "Ghost", ghost summoner
            7: "Heal",
            13: "Mana", //name: "Clarity", Aram clarity    
            // 30: To the King!
            // 31: Poro Toss
            11: "Smite",
            //39: Mark, //URF Snowball
            32: "Snowball", //name: "Mark", Aram Snowball
            12: "Teleport"
            // 54: Placeholder
            // 55: Placeholder and Attack-Smite
        }
        const s1id = player.summoner1Id
        const s2id = player.summoner2Id
        const playerSum1 = `https://opgg-static.akamaized.net/images/lol/spell/Summoner${ssmap[s1id]}.png?image=q_auto,f_webp,w_44&v=1660126953027`
        const playerSum2 = `https://opgg-static.akamaized.net/images/lol/spell/Summoner${ssmap[s2id]}.png?image=q_auto,f_webp,w_44&v=1660126953027`  
        
        //Outcome of Game
        let outcome
        player.win ? outcome = "WIN" : outcome = "LOSS"
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
                return t + ` minute${isOne(t)} ago`
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
        const playerKills=player.kills
        const playerDeaths=player.deaths
        const playerAssists=player.assists
        const playerKda = `${playerKills}/${playerDeaths}/${playerAssists}`
        const decimal = playerDeaths === 0 ? (playerKills+playerAssists).toFixed(2) : ((playerKills+playerAssists)/playerDeaths).toFixed(2)
        const ratio = `${decimal}:1 KDA`

        //level-cs-tier
        const champPlayedLevel=player.champLevel
        const playerCS=player.neutralMinionsKilled + player.totalMinionsKilled
        const playerCSpm=(playerCS * 60 / totalSeconds).toFixed(1)
        let allyTotalKills=0
        let enemyTotalKills=0
        for (const element of info.participants) 
            element.teamId===player.teamId ? allyTotalKills+=element.kills : enemyTotalKills+=element.kills
        const playerKP=playerKills + playerAssists === 0 ? 0: ((playerKills + playerAssists) * 100 / allyTotalKills).toFixed()
        
        //items
        const items = [
            player.item0,
            player.item1,
            player.item2,
            player.item3,
            player.item4,
            player.item5
        ]

        const ward = player.item6
        //{`https://opgg-static.akamaized.net/images/lol/item/${item}.png?image=q_auto,f_webp,w_44&v=1664158120569`}
        const displayItems = items.map((item, index) => <div key={index} className={`item${index}`}> {item === 0 ? "" : <img src = {`http://localhost:3001/images/${item}.png`}/>} </div>)

    return(
        <div className={className}>

            <div className="matchType">
                <div className="qType">{qType}</div>
                {/* <div className="datePlayed">{printDt}</div> */}
                <div className="timeAgo">{dtAgo}</div>
                <div className="outcome">{outcome}</div> 
                <div className="gameLength">{minutes}m {seconds}s</div>
            </div>

            <div className="info">
                <div className="info-top">
                    <div className="champPlayed">
                        <div className="champContainer">
                            <img src={champIconPath} alt={displayPlayed} className="champIcon"/>
                            <div className="sum-spells">
                                <img className="playerSum1" src={playerSum1} alt={ssmap[s1id]}/>
                                <img className="playerSum2" src={playerSum2} alt={ssmap[s2id]}/>
                            </div>
                        </div>
                        <div className="runes"></div>
                        {/* <div className="champName">{displayPlayed}</div> */}
                    </div>

                    <div className="kda">
                        <div className="scoreline">{playerKda}</div>
                        <div className="kda-ratio">{ratio}</div>
                    </div>

                    <div className="level-cs-tier">
                        <div className="championLevel">Level {champPlayedLevel}</div>
                        <div className="cs">{playerCS} ({playerCSpm}) CS</div>
                        <div className="kp">P/Kill {playerKP}%</div>
                        <div className="Tier"></div>
                    </div>
                </div>

                <div className="items">
                    {displayItems}
                    <div className="ward">
                        {ward === 0 ? "" : <img src = {`https://opgg-static.akamaized.net/images/lol/item/${ward}.png?image=q_auto,f_webp,w_44&v=1664158120569`}/>}
                    </div>
                </div>
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