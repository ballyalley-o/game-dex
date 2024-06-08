from nba_api.stats.endpoints import alltimeleadersgrids
from nba_api.stats.endpoints import leagueleaders
from flask import Flask, jsonify

app = Flask(__name__)


alltime_stats = alltimeleadersgrids.AllTimeLeadersGrids()

@app.route('/stats/all-time/assists', methods=['GET'])
def get_stat_at_assist():
    return jsonify(alltime_stats.ast_leaders.get_data_frame().to_dict())


@app.route('/stats/all-time/points', methods=['GET'])
def get_stat_at_points():
    return jsonify(alltime_stats.pts_leaders.get_data_frame().to_dict())


@app.route('/stats/all-time/rebounds', methods=['GET'])
def get_stat_at_rebounds():
    return jsonify(alltime_stats.reb_leaders.get_data_frame().to_dict())

@app.route('/stats/all-time/steals', methods=['GET'])
def get_stat_at_steals():
    return jsonify(alltime_stats.stl_leaders.get_data_frame().to_dict())

@app.route('/stats/all-time/blocks', methods=['GET'])
def get_stat_at_blocks():
    return jsonify(alltime_stats.blk_leaders.get_data_frame().to_dict())

@app.route('/stats/all-time/turnovers', methods=['GET'])
def get_stat_at_turnovers():
    return jsonify(alltime_stats.tov_leaders.get_data_frame().to_dict())

@app.route('/stats/all-time/fgm', methods=['GET'])
def get_stat_at_fgm():
    return jsonify(alltime_stats.fgm_leaders.get_data_frame().to_dict())

@app.route('/stats/all-time/fga', methods=['GET'])
def get_stat_at_fga():
    return jsonify(alltime_stats.fga_leaders.get_data_frame().to_dict())


stats = leagueleaders.LeagueLeaders()

@app.route('/stats/leaders', methods=['GET'])
def get_stat_leaders():
    return jsonify( stats.league_leaders.get_json())

if __name__ == '__main__':
    app.run(port=5000)
