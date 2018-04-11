import io
import os
import logging
# Imports the Google Cloud client library
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types
from log_python import log
# print("====Start shell Script====")
# os.system("./shell/convertVoiveFile.sh") < - go 실행파일 실행해서 flac 파일들을 텍스트로 변환시켜야함

# Instantiates a client


def SpeechAPI(pathFile, results, index):
    client = speech.SpeechClient()
    # The name of the audio file to transcribe
    # Loads the audio into memory
    try:
        with io.open(pathFile, 'rb') as audio_file:
            content = audio_file.read()
            audio = types.RecognitionAudio(content=content)
    except FileNotFoundError:
        return

    try:
        config = types.RecognitionConfig(
            encoding=enums.RecognitionConfig.AudioEncoding.FLAC,
            sample_rate_hertz=16000,
            language_code='en-US')

        # Detects speech in the audio file
        # operation = client.long_running_recognize(config, audio)
        # response = operation.result(timeout=90)
        response = client.recognize(config, audio)

        if not response.results:
            results[index]=""
            return
        result_str = ""
        for result in response.results:
            result_str = result_str + format(result.alternatives[0].transcript)
    
        results[index] = result_str
    except Exception as ex:
        log(ex,logging.error)
        
        