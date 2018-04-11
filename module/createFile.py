from log_python import log
from elastic_post import post
from languageHandler import Processing
import datetime
import json
import logging

def word_count(list_line):
    srt_lines = (" ".join(list_line)).lower()
    text = srt_lines.split()
    from collections import OrderedDict
    from collections import defaultdict
    word_count = defaultdict(lambda: 0)
    for word in text:
        word_count[word] += 1
    return OrderedDict(sorted(word_count.items(), key=lambda t: t[1], reverse=True))

def create_json_file(srt_lines, nonsilent_ranges, file_name):
    """create json file"""
    index = file_name.split('.')
    URL_origin = "http://localhost:9200/" +index[0] +"/"+file_name+"?pretty"
    init_time = datetime.datetime(100, 1, 1, 0, 0,)
    try:
        order = elastic_id = 0
        for time in nonsilent_ranges:
            if not srt_lines[order]:
                order += 1
                continue
            inner_dict = dict()

            st = "start_time"
            et = "end_time"
            content = "content"

            inner_dict[st] = str((init_time + datetime.timedelta(0, milliseconds=time[0])).time())[:-3]
            inner_dict[et] = str((init_time + datetime.timedelta(0, milliseconds=time[1])).time())[:-3]
            inner_dict[content] = Processing(srt_lines[order])

            # URL_new = URL_origin + str(elastic_id)

            post(URL_origin,inner_dict)
            order += 1
            elastic_id += 1
    except Exception as ex:
        log(ex,logging.error)

def create_srt_file(srt_lines, nonsilent_ranges):
    """create_srt_file."""

    srt_file = open("test.srt", 'wt')  # 자막 파일 생성
    init_time = datetime.datetime(100, 1, 1, 0, 0,)

    for i, line in enumerate(srt_lines):
        nonsilent_milliseconds = nonsilent_ranges[i]

        start_time = str((init_time + datetime.timedelta(0, milliseconds=nonsilent_milliseconds[0])).time())
        end_time = str((init_time + datetime.timedelta(0, milliseconds=nonsilent_milliseconds[1])).time())

        srt_file.write(str(i+1))
        srt_file.write("\n")
        srt_file.write(start_time[:-3])
        srt_file.write(" --> ")
        srt_file.write(end_time[:-3])
        srt_file.write("\n")
        srt_file.write(line)
        srt_file.write("\n")
        srt_file.write("\n")

    srt_file.close()
