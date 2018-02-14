import pymysql
 
conn = pymysql.connect(host = 'localhost',user = 'root',password= '1234',db = 'video_db',charset ='utf8')
 
 
try:
	with conn.cursor() as cursor:
		sql = '''
		CREATE TABLE video_info (
		vid_no int(11) NOT NULL AUTO_INCREMENT,   #비디오 인덱스 번호 
		vid_name varchar(30) NOT NULL,         #제목
		upload_date date NOT NULL,         #등록일
		uploader varchar(14) DEFAULT '관리자',   #업로더
		clicks int(10) DEFAULT '0',   #조회수
		llike int(10) DEFAULT '0',     #좋아요
		unlike int(10) DEFAULT '0',   #싫어요
		PRIMARY KEY (vid_no), UNIQUE KEY vid_name (vid_name)
		) ENGINE=InnoDB
		'''
		cursor.execute(sql)

		sql = '''
		CREATE TABLE words (
		vid_no int(11) NOT NULL,      #비디오 인덱스 번호
		word varchar(40) NOT NULL,    #단어
		count int(20) DEFAULT '0'     #갯수
		) ENGINE=InnoDB
		'''
		cursor.execute(sql)

		sql = '''
		CREATE TABLE sentences (
		vid_no char(4) NOT NULL,      #비디오 인덱스 번호
		sentence varchar(50) NOT NULL,    #문장
		start varchar(20) NOT NULL,   #시작시간 
		end varchar(20) NOT NULL   #끝시간 
		) ENGINE=InnoDB
		'''
		cursor.execute(sql)

	conn.commit()
finally:
	conn.close()

