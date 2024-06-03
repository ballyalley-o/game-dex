from nba_api.stats.endpoints import alltimeleadersgrids
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/stats/all-time/assist', methods=['GET'])
def get_stat_at_assist():
    alltime_stats = alltimeleadersgrids.AllTimeLeadersGrids()
    all_time = alltimeleadersgrids.AllTimeLeadersGrids()

    return jsonify(alltime_stats.ast_leaders.get_data_frame().to_dict())


@app.route('/stats/all-time/points', methods=['GET'])
def get_stat_at_points():
    alltime_stats = alltimeleadersgrids.AllTimeLeadersGrids()
    all_time = alltimeleadersgrids.AllTimeLeadersGrids()

    return jsonify(alltime_stats.pts_leaders.get_data_frame().to_dict())

if __name__ == '__main__':
    app.run(port=5000)
