function creatline (box) {
  var linewidth = 2, linestyle = '#fff'//连线绘制--线宽，线色
  //初始化赋值 列表内容
  box.find('.showleft').children('span').each(function (index, element) {
    $(this).attr({
      group: 'gpl',
      left: $(this).position().left + $(this).outerWidth() / 2 + 110,
      top: $(this).position().top + $(this).outerHeight() - 7 - 20,
      sel: '0',
      check: '0'
    })
  })
  box.find('.showright').children('span').each(function (index, element) {
    console.log(index)
    if(index == 0){
      $(this).attr({
        group: 'gpr',
        left: $(this).position().left + $(this).outerWidth() / 2 - 150,
        top: $(this).position().top + 45,
        sel: '0',
        check: '0'
      })
    }else if(index == 1){
      $(this).attr({
        group: 'gpr',
        left: $(this).position().left + $(this).outerWidth() / 2 - 150,
        top: $(this).position().top + 42,
        sel: '0',
        check: '0'
      })
    }else{
      $(this).attr({
        group: 'gpr',
        left: $(this).position().left + $(this).outerWidth() / 2 - 150,
        top: $(this).position().top + 40,
        sel: '0',
        check: '0'
      })
    }
 
  })
  box.find('.showleft').attr('first', 0)//初始赋值 列表内容容器
  box.find('.showright').attr('first', 0)
  //canvas 赋值
  var canvas = box.find('.canvas')[0]  //获取canvas  实际连线标签
  canvas.width = box.find('.show').width()//canvas宽度等于div容器宽度
  canvas.height = box.find('.show').height()

  var backcanvas = box.find('.backcanvas')[0]  //获取canvas 模拟连线标签
  backcanvas.width = box.find('.show').width()
  backcanvas.height = box.find('.show').height()
  //连线数据
  var groupstate = false//按下事件状态，标记按下后的移动，抬起参考
  var mx = []//连线坐标
  var my = []
  var ms = []
  var temp//存贮按下的对象
  var pair = 0//配对属性
  var pairl = []
  var pairr = []
  //提示线数据
  var mid_startx, mid_starty, mid_endx, mid_endy//存储虚拟连线起始坐标
  //事件处理---按下
  box.children('.show').children().children('span').on('mousedown', function (event) {
   
    groupstate = true
    if ($(this).attr('check') == 1) {
      $(this).attr('sel', '1').parent().attr('first', '1')
      temp = $(this)
    } else {
      $(this).attr('sel', '1').addClass('addstyle').parent().attr('first', '1')
      temp = $(this)
    }

    mid_startx = $(this).attr('left')
    mid_starty = $(this).attr('top')
    event.preventDefault()
  })
  $(document).mousemove(function (event) {		//移动
    var $target = $(event.target)
    if (groupstate) {
      mid_endx = event.pageX - box.find('.show').offset().left
      mid_endy = event.pageY - box.find('.show').offset().top
      var targettrue = null
      if ($target.is('span') && $target.closest('.show').parent().attr('class') == box.attr('class')) {
        targettrue = $target
      } else if ($target.closest('.showitem').is('span') && $target.closest('.show').parent().attr('class') == box.attr('class')) {
        targettrue = $target.closest('.showitem')
      } else {
        targettrue = null
      }

      if (targettrue) {
        if (targettrue.parent().attr('first') == 0) {
          if (targettrue.attr('check') == 0) {
            targettrue.addClass('addstyle').attr('sel', '1').siblings('span[check=0]').removeClass('addstyle').attr('sel', '0')
          }

        } else {
          if (targettrue.attr('check') == 0) {
            targettrue.addClass('addstyle').attr('sel', '1').siblings('span[check=0]').removeClass('addstyle').attr('sel', '0')
            mid_startx = targettrue.attr('left')
            mid_starty = targettrue.attr('top')
          }

          //temp=targettrue;
        }

      } else {
        if (box.find('.showleft').attr('first') == 0) {
          box.find('.showleft').children('span').each(function (index, element) {
            if ($(this).attr('check') == 0) {
              $(this).attr('sel', '0').removeClass('addstyle')
            }

          })
        }

        if (box.find('.showright').attr('first') == 0) {
          box.find('.showright').children('span').each(function (index, element) {
            if ($(this).attr('check') == 0) {
              $(this).attr('sel', '0').removeClass('addstyle')
            }

          })
        }

      }

      backstrockline()
    }

    event.preventDefault()
  })
  $(document).mouseup(function (event) {  //抬起
    var $target = $(event.target)
    if (groupstate) {
      var targettrue
      if ($target.is('span') && $target.closest('.show').parent().attr('class') == box.attr('class')) {
        targettrue = $target
      } else if ($target.closest('.showitem').is('span') && $target.closest('.show').parent().attr('class') == box.attr('class')) {
        targettrue = $target.closest('.showitem')
      } else {
        targettrue = null
      }

      if (targettrue) {
        if (targettrue.parent().attr('first') == 0) {
          if (targettrue.attr('check') == 0) {
            if (temp.attr('check') == 1) {
              box.find('.showleft').children('span').each(function (index, element) {
                if ($(this).attr('sel') == 1) {
                  if ($(this).attr('check') == 0) {
                    $(this).attr('sel', '0').removeClass('addstyle')
                  } else {
                    $(this).attr('sel', '0').addClass('addstyle')
                  }

                }
              })
              box.find('.showleft').attr('first', 0)
              box.find('.showright').children('span').each(function (index, element) {
                if ($(this).attr('sel') == 1) {
                  if ($(this).attr('check') == 0) {
                    $(this).attr('sel', '0').removeClass('addstyle')
                  } else {
                    $(this).attr('sel', '0').addClass('addstyle')
                  }

                }
              })
              box.find('.showright').attr('first', 0)

            } else {
              box.find('.showleft').children('span').each(function (index, element) {
                if ($(this).attr('sel') == 1) {
                  mx.push($(this).attr('left'))
                  my.push($(this).attr('top'))
                  ms.push(0)
                  $(this).attr('check', '1')
                  $(this).attr('sel', '0')
                  $(this).attr('pair', pair)
                  pairl.push(pair)
                }
              })
              box.find('.showright').children('span').each(function (index, element) {
                if ($(this).attr('sel') == 1) {
                  mx.push($(this).attr('left'))
                  my.push($(this).attr('top'))
                  ms.push(1)
                  $(this).attr('check', '1')
                  $(this).attr('sel', '0')
                  $(this).attr('pair', pair)
                  pairr.push(pair)
                }
              })
              pair += 1
              box.find('.showleft').attr('first', 0)
              box.find('.showright').attr('first', 0)
              strockline()
            }

          } else {

            box.find('.showleft').children('span').each(function (index, element) {
              if ($(this).attr('sel') == 1) {
                if ($(this).attr('check') == 0) {
                  $(this).attr('sel', '0').removeClass('addstyle')
                } else {
                  $(this).attr('sel', '0').addClass('addstyle')
                }

              }
            })
            box.find('.showleft').attr('first', 0)
            box.find('.showright').children('span').each(function (index, element) {
              if ($(this).attr('sel') == 1) {
                if ($(this).attr('check') == 0) {
                  $(this).attr('sel', '0').removeClass('addstyle')
                } else {
                  $(this).attr('sel', '0').addClass('addstyle')
                }

              }
            })
            box.find('.showright').attr('first', 0)
          }

        } else {

          box.find('.showleft').children('span').each(function (index, element) {

            if ($(this).attr('check') == 0) {
              if ($(this).attr('sel') == 1) {
                $(this).attr('sel', '0').removeClass('addstyle')
              }

            } else {
              if ($(this).attr('sel') == 1) {
                $(this).attr('sel', '0').addClass('addstyle')
              }

            }

          })
          box.find('.showleft').attr('first', 0)
          box.find('.showright').children('span').each(function (index, element) {
            if ($(this).attr('check') == 0) {
              if ($(this).attr('sel') == 1) {
                $(this).attr('sel', '0').removeClass('addstyle')
              }

            } else {
              if ($(this).attr('sel') == 1) {
                $(this).attr('sel', '0').addClass('addstyle')
              }

            }

          })
          box.find('.showright').attr('first', 0)
        }

      } else {
        box.find('.showleft').children('span').each(function (index, element) {
          if ($(this).attr('check') == 0) {
            if ($(this).attr('sel') == 1) {
              $(this).attr('sel', '0').removeClass('addstyle')
            }

          }

        })
        box.find('.showleft').attr('first', 0)
        box.find('.showright').children('span').each(function (index, element) {
          if ($(this).attr('check') == 0) {
            if ($(this).attr('sel') == 1) {
              $(this).attr('sel', '0').removeClass('addstyle')
            }

          }

        })
        box.find('.showright').attr('first', 0)
      }

      clearbackline()
      groupstate = false

    }

    event.preventDefault()
  })
  //canvas 追加2d画布
  var context = canvas.getContext('2d')  //canvas追加2d画图
  var lastX, lastY//存放遍历坐标
  function strockline () {//绘制方法
    context.clearRect(0, 0, box.find('.show').width(), box.find('.show').height())//整个画布清除
    context.save()
    context.beginPath()
    context.lineWidth = linewidth
    for (var i = 0; i < ms.length; i++) {  //遍历绘制
      lastX = mx[i]
      lastY = my[i]
      if (ms[i] == 0) {
        context.moveTo(lastX, lastY)
      } else {
        context.lineTo(lastX, lastY)
      }
    }
    context.strokeStyle = linestyle
    context.stroke()
    context.restore()
  }

  function clearline () {//清除
    context.clearRect(0, 0, box.find('.show').width(), box.find('.show').height())
    mx = []//数据清除
    my = []
    ms = []
    pairl = []
    pairr = []
    pair = 0
    box.find('.showleft').children('span').each(function (index, element) {
      $(this).removeClass('addstyle')
      $(this).attr('sel', '0')
      $(this).attr('check', '0')

    })
    box.find('.showleft').attr('first', 0)
    box.find('.showright').children('span').each(function (index, element) {
      $(this).removeClass('addstyle')
      $(this).attr('sel', '0')
      $(this).attr('check', '0')
    })
    box.find('.showright').attr('first', 0)
  }

  //init backcanvas 2d画布 虚拟绘制
  var backcanvas = backcanvas.getContext('2d')

  function backstrockline () {//绘制
    backcanvas.clearRect(0, 0, box.find('.show').width(), box.find('.show').height())
    backcanvas.save()
    backcanvas.beginPath()
    backcanvas.lineWidth = linewidth
    backcanvas.moveTo(mid_startx, mid_starty)
    backcanvas.lineTo(mid_endx, mid_endy)
    backcanvas.strokeStyle = linestyle
    backcanvas.stroke()
    backcanvas.restore()
  }

  function clearbackline () {//清除
    backcanvas.clearRect(0, 0, box.find('.show').width(), box.find('.show').height())
    mid_startx = null
    mid_starty = null
    mid_endx = null
    mid_endy = null
  }

  //重置
  box.find('.resetCanvasBtn').click(function () {
    clearline()
  })
  //预览和保存操作
  box.find('.saveImageBtn').click(function () {
    var mycanvas = box.find('.canvas')[0]
    var image = mycanvas.toDataURL('image/png') //获取canvas转为指定格式图片的路径
    box.find('.aa').attr('src', image)
  })
  box.find('.downloadImageBtn').click(function () {
    var myCanvas = box.find('.canvas')[0]
    var image = myCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    window.location.href = image//地址变为canvas图片路径，下载
  })
  //回退
  box.find('.goBackBtn').click(function () {
    goBack()
  })

  function goBack () {
    var linenlastIndex = ms.join('').substr(0, ms.length - 1).lastIndexOf('0')
    if (linenlastIndex == 0) {
      clearline()
    } else {
      mx = mx.slice(0, linenlastIndex)  //记录值
      my = my.slice(0, linenlastIndex)  //坐标
      ms = ms.slice(0, linenlastIndex)
      context.clearRect(0, 0, box.find('.show').width(), box.find('.show').height())
      context.save()
      context.beginPath()
      context.lineWidth = linewidth
      for (var i = 0; i < ms.length; i++) {
        lastX = mx[i]
        lastY = my[i]
        if (ms[i] == 0) {
          context.moveTo(lastX, lastY)
        } else {
          context.lineTo(lastX, lastY)
        }
      }
      context.strokeStyle = linestyle
      context.stroke()
      context.restore()
      var pairindex = pairl.length - 1
      box.find('.showleft').children('span').each(function (index, element) {
        if ($(this).attr('pair') == pairl[pairindex]) {
          $(this).removeClass('addstyle')
          $(this).attr('sel', '0')
          $(this).attr('check', '0')
          $(this).removeAttr('pair')
        }

      })
      box.find('.showleft').attr('first', 0)
      box.find('.showright').children('span').each(function (index, element) {
        if ($(this).attr('pair') == pairl[pairindex]) {
          $(this).removeClass('addstyle')
          $(this).attr('sel', '0')
          $(this).attr('check', '0')
          $(this).removeAttr('pair')
        }

      })
      box.find('.showright').attr('first', 0)
      pair -= 1
      pairl = pairl.slice(0, pairindex)
      pairr = pairr.slice(0, pairindex)
    }

  }
}
