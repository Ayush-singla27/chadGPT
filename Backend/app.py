
# from gtts import gTTS
# # import wikipedia as wk
# from playsound import playsound
# # from time import sleep
# # import multiprocessing as mp
# import os
# import requests
# import json

# API_KEY = "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"
# API_ENDPOINT = "https://api.openai.com/v1/chat/completions"

# def generate_chat_completion(messages, model="gpt-3.5-turbo", temperature=1, max_tokens=None):
#     headers = {
#         "Content-Type": "application/json",
#         "Authorization": f"Bearer {API_KEY}",
#     }

#     data = {
#         "model": model,
#         "messages": messages,
#         "temperature": temperature,
#     }

#     if max_tokens is not None:
#         data["max_tokens"] = max_tokens

#     response = requests.post(API_ENDPOINT, headers=headers, data=json.dumps(data))

#     if response.status_code == 200:
#         return response.json()["choices"][0]["message"]["content"]
#     else:
#         raise Exception(f"Error {response.status_code}: {response.text}")
# # messages = [
# #     {"role": "user","content": "Translate the following English text to French: 'Hello, how are you?'"}
# # ]
# # messages = [
# #     {"role": "system", "content": "You are a helpful assistant."},
# #     {"role": "user", "content": "Translate the following English text to French: 'Hello, how are you?'"}
# # ]
# # messages = []
# # messages.append("what is solar system?")
# # response_text = generate_chat_completion(messages)
# # print(response_text)
# import openai
# openai.api_key="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"
# import speech_recognition as s_r
# print(s_r.__version__) # just to print the version not required
# r = s_r.Recognizer()
# my_mic = s_r.Microphone(device_index=1) #my device index is 1, you have to put your device index
# with my_mic as source:
#     print("Say now!!!!")
#     audio = r.listen(source) #take voice input from the microphone
#     print(type(audio))
# temp = r.recognize_google(audio)
# print(temp)
# messages = [
#     {"role":"user","content":"give me the language of the following text:"+(temp)}
# ]
# response_text = generate_chat_completion(messages)
# print(response_text)

# messages = [
#     {"role":"system","content":"convert this in english but use letters of english:"+(temp)}
# ]
# response_text = generate_chat_completion(messages)
# # print(response_text)

# # info = "हम क्यों एक राष्ट्रीय अंतरिक्ष को पहले पेज पर अपडेट करते हैं?"
# audio_info = gTTS(text=response_text, lang = "en", slow=False)
# audio_info.save('audio.mp3')
# playsound('audio.mp3')