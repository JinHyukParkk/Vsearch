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
        var homeDiv = document.createElement("div");
        homeDiv.className = "thumbnail col-md-12";
        homeDiv.style.background = "#666";
        //homeDiv.style.color = "#FFFFFF";
        var homeImg = document.createElement("img");
        homeImg.src = resp.video_list[i].image_url;
        homeImg.style.height = "200px";
        homeImg.style.width = "600px";
        var pZone = document.createElement("div");
        pZone.className = "caption";
        var title = document.createElement("h3");
        title.innerHTML = resp.video_list[i].title;
        var videoBtn = document.createElement("button");
        videoBtn.type = "button";
        // videoBtn.value = resp.video_list[i].file_name;
        videoBtn.className = "btn btn-primary";
        videoBtn.innerHTML = "재생";
        videoBtn.value = resp.video_list[i].video_url;
        var inputSet = document.createElement("input");
        inputSet.type = "hidden";
        inputSet.value = resp.video_list[i].filename;
        
        homeDiv.style.color = "#FFFFFF";
        pZone.appendChild(title);
        pZone.appendChild(videoBtn);
        pZone.appendChild(inputSet);
        homeDiv.appendChild(homeImg);
        homeDiv.appendChild(pZone);   

        document.getElementById("mainHome").appendChild(homeDiv);

      }

      var buttonChild = document.getElementById("mainHome").childNodes;
      for(var j = 3; j < buttonChild.length; j++){
        var secondChild = buttonChild[j].childNodes;
        var thirdChild = secondChild[1].childNodes;
        // console.log(thirdChild);
        (thirdChild[1]).onclick = function(){
          // console.log(this.nextSibling);
          document.getElementById('myVideo').innerHTML = "";
          document.getElementById("oneFormDiv").innerHTML = "";
          document.getElementById('TimeList').innerHTML = "";
          
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
          
          var oneKeywordSet = document.createElement("input");
          oneKeywordSet.id = "oneKeywordText";
          oneKeywordSet.type = "text";
          oneKeywordSet.placeholder = "영상키워드";
          oneKeywordSet.className = "form-control";
          document.getElementById("oneFormDiv").appendChild(oneKeywordSet);
          
          var oneKeywordButton = document.createElement("button");
          oneKeywordButton.id = "clickButton";
          oneKeywordButton.type = "button";
          oneKeywordButton.innerHTML = "검색";
          oneKeywordButton.value = this.nextSibling.value;
          oneKeywordButton.className = "btn btn-default";
          document.getElementById("oneFormDiv").appendChild(oneKeywordButton);
          
          oneKeywordButton.onclick = function(){
            var putText = document.getElementById("oneKeywordText").value;
            var newUrl = "http://localhost:8080/oneKeyword/" + this.value + "/" + putText;
            receiveVideo(newUrl);
          }

        }
      }
      /*var buttons = document.getElementById("oneFormDiv").childNodes;
      console.log(buttons);
      (buttons[1]).onclick = function(){
        var putText = document.getElementById("oneKeywordText").value;
        var newUrl = "http://localhost:8080/oneKeyword/" + this.value + "/" + putText;
        receiveVideo(newUrl);
      }*/
      
     
      
    },
    error:function(){
      alert("error");
    }

  })
}