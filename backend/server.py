from flask import request, Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app, resources={r"/movie-app/*": {"origins": "*"}})


@app.route('/', methods=['GET','POST'])
def get_response():
    if request.method == 'POST' :
        print(request.form)
        text = "hello world"
        return jsonify(text)
    else :
        error_message = "You have reloaded the page, hence forcing the backend server to send this message. \n"
        error_message+= "Please close the app with ctrl-c (or command-c) in the terminal on both the server and the app \n"
        error_message+= "And restart it in you terminal using :\n"
        error_message+= "** in movie-app : yarn start \n"
        error_message+= "** in back end: flask run -h localhost -p 3000"
        error_message+= "\n \n \n Our apologies for the inconvenience"
        return jsonify(error_message)

if __name__ == '__main__':
    app.run(host="localhost", port=3000, debug=True)