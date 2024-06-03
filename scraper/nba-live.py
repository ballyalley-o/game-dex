from nba_api.stats.endpoints import teamgamelogs
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.endpoints import alltimeleadersgrids

alltime_stats = alltimeleadersgrids.AllTimeLeadersGrids()
alltime_stats.ast_leaders.get_json()


player_id='2544'
# lebron = playercareerstats.PlayerCareerStats(player_id)
all_time = alltimeleadersgrids.AllTimeLeadersGrids()
# game = teamgamelogs.TeamGameLogs()


print(alltime_stats.ast_leaders.get_data_frame())

