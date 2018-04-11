window.onload = function(){


  document.getElementById("UploadVideo").onclick = function(){
    // makeRequestVideo('http://210.204.165.166:4088/test')
    sendVideo('http://localhost:8080/videoUpload')
  }

  document.getElementById("Time").onclick = function() {
    makeVideoTimeTable('http://localhost:8080/test1')
  }

  /*document.getElementById("PlayVideo").onclick = function() {
    receiveVideo('http://localhost:8080/test2')
  }*/
  document.getElementById("sendKeyword").onclick = function() {
    var keyword = document.getElementById("keywordBox").value;
    var url = "http://localhost:8080/keyword/" + keyword;
    sendKeyword(url,keyword);
  }
}

// 비디오를 서버에 올림
function sendVideo(url){
 var form = document.getElementById("videotest");
 var formData = new FormData(form);
 var response;
 $.ajax({
   type: "POST",
   enctype: 'multipart/form-data',
   contentType: false,
   processData: false,  // Important!
   cache: false,
   url: url,
   data: formData,

   success:function(resp){
     alert("success");
     // uploadImage(resp);
   },
   error:function(){
     alert("error");
   }
 })
}


// 키워드를 보내는 함수
function sendKeyword(url,keyword){

 $.ajax({
   type: "GET",
   dataType : "JSON",
   async: false,
   url: url,

   success:function(resp){
    // 버튼 생성
    var VideoName = resp.video_list[0].file_name;
    for(var i = 0; i < resp.video_list.length; i++){
      var videoBtn = document.createElement("button");
      //videoBtn.type = "button";
      videoBtn.value = resp.video_list[i].file_name;
      console.log(videoBtn.value);
      videoBtn.innerHTML = "name: " + resp.video_list[i].file_name + "/ count: " + resp.video_list[i].Count;
 
      var tempList = document.createElement("li");
      tempList.appendChild(videoBtn);
      document.getElementById("VideoList").appendChild(tempList);
    }
    
    // 버튼에 클릭 속성 달아줌
    var buttons = document.getElementById("VideoList").childNodes;
    console.log(buttons[1]);
    for(var j = 1; j < buttons.length; j++){
      
      console.log(buttons[j].firstChild);
      (buttons[j].firstChild).onclick = function(){
        
        var newUrl = "http://localhost:8080/oneKeyword/" + this.value + "/" + keyword;
        receiveVideo(newUrl);
      } 
    }
   },
   error:function(){
     alert("Method Error: sendKeyword");
   }
 })

}



// 비디오 제목과 키워드를 보내서 비디오과 시간 테이블을 띄움
function receiveVideo(url) {
 $.ajax({
   type: "GET",
   url: url,
   dataType: "JSON",
   processData: false,
   async: false,

   success:function(resp){
     alert("success");
     console.log(resp);
     document.getElementById('myVideo').innerHTML = "";
     var myVideo = document.createElement("video");
     myVideo.id = "VideoPlayer";
     myVideo.className = "embed-responsive-item";
     myVideo.src = resp.Url;
     myVideo.autoplay = true;
     myVideo.controls = true;
     document.getElementById("myVideo").appendChild(myVideo);

   },
   error:function(){
     alert("error");
   }


    /*

 <<< dub용 코드. >>>
 <<< 혹시 몰라서 주석처리 해둠. >>>

 $.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
       // check for conditions and support for blob / arraybuffer response type
       if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
       {
           return {
               // create new XMLHttpRequest
               send: function(headers, callback){
       // setup all variables
                   var xhr = new XMLHttpRequest(),
       url = options.url,
       type = options.type,
       async = options.async || true,
       // blob or arraybuffer. Default is blob
       dataType = options.responseType || "blob",
       data = options.data || null,
       username = options.username || null,
       password = options.password || null;

                   xhr.addEventListener('load', function(){
         var data = {};
         data[options.dataType] = xhr.response;
         // make callback and send data
         callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                   });

                   xhr.open(type, url, async, username, password);

       // setup custom headers
       for (var i in headers ) {
         xhr.setRequestHeader(i, headers[i] );
       }

                   xhr.responseType = dataType;
                   xhr.send(data);
               },
               abort: function(){
                   jqXHR.abort();
               }
           };
       }
   });
 */
 })

}

// 비디오 시간 만들어주는 함수
function makeVideoTimeTable(url) {
 $.ajax({
   type: "GET",
   url: url,
   dataType: "json",

   success:function(resp){
     alert("success");

     document.getElementById('TimeList').innerHTML = "";

     //영상 중간재생 버튼 생성.
     for(var i = 0; i < resp.times.length; i++){

       var btn = document.createElement("input");
       btn.type = "button";
       btn.className = "btn btn-default";
       btn.id = "th"+i;
       btn.value = resp.times[i].start_time;
       console.log(resp.times[i].start_time);
       btn.placeholder = "start: " + resp.times[i].start_time + "~ end: " + resp.times[i].end_time;

       document.getElementById("TimeList").appendChild(btn);

       var br = document.createElement("br");
       document.getElementById("TimeList").appendChild(br);
     }


     //버튼클릭시 해당 영상 시간으로 이동.
     var buttons = document.getElementById("TimeList").childNodes;
     for(var j = 0; j < buttons.length; j++){
       buttons[j].onclick = function(){
       document.getElementById("VideoPlayer").currentTime = this.value;
       }
     }

   },
   error:function(){
     alert("error");
   }
 })
}


    /*
 <<< dub용 코드. >>>
 <<< 혹시 몰라서 주석처리 해둠. >>>

 $.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
       // check for conditions and support for blob / arraybuffer response type
       if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
       {
           return {
               // create new XMLHttpRequest
               send: function(headers, callback){
       // setup all variables
                   var xhr = new XMLHttpRequest(),
       url = options.url,
       type = options.type,
       async = options.async || true,
       // blob or arraybuffer. Default is blob
       dataType = options.responseType || "blob",
       data = options.data || null,
       username = options.username || null,
       password = options.password || null;

                   xhr.addEventListener('load', function(){
         var data = {};
         data[options.dataType] = xhr.response;
         // make callback and send data
         callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                   });

                   xhr.open(type, url, async, username, password);

       // setup custom headers
       for (var i in headers ) {
         xhr.setRequestHeader(i, headers[i] );
       }

                   xhr.responseType = dataType;
                   xhr.send(data);
               },
               abort: function(){
                   jqXHR.abort();
               }
           };
       }
   });
 */

