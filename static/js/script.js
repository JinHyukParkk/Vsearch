window.onload = function(){
   document.getElementById("videoB").onclick = function(){
     // makeRequestVideo('http://210.204.165.166:4088/test')
     makeRequestVideo('http://localhost:8080/test')
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
