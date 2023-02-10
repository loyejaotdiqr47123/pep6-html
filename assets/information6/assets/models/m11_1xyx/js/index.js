var globalZindex = 10

$(document).on('contextmenu', function () {
  return false
})

$('body').on('click', function () {
  $('.desktop_ico > div').removeClass('active')
  $('.desktop_ico > div').children('.menu').hide()
  $('.windows_menu').stop().slideUp()
})

$('body').on('click', '.windows_ico', function (e) {
  e.stopPropagation()

  $('.windows_menu').stop().slideToggle(200)
})
$('body').on('click', '.windows_menu', function (e) {
  e.stopPropagation()
})
$('body').on('click', '.windows_menu .annex', function (e) {
  $('.windows_menu .menu_child').stop().slideToggle(200)
})

$('body').on('click', '.desktop_ico > div', function (e) {
  e.stopPropagation()
  $(this).addClass('active').siblings().removeClass('active')
  globalZindex += 1
  $(this).css({
    zIndex: globalZindex
  })
})

$('body').on('contextmenu', '.desktop_ico > div', function (e) {
  e.stopPropagation()
  var oX = e.offsetX
  var oY = e.offsetY
  $(this).addClass('active').siblings().removeClass('active')
  $('.desktop_ico > div').children('.menu').hide()
  globalZindex += 1
  $(this).children('.menu').css({
    display: 'block',
    left: oX,
    top: oY,
    zIndex: globalZindex
  })
  return false
})

$('body').on('dblclick', '.desktop_ico > div.computer', function () {
  $('.model_computer').show()
  globalZindex += 1
  $('.model_computer').css({
    zIndex: globalZindex
  })
})
$('body').on('click', '.model_computer .close', function () {
  $('.model_computer').hide()
})
$('body').on('click', '.model_trash .close', function () {
  $('.model_trash').hide()
})

$('body').on('dblclick', '.desktop_ico > div.trash', function () {
  $('.model_trash').show()
  globalZindex += 1
  $('.model_trash').css({
    zIndex: globalZindex
  })
})

$('.desktop_ico > div').on('dragstart', function (e) {
  var oX = e.offsetX
  var oY = e.offsetY
  globalZindex += 1
  $('.desktop_ico > div').on('dragend', function (e) {
    $(this).css({
      left: e.pageX - oX,
      top: e.pageY - oY,
      zIndex: globalZindex
    })
  })
})

$('body').on('click', '.paint_i', function () {
  $('#paintcz .paint_i img').removeClass('active')
})
$('body').on('click', '#paintcz .paint_i img', function (e) {
  e.stopPropagation()

  if ($('#paintcz').hasClass('select')) {
    $(this).addClass('active').siblings().removeClass('active')
  }
})
$('body').on('click', '.cz_list > div._copy', function () {
  if ($('#paintcz').hasClass('select')) {
    $(this).addClass('active').siblings().removeClass('active')
    $('#paintcz').addClass('copy').removeClass('paste rotate select')
  }
})
$('body').on('click', '.cz_list > div._paste', function () {
  if ($('#paintcz').hasClass('copy')) {
    $(this).addClass('active').siblings().removeClass('active')
    $('#paintcz').addClass('paste').removeClass('rotate')
    var _target = $('#paintcz .paint_i img.active').clone().appendTo('#paintcz .paint_i')
    _target.removeClass('oFlower active')

    _target.css({
      left: 0,
      top: 0
    })
  }
})
$('body').on('click', '.cz_list > div._select', function () {
  $(this).addClass('active').siblings().removeClass('active')
  $('#paintcz').addClass('select').removeClass('paste copy rotate')
})
$('body').on('click', '.cz_list > div._rotate', function () {
  $(this).addClass('active').siblings().removeClass('active')
  $('#paintcz').addClass('rotate').removeClass('paste copy')
})
$('body').on('click', '.cz_list > div._rotate .menu > div', function (e) {
  e.stopPropagation()

  var oX = $('.paint_i img.active').data('x') || 0
  var oY = $('.paint_i img.active').data('y') || 0
  var oZ = $('.paint_i img.active').data('z') || 0

  var x = $(this).data('x') + oX
  var y = $(this).data('y') + oY
  var z = $(this).data('z') + oZ

  $('.paint_i img.active').css({
    transform: 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg)'
  })
  $('.paint_i img.active').data('x', x)
  $('.paint_i img.active').data('y', y)
  $('.paint_i img.active').data('z', z)
  $(this).parents('._rotate').removeClass('active')
})
$('body').on('dragstart', '#paintcz .paint_i img', function (e) {
  var _target = $(this)
  if ($('#paintcz').hasClass('select')) {
    var oX = e.offsetX
    var oY = e.offsetY
    var paintBox = _target.parent()
    globalZindex += 1
    $(document).on('drag', function (e) {
      _target.addClass('active').siblings().removeClass('active')
      _target.css({
        left: e.pageX - paintBox.offset().left - oX,
        top: e.pageY - paintBox.offset().top - oY,
        zIndex: globalZindex
      })
    })
    _target.on('dragend', function (e) {
      _target.off('dragstart dragend')
      $(document).off('drag')
      _target.css({
        left: e.pageX - paintBox.offset().left - oX,
        top: e.pageY - paintBox.offset().top - oY,
        zIndex: globalZindex
      })
    })
  }
})
