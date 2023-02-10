function loadPage (page) {
  var img = $('<img />')
  img.load(function () {
    var container = $('.myBook .p' + page)
    img.css({width: container.width(), height: container.height()})
    img.appendTo($('.myBook .p' + page))
    container.find('.loader').remove()
  })

  img.attr('src', 'assets/pages/' + (page - 2) + '.jpg')

}

function addPage (page, book) {
  var id, pages = book.turn('pages')

  var element = $('<div />', {})

  if (book.turn('addPage', element, page)) {
    element.html('<div class="gradient"></div><div class="loader"></div>')
    loadPage(page)
  }
}

function loadFilesWin (urls) {
  var urlsArray = urls.split(',')
  for (var i = 0; i < urlsArray.length; i++) {
    var aDom = document.createElement('a')
    var evt = document.createEvent('HTMLEvents')
    evt.initEvent('click', false, false)
    aDom.download = name
    aDom.href = encodeURI(urlsArray[i])
    aDom.dispatchEvent(evt)
    aDom.click()
  }
}

$('.common_titModel_btn').on('click', function () {
  $(this).next('.titModel').fadeIn()
})

$('.titModel .close').on('click', function () {
  $(this).parents('.titModel').fadeOut()
})

$('.common_iframe_btn').on('click', function () {
  var src = $(this).data('src')

  $(this).next('.iframe_model').fadeIn()
  $(this).next('.iframe_model').find('iframe').attr('src', src)
})

$('.iframe_model .close').on('click', function () {
  $(this).parents('.iframe_model').fadeOut()

  var iframe = $(this).parents('.iframe_model').find('iframe')
  if (iframe.length > 0) {
    iframe.attr('src', '')
  }
})

$('.common_video_btn').on('click', function () {
  $(this).next('.common_video').fadeIn()
  $(this).next('.common_video').find('video').attr('controls', true)
  $(this).next('.common_video').find('video').trigger('play')
})
$('.common_video').on('click', '.close', function () {
  $(this).parents('.common_video').find('video').trigger('load')
  $(this).parents('.common_video').find('video').trigger('pause')
  $(this).parents('.common_video').fadeOut()
  $(this).parents('.common_video').find('.btn_outer').hide()
})

$('.common_btn').on('click', function () {
  $('.common_btn').removeClass('active')
  $(this).addClass('active')
})


// 第一课

$('#btn1_1').on('click',function(){
  $('#video1_1').fadeIn()
 
})
$('#video1_1 video').on('ended',function(){
  $('#video1_1').fadeOut()
  $('#video1_1 video').trigger('load')
  $('#1_1lxModel').fadeIn()
  $('#1_1lxModel iframe').attr('src','assets/models/m1_1lx/index.html')
})



$('#btn2_1').on('click',function(){
  $('#2_1lxModel').fadeIn()
})

$('#btn2_2').on('click',function(){
   $('#2_2lxModel').fadeIn()
   $('#2_2lxModel iframe').attr('src','assets/models/m1_2lx/index.html')
})

// 第二课
$('#btn3_4').on('click',function(){
  $('#3_4lxModel').fadeIn()
  $('#3_4lxModel iframe').attr('src','assets/models/m2_3lx/index.html')
})
$('#btn3_5').on('click',function(){
  $('#3_5lxModel').fadeIn()
})
$('#btn3_6').on('click',function(){
  $('#3_6lxModel').fadeIn()
})

$('#btn3_3').on('click',function(){
  $('#video3_3').fadeIn()
  $('#video3_3 video').trigger('play')
})
// 第三课 
$('#btn5_1').on('click',function(){
  $('#5_1lxModel').fadeIn()
})
$('#btn5_2').on('click',function(){
  $('#5_2lxModel').fadeIn()
})


// 第四课
$('#btn6_4').on('click',function(){
  $('#6_4lxModel').fadeIn()
  $('#6_4lxModel iframe').attr('src','assets/models/m4_3tz/index.html')
})

$('.jud_que dl dt:nth-child(1)').on('input propertychange',"input",function(){
      var _this = $(this)    
      if(_this.val() == "正确"){
          $('#audio').attr('src','assets/audio/right.mp3').trigger('play')           
      } else{
          if(_this.val() != " "){
              $('#audio').attr('src','assets/audio/err.mp3').trigger('play')   
          }
      }  
})
$('.jud_que dl dt:nth-child(2)').on('input propertychange',"input",function(){
      var _this = $(this)
      if(_this.val() == "错误"){
          $('#audio').attr('src','assets/audio/right.mp3').trigger('play')           
      } else{
          $('#audio').attr('src','assets/audio/err.mp3').trigger('play')   
      }  
})
$('.jud_que dl dt:nth-child(3)').on('input propertychange',"input",function(){
      var _this = $(this)
      if(_this.val() == "错误"){
          $('#audio').attr('src','assets/audio/right.mp3').trigger('play')           
      } else{
          $('#audio').attr('src','assets/audio/err.mp3').trigger('play')   
      }  
})
$('.jud_que dl dt:nth-child(4)').on('input propertychange',"input",function(){
      var _this = $(this)
      if(_this.val() == "错误"){
          $('#audio').attr('src','assets/audio/right.mp3').trigger('play')           
      } else{
          $('#audio').attr('src','assets/audio/err.mp3').trigger('play')   
      }  
})
$('.jud_que dl dt:nth-child(5)').on('input propertychange',"input",function(){
      var _this = $(this)
      if(_this.val() == "正确"){
         $('#audio').attr('src','assets/audio/right.mp3').trigger('play')           
      } else{
         $('#audio').attr('src','assets/audio/err.mp3').trigger('play')   
      }  
})
$('#btn6_5').on('click',function(){
  $('#6_5lxModel').fadeIn()
})
$('#btn6_6').on('click',function(){
  $('#6_6lxModel').fadeIn()
})


// 第五课
$('#btn7_4').on('click',function(){
  $('#video7_4').fadeIn()
})
$('#video7_4 video').on('ended',function(){
    $('#video7_4').fadeOut()
    $('#7_4lxModel').fadeIn()
    $('#7_4lxModel iframe').attr('src','assets/models/m5_4tz/index.html')
})

$('#btn7_6').on('click',function(){
  $('#video7_6').fadeIn()
})
$('#video7_6 video').on('ended',function(){
    $('#video7_6').fadeOut()
    $('#7_6lxModel').fadeIn()
    $('#7_6lxModel iframe').attr('src','assets/models/m5_6tz/index.html')
})
$('#btn8_3').on('click',function(){
  $('#8_3lxModel').fadeIn()
})
$('#btn8_4').on('click',function(){
  $('#8_4lxModel').fadeIn()
})


// 第六课
$('#btn10_5').on('click',function(){
  $('#10_5lxModel').fadeIn()
})
$('#btn10_6').on('click',function(){
  $('#10_6lxModel').fadeIn()
})

//第七课  

$('#btn11_4').on('click',function(){
  $('#11_4lxModel').fadeIn()
  $('#11_4lxModel iframe').attr('src','assets/models/m7_3lx1/index.html')
})

$('#btn11_5').on('click',function(){
  $('#11_5lxModel').fadeIn()
  $('#11_5lxModel iframe').attr('src','assets/models/m7_3lx2/index.html')
})


// 第八课


$('#btn12_5').on('click',function(){
  $('#12_5lxModel').fadeIn()
  $('#12_5lxModel iframe').attr('src','assets/models/m8_2lx/index.html')
})
$('#btn12_6').on('click',function(){
  $('#12_6lxModel').fadeIn()
})

// 第九课

$('#btn13_6').on('click',function(){
  $('#13_6lxModel').fadeIn()
 
})


$('#btn14_0').on('click',function(){
  $('#14_0lxModel').fadeIn()
 
})

$('#btn14_2').on('click',function(){
  $('#14_2lxModel').fadeIn()
  $('#14_2lxModel iframe').attr('src','assets/models/m9_4tz/index.html')
})
$('#btn14_3').on('click',function(){
  $('#14_3lxModel').fadeIn()
})
$('#btn14_4').on('click',function(){
  $('#14_4lxModel').fadeIn()
})

// 第十课
$('#btn15_3').on('click',function(){
  $('#15_3lxModel').fadeIn();
$('#15_3lxModel iframe').attr('src','assets/models/m10_lx1/index.html');

})

$('#btn15_4').on('click',function(){
  $('#15_4lxModel').fadeIn()
  $('#15_4lxModel iframe').attr('src','assets/models/tuozhuai/index.html')
})

$('#btn15_4').on('click',function(){
  $('#15_4lxModel').fadeIn()
 
})
$('.add_btn').on('click',function(){
  $('.add_img').attr('src','assets/pics/class10/2.png')
})

//10-20修改
$('.titModel .new_close').on('click', function () {
  $(this).parents('.titModel').fadeOut()
  $('.add_img').attr('src','')
  
})






// 第十一课
 $('#btn16_5').on('click',function(){
   $('#16_5lxModel').fadeIn()
   $('#16_5lxModel iframe').attr('src','assets/models/m11_1xyx/index.html')
 })
 $('#btn16_6').on('click',function(){
  $('#16_6lxModel').fadeIn()
})


// 第十二课
$('#btn18_4').on('click',function(){
  $('#18_4lxModel').fadeIn()
  $('#18_4lxModel iframe').attr('src','assets/models/m12_lx2/index.html')
})


// 第十三课
$('#btn20_3').on('click',function(){
  $('#20_3lxModel').fadeIn()
})

$('#btn20_4').on('click',function(){
  $('#20_4lxModel').fadeIn()
})


// 第十四课
$('#btn21_1').on('click',function(){
  $('#21_1lxModel').fadeIn()
})

$('#btn21_6').on('click',function(){
  $('#21_6lxModel').fadeIn()
})
$('#btn21_7').on('click',function(){
  $('#21_7lxModel').fadeIn()
})


// 第十五课

$('#btn23_2').on('click',function(){
  $('#23_2lxModel').fadeIn()
})
$('#btn23_3').on('click',function(){
  $('#23_3lxModel').fadeIn()
  $('#23_3lxModel iframe').attr('src','assets/models/m15_lx2/index.html')
})








$('video').attr({disablePictureInPicture:'disablePictureInPicture'});