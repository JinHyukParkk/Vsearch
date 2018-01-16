from pydub import AudioSegment
from pydub.silence import split_on_silence, detect_nonsilent

sound_file = AudioSegment.from_file("./audioFile/test.mp4", format="mp4")
nonsilent_ranges = detect_nonsilent(sound_file, min_silence_len=500, silence_thresh=-50)
audio_chunks = split_on_silence(sound_file, min_silence_len=500, silence_thresh=-50)

for i, chunk in enumerate(audio_chunks):
    out_file = "./audioFile_python/test{0}.flac".format(i)
    print "exporting", out_file, " - non silent- time : ", nonsilent_ranges[i][0],"~",nonsilent_ranges[i][1] 
    chunk.export(out_file, format="flac")