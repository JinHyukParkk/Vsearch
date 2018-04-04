import logging

logger = logging.getLogger("")

def log_init():
    logger.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

    file_handler = logging.FileHandler('./logs/python.log')
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

def log(str, info):
    if info == logging.info:
        logger.info(str)
    elif info == logging.error:
        logger.error(str)
# http: // hamait.tistory.com/880 파이썬 로그 남기는 방법 참조.
