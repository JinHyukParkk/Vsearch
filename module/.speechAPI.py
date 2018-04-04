import io
import os

# Imports the Google Cloud client library
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types

# print("====Start shell Script====")
# os.system("./shell/convertVoiveFile.sh") < - go 실행파일 실행해서 flac 파일들을 텍스트로 변환시켜야함

# Instantiates a client
def SpeechAPI():
    print("====Create Client====")
    client = speech.SpeechClient()

    # The name of the audio file to transcribe
    index = 0
    results = []
    while True:
        pathFile = "./audioFile_python/result" + str(index) + ".flac"
        print(pathFile)
        # Loads the audio into memory
        try:
            with io.open(pathFile, 'rb') as audio_file:
                content = audio_file.read()
                audio = types.RecognitionAudio(content=content)
        except FileNotFoundError:
            print("End File")
            break
        config = types.RecognitionConfig(
            encoding=enums.RecognitionConfig.AudioEncoding.FLAC,
            sample_rate_hertz=16000,
            language_code='en-US')

        # Detects speech in the audio file
        response = client.recognize(config, audio)
        print(response.results)
        index += 1

        if not response.results:
            results.append('')
            continue
        result_str =""
        for result in response.results:
            result_str = result_str + format(result.alternatives[0].transcript) 
            print(result_str)
        results.append(result_str)
    return results


