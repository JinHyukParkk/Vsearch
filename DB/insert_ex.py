import pymysql
import json
from datetime import datetime 

conn = pymysql.connect(host = 'localhost',user = 'root',password= '1234',db = 'video_db',charset ='utf8')

##js 파일 읽어오기
# CONFIG_FILE="./config.json"

# CONFIG={}

# def readConfig(filename) :
# 	f = open(filename, 'r')
# 	js = json.loads(f.read())
# 	f.close()
# 	return js

now = datetime.now() #업로드 날짜
 
try:
	with conn.cursor() as cursor:
		sql = 'INSERT INTO video_info (vid_name, upload_date) VALUES (%s, %s)'
		cursor.execute(sql, ('캡스톤', str(now.year)+'-'+str(now.month)+'-'+str(now.day)))
		conn.commit()
		print(cursor.lastrowid)
	# 1 (last insert id)
finally:
    conn.close()




# def main() :
    # global CONFIG_FILE
    # global CONFIG
    # CONFIG = readConfig(CONFIG_FILE)

    # repos = CONFIG['']['repos']
    # userid = CONFIG['snapshot']['userid']
    # pw = CONFIG['snapshot']['passwd']

    # print "repos value : " + repos
    # print "userid value : " + userid
    # print "pw value : " + pw






