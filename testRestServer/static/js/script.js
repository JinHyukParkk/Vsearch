
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
