from nba_api.stats.endpoints import alltimeleadersgrids
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/all-time/leader', methods=['GET'])
def get_all_time_leader():

    all_time_leader = alltimeleadersgrids.AllTimeLeadersGrids()
    all_time = all_time_leader.get_normalized_json()

    return all_time


if __name__ == '__main__':
    app.run(port=5001)
