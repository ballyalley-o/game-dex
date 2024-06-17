from datetime import datetime
from nba_api.stats.endpoints import LeagueGameFinder

class GameDate:
    def get_date_format(self, datetime):
        return str(datetime.date())

    def get_date(self, year, month, day):
        return str(datetime(year=year, month=month, day=day).date())

    default = str(datetime.now().date())


def get_game_ids_by_player(player_id, season, league_id='00'):
    """
    Retrieves game IDs for a specific player and season.

    Parameters:
    player_id (int): The unique identifier of the player.
    season (str): The season (e.g., '2023-24').
    league_id (str): The league ID, default is '00' for NBA.

    Returns:
    list: A list of game IDs.
    """
    game_finder = LeagueGameFinder(player_id_nullable=player_id, season_nullable=season, league_id_nullable=league_id)
    games = game_finder.get_normalized_dict()
    game_ids = [game['GAME_ID'] for game in games['LeagueGameFinderResults']]
    return game_ids