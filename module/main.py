from split import split_sound_file
from speechAPI import SpeechAPI
from createFile import create_srt_file, create_json_file
import os


def main():
    """main"""
    nonsilent_ranges = split_sound_file("./audioFile/res.flac", "flac") # 영상파일을 여러개 flac파일로 나눔
    srt_lines  = SpeechAPI()
    create_srt_file(srt_lines, nonsilent_ranges) # 자막파일 생성
    create_json_file(srt_lines, nonsilent_ranges) # JSON 파일 생성

if __name__ == "__main__":
    main()
