from nba_api.live.nba.endpoints import boxscore
from flask import Flask, jsonify

app = Flask(__name__)

game = boxscore.BoxScore(game_id='0022000046')

@app.route('/live/games', methods=['GET'])
def get_live_games():
    return jsonify(game.game_details.get_json())


if __name__ == '__main__':
    app.run(port=5002)
