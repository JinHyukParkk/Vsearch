window.onload = function(){
   requestReceiveVideo('http://localhost:8080/test2');
   document.getElementById("UploadVideo").onclick = function(){
     // makeRequestVideo('http://210.204.165.166:4088/test')
     requestSendVideo('http://localhost:8080/test')
   }

   document.getElementById("Time").onclick = function() {
     requestVideoTime('http://localhost:8080/test1')
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

  $.ajax({
    type: "GET",
    url: url,
    dataType: "binary",
    processData: false,
    async: false,

    success:function(resp){
      alert("success");

      var myVideo = document.createElement("video");
      myVideo.width = 600;
      myVideo.height = 500; 
      myVideo.src = URL.createObjectURL(resp);
      myVideo.autoplay = true;
      myVideo.controls = true;
      document.getElementById("myVideo").appendChild(myVideo);
      console.log(resp);
    },
    error:function(){
      alert("error");
    }
  })


  // $.ajax({
  //   type: "GET",
  //   url: url,
  //   dataType: "blob",
    
  //   success:function(resp){
  //     alert(resp);
  //     var reader = new FileReader();
  //     reader.readAsDataURL(resp);
      
  //     reader.onload = function () {
  //       var myVideo = document.createElement("video");
  //       myVideo.width = 400;
  //       myVideo.height = 300;
       
  //       myVideo.src = reader.result;
  //       document.getElementById("myVideo").appendChild(myVideo);
  //     }
  //       alert("success");
  //   },
  //   error:function(){
  //     alert("error");
  //   }
  // })
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
      alert(resp.times[0].start_time);
    
      for(var i = 0; i < resp.times.length; i++){
        var li = document.createElement("li");
        li.innerHTML = "start: " + resp.times[i].start_time + "~ end: " + resp.times[i].end_time;
        document.getElementById("TimeList").appendChild(li);
      }
    },
    error:function(){
      alert("error");
    }
  })
}