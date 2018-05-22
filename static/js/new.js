window.onload = function(){
  var url = "http://localhost:8080/videoList";
  home(url);
  // document.getElementById("UploadVideo").onclick = function(){
  //   sendVideo('http://localhost:8080/videoUpload')
  // }
  // /*document.getElementById("Time").onclick = function(){
  //   makeVideoKeywordTimeTable('http://localhost:8080/test1')
  // }*/
  // document.getElementById("sendKeyword").onclick = function() {
  //   var keyword = document.getElementById("keywordBox").value;
  //   var url = "http://localhost:8080/keyword/" + keyword;
  //   sendKeyword(url,keyword);
  //   $("#keywordBox").val("");
  // }
  
  // $("#keywordBox").keypress(function(e){
  //   if(e.keyCode == 13){
  //     var keyword = document.getElementById("keywordBox").value;
  //     var url = "http://localhost:8080/keyword/" + keyword;
  //     sendKeyword(url,keyword);
  //     $("#keywordBox").val("");
  //   }
  // })
}
function home(url){
  $.ajax({
    type: "GET",
    url: url,
    dataType: "JSON",
    processData: false,
    async: false,

    success:function(resp){
      console.log(resp);

      // console.log(resp.video_list[0].title);
      for(var i=0; i<resp.video_list.length; i++){
        // var homeDiv = document.createElement("button");
        // homeDiv.className = "thumbnail col-md-3 thumbNail";
        // homeDiv.style.background = "white";
        // homeDiv.style.border = "none";
        // homeDiv.value = resp.video_list[i].video_url;
        // homeDiv.type = "button";
        //homeDiv.style.color = "#FFFFFF";
        // var divBtn = document.createElement("button");
        // divBtn.value = resp.video_list[i].file_name;
        // divBtn.className = "btn btn-primary";
        var articleTag = document.createElement("article");
        articleTag.className = "style" + (i%6);

        var spanTag = document.createElement("span");
        spanTag.className = "image";

        var homeImg = document.createElement("img");
        homeImg.src = resp.video_list[i].image_url;
        homeImg.style.height = "385px";
        homeImg.style.width = "410px";
        // homeImg.style.padding = "5px";

        // var pZone = document.createElement("div");
        // pZone.className = "caption";
        var aTag = document.createElement("a");
        // aTag.href = resp.video_list[i].video_url;
        aTag.value = resp.video_list[i].video_url

        var title = document.createElement("h2");
        title.innerHTML = resp.video_list[i].title;
        title.value = resp.video_list[i].filename;
        // title.style.cssFloat = "left";
        // var pTag = document.createElement("p");

        // var inputSet = document.createElement("input");
        // inputSet.type = "hidden";
        // inputSet.value = resp.video_list[i].filename;

        // var videoBtn = document.createElement("button");
        // videoBtn.type = "button";
        // // videoBtn.value = resp.video_list[i].file_name;
        // videoBtn.className = "btn btn-primary";
        // videoBtn.innerHTML = "재생";
        //videoBtn.value = resp.video_list[i].video_url;
        var pZone = document.getElementById("titlesMain");
        // homeDiv.style.color = "#FFFFFF";
        aTag.appendChild(title);
        spanTag.appendChild(homeImg);
        articleTag.appendChild(spanTag);
        articleTag.appendChild(aTag);
        pZone.appendChild(articleTag);
        
        // pZone.appendChild(inputSet);
        //pZone.appendChild(videoBtn);
        // homeDiv.appendChild(homeImg);
        // homeDiv.appendChild(pZone);
        // homeDiv.appendChild(divBtn);

        // document.getElementById("mainHome").appendChild(homeDiv);

      }

      var buttonChild = document.getElementById("titlesMain").childNodes;
      console.log(buttonChild);
      for(var j = 3; j < buttonChild.length; j++){
        var secondChild = buttonChild[j].childNodes;
        // var thirdChild = secondChild[1].childNodes;
        // console.log(thirdChild);
        console.log(secondChild[1]);
        (secondChild[1]).onclick = function(){
          // var childs = document.getElementById("upperHtml").childNodes;
          // childs[1].innerHTML = "";
          // console.log(childs);
          document.getElementById('headerTag').innerHTML = "";
          document.getElementById("oneFormDiv").innerHTML = "";
          // document.getElementById('TimeList').innerHTML = "";
          // document.getElementById('titleText').innerHTML = "";
          var divTag = document.createElement("div");
          // divTag.className = "col-md-9";
          var spanTags = document.createElement("span");
          spanTags.className = "embed-responsive embed-responsive-16by9";
          // var videoDiv = document.createElement("div");
          // videoDiv.className = "embed-responsive embed-responsive-16by9";
          // divTag.style.width = "850px";
          //divTag.style.float = "left";
          var myVideo = document.createElement("video");
          myVideo.id = "VideoPlayer";
          // myVideo.className = "embed-responsive-item";
          myVideo.src = this.value;
          myVideo.autoplay = true;
          myVideo.controls = true;
          divTag.appendChild(spanTags)
          spanTags.appendChild(myVideo);
          document.getElementById("headerTag").appendChild(divTag);

          // var videoTitle = document.createElement("h2");
          // var t = document.createTextNode(this.childNodes[1].childNodes[0].value);
          // videoTitle.appendChild(t);                 
          // document.getElementById("titleText").appendChild(videoTitle);
          // var divTags = document.createElement("div");
          // divTags.style.padding = "50px";
          // divTags.style.width = "200px";
          // divTags.style.float = "right";
          // divTags.className = "col-md-2";
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
          //document.getElementById("headerTag").appendChild(divTags);
          oneKeywordButton.onclick = function(){
            var putText = document.getElementById("oneKeywordText").value;
            var newUrl = "http://localhost:8080/oneKeyword/" + this.value + "/" + putText;
            receiveVideo(newUrl);
          }

        }
      }
     
      
    },
    error:function(){
      alert("error");
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



// // 키워드를 서버로 보내는 함수
// function sendKeyword(url,keyword){

//  $.ajax({
//    type: "GET",
//    dataType : "JSON",
//    async: false,
//    url: url,

//    success:function(resp){
//     $("#mainHome").empty();
    
//     console.log(resp);
//       //console.log(resp.video_list[0].title);
//       for(var i=0; i<resp.video_list.length; i++){
//         var homeDiv = document.createElement("button");
//         homeDiv.className = "thumbnail col-md-12 thumbNail";
//         homeDiv.style.background = "#666";
//         homeDiv.value = resp.video_list[i].video_url;
//         homeDiv.type = "button";
//         //homeDiv.style.color = "#FFFFFF";
//         // var divBtn = document.createElement("button");
//         // divBtn.value = resp.video_list[i].file_name;
//         // divBtn.className = "btn btn-primary";

//         var homeImg = document.createElement("img");
//         homeImg.src = resp.video_list[i].image_url;
//         homeImg.style.height = "200px";
//         homeImg.style.width = "500px";
//         homeImg.style.cssFloat = "left";

//         var pZone = document.createElement("div");
//         pZone.className = "caption";

//         var title = document.createElement("h1");
//         title.innerHTML = resp.video_list[i].title;
//         title.value = resp.video_list[i].title;

//         // var videoBtn = document.createElement("button");
//         // videoBtn.type = "button";
//         // //videoBtn.value = resp.video_list[i].file_name;
//         // videoBtn.className = "btn btn-primary";
//         // videoBtn.innerHTML = "재생";
//         // videoBtn.value = resp.video_list[i].video_url;

//         var inputSet = document.createElement("input");
//         inputSet.type = "hidden";
//         inputSet.value = resp.video_list[i].filename;
        
//         homeDiv.style.color = "#FFFFFF";
//         pZone.appendChild(title);
//         //pZone.appendChild(videoBtn);
//         pZone.appendChild(inputSet);
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
       btn.value = resp.times[i].start_time;

       btn.placeholder = "start: " + resp.times[i].start_time + "~ end: " + resp.times[i].end_time;
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
        document.getElementById("VideoPlayer").currentTime = this.value;

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