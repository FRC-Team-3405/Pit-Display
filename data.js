async function GetAPI(){

    // https://www.thebluealliance.com/api/v3/team/<frc####>/event/<2024#ID#>/matches
    const response = await fetch('https://www.thebluealliance.com/api/v3/team/frc88/event/2024week0/matches', {
                                    headers: {
                                        'accept': 'application/json',
                                        'X-TBA-Auth-Key': '96RLnmBhpu5YSmyH1pV2x3d0YfCZiKNZR3M5AdtalNG3xT55DWF1B7FFnOHXC7pp\t'
                                    }
                                    });
    data = await response.json();
    console.log(data);
    processData(data);
}


async function processData(data){
    console.log("parsing data")
    matchScroll = document.getElementById("putHere");
    for(match in data) {
        Template = document.getElementById("template")
        console.log(Template)
        MathcEle = Template.cloneNode(true)
        console.log(MatchEle)
        MatchEle.setAttribute('id','')
        console.log(MatchEle)
        MatchEle.getElementById('Bid1').innerHTML = match['alliances']['blue']['team_keys'][0]
        MatchEle.getElementById('Bid1').setAttribute('id','')
        MatchEle.getElementById('Bid2').innerHTML = match['alliances']['blue']['team_keys'][1]
        MatchEle.getElementById('Bid2').setAttribute('id','')
        MatchEle.getElementById('Bid3').innerHTML = match['alliances']['blue']['team_keys'][2]
        MatchEle.getElementById('Bid3').setAttribute('id','')
        matchScroll.appendChild(MatchEle)
        // Blue

        
        
    }
}