from nba_api.stats.endpoints import playerawards, playercareerstats, drafthistory, commonplayerinfo, teaminfocommon
from nba_api.stats.static import players as players_static, teams as teams_static
from nba_api.stats.endpoints import alltimeleadersgrids, assistleaders, leagueleaders, franchiseleaders, ScoreboardV2, FranchisePlayers, FranchiseHistory, GameRotation, VideoDetails, CommonAllPlayers, PlayerFantasyProfileBarGraph, SynergyPlayTypes, PlayerCompare, TeamDetails, PlayerGameStreakFinder, LeagueGameFinder, PlayerVsPlayer
import requests


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


@app.route('/player/<int:player_id>/vs/<int:vs_player_id>', methods=['GET'])
def get_player_vs_player(player_id, vs_player_id):
    """
    Retrieves the head-to-head statistics between two players.

    Parameters:
    player_id (int): The ID of the first player.
    vs_player_id (int): The ID of the second player.

    Returns:
    dict: A dictionary containing the head-to-head statistics between the two players.

    """

    season = request.args.get('season', '2023-24')
    last_n_games = request.args.get('last_n_games', 0)
    measure_type_detailed_defense = request.args.get('measure_type_detailed_defense', 'Base')
    month = request.args.get('month', 0)
    opponent_team_id = request.args.get('opponent_team_id')
    pace_adjust = request.args.get('pace_adjust', 'N')
    per_mode_detailed = request.args.get('per_mode_detailed', 'Totals')
    period = request.args.get('period', 0)
    plus_minus = request.args.get('plus_minus', 'N')
    rank = request.args.get('rank', 'N')
    season_type_playoffs = request.args.get('season_type_playoffs')
    date_from_nullable = request.args.get('date_from_nullable')
    date_to_nullable = request.args.get('date_to_nullable')
    game_segment_nullable = request.args.get('game_segment_nullable')
    location_nullable = request.args.get('location_nullable')
    outcome_nullable = request.args.get('outcome_nullable')
    season_segment_nullable = request.args.get('season_segment_nullable')
    vs_conference_nullable = request.args.get('vs_conference_nullable'),
    vs_division_nullable = request.args.get('vs_division_nullable')

    try:
        player_vs_player = PlayerVsPlayer(
            player_id=player_id,
            vs_player_id=vs_player_id,
            season=season,
            last_n_games=last_n_games,
            measure_type_detailed_defense=measure_type_detailed_defense,
            month=month,
            opponent_team_id=opponent_team_id,
            pace_adjust=pace_adjust,
            per_mode_detailed=per_mode_detailed,
            period=period,
            plus_minus=plus_minus,
            rank=rank,
            season_type_playoffs=season_type_playoffs,
            date_from_nullable=date_from_nullable,
            date_to_nullable=date_to_nullable,
            game_segment_nullable=game_segment_nullable,
            league_id_nullable=league_id_nullable,
            location_nullable=location_nullable,
            outcome_nullable=outcome_nullable,
            season_segment_nullable=season_segment_nullable,
            vs_conference_nullable=vs_conference_nullable,
            vs_division_nullable=vs_division_nullable
        )
        player_vs_player_json = player_vs_player.get_normalized_json()

        return player_vs_player_json

    except requests.exceptions.RequestException as e:
        app.logger.error(f"API request failed: {e}")
        return jsonify({"error": "Failed to fetch player vs player data"}), 500

    except Exception as e:
        app.logger.error(f"An error occurred: {e}")
        return jsonify({"error": "An internal error occurred"}), 500


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

@app.route('/team/<int:team_id>/detail', methods=['GET'])
def get_teams_details_all(team_id):
    """
    Retrieves all teams details from the database and returns them as a JSON response.

    Returns:
        A JSON response containing all teams.
    """
    try:
        team_details = TeamDetails(team_id).get_normalized_json()

        return team_details

    except requests.exceptions.RequestException as e:
        app.logger.error(f"API request failed: {e}")
        return jsonify({"error": "Failed to fetch team details"}), 500

    except Exception as e:
        app.logger.error(f"An error occurred: {e}")
        return jsonify({"error": "An internal error occurred"}), 500

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

@app.route('/team/<int:team_id>/info', methods=['GET'])
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


# franchise

@app.route('/franchise/leader', methods=['GET'])
def get_franchise_leader():
    """
    Retrieves the franchise leader data for a specific team.

    Parameters:
    - team_id (str): The ID of the team. Defaults to '1610612737' (Atlanta Hawks).
    - league_id_nullable (str): The ID of the league. Defaults to '00' (NBA).

    Returns:
    - franchise_json (str): The franchise leader data in JSON format.
    """
    team_id = request.args.get('team_id', '1610612737')
    league_id_nullable = request.args.get('league_id_nullable', '00')

    franchise = franchiseleaders.FranchiseLeaders(
        team_id=team_id,
        league_id_nullable=league_id_nullable
    )
    franchise_json = franchise.get_normalized_json()



    return franchise_json

@app.route('/franchise/player', methods=['GET'])
def get_franchise_players():
    """
    Retrieves franchise players data based on the provided team ID and league ID.

    Returns:
        JSON: The franchise players data in JSON format.

    Raises:
        requests.exceptions.RequestException: If the API request fails.
        Exception: If an internal error occurs.
    """

    try:
        team_id = request.args.get('team_id', '1610612737')
        league_id = request.args.get('league_id_nullable', '00')

        franchise_player = FranchisePlayers(
            league_id=league_id,
            team_id=team_id
        )
        franchise_player_json = franchise_player.get_normalized_json()

        # example of getting the data in dictionary format:
        # franchise_players_json = franchise_players.get_normalized_dict()
        # for player in data['FranchisePlayers']:
        #     print(f"Player: {player['PLAYER']}, Games Played: {player['GP']}, FGM: {player['FGM']}, FGA: {player['FGA']}, FG%: {player['FG_PCT']}")


        return franchise_player_json

    except requests.exceptions.RequestException as e:
        app.logger.error(f"API request failed: {e}")
        return jsonify({"error": "Failed to fetch scoreboard data"}), 500

    except Exception as e:
        app.logger.error(f"An error occurred: {e}")
        return jsonify({"error": "An internal error occurred"}), 500

@app.route('/franchise/history', methods=['GET'])
def get_franchise_history():
    """
    Retrieves the franchise history data for all teams.

    Parameters:
    - team_id (str): The ID of the team. Defaults to '1610612737' (Atlanta Hawks).
    - league_id_nullable (str): The ID of the league. Defaults to '00' (NBA).

    Returns:
    - franchise_json (str): The franchise history data in JSON format.
    """
    league_id = request.args.get('league_id', '00')

    franchise_history = FranchiseHistory(
        league_id=league_id
    )
    franchise_history_json = franchise_history.get_normalized_json()

    return franchise_history_json

# rotation
@app.route('/rotation', methods=['GET'])
def get_game_rotation():
    """
    Retrieves the game rotation data for a specific game.

    Parameters:
    - game_id (int): The ID of the game.

    Returns:
    - rotation_json (str): The game rotation data in JSON format.
    """
    try:
        game_id = request.args.get('game_id', '0042300401' )
        league_id = request.args.get('league_id', '00')

        rotation = GameRotation(
            game_id=game_id,
            league_id=league_id
            )

        rotation_json = rotation.get_normalized_json()

        return rotation_json

    except requests.exceptions.RequestException as e:
        app.logger.error(f"API request failed: {e}")
        return jsonify({"error": "Failed to fetch scoreboard data"}), 500

    except Exception as e:

        app.logger.error(f"An error occurred: {e}")
        return jsonify({"error": "An internal error occurred"}), 500

# common all player
@app.route('/common/all/player', methods=['GET'])
def get_common_all_player():
    """
    Retrieves the common all player data from the NBA API.

    Returns:
        dict: A dictionary containing the common all player data.
    """
    common_all_player = CommonAllPlayers()
    common_all_player_json = common_all_player.get_normalized_json()

    return common_all_player_json

# fantasy profile
@app.route('/player/<int:player_id>/fantasy', methods=['GET'])
def get_player_fantasy_profile(player_id):
    """
    Retrieves the fantasy profile of a specific player.

    Parameters:
    - player_id (int): The ID of the player.

    Returns:
    - fantasy_profile_json (str): The fantasy profile of the player in JSON format.

    """
    # player_id = request.args.get('player_id', '2544')

    player_fantasy_profile = PlayerFantasyProfileBarGraph(player_id)
    fantasy_profile_json = player_fantasy_profile.get_normalized_json()

    return fantasy_profile_json

# synergy playtypes
@app.route('/synergy/pt', methods=['GET'])
def get_synergy_playtypes():
    """
    Retrieves the synergy playtypes data from the NBA API.

    Returns:
        dict: A dictionary containing the synergy playtypes data.
    """

    league_id = request.args.get('league_id', '00')
    per_mode_simple = request.args.get('per_mode_simple', 'PerGame')
    player_or_team_abbreviation = request.args.get('player_or_team_abbreviation', 'Player')
    season_type_all_star = request.args.get('season_type_all_star', 'Regular Season')
    season = request.args.get('season', '2023-24')
    play_type_nullable = request.args.get('play_type_nullable', 'Transition')
    type_grouping_nullable = request.args.get('type_grouping_nullable', 'offensive')

    try:
        synergy_playtypes = SynergyPlayTypes(
            league_id=league_id,
            per_mode_simple=per_mode_simple,
            # player_or_team_abbreviation=player_or_team_abbreviation,
            # season_type_all_star=season_type_all_star,
            season=season,
            play_type_nullable=play_type_nullable,
            type_grouping_nullable=type_grouping_nullable
        )
        synergy_playtypes_json = synergy_playtypes.get_normalized_json()

        return synergy_playtypes_json

    except requests.exceptions.RequestException as e:

        app.logger.error(f"API request failed: {e}")
        return jsonify({"error": "Failed to fetch synergy playtypes data"}), 500

    except Exception as e:

        app.logger.error(f"An error occurred: {e}")
        return jsonify({"error": "An internal error occurred"}), 500

# player compare
@app.route('/compare', methods=['GET'])
def get_compare_player():
    """
    Retrieves and compares player data based on the provided parameters.

    Returns:
        JSON: The compared player data in JSON format.

    Raises:
        RequestException: If there is an error in making the API request.
        Exception: If there is an internal error.

    """
    player_id_list = request.args.get('player_id_list', '2544')
    vs_player_id_list = request.args.get('vs_player_id_list', '201939')
    last_n_games = request.args.get('last_n_games', 0)
    measure_type_detailed_defense = request.args.get('measure_type_detailed_defense', 'Base')
    month = request.args.get('month', 0)
    opponent_team_id = request.args.get('opponent_team_id')
    pace_adjust = request.args.get('pace_adjust', 'N')
    per_mode_detailed = request.args.get('per_mode_detailed', 'Totals')
    period = request.args.get('period', 0)
    plus_minus = request.args.get('plus_minus', 'N')
    rank = request.args.get('rank', 'N')
    season = request.args.get('season', '2023-24')
    season_type_playoffs = request.args.get('season_type_playoffs', 'Regular Season')
    conference_nullable = request.args.get('conference_nullable')
    date_from_nullable = request.args.get('date_from_nullable')
    date_to_nullable = request.args.get('date_to_nullable')
    division_simple_nullable = request.args.get('division_simple_nullable')
    game_segment_nullable = request.args.get('game_segment_nullable')
    league_id_nullable = request.args.get('league_id_nullable')
    location_nullable = request.args.get('location_nullable')
    outcome_nullable = request.args.get('outcome_nullable')
    season_segment_nullable = request.args.get('season_segment_nullable')
    shot_clock_range_nullable = request.args.get('shot_clock_range_nullable')
    vs_conference_nullable = request.args.get('vs_conference_nullable')
    vs_division_nullable = request.args.get('vs_division_nullable')

    try:
        compare_players = PlayerCompare(
            player_id_list=player_id_list,
            vs_player_id_list=vs_player_id_list,
            last_n_games=last_n_games,
            measure_type_detailed_defense=measure_type_detailed_defense,
            month=month,
            opponent_team_id=opponent_team_id,
            pace_adjust=pace_adjust,
            per_mode_detailed=per_mode_detailed,
            period=period,
            plus_minus=plus_minus,
            rank=rank,
            season=season,
            season_type_playoffs=season_type_playoffs,
            conference_nullable=conference_nullable,
            date_from_nullable=date_from_nullable,
            date_to_nullable=date_to_nullable,
            division_simple_nullable=division_simple_nullable,
            game_segment_nullable=game_segment_nullable,
            league_id_nullable=league_id_nullable,
            location_nullable=location_nullable,
            outcome_nullable=outcome_nullable,
            season_segment_nullable=season_segment_nullable,
            shot_clock_range_nullable=shot_clock_range_nullable,
            vs_conference_nullable=vs_conference_nullable,
            vs_division_nullable=vs_division_nullable
        )
        compare_players_json = compare_players.get_normalized_json()

        return compare_players_json

    except requests.exceptions.RequestException as e:
        app.logger.error(f"API request failed: {e}")
        return jsonify({"error": "Failed to fetch player compare data"}), 500

    except Exception as e:
        app.logger.error(f"An error occurred: {e}")
        return jsonify({"error": "An internal error occurred"}), 500

@app.route('/game', methods=['GET'])
def get_game():
    """
    Retrieves information about a specific game.

    Parameters:
    - game_id (int): The ID of the game.

    Returns:
    - game_json (str): The game details in JSON format.
    """
    player_or_team_abbreviation = request.args.get('player_or_team_abbreviation', 'T')
    league_id_nullable = request.args.get('league_id_nullable', '00')
    season_type_nullable = request.args.get('season_type_nullable', 'Regular Season')
    season_nullable = request.args.get('season_nullable', '2006-07')

    game_details = LeagueGameFinder(
        player_or_team_abbreviation=player_or_team_abbreviation,
        league_id_nullable=league_id_nullable,
        season_nullable=season_nullable,
        season_type_nullable=season_type_nullable,
        # team_id_nullable='1610612737',
        # vs_team_id_nullable='1610612738',
        # outcome_nullable='W',
        # location_nullable='Home',
        # date_from_nullable='2023-10-01',
        # date_to_nullable='2024-06-01',
        # game_segment_nullable='First Half',
        # period_nullable=0,
        # shot_clock_range_nullable='24-22',
        # last_n_seconds_nullable=0,
        # game_scope_simple_nullable='Wins',
        # game_scope_advanced_nullable='Wins',
        # player_scope_nullable='All Players',
        # player_scope_team_id_nullable='1610612737',
        # player_scope_player_id='2544'
    )
    game_json = game_details.get_normalized_json()

    return game_json

@app.route('/streak/finder', methods=['GET'])
def get_streak_finder():
    """
    Retrieves the player game streak finder data from the NBA API.

    Returns:
        dict: A dictionary containing the player game streak finder data.
    """

    league_id_nullable = request.args.get('league_id_nullable', '00')
    season_nullable = request.args.get('season_nullable', '2023-24')
    season_type_nullable = request.args.get('season_type_nullable', 'Regular Season')
    last_n_games_nullable = request.args.get('last_n_games_nullable', 0)
    measure_type_detailed_nullable = request.args.get('measure_type_detailed_nullable', 'Base')
    date_from_nullable = request.args.get('date_from_nullable')
    date_to_nullable = request.args.get('date_to_nullable')
    opponent_team_id_nullable = request.args.get('opponent_team_id_nullable')
    vs_conference_nullable = request.args.get('vs_conference_nullable')
    vs_division_nullable = request.args.get('vs_division_nullable')
    game_segment_nullable = request.args.get('game_segment_nullable')
    period_nullable = request.args.get('period_nullable', 0)
    shot_clock_range_nullable = request.args.get('shot_clock_range_nullable')
    last_n_seconds_nullable = request.args.get('last_n_seconds_nullable', 0)
    game_scope_simple_nullable = request.args.get('game_scope_simple_nullable')
    game_scope_advanced_nullable = request.args.get('game_scope_advanced_nullable')
    player_scope_nullable = request.args.get('player_scope_nullable')
    player_scope_team_id_nullable = request.args.get('player_scope_team_id_nullable')
    player_scope_player_id = request.args.get('player_scope_player_id', '2544')


    try:
        player_game_streak_finder = PlayerGameStreakFinder(
            player_id_nullable=player_scope_player_id,
        #     league_id_nullable=league_id_nullable,
        #     season_nullable=session_nullable,
        #     season_type_nullable=season_type_nullable,
        #     last_n_games_nullable=last_n_games_nullable,
        #     measure_type_detailed_nullable=measure_type_detailed_nullable,
        #     date_from_nullable=date_from_nullable,
        #     date_to_nullable=date_to_nullable,
        #     opponent_team_id_nullable=opponent_team_id_nullable,
        #     vs_conference_nullable=vs_conference_nullable,
        #     vs_division_nullable=vs_division_nullable,
        #     game_segment_nullable=game_segment_nullable,
        #     period_nullable=period_nullable,
        #     shot_clock_range_nullable=shot_clock_range_nullable,
        #     last_n_seconds_nullable=last_n_seconds_nullable,
        #     game_scope_simple_nullable=game_scope_simple_nullable,
        #     game_scope_advanced_nullable=game_scope_advanced_nullable,
        #     player_scope_nullable=player_scope_nullable,
        #     player_scope_team_id_nullable=player_scope_team_id_nullable,
        #     player_scope_player_id = player_scope_player_id
        )
        player_game_streak_finder_json = player_game_streak_finder.get_normalized_json()

        return player_game_streak_finder_json
    except requests.exceptions.RequestException as e:
        app.logger.error(f"API request failed: {e}")
        return jsonify({"error": "Failed to fetch player game streak finder data"}), 500
    except Exception as e:
        app.logger.error(f"An error occurred: {e}")
        return jsonify({"error": "An internal error occurred"}), 500


# video
@app.route('/video/detail', methods=['GET'])
def get_video_details():
    """
    Retrieves the video details for a specific video.

    Parameters:
    - video_id (int): The ID of the video.

    Returns:
    - video_json (str): The video details in JSON format.
    """
    team_id = request.args.get('team_id', '1610612747')
    player_id = request.args.get('player_id', '2544')
    clutch_time_nullable = request.args.get('clutch_time_nullable', 'Last 5 Minutes')
    # video_id = request.args.get('video_id', '0022000001')
    # game_id = request.args.get('game_id', '0022000001')
    # vs_division_nullable = request.args.get('vs_division_nullable', 'Atlantic')
    # opponent_team_id = request.args.get('opponent_team_id', '1610612738')
    # period = request.args.get('period', 0)
    # season = request.args.get('season', '2023-24')
    # ahead_behind_nullable = request.args.get('ahead_behind_nullable', 'Ahead or Behind')
    # season_type_all_star = request.args.get('season_type_all_star', 'Regular Season')
    # context_measure_detailed = request.args.get('context_measure_detailed', 'PTS')
    # end_period_nullable = request.args.get('end_period_nullable', 0)
    # end_range_nullable = request.args.get('end_range_nullable', 0)
    # game_segment_nullable = request.args.get('game_segment_nullable', 'First Half')
    # location_nullable = request.args.get('location_nullable', 'Home')
    # outcome_nullable = request.args.get('outcome_nullable', 'W')
    # point_diff_nullable = request.args.get('point_diff_nullable', 0)
    # position_nullable = request.args.get('position_nullable', 'F')
    # range_type_nullable = request.args.get('range_type_nullable', '0-3 Feet - Very Tight')
    # rookie_year_nullable = request.args.get('rookie_year_nullable', '2023-24')
    # season_segment_nullable = request.args.get('season_segment_nullable', 'Pre All-Star')
    # start_period_nullable = request.args.get('start_period_nullable', 0)
    # start_range_nullable = request.args.get('start_range_nullable', 0)
    # vs_conference_nullable  = request.args.get('vs_conference_nullable', 'East')


    video_details = VideoDetails(
        team_id=team_id,
        player_id=player_id,
        clutch_time_nullable=clutch_time_nullable,
        # video_id=video_id,
        # context_measure_detailed=context_measure_detailed,
        # last_n_games=LastNGames.default,
        # month=Month.default,
        # opponent_team_id=opponent_team_id,
        # period=period,
        # season=season,
        # season_type_all_star=season_type_all_star,
        # ahead_behind_nullable=ahead_behind_nullable,
        # context_filter_nullable="",
        # date_from_nullable="",
        # date_to_nullable="",
        # end_period_nullable=end_period_nullable,
        # end_range_nullable=end_range_nullable,
        # game_id_nullable=game_id,
        # game_segment_nullable=game_segment_nullable,
        # league_id_nullable=league_id_nullable,
        # location_nullable=location_nullable,
        # outcome_nullable=outcome_nullable,
        # point_diff_nullable=point_diff_nullable,
        # position_nullable=position_nullable,
        # range_type_nullable=range_type_nullable,
        # rookie_year_nullable=rookie_year_nullable,
        # season_segment_nullable=season_segment_nullable,
        # start_period_nullable=start_period_nullable,
        # start_range_nullable=start_range_nullable,
        # vs_conference_nullable=vs_conference_nullable,
        # vs_division_nullable=vs_division_nullable,
    )
    video_json = video_details.get_normalized_json()

    return video_json

# scoreboard

@app.route('/scoreboard', methods=['GET'])
def get_scoreboard():
    """
    Retrieves the scoreboard data from the NBA API.

    Returns:
        dict: A dictionary containing the scoreboard data.
    """
    try:
        game_date = request.args.get('game_date', '2024-06-09')
        league_id = request.args.get('league_id', '00')
        day_offset = request.args.get('day_offset', 0)

        # game_date=(datetime.datetime.now() + datetime.timedelta(days=day_offset)).strftime('%Y-%m-%d'),
        games = ScoreboardV2(
            day_offset=day_offset,
            game_date=game_date,
            league_id=league_id,
            proxy=None,
            headers=None,
            timeout=30,
            get_request=True,
        )
        games_data = games.get_normalized_json()
        return games_data

    except requests.exceptions.RequestException as e:
        app.logger.error(f"API request failed: {e}")
        return jsonify({"error": "Failed to fetch scoreboard data"}), 500

    except Exception as e:

        app.logger.error(f"An error occurred: {e}")
        return jsonify({"error": "An internal error occurred"}), 500


if __name__ == '__main__':
    app.run(port=5001)
