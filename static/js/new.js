window.onload = function(){
  // 홈 화면을 만듬
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
  
  // $("#keywordBox").keypress(function(e){
  //   if(e.keyCode == 13){
  //     var keyword = document.getElementById("keywordBox").value;
  //     var url = "http://localhost:8080/keyword/" + keyword;
  //     sendKeyword(url,keyword);
  //     $("#keywordBox").val("");
  //   }
  // })
}

// 메인 화면을 만드는 함수
function makeMainHome(url){
  $.ajax({
    type: "GET",
    url: url,
    dataType: "JSON",
    processData: false,
    async: false,

    success:function(resp){
      makeVideoButton(resp,1);
      makeOnclickFunctionOfVideo("titlesMain");
    },
    error:function(){
      alert("Error: makeMainHome");
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
      console.log(resp.video_list.length);
      if(resp.video_list.length == 0){
        $("#titlesMain").empty();
        $("#keywordsMain").empty();
        $('#headerTag').empty();
        $("#oneFormDiv").empty();
        $("#TimeList").empty();

        $("#keywordsTag").html("");  
        $("#placeTag").html("검색 결과가 없습니다.");
      }
      else{
        makeVideoButton(resp,2,keyword);
        makeOnclickFunctionOfVideo("titlesMain"); 
        makeOnclickFunctionOfVideo("keywordsMain"); 
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
      
      for(var i = 0; i < resp.times.length; i++){
        var li = document.createElement("li");
        var btn = document.createElement("input");
        btn.type = "button";
        btn.className = "button special fit";
        btn.id = "th"+i;
        btn.setAttribute("data-toggle", "tooltip");
        btn.setAttribute("title", resp.times[i].content);
        
        var time = Math.floor(resp.times[i].start_time);
        var hour = 0;
        var minute = 0;
        var second = 0;
        
        second = time%60;
        time = parseInt(time/60);
        minute = time;
        time = parseInt(time/60);
        hour = time;
        
        if(parseInt(second/10) == 0){
          second = "0" + second;
        }
        if(parseInt(minute/10) == 0){
          minute = "0" + minute;
        }
        if(parseInt(hour/10) == 0){
          hour = "0" + hour;
        }

        btn.value = hour + ":" + minute + ":" + second;
        btn.placeholder = resp.times[i].start_time;

        li.appendChild(btn);
        document.getElementById("TimeList").appendChild(li);
      }
      
      //버튼클릭시 해당 영상 시간으로 이동.
      var buttons = document.getElementById("TimeList").childNodes;
      for(var j = 1; j < buttons.length; j++){
        (buttons[j].firstChild).onclick = function(){

          for(var k = 1; k<buttons.length; k++){
            (buttons[k].firstChild).className = "button special fit";
          }
          this.className = "button fit";
          document.getElementById("VideoPlayer").currentTime = this.placeholder;
        } 
      }
      $('[data-toggle="tooltip"]').tooltip();  
    },
    error:function(){
     alert("Error: receiveVideo");
    }
  })
}

function makeVideoButton(resp,flag,keyword){
  var titleCount = 0;
  var keywordCount = 0;
  document.getElementById("placeTag").style.visibility = "visible";
  $("#titlesMain").empty();
  $("#keywordsMain").empty();
  $('#headerTag').empty();
  $("#oneFormDiv").empty();
  $("#TimeList").empty();
  
  document.getElementById("keywordsTag").innerHTML = "";

  console.log(resp);

  for(var i=0; i<resp.video_list.length; i++){

    var articleTag = document.createElement("article");
    articleTag.className = "style" + (i%6);

    var spanTag = document.createElement("span");
    spanTag.className = "image";

    var homeImg = document.createElement("img");
    homeImg.src = resp.video_list[i].image_url;
    homeImg.style.height = "385px";
    
    var aTag = document.createElement("a");
    aTag.value = resp.video_list[i].video_url

    var title = document.createElement("h2");
    title.innerHTML = resp.video_list[i].title;
    title.value = resp.video_list[i].filename.replace(/_/g," ");
    
    aTag.appendChild(title);
    spanTag.appendChild(homeImg);
    articleTag.appendChild(spanTag);
    articleTag.appendChild(aTag);
    
    if(flag == 1){
      document.getElementById("titlesMain").appendChild(articleTag);
    }
    else if(flag == 2){ 
      
      if(((resp.video_list[i]).search_type) == "keyword"){
        keywordCount++;
        document.getElementById("keywordsTag").innerHTML = "Keyword: " + keyword;
        document.getElementById("keywordsMain").appendChild(articleTag);
      }
      else if(((resp.video_list[i]).search_type) == "title"){
        titleCount++;
        document.getElementById("placeTag").innerHTML = "Title: " + keyword;
        document.getElementById("titlesMain").appendChild(articleTag);
      }
      else{
        alert("Error: type Error");
      }
    }
    else{
      alert("Error: makeVideoButton: flag Error");
    }
  }
  if (keywordCount == (resp.video_list.length)){
    document.getElementById("placeTag").style.visibility = "hidden";
  }
}

function makeOnclickFunctionOfVideo(selectedMainPage){
  var buttonChild = document.getElementById(selectedMainPage).childNodes;
  
  for(var j = 0; j < buttonChild.length; j++){
    var secondChild = buttonChild[j].childNodes;

    (secondChild[1]).onclick = function(){

      $('#headerTag').empty();
      $("#oneFormDiv").empty();
      $("#TimeList").empty();
      
      var hTag = document.createElement("h1");
      hTag.innerHTML = this.firstChild.value;

      var divTag = document.createElement("div");
      
      var spanTags = document.createElement("span");
      spanTags.className = "embed-responsive embed-responsive-16by9";
      
      var myVideo = document.createElement("video");
      myVideo.id = "VideoPlayer";
      myVideo.src = this.value;
      myVideo.autoplay = true;
      myVideo.controls = true;

      divTag.appendChild(spanTags)
      spanTags.appendChild(myVideo);
      document.getElementById("headerTag").appendChild(divTag);
      document.getElementById("headerTag").appendChild(hTag);

      var hTag = document.createElement("h1");
      hTag.innerHTML = ""
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
      oneKeywordButton.value = this.firstChild.value;
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