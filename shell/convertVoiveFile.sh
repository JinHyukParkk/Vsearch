#!/bin/sh

export AudilFile=./audioFile
export modulePath=./module
export resPath=./audioFile_python


ffmpeg -i $AudilFile/test.mp4 $AudilFile/test.flac

sox --channels=2 --bits=24 --rate=44100 --encoding=signed-integer --endian=little $AudilFile/test.flac --channels=1 --bits=16 --rate=16000 $AudilFile/res.flac

python3 $modulePath/main.py

# rm $resPath/*

# testList=`ls ./audioFile_python/test*`

# fs_count=$(ls -Rl $resPath | grep ^- | wc -l)
# count=0
# for ((i=0;i<$fs_count;i++))
# do
#   sox --channels=2 --bits=16 --rate=44100 --encoding=signed-integer --endian=little $resPath/test$i.flac --channels=1 --bits=16 --rate=16000 $resPath/result$i.flac
#   rm $resPath/test$i.flac
# done

#sox -V3 $AudilFile/res.flac $AudilFile/out.flac silence 1 0.50 0.1% 1 0.3 0.1% : newfile : restart

#sox $AudilFile/res.flac $AudilFile/out.flac trim 0 3 : newfile : restart
