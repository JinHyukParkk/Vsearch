import sys
import create
import split

def main():
    """main"""
    file_name = sys.argv[1]
    file_format = sys.argv[2]
# .././audioFile/test.mp4 mp4
    nonsilent_ranges = split.split_sound_file(file_name, sys.argv[2])  # 영상파일을 여러개 flac파일로 나눔
    # os.system('./1_example') <- go 실행파일 실행해서 flac 파일들을 텍스트로 변환시켜야함
    # srt_lines = create.list_from_file()
    # create.create_srt_file(srt_lines, nonsilent_ranges) # 자막파일 생성
    # create.create_json_file(srt_lines, nonsilent_ranges]) # JSON 파일 생성
if __name__ == "__main__":
    main()
