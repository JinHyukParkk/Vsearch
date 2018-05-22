from pydub import AudioSegment
from pydub.silence import split_on_silence, detect_nonsilent
from pydub.utils import db_to_float, ratio_to_db
import itertools
from nltk.stem.snowball import SnowballStemmer
import io

from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types
from log_python import log

def Processing(sentence):
    stemmer = SnowballStemmer("english")
    prev_words = sentence.split(' ')
    words = [stemmer.stem(word) for word in prev_words]

    sentence = ' '.join(words)
    return sentence

def find_silence_thresh(audio_segment, min_silence_len=500):
    seg_len = len(audio_segment)

    last_slice_start = seg_len - min_silence_len
    slice_starts = range(0,last_slice_start + 1, 1)
    print(slice_starts)
    if last_slice_start % 1:
        slice_starts = itertools.chain(slice_starts, [last_slice_start])
    detect_nonsilent(audio_segment)
    print("done")
    min_dbfs = db_to_float(-1) * audio_segment.max_possible_amplitude
    max_dbfs = db_to_float(-50) * audio_segment.max_possible_amplitude
    print("min_dbfs : " + str(min_dbfs))
    print("max_dbfs : " +   str(ratio_to_db(audio_segment.max_possible_amplitude)))
    print(int(audio_segment.dBFS-3))
    print(ratio_to_db(audio_segment.rms))
    # print(audio)
    print("WWwwww")

    if last_slice_start % 1:
        print("TTTT")
        slice_starts = itertools.chain(slice_starts, [last_slice_start])

    for i in slice_starts:
        audio_slice = audio_segment[i:i + min_silence_len]
        if audio_slice.rms <= min_dbfs:
            min_dbfs = audio_slice.rms
        elif audio_slice.rms >= max_dbfs:
            max_dbfs = audio_slice.rms
    print("min_dbfs : " + str(min_dbfs))
    print("max_dbfs : " + str(max_dbfs))
    print(ratio_to_db(min_dbfs/audio_segment.max_possible_amplitude))
    print(ratio_to_db(max_dbfs/audio_segment.max_possible_amplitude))


def SpeechAPI(pathFile):
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
        response = client.recognize(config, audio)
        # log(response.results, logging.info)
        if not response.results:
            print("AAA")
            return
        result_str = ""
        for result in response.results:
            result_str = result_str + format(result.alternatives[0].transcript)
            print(result_str)
    except Exception as ex:
        print("Error")

SpeechAPI("/Users/yw/go/src/github.com/JinHyukParkk/CapstoneProject/audioFile_python/result15.flac")

# path = "/Users/yw/Desktop/test5.flac"
# format = "flac"
# sound_file = AudioSegment.from_file(path, format=format)
# print("ok")
# find_silence_thresh(sound_file)

    # print(Processing("communication"))
