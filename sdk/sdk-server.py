from nba_api.stats.endpoints import playerawards, playercareerstats, drafthistory, commonplayerinfo, teaminfocommon
from nba_api.stats.static import players as players_static, teams as teams_static
from nba_api.stats.endpoints import alltimeleadersgrids, assistleaders, leagueleaders

from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/player', methods=['GET'])
def get_players_all():
    """
    Retrieve all players.

    Returns:
        A JSON response containing all players.
    """
    players_all = players_static.get_players()
    return jsonify(players_all)

@app.route('/player/find', methods=['GET'])
def get_player():
    """
    Retrieves information about a specific player.

    Returns:
        A JSON response containing information about the player.
    """
    player = players_static.find_players_by_full_name("Lebron James")

    return jsonify(player)


@app.route('/player/<int:player_id>/info', methods=['GET'])
def get_player_info(player_id):
    """
    Retrieve information about a specific player.

    Args:
        player_id (int): The ID of the player.

    Returns:
        dict: A dictionary containing the player's information.
    """
    player_info = commonplayerinfo.CommonPlayerInfo(player_id)
    player_full_info = player_info.get_normalized_json()

    return player_full_info

@app.route('/player/<int:player_id>/award', methods=['GET'])
def get_player_awards(player_id):
    """
    Retrieve the awards of a specific player.

    Args:
        player_id (int): The ID of the player.

    Returns:
        dict: A dictionary containing the player's awards in JSON format.
    """
    player_awards = playerawards.PlayerAwards(player_id)
    player_awards_all = player_awards.get_normalized_json()

    return player_awards_all

@app.route('/player/<int:player_id>/career', methods=['GET'])
def get_player_career(player_id):
    """
    Retrieves the career statistics of a player based on their player ID.

    Parameters:
    player_id (int): The unique identifier of the player.

    Returns:
    dict: A dictionary containing the career statistics of the player in JSON format.
    """
    player_career_stats = playercareerstats.PlayerCareerStats(player_id)
    player_career_stats_all = player_career_stats.get_normalized_json()

    return player_career_stats_all


# teams

@app.route('/team', methods=['GET'])
def get_teams_all():
    """
    Retrieves all teams from the database and returns them as a JSON response.

    Returns:
        A JSON response containing all teams.
    """
    teams_all = teams_static.get_teams()
    return jsonify(teams_all)

@app.route('/team/find/<string:abbv>', methods=['GET'])
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

@app.route('/team/info/<int:team_id>', methods=['GET'])
def get_team_info(team_id):
    """
    Retrieves information about a specific NBA team.

    Parameters:
    team_id (int): The ID of the team.

    Returns:
    dict: A dictionary containing the full information of the team.
    """
    team_info = teaminfocommon.TeamInfoCommon(team_id)
    team_full_info = team_info.get_normalized_json()

    return team_full_info

@app.route('/team/state/<string:state>', methods=['GET'])
def get_team_by_state(state):
    """
    Retrieves a list of NBA teams based on the specified state.

    Parameters:
    state (str): The state for which to retrieve the teams.

    Returns:
    list: A list of NBA teams located in the specified state.
    """
    team_state = teams_static.find_teams_by_state(state)

    return jsonify(team_state)


@app.route('/draft/history', methods=['GET'])
def get_team_draft_info():
    """
    Retrieves the draft information for NBA teams.

    Returns:
        dict: A dictionary containing the draft information for NBA teams.
    """
    draaft_info = drafthistory.DraftHistory()
    draaft_full_info = draaft_info.get_normalized_json()

    return draaft_full_info

# current leader module
@app.route('/leader', methods=['GET'])
def get_leader():
    """
    Retrieves the leader statistics based on the specified parameters.

    Parameters:
    - scope: The scope of the statistics (default: 'S')
    - season: The season to retrieve statistics for (default: '2023-24')
    - season_type_all_star: The type of season (default: 'Regular Season')
    - stat_category_abbreviation: The abbreviation of the statistical category (default: 'PTS')

    Returns:
    - leader_json: The leader statistics in JSON format
    """
    scope = request.args.get('scope', 'S')
    season = request.args.get('season', '2023-24')
    season_type_all_star = request.args.get('season_type_all_star', 'Regular Season')
    stat_category_abbreviation = request.args.get('stat_category_abbreviation', 'PTS')

    leader = leagueleaders.LeagueLeaders(
        scope = scope,
        season = season,
        season_type_all_star = season_type_all_star,
        stat_category_abbreviation = stat_category_abbreviation
    )
    leader_json = leader.get_normalized_json()

    return leader_json

@app.route('/leader/pt', methods=['GET'])
def get_leader_pt():
    """
    Retrieves the leader in points.

    Parameters:
        player_or_team (str): Specifies whether to retrieve the leader for a player or a team. Default is 'Team'.
        per_mode_simple (str): Specifies the calculation mode for the leader. Default is 'Totals'.

    Returns:
        dict: A JSON object containing the leader in points.
    """
    player_or_team = request.args.get('player_or_team', 'Team')
    per_mode_simple = request.args.get('per_mode_simple', 'Totals')

    all_time_assist = assistleaders.AssistLeaders(
        player_or_team = player_or_team,
        per_mode_simple = per_mode_simple,
    )
    all_tim_assist_json = all_time_assist.get_normalized_json()

    return all_tim_assist_json

@app.route('/leader/ast', methods=['GET'])
def get_leader_ast():
    """
    Retrieves the assist leaders in the NBA.

    Parameters:
    - player_or_team (str): Specifies whether to retrieve data for players or teams. Default is 'Team'.
    - per_mode_simple (str): Specifies the type of data to retrieve. Default is 'Totals'.

    Returns:
    - str: JSON string containing the assist leaders data.
    """
    player_or_team = request.args.get('player_or_team', 'Team')
    per_mode_simple = request.args.get('per_mode_simple', 'Totals')

    all_time_assist = assistleaders.AssistLeaders(
        player_or_team=player_or_team,
        per_mode_simple=per_mode_simple,
    )
    all_tim_assist_json = all_time_assist.get_normalized_json()

    return all_tim_assist_json



# all-time module
@app.route('/all-time/leader', methods=['GET'])
def get_all_time_leader():
    """
    Retrieves the all-time leader data from the NBA API.

    Returns:
        dict: A dictionary containing the all-time leader data.
    """
    all_time_leader = alltimeleadersgrids.AllTimeLeadersGrids()
    all_time = all_time_leader.get_normalized_json()

    return all_time

@app.route('/all-time/total', methods=['GET'])
def get_all_time_total():
    """
    Retrieves the all-time total statistics for NBA players.

    Returns:
        str: JSON string containing the all-time total statistics.
    """
    all_time_total = alltimeleadersgrids.AllTimeLeadersGrids(
        per_mode_simple='Totals',
    )
    all_time_total_json = all_time_total.get_normalized_json()

    return all_time_total_json




if __name__ == '__main__':
    app.run(port=5001)
