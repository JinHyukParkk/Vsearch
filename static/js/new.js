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
      makeOnclickFunctionOfVideo();
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
      $("#titlesMain").empty();
      makeVideoButton(resp,2);
      makeOnclickFunctionOfVideo();  
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
    },
   error:function(){
     alert("Error: receiveVideo");
   }
 })
}

function makeVideoButton(resp,flag){
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
    title.value = resp.video_list[i].filename;
    
    aTag.appendChild(title);
    spanTag.appendChild(homeImg);
    articleTag.appendChild(spanTag);
    articleTag.appendChild(aTag);
    
    if(flag == 1){
      document.getElementById("titlesMain").appendChild(articleTag);
    }
    else if(flag == 2){    
      if(resp.video_list[i].search_type == "keyword"){
        var header = document.createElement("h2");
        header.innerHTML = "keyword";
        document.getElementById("keywordsMain").appendChild(header);
        document.getElementById("keywordsMain").appendChild(articleTag);
      }
      else if(resp.video_list[i].search_type == "title"){
        var header = document.createElement("h2");
        header.innerHTML = "title";
        document.getElementById("titlesMain").appendChild(header);
        document.getElementById("titlesMain").appendChild(articleTag);
      }
    }
    else{
      alert("Error: makeVideoButton: flag Error");
    }
  }
}

function makeOnclickFunctionOfVideo(){
  var buttonChild = document.getElementById("titlesMain").childNodes;
  for(var j = 1; j < buttonChild.length; j++){
    var secondChild = buttonChild[j].childNodes;
    (secondChild[1]).onclick = function(){
      document.getElementById('headerTag').innerHTML = "";
      document.getElementById("oneFormDiv").innerHTML = "";
      
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
}/         pZone.appendChild(inputSet);
//         homeDiv.appendChild(homeImg);
//         homeDiv.appendChild(pZone);
//         // homeDiv.appendChild(divBtn);

//         document.getElementById("mainHome").appendChild(homeDiv);

//       }

//       var buttonChild = document.getElementById("mainHome").childNodes;
//       for(var j = 0; j < buttonChild.length; j++){
//         // var secondChild = buttonChild[j].childNodes;
//         // var thirdChild = secondChild[1].childNodes;
//         // console.log(thirdChild);
//         (buttonChild[j]).onclick = function(){
//           // console.log(this.nextSibling);
//           document.getElementById('myVideo').innerHTML = "";
//           document.getElementById("oneFormDiv").innerHTML = "";
//           document.getElementById('TimeList').innerHTML = "";
//           document.getElementById('titleText').innerHTML = "";
         
//           var videoDiv = document.createElement("div");
//           videoDiv.className = "embed-responsive embed-responsive-16by9";
         
//           var myVideo = document.createElement("video");
//           myVideo.id = "VideoPlayer";
//           myVideo.className = "embed-responsive-item";
//           myVideo.src = this.value;
//           myVideo.autoplay = true;
//           myVideo.controls = true;
//           videoDiv.appendChild(myVideo);
//           document.getElementById("myVideo").appendChild(videoDiv);

//           var videoTitle = document.createElement("h2");
//           var t = document.createTextNode(this.childNodes[1].childNodes[0].value);
//           videoTitle.appendChild(t);                 
//           document.getElementById("titleText").appendChild(videoTitle);
          
//           var oneKeywordSet = document.createElement("input");
//           oneKeywordSet.id = "oneKeywordText";
//           oneKeywordSet.type = "text";
//           oneKeywordSet.placeholder = "영상 내 키워드";
//           oneKeywordSet.className = "form-control";
//           document.getElementById("oneFormDiv").appendChild(oneKeywordSet);
          
//           var oneKeywordButton = document.createElement("button");
//           oneKeywordButton.id = "clickButton";
//           oneKeywordButton.type = "button";
//           oneKeywordButton.innerHTML = "검색";
//           oneKeywordButton.value = this.childNodes[1].childNodes[1].value;
//           oneKeywordButton.className = "btn btn-default";
//           document.getElementById("oneFormDiv").appendChild(oneKeywordButton);
          
//           oneKeywordButton.onclick = function(){
//             var putText = document.getElementById("oneKeywordText").value;
//             var newUrl = "http://localhost:8080/oneKeyword/" + this.value + "/" + putText;
//             receiveVideo(newUrl);
//           }
//         }
//     /*
//     // 키워드가 있는 비디오들을 버튼으로 생성
//     $("#VideoList > li").remove();
//     var VideoName = resp.video_list[0].file_name;
//     for(var i = 0; i < resp.video_list.length; i++){
//       var videoBtn = document.createElement("button");
//       videoBtn.type = "button";
//       videoBtn.value = resp.video_list[i].file_name;
//       videoBtn.className = "list-group-item active";
//       videoBtn.innerHTML = "name: " + resp.video_list[i].file_name + "/ count: " + resp.video_list[i].Count;
 
//       // var tempList = document.createElement("li");
//       // tempList.appendChild(videoBtn);
//       // document.getElementById("VideoList").appendChild(tempList);
//       document.getElementById("VideoList").appendChild(videoBtn);
//     }
    
//     // 버튼을 누르면 비디오가 재생되는 클릭 속성 달아줌
//     var buttons = document.getElementById("VideoList").childNodes;
//     console.log(buttons);
//     for(var j = 1; j < buttons.length; j++){
//       // (buttons[j].firstChild).onclick = function(){
//       (buttons[j]).onclick = function(){
//         var newUrl = "http://localhost:8080/oneKeyword/" + this.value + "/" + keyword;
//         receiveVideo(newUrl);
//       } 
//     }
//     */
//     }
//    },
//    error:function(){
//      alert("Method Error: sendKeyword");
//    }
//  })

// }

function receiveVideo(url) {
  console.log(url);
 $.ajax({
   type: "GET",
   url: url,
   dataType: "JSON",
   processData: false,
   async: false,

   success:function(resp){
    console.log(resp);
     /*
     alert("success");
     
     var myVideo = document.createElement("video");
     myVideo.id = "VideoPlayer";
     myVideo.className = "embed-responsive-item";
     myVideo.src = resp.URL;
     myVideo.autoplay = true;
     myVideo.controls = true;
     document.getElementById("myVideo").appendChild(myVideo);
     */
     document.getElementById('TimeList').innerHTML = "";
     /*document.getElementById('TimeList').style.height = "200px";*/
     var headerPart = document.createElement("h3");
     headerPart.innerHTML = "TimeList";
     document.getElementById("TimeList").appendChild(headerPart);
     //영상 중간재생 버튼 생성.
     for(var i = 0; i < resp.times.length; i++){
        var li = document.createElement("li");
        var btn = document.createElement("input");
        btn.type = "button";
        btn.className = "button special fit";
        btn.id = "th"+i;
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

       // var br = document.createElement("br");
       // document.getElementById("TimeList").appendChild(br);
     }
     //버튼클릭시 해당 영상 시간으로 이동.
     var buttons = document.getElementById("TimeList").childNodes;
     console.log(buttons);
     for(var j = 1; j < buttons.length; j++){
       (buttons[j].firstChild).onclick = function(){

        for(var k = 1; k<buttons.length; k++){
          // buttons[k].style.color = "black";
          // buttons[k].style.background = "white";
          // buttons[k].style.border = "1px solid black";
          (buttons[k].firstChild).className = "button special fit";

        }
        this.className = "button fit";
        document.getElementById("VideoPlayer").currentTime = this.placeholder;

       // this.style.background = "rgb(240, 91, 101)";
       // this.style.color = "white";
       }

     }  

   },
   error:function(){
     alert("error");
   }

 })

}