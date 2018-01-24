#!/bin/sh

# source ./audioFile

export AudilFile=./audioFile

ffmpeg -i $AudilFile/test.mp4 $AudilFile/test.flac

sox --channels=2 --bits=24 --rate=44100 --encoding=signed-integer --endian=little $AudilFile/test.flac --channels=1 --bits=16 --rate=16000 $AudilFile/res.flac

sox -V3 $AudilFile/res.flac $AudilFile/out.flac silence 1 0.50 0.1% 1 0.3 0.1% : newfile : restart

#sox $AudilFile/res.flac $AudilFile/out.flac trim 0 3 : newfile : restart