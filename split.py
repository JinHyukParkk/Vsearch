from pydub import AudioSegment
from pydub.silence import split_on_silence, detect_nonsilent
import datetime

sound_file = AudioSegment.from_file("./audioFile/test.mp4", format="mp4")
nonsilent_ranges = detect_nonsilent(sound_file, min_silence_len=500, silence_thresh=-50)
audio_chunks = list()

keep_silence = 100
for start_i, end_i in nonsilent_ranges:
    start_i = max(0, start_i - keep_silence)
    end_i += keep_silence

    audio_chunks.append(sound_file[start_i:end_i])

for i, chunk in enumerate(audio_chunks):
    out_file = "./audioFile_python/test{0}.flac".format(i)
    print ("exporting", out_file, " - non silent- time : ", nonsilent_ranges[i][0],"~",nonsilent_ranges[i][1]) 
    chunk.export(out_file, format="flac")

srt_file = open("test.srt", 'wt')
srt_lines = list()
index = 1

while True:
    file_name = "result" + str(index) + ".txt"
    try:
        src_file = open("./text/"+file_name, "rt")
    except:
        print("End File")
        break

    lines = ''
    for line in src_file:
        lines += line

    srt_lines.append(lines)
    index += 1
    src_file.close()

block_num = 1
init_time = datetime.datetime(100,1,1,0,0,)
for line in srt_lines:
    nonsilent_milliseconds = nonsilent_ranges[(block_num-1)]

    start_time = str((init_time + datetime.timedelta(0,milliseconds=nonsilent_milliseconds[0])).time())
    end_time = str((init_time + datetime.timedelta(0,milliseconds=nonsilent_milliseconds[1])).time())

    srt_file.write(str(block_num))
    srt_file.write("\n")
    srt_file.write(start_time[:-3])
    srt_file.write(" --> ")
    srt_file.write(end_time[:-3])
    srt_file.write("\n")
    srt_file.write(line)
    srt_file.write("\n")
    srt_file.write("\n")

    block_num+=1

srt_file.close()
