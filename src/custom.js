(function () {
  "use strict";

  var slideMenu = $('.side-menu');



  // Activate sidebar slide toggle
  $("[data-toggle='slide']").click(function(event) {
    if(!$(this).parent().hasClass('is-expanded')) {
      slideMenu.find("[data-toggle='slide']").parent().removeClass('is-expanded');
    }
    $(this).parent().toggleClass('is-expanded');
  });

  // Set initial active toggle
  $("[data-toggle='slide.'].is-expanded").parent().toggleClass('is-expanded');



})();


///////////////////////////////
///////////////////////////////
///////////////////////////////
window.onload = function() {
 // closeNav();
  if ( $(window).width() > 767) {
    $('#sidebar-mini').addClass('sidenav-toggled');
  }
};

//////////////////////////////////////////////////////////////
//////////////////Form Delete Button//////////////////////////
//////////////////////////////////////////////////////////////
$(document).ready(function() {
  $(document).on('click', '.field-delete', function() {
    $(this).parent().remove();
  });
});

$(document).ready(function() {
  $(document).on('click', '#open-close-sidebar', function() {
    $('#sidebar-mini').toggleClass('sidenav-toggled');
  });
});
//////////////////////////////////////////////////////////////
//////////////////Form Delete Button//////////////////////////
//////////////////////////////////////////////////////////////

  $(document.body).on('click', '#sidebar-mini',function () {
    if ( $(window).width() < 768) {
      // console.log('step3');
      if ($('#sidebar-mini').hasClass('sidenav-toggled')) {
        // console.log('step4');
        $('#sidebar-mini').removeClass('sidenav-toggled');
      }
    }

});

$( window ).resize(function() {
  // console.log($(window).width());
  if ( $(window).width() < 768) {
    $('#sidebar-mini').removeClass('sidenav-toggled');
  } else {
    $('#sidebar-mini').addClass('sidenav-toggled');
  }
});


  $(document).on('click', '#nav-appointment-tab', function() {
    var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
      removeItemButton: true,
      maxItemCount:50,
      searchResultLimit:5,
      renderChoiceLimit:24
    });
  });


/********************Side Menu***********************/


/////////////////////////////////////////
////////Modal Textarea hide and show../////
///////////////////////////////////////////

function hidetext(){
  document.getElementById("hide-on-click").style.display = "none";
  document.getElementById("show-on-click").style.display = "block";
  document.getElementById("myTextareas").value = "Hi there!\n" +
    "Thanks for choosing Universal's Islands of Adventure." +
    "If you have a few minutes, I'd like to invite you to tell us about your experience." +
    "Your feedback is very important to us and it would be awesome if you can share it with us and our potential customers.";
}
function showtext(){
  document.getElementById("hide-on-click").style.display = "block";
  document.getElementById("show-on-click").style.display = "none";
}
function hidetext1(){
  document.getElementById("hide-on-click1").style.display = "none";
  document.getElementById("show-on-click1").style.display = "block";
  document.getElementById("myTextareas1").value = "Hi there!\n" +
    "Thanks for choosing Universal's Islands of Adventure." +
    "If you have a few minutes, I'd like to invite you to tell us about your experience." +
    "Your feedback is very important to us and it would be awesome if you can share it with us and our potential customers.";
}
function showtext1(){
  document.getElementById("hide-on-click1").style.display = "block";
  document.getElementById("show-on-click1").style.display = "none";
}
///////////////////////////////////////////
////////Modal Textarea hide and show../////
///////////////////////////////////////////
///////////////////////////////////////////
////////Onclick Copy Function//////////////
///////////////////////////////////////////
// function copyfunc(text){
//  // window.prompt("Copy to clipboard: Ctrl+C", text);
//   var copyText = document.getElementById("comment");
//   copyText.select();
//   copyText.setSelectionRange(0, 99999)
//   var n = document.execCommand("copy");
//   console.log(n);
//   console.log(copyText);
//
//   //
//
// }
///////////////////////////////////////////
////////Onclick Copy Function//////////////
///////////////////////////////////////////


// $(function () {
//   var dropZoneId = "drop-zone";
//   var buttonId = "clickHere";
//   var mouseOverClass = "mouse-over";
//
//   var dropZone = $("#" + dropZoneId);
//   if (dropZone.length) {
//     var ooleft = dropZone.offset().left;
//     console.log(ooleft);
//   }
//   // console.log(ooleft);
//   var ooright = dropZone.outerWidth() + ooleft;
//   if (dropZone.length) {
//     var ootop = dropZone.offset().top;
//   }
//
//   var oobottom = dropZone.outerHeight() + ootop;
//   var inputFile = dropZone.find("input");
//   document.addEventListener('DOMContentLoaded', function () {
//   document.getElementById(dropZoneId).addEventListener("dragover", function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     dropZone.addClass(mouseOverClass);
//     var x = e.pageX;
//     var y = e.pageY;
//
//     if (!(x < ooleft || x > ooright || y < ootop || y > oobottom)) {
//       inputFile.offset({ top: y - 15, left: x - 100 });
//     } else {
//       inputFile.offset({ top: -400, left: -400 });
//     }
//
//   }, true);
//   }, true);
//   if (buttonId != "") {
//     var clickZone = $("#" + buttonId);
//     if (clickZone.length) {
//       var oleft = clickZone.offset().left;
//     }
//     var oright = clickZone.outerWidth() + oleft;
//     if (clickZone.length) {
//       var otop = clickZone.offset().top;
//     }
//     var obottom = clickZone.outerHeight() + otop;
//     $("#" + buttonId).mousemove(function (e) {
//       var x = e.pageX;
//       var y = e.pageY;
//       if (!(x < oleft || x > oright || y < otop || y > obottom)) {
//         inputFile.offset({ top: y - 15, left: x - 160 });
//       } else {
//         inputFile.offset({ top: -400, left: -400 });
//       }
//     });
//   }
//
//   document.getElementById(dropZoneId).addEventListener("drop", function (e) {
//     $("#" + dropZoneId).removeClass(mouseOverClass);
//   }, true);
//
// });

$(document).on('ready',function(){
  $("#hide-div").on('click',function(){
    $("#hide-on-click").empty();
  });
  $("#show-div").on('click',function(){
    $("#hide-on-click").show();
  });
});


/*$(document).ready(function(){
  $('.button-left').click(function(){
    $('.sidebar').toggleClass('fliph');
  });

// });*/
// (function () {
//   "use strict";
//
//   var slideMenu = $('.side-menu');
//
//   // Toggle Sidebar
//   $('[data-toggle="sidebar"] , .app-sidebar__overlay').on('click',function(event) {
//     console.log("clicked");
//     console.log(event);
//     event.preventDefault();
//     $('.app').toggleClass('sidenav-toggled');
//   });
//
//
//   // if ( $(window).width() > 1000) {
//   //     console.log("width yes");
//   //     setTimeout(function () {
//   //         $('.app').removeClass('sidenav-toggled');
//   //     },1000);
//   // }
//   // else
//   if ( $(window).width() > 739) {
//     console.log("width " + $(window).width());
//     $('.app-sidebar').on('click',function(event) {
//       event.preventDefault();
//       $('.app').removeClass('sidenav-toggled');
//     });
//     // $('.app').removeClass('sidenav-toggled');
//   }
//
//
//   // Activate sidebar slide toggle
//   $("[data-toggle='slide']").on('click',function(event) {
//     event.preventDefault();
//     if(!$(this).parent().hasClass('is-expanded')) {
//       slideMenu.find("[data-toggle='slide']").parent().removeClass('is-expanded');
//     }
//     $(this).parent().toggleClass('is-expanded');
//   });
//
//   // Set initial active toggle
//   $("[data-toggle='slide.'].is-expanded").parent().toggleClass('is-expanded');
//
//
// })();

/********************Side Menu***********************/


