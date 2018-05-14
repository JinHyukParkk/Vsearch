from pydub import AudioSegment
from pydub.silence import split_on_silence, detect_nonsilent
from pydub.utils import db_to_float, ratio_to_db
import itertools
from nltk.stem.snowball import SnowballStemmer


def Processing(sentence):
    stemmer = SnowballStemmer("english")
    prev_words = sentence.split(' ')
    words = [stemmer.stem(word) for word in prev_words]

    sentence = ' '.join(words)
    return sentence

def find_silence_thresh(audio_segment, min_silence_len=1000):
    seg_len = len(audio_segment)

    last_slice_start = seg_len - min_silence_len
    audio_segment
    slice_starts = range(0,last_slice_start + 1, 1)

    if last_slice_start % 1:
        slice_starts = itertools.chain(slice_starts, [last_slice_start])
    min_dbfs = db_to_float(-1) * audio_segment.max_possible_amplitude
    max_dbfs = db_to_float(-50) * audio_segment.max_possible_amplitude
    print("min_dbfs : " + str(min_dbfs))
    print("max_dbfs : " + str(max_dbfs))
    print(int(audio_segment.dBFS-3))
    print(ratio_to_db(audio_segment.rms))
    # print(audio)
    print("WWwwww")
    # for i in slice_starts:
    #     # print("aaaa")
    #     audio_slice = audio_segment[i:i + min_silence_len]
    #     if audio_slice.rms <= min_dbfs:
    #         min_dbfs = audio_slice.rms
    #     if audio_slice.rms >= max_dbfs:
    #         max_dbfs = max_dbfs
    # print("min_dbfs : " + min_dbfs)
    # print("max_dbfs : " + max_dbfs)


path = "/Users/yw/Desktop/test4.flac"
format = "flac"
sound_file = AudioSegment.from_file(path, format=format)
print("ok")
find_silence_thresh(sound_file)

print(Processing("communication"))