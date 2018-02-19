import pymysql
 
conn = pymysql.connect(host='localhost',user = 'root',password= '1234', charset ='utf8')


# try:
#     with conn.cursor() as cursor:
#         sql = 'CREATE DATABASE video_db'
#         cursor.execute(sql)
#     conn.commit()
# finally:
#     conn.close()

cursor = conn.cursor()
sql = 'CREATE DATABASE video_db'
cursor.execute(sql)
conn.commit()

conn.close()
