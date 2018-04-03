import logging

logger = logging.getLogger("")

def log_init():
    logger.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

    file_handler = logging.FileHandler('python.log')
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

def log(str, info):
    logger.info(str)

# http: // hamait.tistory.com/880 파이썬 로그 남기는 방법 참조.
