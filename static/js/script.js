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

      document.getElementById('myVideo').innerHTML = "";
      var myVideo = document.createElement("video");
      myVideo.width = 600;
      myVideo.height = 500; 
      myVideo.id = "VideoPlayer";

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

      document.getElementById('TimeList').innerHTML = "";

      for(var i = 0; i < resp.times.length; i++){
        var btn = document.createElement("button");
        btn.className = "TimeBtn";
        btn.value = resp.times[i].start_time;
        btn.innerHTML = "start: " + resp.times[i].start_time + " ~ end: " + resp.times[i].end_time;
        document.getElementById("TimeList").appendChild(btn);

        var br = document.createElement("br");
        document.getElementById("TimeList").appendChild(br);
      }
      
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
