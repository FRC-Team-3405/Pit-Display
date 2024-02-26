import requests

head = {"X-TBA-Auth-Key":"96RLnmBhpu5YSmyH1pV2x3d0YfCZiKNZR3M5AdtalNG3xT55DWF1B7FFnOHXC7pp	"}

r=requests.get("https://www.thebluealliance.com/api/v3/team/frc88/matches/2024", headers=head)
# r=requests.get("https://www.thebluealliance.com/api/v3/team/frc7177/matches/2024", headers=head)


a=r.json()
for a in r.json():
    print('-'*20)
    # print(a)
    # print(a['key'])
    print("--- The Blue Aliance ---")
    for t in a['alliances']['blue']['team_keys']:
        r=requests.get(f"https://www.thebluealliance.com/api/v3/team/{t}", headers=head)
        d=r.json()
        print(f"{t}: {d['nickname']}")
    if a['score_breakdown']:    
        scoreBreakdownTeam = a['score_breakdown']['blue']
        ttl = scoreBreakdownTeam['totalPoints']
        leave = scoreBreakdownTeam['autoLeavePoints']
        speaker = scoreBreakdownTeam['teleopSpeakerNoteAmplifiedPoints'] + scoreBreakdownTeam['teleopSpeakerNotePoints']
        amp = scoreBreakdownTeam['teleopAmpNotePoints']
        stage = scoreBreakdownTeam['endGameTotalStagePoints']
        foul = scoreBreakdownTeam['foulPoints']
        print(ttl)
        print(leave)
        print(speaker)
        print(amp)
        print(stage)
        print(foul)
    print("--- The Red Aliance ---")
    for t in a['alliances']['red']['team_keys']:
        r=requests.get(f"https://www.thebluealliance.com/api/v3/team/{t}", headers=head)
        d=r.json()
        print(f"{t}: {d['nickname']}")

    if a['score_breakdown']:    
        scoreBreakdownTeam = a['score_breakdown']['red']
        ttl = scoreBreakdownTeam['totalPoints']
        leave = scoreBreakdownTeam['autoLeavePoints']
        speaker = scoreBreakdownTeam['teleopSpeakerNoteAmplifiedPoints'] + scoreBreakdownTeam['teleopSpeakerNotePoints']
        amp = scoreBreakdownTeam['teleopAmpNotePoints']
        stage = scoreBreakdownTeam['endGameTotalStagePoints']
        foul = scoreBreakdownTeam['foulPoints']
        print(ttl)
        print(leave)
        print(speaker)
        print(amp)
        print(stage)
        print(foul)
        # print('match ended:')
        print("")
        print("--- winner ---")
        print(a['winning_alliance'])
    
    

# r=requests.get("https://www.thebluealliance.com/api/v3/team/frc3405", headers=head)
# print('-'*20)
# dat = r.json()
# print(dat['nickname'])