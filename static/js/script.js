window.onload = function(){


   document.getElementById("UploadVideo").onclick = function(){
     // makeRequestVideo('http://210.204.165.166:4088/test')
     requestSendVideo('http://localhost:8080/test')
   }

   document.getElementById("Time").onclick = function() {
     requestVideoTime('http://localhost:8080/test1')
   }

   document.getElementById("PlayVideo").onclick = function() {
     requestReceiveVideo('http://localhost:8080/test2')
   }
<<<<<<< HEAD

 
=======
>>>>>>> 3df7d2074751d7823308f60e46d3a85e1e919828

  /*document.getElementById("RequestVideoList").onclick = function(){
     requestVideoList('http://localhost:8080/videoList');
   }*/
}

function requestSendVideo(url){
  var form =$('form')[0];
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

function requestReceiveVideo(url) {
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
  $.ajax({
    type: "GET",
    url: url,
    dataType: "JSON",
    processData: false,
    async: false,

    success:function(resp){
      alert("success");
<<<<<<< HEAD

      document.getElementById('myVideo').innerHTML = "";
      var myVideo = document.createElement("video");
      myVideo.width = 600;
      myVideo.height = 500; 
      myVideo.id = "VideoPlayer";

=======
      
      var myVideo = document.createElement("iframe");
      //myVideo.width = 600;
      //myVideo.height = 500; 
      myVideo.id = "VideoPlayer";
      myVideo.className = "embed-responsive-item";
>>>>>>> 3df7d2074751d7823308f60e46d3a85e1e919828
      myVideo.src = resp.Url;
      myVideo.autoplay = true;
      myVideo.controls = true;
      document.getElementById("myVideo").appendChild(myVideo);
    
    },
    error:function(){
      alert("error");
    }
  })


}

function requestVideoList(url) {
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    async:false,

    success:function(resp){
      VideoList = JSON.parse(resp.responseText);
      alert("success");
    },
    error:function(){
      alert("error");
    }
  })
}

function requestVideoTime(url) {
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",

    success:function(resp){
      alert("success");
<<<<<<< HEAD

      document.getElementById('TimeList').innerHTML = "";
=======
>>>>>>> 3df7d2074751d7823308f60e46d3a85e1e919828

      document.getElementById('TimeList').innerHTML = "";
      
      //영상 중간재생 버튼 생성.
      for(var i = 0; i < resp.times.length; i++){
<<<<<<< HEAD
        var btn = document.createElement("button");
        btn.className = "TimeBtn";
        btn.value = resp.times[i].start_time;
        btn.innerHTML = "start: " + resp.times[i].start_time + " ~ end: " + resp.times[i].end_time;
=======
        var btn = document.createElement("input");
        btn.type = "button";
        btn.className = "btn btn-default";
        btn.id = "th"+i;
        btn.value = resp.times[i].start_time;
        console.log(resp.times[i].start_time);
        btn.placeholder = "start: " + resp.times[i].start_time + "~ end: " + resp.times[i].end_time;

>>>>>>> 3df7d2074751d7823308f60e46d3a85e1e919828
        document.getElementById("TimeList").appendChild(btn);

        var br = document.createElement("br");
        document.getElementById("TimeList").appendChild(br);
      }
<<<<<<< HEAD
      
      var buttons = document.getElementById("TimeList").childNodes;
      for(var j = 0; j < buttons.length; j++){
        buttons[j].onclick = function(){
          document.getElementById("VideoPlayer").currentTime = this.value;
        } 
=======

      //버튼클릭시 해당 영상 시간으로 이동.
      var buttons = document.getElementById("TimeList").childNodes;
      for(var j = 0; j < buttons.length; j++){
        buttons[j].onclick = function(){
        document.getElementById("VideoPlayer").currentTime = this.value;
      
        }
         
>>>>>>> 3df7d2074751d7823308f60e46d3a85e1e919828
      }
     

    },
    error:function(){
      alert("error");
    }
  })
}


