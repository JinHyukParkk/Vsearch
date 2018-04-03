from split import split_sound_file
from speechAPI2 import SpeechAPI
from createFile import create_srt_file, create_json_file
import os
import threading
import operator
def main():
    """main"""
    nonsilent_ranges = split_sound_file("../audioFile/res.flac", "flac")  # 영상파일을 여러개 flac파일로 나눔
    
    threads = []
    dict_lines = {}
    srt_lines = []
    for index in range(len(nonsilent_ranges)):
        path = "../audioFile_python/result" + str(index) + ".flac"
        th = threading.Thread(target=SpeechAPI, args=(path, dict_lines, index))
        th.start()
        threads.append(th)

    for th in threads:
        th.join()
    
    sorted_dict_lines = sorted(dict_lines.items(), key=operator.itemgetter(0))
    for line in sorted_dict_lines:
        srt_lines.append(line[1])
    print(srt_lines)
    
    create_srt_file(srt_lines, nonsilent_ranges)  # 자막파일 생성
    create_json_file(srt_lines, nonsilent_ranges)  # JSON 파일 생성


if __name__ == "__main__":
    main()
