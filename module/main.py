from split import split_sound_file
from speechAPI import SpeechAPI
from createFile import create_srt_file, create_json_file
from log_python import log, log_init

import logging
import os
import threading
import operator
import sys

def main():
    """main"""
    if len(sys.argv) is 1:
        log("### Arg ERROR", logging.error)
        return
    file_name_origin = sys.argv[1]
    file_name = sys.argv[1]
    file_format = file_name.split(".")[1]

    log("### Split START ###", logging.info)
    log(file_name, logging.info)
    nonsilent_ranges = split_sound_file("./audioFile/"+file_name, format=file_format)  # 영상파일을 여러개 flac파일로 나눔
    log("### Split End ###", logging.info)

    threads = []
    dict_lines = {}
    srt_lines = []

    log("### SpeechAPI START ###", logging.info)

    for index in range(len(nonsilent_ranges)):
        path = "./audioFile_python/result" + str(index) + ".flac"
        th = threading.Thread(target=SpeechAPI, args=(path, dict_lines, index))
        th.start()
        threads.append(th)

    for th in threads:
        th.join()

    log("### SpeechAPI END ###", logging.info)
    log("nonsilent_len : "+ str(len(nonsilent_ranges)) +" dict _ len : " + str(len(dict_lines)), logging.info)
    sorted_dict_lines = sorted(dict_lines.items(), key=operator.itemgetter(0))
    for line in sorted_dict_lines:
        srt_lines.append(line[1])

    log("### Create srt START ###", logging.info)
    create_srt_file(srt_lines, nonsilent_ranges)  # 자막파일 생성
    log("### Create json START ###", logging.info)
    create_json_file(srt_lines, nonsilent_ranges, file_name_origin)  # JSON 파일 생성
    log("### Create File END ###", logging.info)

if __name__ == "__main__":
    log_init()
    log("########################", logging.info)
    log("### Python Start ###", logging.info)
    main()
    log("### Python End ###", logging.info)
    log("########################", logging.info)
