
var httpRequest = null;
function getXMLHttpRequest() {
  if(window.ActiveXObject) {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP")
    }catch(e) {
      try{
        return new ActiveXObject("Microsoft.XMLHTTP")
      } catch(e) { return null; }
    }
  } else if (window.XMLHttpRequest) {
    console.log("XMLHttpRequest Create");
    return new XMLHttpRequest();
  } else {
    return null;
  }
}

function load(url) {
  console.log("Load Start");
  httpRequest = getXMLHttpRequest();
  httpRequest.responseType='blob'
  httpRequest.open("POST",url,true);
  httpRequest.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var blob = this.response;
      var img = document.createElement('img');
      img.onload = function(e) {
         window.URL.revokeObjectURL(img.src);
      }
       img.src = window.URL.createObjectURL(blob);
       console.log(img.src)
       img.width = 200;
       img.height = 200;
       console.log(img)
      uploadImage(img);
    }else {
      alert("문제 발생 : "+ this.status);
    }
  }
  // var form = document.getElementById('fileinfo');
  // console.log(form);
  var formData = new FormData();
  formData.append("reference",document.getElementsByName("reference")[0].files[0]);
  console.log(document.getElementsByName("reference")[0].files[0]);
  formData.append("target",document.getElementsByName("target")[0].files[0]);
  // var form =$('form')[0];
  // var formData = new FormData(form);
  // httpRequest.setRequestHeader("Content-Type", 'multipart/form-data');
  httpRequest.send(formData);
  console.log("Load End");
}
// function callbackFunction() {
//   alert(httpRequest.readyState);
//   alert(httpRequest.responseText);
//   if(httpRequest.readyState == 1 || httpRequest.readyState == 2 || httpRequest.readyState == 3) {
//     alert("good1");
//     //화면에 작업 중 메시지 출력
//   } else if(httpRequest.readyState == 4) {
//     if(httpRequest.status == 200) {
//       alert("good2");
//
//     }else {
//       alert("문제 발생 : "+ httpRequest.status)
//     }
//   }
// }

window.onload = function(){
  document.getElementById("ajaxButton").onclick = function(){
     // makeRequest('http://129.254.221.30:8105/upload');
     load('http://129.254.221.30:8105/upload')
   }
   document.getElementById("videoB").onclick = function(){
     makeRequestVideo('http://localhost:8090/test')
   }
}
function makeRequestVideo(url){
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
function uploadImage(img){
  // $('.after').innerHTML(resp);
   document.body.appendChild(img);
  console.log("HTML upload Image")
}

function makeRequest(url) {
  // var form =$('form')[0];
  // var formData = new FormData(form);
  var formData = new FormData();
  formData.append("reference",document.getElementsByName("reference")[0].files[0]);
  formData.append("target",document.getElementsByName("target")[0].files[0]);
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
      uploadImage(resp);
    },
    error:function(){
      alert("error");
    }
  })
 }

var fileTypes = [
  'image/jpeg',
  'image/pjpeg',
  'image/png'
]
function validFileType(file) {
  for(var i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

function previewFile(file) {
  var reader = new FileReader();
  reader.onload = function(event) {
    var image = new Image();
    image.src = event.target.result;
    image.width = 250;
  }
  document.getElementById("after")
}


$('input[type="file"]').on('change', function(e){
  var fileName = e.target.files[0].name;
  if (fileName) {
    $(e.target).parent().attr('data-message', fileName);
  }
});

// $(document).on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
//   if ($('input[type="file"]').length) {
//     if (['dragover', 'dragenter'].indexOf(e.type) > -1) {
//       if (window.dragTimeout)
//         clearTimeout(window.dragTimeout);
//       $('body').addClass('dragged');
//     } else if (['dragleave', 'drop'].indexOf(e.type) > -1) {
//       // Without the timeout, some dragleave events are triggered
//       // when the :after appears, making it blink...
//       window.dragTimeout = setTimeout(function() {
//         $('body').removeClass('dragged');
//       }, 100);
//     }
//   }
// });
