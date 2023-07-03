from flask import Flask, request, send_file
from gtts import gTTS
import speech_recognition as sr
import requests
import json
import os
from pydub import AudioSegment
from flask_cors import CORS
from flask import jsonify
from waitress import serve

import os
from dotenv import load_dotenv
load_dotenv('.env')
API_KEY = os.getenv('APIKEY')



app = Flask(__name__)
CORS(app)

API_ENDPOINT = "https://api.openai.com/v1/chat/completions"
base_url = "http://localhost:5000"

def generate_chat_completion(messages, model="gpt-3.5-turbo", temperature=1, max_tokens=None):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}",
    }

    data = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
    }

    if max_tokens is not None:
        data["max_tokens"] = max_tokens

    response = requests.post(API_ENDPOINT, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")

@app.route('/submit_form', methods=['POST'])
def submit_form():
    # Retrieve the audio file from the form data
    audio_file = request.files['audio']
    lang = request.form.get('selectedLanguage')
    
    # Save the audio file temporarily
    audio_path = 'temp_audio.wav'
    audio_file.save(audio_path)

    # Convert audio to WAV format if needed
    audio = AudioSegment.from_file(audio_path)
    if audio.channels != 1 or audio.sample_width != 2:
        audio = audio.set_channels(1)
        audio = audio.set_sample_width(2)
    audio.export(audio_path, format='wav')
    # Convert audio to text
    r = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio = r.record(source)
        text = r.recognize_google(audio)
    print(lang+"hiiiiiii")
    print(text)
    # Translate the text using OpenAI API
    messages = [
        {"role": "user", "content": "Translate the following text in"+lang+ ": " + text}
    ]
    translated_text = generate_chat_completion(messages)
    print(translated_text)
    # Convert translated text to audio
    translated_audio_path = 'translated_audio.wav'
    tts = gTTS(text=translated_text, lang='en', slow=False)
    tts.save(translated_audio_path)

    # Remove temporary audio file
    os.remove(audio_path)
    return send_file(translated_audio_path, mimetype='audio/wav', as_attachment=True) 

@app.route('/askqns', methods=['POST'])
def askqns():
    # Retrieve the audio file from the form data
    audio_file = request.files['audio']
    # lang = request.form.get('selectedLanguage')
    
    # Save the audio file temporarily
    audio_path = 'temp_audio.wav'
    audio_file.save(audio_path)

    # Convert audio to WAV format if needed
    audio = AudioSegment.from_file(audio_path)
    if audio.channels != 1 or audio.sample_width != 2:
        audio = audio.set_channels(1)
        audio = audio.set_sample_width(2)
    audio.export(audio_path, format='wav')
    # Convert audio to text
    r = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio = r.record(source)
        text = r.recognize_google(audio)
    # print(lang+"hiiiiiii")
    print(text)
    # Translate the text using OpenAI API
    messages = [
        {"role": "user", "content": text}
    ]
    translated_text = generate_chat_completion(messages)
    print(translated_text)
    # Convert translated text to audio
    translated_audio_path = 'translated_audio.wav'
    tts = gTTS(text=translated_text, lang='en', slow=False)
    tts.save(translated_audio_path)

    # Remove temporary audio file
    os.remove(audio_path)

    return send_file(translated_audio_path, mimetype='audio/wav', as_attachment=True)


if __name__ == '__main__':
    serve(app,host='13.228.225.19' , port=80 , threads =2)
    # app.run(host='localhost', port=5000) 
