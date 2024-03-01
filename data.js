async function GetAPI(){

    // https://www.thebluealliance.com/api/v3/team/<frc####>/event/<2024#ID#>/matches
    const response = await fetch('https://www.thebluealliance.com/api/v3/team/frc3405/event/2024utwv/matches', {
    // const response = await fetch('https://www.thebluealliance.com/api/v3/team/frc88/event/2024week0/matches', {
                                    headers: {
                                        'accept': 'application/json',
                                        'X-TBA-Auth-Key': '96RLnmBhpu5YSmyH1pV2x3d0YfCZiKNZR3M5AdtalNG3xT55DWF1B7FFnOHXC7pp\t'
                                    }
                                    });
    data = await response.json();
    console.log(data);

    // https://www.thebluealliance.com/api/v3/team/<frc####>/event/<2024#ID#>/matches
    const teamsR = await fetch('https://www.thebluealliance.com/api/v3/event/2024utwv/teams', {
    // const response = await fetch('https://www.thebluealliance.com/api/v3/team/frc88/event/2024week0/matches', {
                                    headers: {
                                        'accept': 'application/json',
                                        'X-TBA-Auth-Key': '96RLnmBhpu5YSmyH1pV2x3d0YfCZiKNZR3M5AdtalNG3xT55DWF1B7FFnOHXC7pp\t'
                                    }
                                    });
    teams = await teamsR.json();
    console.log(data);

    // Create a new dictionary to store teams by key
    const teamsByKey = {};

    // Iterate through the teams list
    teams.forEach(team => {
    // Extract the key without 'frc' prefix
    const key = team.key.substring(3);
    // Add team to the teamsByKey dictionary with key as number and value as nickname
    teamsByKey[key] = team.nickname;
    });

    console.log(teamsByKey);

    processData(data,teamsByKey);
}

async function processData(data,teams){
    console.log("Parsing data");
    matchScroll = document.getElementById("putHere");

    // Get the current time in milliseconds
    const currentTime = new Date().getTime();

    let nextMatch;

    // Find the next match with a predicted time in the future and no available scores
    for (const match of data) {
        if (!match.score_breakdown && match.predicted_time * 1000 > currentTime) {
            nextMatch = match;
            break;
        }
    }

    if (nextMatch) {
        // Display the next match number
        const nextMatchNumber = nextMatch.match_number;
        document.getElementById("nextMatch").textContent = `Qualification ${nextMatchNumber}`;

        // Calculate the countdown for the next match
        const matchTime = nextMatch.predicted_time * 1000;
        const countdownElement = document.getElementById("m1");
        countdownElement.textContent = ""; // Clear existing content
        countTo("m1", matchTime);

        teamNum = nextMatch.alliances.red.team_keys[0].substring(3)
        document.getElementById("idRed1").innerHTML = teamNum
        document.getElementById("nameRed1").innerHTML = teams[teamNum]
        teamNum = nextMatch.alliances.red.team_keys[1].substring(3)
        document.getElementById("idRed2").innerHTML = teamNum
        document.getElementById("nameRed2").innerHTML = teams[teamNum]
        teamNum = nextMatch.alliances.red.team_keys[2].substring(3)
        document.getElementById("idRed3").innerHTML = teamNum
        document.getElementById("nameRed3").innerHTML = teams[teamNum]

        teamNum = nextMatch.alliances.blue.team_keys[0].substring(3)
        document.getElementById("idBlue1").innerHTML = teamNum
        document.getElementById("nameBlue1").innerHTML = teams[teamNum]
        teamNum = nextMatch.alliances.blue.team_keys[1].substring(3)
        document.getElementById("idBlue2").innerHTML = teamNum
        document.getElementById("nameBlue2").innerHTML = teams[teamNum]
        teamNum = nextMatch.alliances.blue.team_keys[2].substring(3)
        document.getElementById("idBlue3").innerHTML = teamNum
        document.getElementById("nameBlue3").innerHTML = teams[teamNum]




    } else {
        // If no upcoming match found, display a message indicating no matches
        const noMatchCell = document.createElement("td");
        noMatchCell.textContent = "No upcoming matches";
        matchScroll.appendChild(noMatchCell);
    }

    console.log("parsing data")
    matchScroll = document.getElementById("putHere");
    for(num in data) {
        match= data[num]
        // Extract relevant information
        const matchNumber = match.match_number;
        const blueAlliance = match.alliances.blue;
        const redAlliance = match.alliances.red;

        // Dynamically generate HTML
        const template = document.getElementById("template");

        // Create a new table element
        const table = document.createElement("table");

        // Add match key row
        const matchKeyRow = table.insertRow();
        const matchKeyCell = matchKeyRow.appendChild(document.createElement("th"));
        matchKeyCell.colSpan = 3;
        matchKeyCell.textContent = "Qualification " + matchNumber;


        const AliancesRow = table.insertRow();

        // Add blue alliance row
        const blueCell = AliancesRow.insertCell();
        const blueTable = blueCell.appendChild(document.createElement("table"))
        const btopRow = blueTable.insertRow();
        const bheader = btopRow.insertCell();
        bheader.textContent = "BLUE ALIANCE"
        bheader.classList.add('blu')
        bheader.colSpan = 2;

        // Add blue alliance teams
        blueAlliance.team_keys.forEach((teamKey, index) => {
            const row = blueTable.insertRow();
            row.classList.add('blu')
            const idCell = row.insertCell();
            idCell.classList.add('blu')
            const nickCell = row.insertCell();
            nickCell.classList.add('blu')
            idCell.textContent = teamKey.substring(3); // Remove "frc" prefix
            
            nickCell.textContent = teams[teamKey.substring(3)];; // Assuming the same nickname for all teams
        });


        // Check if the match is finished
        const isMatchFinished = !!match.score_breakdown;

        if (isMatchFinished) {
            // Add scores row
            const scoreCell = AliancesRow.insertCell();
            const scoreTable = scoreCell.appendChild(document.createElement("table"));
            const sTopRow = scoreTable.insertRow();
            const sHeader = sTopRow.insertCell();
            sHeader.colSpan = 3;
            sHeader.textContent = "SCORES";

            const blueScores = match.score_breakdown.blue;
            const redScores = match.score_breakdown.red;

            // Add score rows for different metrics
            const scoreMetrics = [
                { label: "Total", key: "totalPoints" },
                { label: "Leave", key: "autoLeavePoints" },
                { label: "Speaker", key: "teleopSpeakerNotePoints" },
                { label: "Amp", key: "teleopAmpNotePoints" },
                { label: "Stage", key: "endGameTotalStagePoints" },
                { label: "Penalty", key: "foulPoints" }
            ];

            scoreMetrics.forEach(metric => {
                const row = scoreTable.insertRow();
                const blueCell = row.insertCell();
                blueCell.textContent = blueScores[metric.key] || 0;
                blueCell.classList.add('blu', metric.label);
                const labelCell = row.insertCell();
                labelCell.textContent = metric.label;
                const redCell = row.insertCell();
                redCell.textContent = redScores[metric.key] || 0;
                redCell.classList.add('red', metric.label);
            });
        } else {
            // If match is not finished, display placeholders
            const matchUnfinishedRow = table.insertRow(1)
            const placeholderCell = matchUnfinishedRow.appendChild(document.createElement("th"));
            placeholderCell.colSpan = 3;
            placeholderCell.textContent = "Match not finished. Estimated time: " + new Date(match.predicted_time * 1000).toLocaleString();
        }


        // Add red alliance row
        const redCell = AliancesRow.insertCell();
        const redTable = redCell.appendChild(document.createElement("table"))
        const rtopRow = redTable.insertRow();
        const rheader = rtopRow.insertCell();
        rheader.textContent = "RED ALIANCE"
        rheader.classList.add('red')
        rheader.colSpan = 2;

        // Add red alliance teams
        redAlliance.team_keys.forEach((teamKey, index) => {
            const row = redTable.insertRow();
            row.classList.add('red')
            const idCell = row.insertCell();
            idCell.classList.add('red')
            const nickCell = row.insertCell();
            nickCell.classList.add('red')
            idCell.textContent = teamKey.substring(3); // Remove "frc" prefix
            nickCell.textContent = teams[teamKey.substring(3)]; // Assuming the same nickname for all teams
        });

        // Append the table to the template
        FTD = document.createElement("td")
        FTD.appendChild(table)
        matchScroll.appendChild(FTD)
    }

    // Get the element
    var elem = document.querySelector('#pt1');
    // Create a copy of it
    var clone = elem.cloneNode(true);
    console.log(clone)
    // Update the ID
    clone.id = 'pt2';
    // Inject it into the DOM
    elem.after(clone);
}

function countdown(elementName, eDate, dates = 0) {
	//config
	var targetDate = new Date(eDate).getTime();
	//use 
	var element = document.getElementById(elementName)
	var x = setInterval(function() {
		//get the time in m sec
		var now = new Date().getTime();
		//get diff from target and current time
		var d_time = targetDate - now;
		//time const
		const mspd = 1000 * 60 * 60 * 24;
		const msph = 1000 * 60 * 60;
		const mspm = 1000 * 60;
		const msps = 1000;
		//days
		var days = Math.floor(d_time / mspd);
		//hrs
		var hrs = Math.floor(d_time % mspd / msph);
		//min
		var min = Math.floor(d_time % msph / mspm);
		//sec
		var sec = Math.floor(d_time % mspm / msps);
		//inject
		d = "";
		h = "";
		m = "";
		s = "";
		if(days!=0) d = days + " Days, ";

		if(hrs!=0) h = hrs + " Hrs, ";

		if(min!=0) m = min + " Min, ";

		if(sec!=0) s = sec + " Sec. ";
		element.innerHTML = d + h + m + s;
		//progress bar calculations
		if (!(dates == 0)) {
			var dTxt = document.getElementById(dates);
			dTxt.innerHTML = "Start Date:" + sDate + " | End Date:" + eDate;
		};
	}, 1000);
}

function countTo(elementName, unix){
	//config
	var targetDate = unix;
	//use 
	var element = document.getElementById(elementName)
	var x = setInterval(function() {
		//get the time in m sec
		var now = new Date().getTime();
		//get diff from target and current time
		var d_time = targetDate - now;
		//time const
		const mspd = 1000 * 60 * 60 * 24;
		const msph = 1000 * 60 * 60;
		const mspm = 1000 * 60;
		const msps = 1000;
		//days
		var days = Math.floor(d_time / mspd);
		//hrs
		var hrs = Math.floor(d_time % mspd / msph);
		//min
		var min = Math.floor(d_time % msph / mspm);
		//sec
		var sec = Math.floor(d_time % mspm / msps);
		//inject
		d = "";
		h = "";
		m = "";
		s = "";
		if(days!=0) d = days + " Days, ";

		if(hrs!=0) h = hrs + " Hrs, ";

		if(min!=0) m = min + " Min, ";

		if(sec!=0) s = sec + " Sec. ";
		element.innerHTML = d + h + m + s;
	}, 1000);
}