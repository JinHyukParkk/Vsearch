#!/bin/sh

# source ./audioFile

export AudilFile=./audioFile

sox --channels=2 --bits=16 --rate=44100 --encoding=signed-integer --endian=little $AudilFile/test.flac --channels=1 --bits=16 --rate=16000 $AudilFile/res.flac

sox $AudilFile/res.flac $AudilFile/out.flac trim 0 3 : newfile : restart
