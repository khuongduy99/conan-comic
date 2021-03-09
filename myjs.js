$(document).ready(function(){ getAllBookConan() });
		
function getChapById(idBook) {
      var url_getChaps = "https://api-comic-conan.herokuapp.com/book/" + idBook + "/chaps.json";
      var url_getBook = "https://api-comic-conan.herokuapp.com/book/" + idBook + ".json";
      
      setVisible('.page', false);
      setVisible('#loading', true);
    
      $("#content").empty();
      $("#content").append("<a href=''>" + "<i class='fa fa-home'></i>" + " Trang chủ</a>");
      $("#content").append("<div class='row w-100' id='info'></div>");
      $("#content").append("<div class='row' id='pages'></div>");

      if(idBook - 1 == 0) {
        $("#info").append("<div class='col-1' id=''><button disabled onclick='getChapById("+ (idBook -1)+ ")' class='btn btn-primary' id='after'>< Tập trước</button></div>");
      } else {
         $("#info").append("<div class='col-1' id=''><button onclick='getChapById("+ (idBook -1)+ ")' class='btn btn-sm btn-primary' id='after'>< Tập trước</button></div>");
      }
     
      $("#info").append("<div class='col-5' id='book'></div>");
      $("#info").append("<div class='col-5' id='chaps'></div>");
      $("#info").append("<div class='col-1' id=''><button onclick='getChapById("+ (idBook + 1)+ ")' class='btn btn-sm btn-primary' id='next'>Tập sau ></button></div>");

      $.ajax({
          url: url_getBook,
          type: "get",
          complete: function(xhr, textStatus) {
            if(xhr.status == 404) {
              alert('Khong tim thay');
            }
          }
      }).done(function(res) {

          var content_left = "<img src='"+ res.urlImg +"' width='100%'>"
         $("#book").append(content_left);
      });

      $.ajax({
          url: url_getChaps,
          type: "get",
           complete: function(xhr, textStatus) {
          if(xhr.status == 404) {
            alert('Khong tim thay');
          }
        }
      }).done(function(res) {
        var size = res.length;
          var content_right = "<ul class='mt-3'>";
          var i = 0;
          while(i < size) {
            var idChapOfDiv = "chap-" + res[i].id;
            content_right += "<li class='mb-2'><a href='#"+ idChapOfDiv +"' class='mb-3'>"  +res[i].title+ "</a></li>"
            $("#pages").append("<div id='"+ idChapOfDiv +"'><h3>" +res[i].title + "</h3></div>");
                
            console.log(getAllPageByChapId(res[i].id));
            i++;
          }
              
                            content_right+="</ul>";
         $("#chaps").append(content_right);
          setVisible('.page', true);
          setVisible('#loading', false);
      });
    }

function onReady(callback) {
  var intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);

    }
  }, 1000);
}

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? 'block' : 'none';
  if(selector == ".page" && visible) {
    $("body").css("padding-top","86px");
  } else if(selector == ".page" && !visible){
    $("body").css("padding-top","0");
  }
  
}

function getAllBookConan() {
  $("#content").empty();
$.ajax({
        url: 'https://api-comic-conan.herokuapp.com/books.json',
        type: "get",
         complete: function(xhr, textStatus) {
        if(xhr.status == 404) {
          alert('Khong tim thay');
        }
      }
    }).done(function(res) {
      var size = res.length;
      for(var i = 0; i < size; i++) {
        var content = "<div class='col-lg-2 col-md-3 col-sm-6 mb-4'>" + 
                  "<div class='card h-100'>" +
                    "<a onclick='getChapById("+ res[i].id +")'><img class='card-img-top' src='"+ res[i].urlImg +"'></a>"+
                    "<div class='card-body'>" + 
                      "<h6 class='card-title'>" +
                                "<a onclick='getChapById("+ res[i].id +")'>"+ res[i].title +"</a>" +
                                "</h6>" +
                    "</div>" +
                  "</div" +
                 "</div";
        
        
      $("#content").append(content);
      setVisible('.page', true);
      setVisible('#loading', false);
      }
    });
}

function getAllPageByChapId(idChap) {
  var idChapOfDiv = "chap-"+ idChap;
  
  $.ajax({
        url: 'https://api-comic-conan.herokuapp.com/chap/'+ idChap+ '/pages.json',
        type: "get",
         complete: function(xhr, textStatus) {
        if(xhr.status == 404) {
          alert('Khong tim thay');
        }
      }
    }).done(function(res) {
      var size = res.length;
      var content = "";
      for(var i = 0; i < size; i++) {

         content += "<img class='img-thumbnail mt-4 mb-4' src='" + res[i].urlImg + "' width='100%'>";
        
      }
      $("#"+idChapOfDiv).append(content);
    });
}

var btn = $('#button-back-top');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});
