window.onload = function(){
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
  var data;
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    async: false,

    success:function(resp){
      alert("success");
      alert(resp);
      console.log(resp);
      //document.getElementById("myVideo").src = resp;
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