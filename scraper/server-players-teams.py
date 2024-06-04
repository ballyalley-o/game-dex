from nba_api.stats.library.data import players, teams
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/players', methods=['GET'])
def get_players():
    return jsonify(players)

@app.route('/teams', methods=['GET'])
def get_teams():
    return jsonify(teams)

if __name__ == '__main__':
    app.run(port=5001)
