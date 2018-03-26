from pydub import AudioSegment
from pydub.silence import split_on_silence, detect_nonsilent
from speechAPI import SpeechAPI
from createFile import create_srt_file, create_json_file
import os

def split_sound_file(path, format):
    """Split sound file && Return nonsilent ranges."""

    sound_file = AudioSegment.from_file(path, format=format)
    nonsilent_ranges = detect_nonsilent(sound_file, min_silence_len=500, silence_thresh=-50)
    # audio_chunks = list()

    # keep_silence = 100
    # for start_i, end_i in nonsilent_ranges:
    #     start_i = max(0, start_i - keep_silence)
    #     end_i += keep_silence

    #     audio_chunks.append(sound_file[start_i:end_i])

    # for i, chunk in enumerate(audio_chunks):
    #     out_file = "./audioFile_python/test{0}.flac".format(i) #flac으로 변환된 output파일 저장 경로 및 파일 명
    #     print ("exporting", out_file, " - non silent- time : ", nonsilent_ranges[i][0], "~", nonsilent_ranges[i][1])
    #     chunk.export(out_file, format="flac")

    return nonsilent_ranges

def main():
    """main"""
    nonsilent_ranges = split_sound_file("./audioFile/test.flac", "flac") # 영상파일을 여러개 flac파일로 나눔
    srt_lines  = SpeechAPI()
    create_srt_file(srt_lines, nonsilent_ranges) # 자막파일 생성
    create_json_file(srt_lines, nonsilent_ranges) # JSON 파일 생성

if __name__ == "__main__":
    main()
