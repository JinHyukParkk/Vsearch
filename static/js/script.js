window.onload = function(){
  var url = "http://localhost:8080/videoList";
  home(url);
  function home(url){
    $.ajax({
      type: "GET",
      url: url,
      dataType: "JSON",
      processData: false,
      async: false,

      success:function(resp){
        console.log(resp);
        //console.log(resp.video_list[0].file_name);
        for(var i=0; i<resp.video_list.length; i++){

        }
        var homeDiv = document.createElement("div");
        homeDiv.className = "thumbnail";
        var homeImg = document.createElement("img");
        homeImg.src = resp.URL;
        var pZone = document.createElement("div");
        pZone.className = "caption";
        var title = document.createElement("h3");
        title.innerHTML = "hi";
        //homeImg.value = resp.video_list[i].file_name;
        pZone.appendChild(title);
        homeDiv.appendChild(homeImg);
        homeDiv.appendChild(pZone);
        
        document.getElementById("mainHome").appendChild(homeDiv);

      },
      error:function(){
        alert("error");
      }

    })
  }
  document.getElementById("UploadVideo").onclick = function(){
    sendVideo('http://localhost:8080/videoUpload')
  }
  /*document.getElementById("Time").onclick = function(){
    makeVideoKeywordTimeTable('http://localhost:8080/test1')
  }*/
  document.getElementById("sendKeyword").onclick = function() {
    var keyword = document.getElementById("keywordBox").value;
    var url = "http://localhost:8080/keyword/" + keyword;
    sendKeyword(url,keyword);
    $("#keywordBox").val("");
  }
  
  $("#keywordBox").keypress(function(e){
    if(e.keyCode == 13){
      var keyword = document.getElementById("keywordBox").value;
      var url = "http://localhost:8080/keyword/" + keyword;
      sendKeyword(url,keyword);
      $("#keywordBox").val("");
    }
  })
}

// 비디오를 서버에 올리는 함수
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
   },
   error:function(){
     alert("error");
   }
 })
}



// 키워드를 서버로 보내는 함수
function sendKeyword(url,keyword){

 $.ajax({
   type: "GET",
   dataType : "JSON",
   async: false,
   url: url,

   success:function(resp){
    // 키워드가 있는 비디오들을 버튼으로 생성
    $("#VideoList > li").remove();
    var VideoName = resp.video_list[0].file_name;
    for(var i = 0; i < resp.video_list.length; i++){
      var videoBtn = document.createElement("button");
      videoBtn.type = "button";
      videoBtn.value = resp.video_list[i].file_name;
      videoBtn.className = "list-group-item active";
      videoBtn.innerHTML = "name: " + resp.video_list[i].file_name + "/ count: " + resp.video_list[i].Count;
 
      /*var tempList = document.createElement("li");
      tempList.appendChild(videoBtn);
      document.getElementById("VideoList").appendChild(tempList);*/
      document.getElementById("VideoList").appendChild(videoBtn);
    }
    
    // 버튼을 누르면 비디오가 재생되는 클릭 속성 달아줌
    var buttons = document.getElementById("VideoList").childNodes;
    console.log(buttons);
    for(var j = 1; j < buttons.length; j++){
      /*(buttons[j].firstChild).onclick = function(){*/
      (buttons[j]).onclick = function(){
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
    console.log(resp);
     alert("success");
     document.getElementById('myVideo').innerHTML = "";
     var myVideo = document.createElement("video");
     myVideo.id = "VideoPlayer";
     myVideo.className = "embed-responsive-item";
     myVideo.src = resp.URL;
     myVideo.autoplay = true;
     myVideo.controls = true;
     document.getElementById("myVideo").appendChild(myVideo);
     document.getElementById('TimeList').innerHTML = "";

     //영상 중간재생 버튼 생성.
     for(var i = 0; i < resp.times.length; i++){

       var btn = document.createElement("input");
       btn.type = "button";
       btn.className = "btn btn-default";
       btn.id = "th"+i;
       btn.value = resp.times[i].start_time;
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