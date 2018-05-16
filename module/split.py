from pydub import AudioSegment
from pydub.utils import ratio_to_db
from pydub.silence import split_on_silence, detect_nonsilent
from pydub.utils import db_to_float
import itertools

def split_sound_file(path, format):
    """Split sound file && Return nonsilent ranges."""
    min_silence_len = 500
    keep_silence = 100

    sound_file = AudioSegment.from_file(path, format=format)
    seg_len = len(sound_file)
    
    last_slice_start = seg_len - min_silence_len
    slice_starts = range(0, last_slice_start + 1, 1)

    if last_slice_start % 1:
        slice_starts = itertools.chain(slice_starts, [last_slice_start])
    slice_starts = range(0, last_slice_start + 1, 1)

    min_dbfs = db_to_float(-1) * sound_file.max_possible_amplitude

    for i in slice_starts:
        audio_slice = sound_file[i:i + min_silence_len]
        if audio_slice.rms <= min_dbfs:
            min_dbfs = audio_slice.rms
    if min_dbfs == 0:
        min_dbfs = -52
        thresh = int((sound_file.dBFS+min_dbfs)/2)
    else:
        thresh = int(((sound_file.dBFS+ratio_to_db(min_dbfs/sound_file.max_possible_amplitude)))/2)

    nonsilent_ranges = detect_nonsilent(
        sound_file, min_silence_len=min_silence_len, silence_thresh=thresh)
    audio_chunks = list()

    for start_i, end_i in nonsilent_ranges:
        start_i = max(0, start_i - keep_silence)
        end_i += keep_silence

        audio_chunks.append(sound_file[start_i:end_i])

    for i, chunk in enumerate(audio_chunks):
        out_file = "./audioFile_python/result{0}.flac".format(i) #flac으로 변환된 output파일 저장 경로 및 파일 명
        chunk.export(out_file, format="flac")

    return nonsilent_ranges
