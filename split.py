from pydub import AudioSegment
from pydub.silence import split_on_silence, detect_nonsilent
import datetime
import json
import os

def split_sound_file(path, format):
    """Split sound file && Return nonsilent ranges."""

    sound_file = AudioSegment.from_file(path, format=format)
    nonsilent_ranges = detect_nonsilent(sound_file, min_silence_len=500, silence_thresh=-50)
    audio_chunks = list()

    keep_silence = 100
    for start_i, end_i in nonsilent_ranges:
        start_i = max(0, start_i - keep_silence)
        end_i += keep_silence

        audio_chunks.append(sound_file[start_i:end_i])

    for i, chunk in enumerate(audio_chunks):
        out_file = "./audioFile_python/test{0}.flac".format(i) #flac으로 변환된 output파일 저장 경로 및 파일 명
        print ("exporting", out_file, " - non silent- time : ", nonsilent_ranges[i][0], "~", nonsilent_ranges[i][1])
        chunk.export(out_file, format="flac")

    return nonsilent_ranges

def list_from_file():
    """list from file."""

    srt_lines = list()
    index = 1

    while True:
        file_name = "result" + str(index) + ".txt"
        try:
            src_file = open("./text/"+file_name, "rt") #speechAPI로 생성된 text 파일들을 읽음
        except:
            print("End File")
            break

        lines = ''
        for line in src_file:
            lines += line

        srt_lines.append(lines)
        index += 1
        src_file.close()
    return srt_lines

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
        order+=1
    with open('test.json', 'wt', encoding="utf-8") as make_file: #json파일 생성
        json.dump(outter_dict, make_file, ensure_ascii=False, indent='\t')
    print(json.dumps(outter_dict, ensure_ascii=False, indent='\t'))

def create_srt_file(srt_lines, nonsilent_ranges):
    """create_srt_file."""

    srt_file = open("test.srt", 'wt') #자막 파일 생성
    init_time = datetime.datetime(100, 1, 1, 0, 0,)

    for i, line in enumerate(srt_lines):
        nonsilent_milliseconds = nonsilent_ranges[i]

        start_time = str((init_time + datetime.timedelta(0,milliseconds=nonsilent_milliseconds[0])).time())
        end_time = str((init_time + datetime.timedelta(0,milliseconds=nonsilent_milliseconds[1])).time())

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

def main():
    """main"""
    nonsilent_ranges = split_sound_file("./audioFile/test.mp4", "mp4") # 영상파일을 여러개 flac파일로 나눔
    # os.system('./1_example') <- go 실행파일 실행해서 flac 파일들을 텍스트로 변환시켜야함
    # srt_lines = list_from_file()
    # create_srt_file(srt_lines, nonsilent_ranges) # 자막파일 생성
    # create_json_file(srt_lines, nonsilent_ranges) # JSON 파일 생성
if __name__ == "__main__":
    main()
