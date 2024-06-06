from nba_api.stats.static import players as players_static, teams as teams_static
from nba_api.stats.endpoints import playerawards, playercareerstats, drafthistory, commonplayerinfo, teaminfocommon

from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/players', methods=['GET'])
def get_players_all():
    """
    Retrieve all players.

    Returns:
        A JSON response containing all players.
    """
    players_all = players_static.get_players()
    return jsonify(players_all)

@app.route('/players/find', methods=['GET'])
def get_player():
    """
    Retrieves information about a specific player.

    Returns:
        A JSON response containing information about the player.
    """
    lebron = players_static.find_players_by_full_name("Lebron James")

    return jsonify(lebron)


@app.route('/players/info/<int:player_id>', methods=['GET'])
def get_player_info(player_id):
    """
    Retrieve information about a specific player.

    Args:
        player_id (int): The ID of the player.

    Returns:
        dict: A dictionary containing the player's information.
    """
    player_info = commonplayerinfo.CommonPlayerInfo(player_id)
    player_full_info = player_info.get_dict()

    return player_full_info

@app.route('/players/awards/<int:player_id>', methods=['GET'])
def get_player_awards(player_id):
    """
    Retrieve the awards of a specific player.

    Args:
        player_id (int): The ID of the player.

    Returns:
        dict: A dictionary containing the player's awards in JSON format.
    """
    player_awards = playerawards.PlayerAwards(player_id)
    player_awards_all = player_awards.get_json()

    return player_awards_all

@app.route('/players/career/<int:player_id>', methods=['GET'])
def get_player_career(player_id):
    """
    Retrieves the career statistics of a player based on their player ID.

    Parameters:
    player_id (int): The unique identifier of the player.

    Returns:
    dict: A dictionary containing the career statistics of the player in JSON format.
    """
    player_career_stats = playercareerstats.PlayerCareerStats(player_id)
    player_career_stats_all = player_career_stats.get_json()

    return player_career_stats_all


# teams

@app.route('/teams', methods=['GET'])
def get_teams_all():
    """
    Retrieves all teams from the database and returns them as a JSON response.

    Returns:
        A JSON response containing all teams.
    """
    teams_all = teams_static.get_teams()
    return jsonify(teams_all)

@app.route('/teams/find/<string:abbv>', methods=['GET'])
def get_team(abbv):
    """
    Retrieves the team information based on the given abbreviation.

    Parameters:
    abbv (str): The abbreviation of the team.

    Returns:
    dict: The team information as a dictionary.

    """
    team_abbv = teams_static.find_team_by_abbreviation(abbv)
    return jsonify(team_abbv)

@app.route('/teams/info/<int:team_id>', methods=['GET'])
def get_team_info(team_id):
    """
    Retrieves information about a specific NBA team.

    Parameters:
    team_id (int): The ID of the team.

    Returns:
    dict: A dictionary containing the full information of the team.
    """
    team_info = teaminfocommon.TeamInfoCommon(team_id)
    team_full_info = team_info.get_dict()

    return team_full_info


@app.route('/teams/draft', methods=['GET'])
def get_team_draft_info():
    """
    Retrieves the draft information for NBA teams.

    Returns:
        dict: A dictionary containing the draft information for NBA teams.
    """
    draaft_info = drafthistory.DraftHistory()
    draaft_full_info = draaft_info.get_json()

    return draaft_full_info

if __name__ == '__main__':
    app.run(port=5001)
