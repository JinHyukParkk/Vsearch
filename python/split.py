from pydub import AudioSegment
from pydub.silence import split_on_silence, detect_nonsilent
import json
import os
import sys

def split_sound_file(path, format):
    """Split sound file && Return nonsilent ranges."""

    sound_file = AudioSegment.from_file(path, format=format)
    nonsilent_ranges = detect_nonsilent(sound_file, min_silence_len=300, silence_thresh=-50)
    audio_chunks = list()

    keep_silence = 100
    for start_i, end_i in nonsilent_ranges:
        start_i = max(0, start_i - keep_silence)
        end_i += keep_silence

        audio_chunks.append(sound_file[start_i:end_i])

    for i, chunk in enumerate(audio_chunks):
        out_file = ".././audioFile/test{0}.flac".format(i) #flac으로 변환된 output파일 저장 경로 및 파일 명
        print ("exporting", out_file, " - non silent- time : ", nonsilent_ranges[i][0], "~", nonsilent_ranges[i][1])
        chunk.export(out_file, format="flac")

    return nonsilent_ranges
