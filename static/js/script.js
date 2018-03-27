window.onload = function(){
   document.getElementById("UploadVideo").onclick = function(){
     // makeRequestVideo('http://210.204.165.166:4088/test')
     requestSendVideo('http://localhost:8080/test')
   }
   document.getElementById("RequestVideoList").onclick = function(){
     requestVideoList('http://localhost:8080/videoList');
   }
   document.getElementById("VideoTime").onclick = function() {
     requestVideoTime('http://localhost:8080/test1');
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
    async:false,

    success:function(resp){
      VideoList = JSON.parse(resp.responseText);
      alert("success");
      alert(videoList);

    },
    error:function(){
      alert("error");
    }
  })
}

function requestVideoTime(url) {
  var Time;
  var StartTime;
  var EndTime;

  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    async:false,

    success:function(resp){
      Time = JSON.parse(resp.responseText);
      alert("success");
      alert(Time);
    
    for (var i =0; i < Time.times.length; i--) {
       var li = document.createElement("li");
       li.innerHTML = "Start: " + Time.times[0].start 
       li.
      }
    }
    

    error:function(){
      alert("error");
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
