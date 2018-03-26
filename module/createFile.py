import datetime
import json


def word_count(list_line):
    srt_lines = (" ".join(list_line)).lower()
    text = srt_lines.split()
    from collections import OrderedDict
    from collections import defaultdict
    word_count = defaultdict(lambda: 0)
    for word in text:
        word_count[word] += 1
    return OrderedDict(sorted(word_count.items(), key=lambda t: t[1], reverse=True))

def create_json_file(srt_lines, nonsilent_ranges):
    """create json file"""

    init_time = datetime.datetime(100, 1, 1, 0, 0,)

    outter_dict = dict()

    order = 0
    for time in nonsilent_ranges:
        inner_dict = dict()
        st = "start_time"
        et = "end_time"
        # content = "content"
        inner_dict[st] = str((init_time + datetime.timedelta(0, milliseconds=time[0])).time())[:-3]
        inner_dict[et] = str((init_time + datetime.timedelta(0, milliseconds=time[1])).time())[:-3]
        # inner_dict[content] = srt_lines[order]

        outter_dict[str(order)] = inner_dict
        order += 1
    outter_dict["word"] = word_count(srt_lines)
    with open('./jsonFiles/test.json', 'wt', encoding="utf-8") as make_file:  # json파일 생성
        json.dump(outter_dict, make_file, ensure_ascii=False, indent='\t')
    print(json.dumps(outter_dict, ensure_ascii=False, indent='\t'))


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
