from pydub import AudioSegment
from pydub.silence import split_on_silence, detect_nonsilent
from pydub.utils import db_to_float
import itertools

def split_sound_file(path, format):
    """Split sound file && Return nonsilent ranges."""

    sound_file = AudioSegment.from_file(path, format=format)

    nonsilent_ranges = detect_nonsilent(
        sound_file, min_silence_len=500, silence_thresh=int(sound_file.dBFS-6))
    audio_chunks = list()

    keep_silence = 500
    for start_i, end_i in nonsilent_ranges:
        start_i = max(0, start_i - keep_silence)
        end_i += keep_silence

        audio_chunks.append(sound_file[start_i:end_i])

    for i, chunk in enumerate(audio_chunks):
        out_file = "./audioFile_python/result{0}.flac".format(i) #flac으로 변환된 output파일 저장 경로 및 파일 명
        chunk.export(out_file, format="flac")

    return nonsilent_ranges
