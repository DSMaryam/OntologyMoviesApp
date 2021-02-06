from flask import request, Flask, jsonify
from flask_cors import CORS
import json
from api import get_imdb_ids, parse_request

app = Flask(__name__)
cors = CORS(app, resources={r"/movie-app/*": {"origins": "*"}})


@app.route("/", methods=["GET", "POST"])
def get_response():
    if request.method == "POST":
        request_dict = json.loads(list(request.form.keys())[0])
        parsed_request = parse_request(request_dict)
        print(parsed_request)
        # TODO :
        # get the list of movie imdb ids from the request
        imdb_ids = get_imdb_ids(parsed_request)
        return jsonify(imdb_ids)
    else:
        error_message = """<html><body><center>"""
        error_message = """<center><h2>OUPS YOU HAVE RELOADED THE PAGE</h2></center>"""
        error_message += """<p>Please close the app with ctrl-c (or command-c) in the terminal on both the server and the app </p>"""
        error_message += """<p>And restart it in you terminal using :</p>"""
        error_message += """<h3>in movie-app : </h3>"""
        error_message += """<p><code>yarn start </code></p>"""
        error_message += """<h3>in backend: </h3>"""
        error_message += """<p><code>flask run -h localhost -p 3000 </code></p>"""
        error_message += """<p></p>"""
        error_message += """<p></p>"""
        error_message += (
            """<center><h3>Our apologies for the inconvenience</h3></center>"""
        )
        error_message += """</center></body></html>"""
        return error_message


if __name__ == "__main__":
    app.run(host="localhost", port=3000, debug=True)
