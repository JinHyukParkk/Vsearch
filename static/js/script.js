window.onload = function(){
  var url = "http://localhost:8080/videoList";
  makeMainHome(url);
  
  document.getElementById("UploadVideo").onclick = function(){
    sendVideo('http://localhost:8080/videoUpload')
  }
  
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

// 메인 화면을 띄우는 함수
function makeMainHome(url){
  $.ajax({
    type: "GET",
    url: url,
    dataType: "JSON",
    processData: false,
    async: false,

    success:function(resp){
      if(resp == null){
        alert("The Response is null");
      }
      else{
        var mainHome = "mainHome";
        makeVideoPannel(resp, 1);
        makePannelOnclickFunction(mainHome);
      }
    },
    error:function(){
      alert("ErrorMassage: makeMainHome");
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
     location.reload();
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
    $("#mainHome").empty();
    $("#mainHomeSecond").empty();

    if(resp == null){
      alert("The Response is null");
    }
    else{
      var mainHome = "mainHome";
      var mainHomeSecond = "mainHomeSecond";
      
      makeVideoPannel(resp,2);
      
      makePannelOnclickFunction(mainHome);
      makePannelOnclickFunction(mainHomeSecond);
    }
   },
   error:function(){
     alert("Method Error: sendKeyword");
   }
 })

}

function receiveVideo(url) {
console.log(url);
 $.ajax({
   type: "GET",
   url: url,
   dataType: "JSON",
   processData: false,
   async: false,

   success:function(resp){
     document.getElementById('TimeList').innerHTML = "";
     var headerPart = document.createElement("h3");
     headerPart.innerHTML = "TimeList";
     document.getElementById("TimeList").appendChild(headerPart);
     
     //영상 중간재생 버튼 생성.
     for(var i = 0; i < resp.times.length; i++){

       var btn = document.createElement("input");
       btn.type = "button";
       btn.className = "btn btn-default btnClass";
       btn.id = "th"+i;
       btn.value = resp.times[i].start_time;

       btn.placeholder = "start: " + resp.times[i].start_time + "~ end: " + resp.times[i].end_time;

       document.getElementById("TimeList").appendChild(btn);

       var br = document.createElement("br");
       document.getElementById("TimeList").appendChild(br);
     }
     
     //버튼클릭시 해당 영상 시간으로 이동.
     var buttons = document.getElementById("TimeList").childNodes;
     for(var j = 1; j < buttons.length; j++){
       buttons[j].onclick = function(){
        for(var k = 1; k<buttons.length; k++){
          buttons[k].style.color = "black";
          buttons[k].style.background = "white";
        }
       document.getElementById("VideoPlayer").currentTime = this.value;

       this.style.background = "rgb(240, 91, 101)";
       this.style.color = "white";
       }
     }  
   },
   error:function(){
      alert("ErrorMassage: Making Keyword Time");
  }
 })
}

function makeVideoPannel(resp,flag){
  for(var i=0; i<resp.video_list.length; i++){
    var homeDiv = document.createElement("button");
    homeDiv.className = "thumbnail col-md-3 thumbNail";
    homeDiv.style.background = "white";
    homeDiv.style.border = "none";
    homeDiv.value = resp.video_list[i].video_url;
    homeDiv.type = "button";
   
    var homeImg = document.createElement("img");
    homeImg.src = resp.video_list[i].image_url;
    homeImg.style.height = "200px";
    homeImg.style.width = "400px";
    homeImg.style.padding = "5px";
    homeDiv.style.color = "#FFFFFF";

    var pZone = document.createElement("div");
    pZone.className = "caption";

    var title = document.createElement("h1");
    title.innerHTML = resp.video_list[i].title;
    title.value = resp.video_list[i].title;
    title.style.cssFloat = "left";

    var inputSet = document.createElement("input");
    inputSet.type = "hidden";
    inputSet.value = resp.video_list[i].filename;

    pZone.appendChild(title);
    pZone.appendChild(inputSet);
    homeDiv.appendChild(homeImg);
    homeDiv.appendChild(pZone);

    if(flag == 1){
      document.getElementById("mainHome").appendChild(homeDiv);
    }
    else{    
      if(flag == 2){
        if(resp.video_list[i].search_type == "keyword"){
          var header = document.createElement("h2");
          header.innerHTML = "keyword";
          document.getElementById("mainHome").appendChild(header);
          document.getElementById("mainHome").appendChild(homeDiv);
        }
        else if(resp.video_list[i].search_type == "title"){
          var header = document.createElement("h2");
          header.innerHTML = "title";
          document.getElementById("mainHomeSecond").appendChild(header);
          document.getElementById("mainHomeSecond").appendChild(homeDiv);
        }
      }
    }
  }
}

function makePannelOnclickFunction(selectedHome){
  var buttonChild = document.getElementById(selectedHome).childNodes;
  for(var j = 0; j < buttonChild.length; j++){
    (buttonChild[j]).onclick = function(){
      document.getElementById('myVideo').innerHTML = "";
      document.getElementById("oneFormDiv").innerHTML = "";
      document.getElementById('TimeList').innerHTML = "";
      document.getElementById('titleText').innerHTML = "";
     
      var videoDiv = document.createElement("div");
      videoDiv.className = "embed-responsive embed-responsive-16by9";
     
      var myVideo = document.createElement("video");
      myVideo.id = "VideoPlayer";
      myVideo.className = "embed-responsive-item";
      myVideo.src = this.value;
      myVideo.autoplay = true;
      myVideo.controls = true;
      videoDiv.appendChild(myVideo);
      document.getElementById("myVideo").appendChild(videoDiv);

      var videoTitle = document.createElement("h2");
      var t = document.createTextNode(this.childNodes[1].childNodes[0].value);
      videoTitle.appendChild(t);                 
      document.getElementById("titleText").appendChild(videoTitle);
      
      var oneKeywordSet = document.createElement("input");
      oneKeywordSet.id = "oneKeywordText";
      oneKeywordSet.type = "text";
      oneKeywordSet.placeholder = "영상 내 키워드";
      oneKeywordSet.className = "form-control";
      document.getElementById("oneFormDiv").appendChild(oneKeywordSet);
      
      var oneKeywordButton = document.createElement("button");
      oneKeywordButton.id = "clickButton";
      oneKeywordButton.type = "button";
      oneKeywordButton.innerHTML = "검색";
      oneKeywordButton.value = this.childNodes[1].childNodes[1].value;
      oneKeywordButton.className = "btn btn-default";
      document.getElementById("oneFormDiv").appendChild(oneKeywordButton);
      
      oneKeywordButton.onclick = function(){
        var putText = document.getElementById("oneKeywordText").value;
        var newUrl = "http://localhost:8080/oneKeyword/" + this.value + "/" + putText;
        receiveVideo(newUrl);
      }
    }
  }
}