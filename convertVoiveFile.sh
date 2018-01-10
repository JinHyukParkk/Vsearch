#!/bin/sh

sox --channels=2 --bits=16 --rate=44100 --encoding=signed-integer --endian=little ./audioFile/test.flac --channels=1 --bits=16 --rate=16000 ./audioFile/res.flac

sox ./audioFile/res.flac ./audioFile/out.flac trim 0 3 : newfile : restart


