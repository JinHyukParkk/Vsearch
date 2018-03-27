window.onload = function(){
   document.getElementById("UploadVideo").onclick = function(){
     // makeRequestVideo('http://210.204.165.166:4088/test')
     requestSendVideo('http://localhost:8080/test')
   }
   document.getElementById("RequestVideoList").onclick = function(){
     requestVideoList('http://localhost:8080/videoList');
   }
   document.getElementById("VideoTime").onclick = function() {
     requestVideoTime('http://localhost:8080/Time');
   }
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

function requestVideoList(url) {
  var VideoList; 
  
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",

    success:function(resp){
      VideoList = resp;
      alert("success");
      alert(videoList);
      return VideoList;
    },
    error:function(){
      alert("error");
    }
  })
}

function requestVideoTime(url) {
  var startTime;
  var endTime;
  $.ajax({


    success:function(argument) {
      // body...
    }
    error:function(argument){
      // body...
    }
  })
}

function showBooks(ajax) {
  var data = JSON.parse(ajax.responseText);
    for (var i = 0; i < data.books.length; i++) {
      var startLi = document.createElement("li");
      var endLi = document.createElement("li");
      startLi.innerHTML = "start: " + data.times[i].start;
      endLi.innerHTML = "end: " + data.times[i].end;
      document.body.appendChild(startLi);
      document.body.appendChild(endLi);
    }
}
