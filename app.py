from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import cohere

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

co = cohere.Client('mGClGZitOktIGTpSQWKANZdv2lVOl4CmjkGYsHOP') # This is your trial API key

@app.route('/', methods=['GET']) #this is going to be the default site path
def hello_world():
    return "<p>Hello, World!</p>"

@app.errorhandler(404) #this if they use some link that doesn't exist
def page_not_found(e):
	return "<h1>404</h1><p>The resource could not be found.</p>", 404

@app.route('/api', methods=['GET'])
@cross_origin()
def actualStuff():
    query_parameters = request.args
    search = query_parameters.get('search')
    print(search)
    response = co.generate(
    model='xlarge',
    prompt=f'Given a phrase, this program will generate a pick-up line complimenting a girl that uses that phrase.\n\nPhrase: Spotify\nPick-up Line: I ought to complain to Spotify for you not being named this week’s hottest single.\n--\nPhrase: Crime\nPick-up Line: If being sexy was a crime, you’d be guilty as charged.\n--\nPhrase: Wine\nPick-up Line: You’re like a fine wine. The more of you I drink in, the better I feel.\n--\nPhrase: Artist\nPick-up Line: I was wondering if you’re an artist because you were so good at drawing me in.\n--\nPhrase: {search}\nPick-up Line:',
    max_tokens=38,
    temperature=0.7,
    k=0,
    p=0.75,
    frequency_penalty=0,
    presence_penalty=0,
    stop_sequences=[],
    return_likelihoods='NONE')
    print('Prediction: {}'.format(response.generations[0].text))
    return jsonify(response.generations[0].text)

if __name__ == "__main__":
	app.run(debug=True)