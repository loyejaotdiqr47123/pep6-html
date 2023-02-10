window.onload = function() {
  var data = [1,1,2,1,1,2]

  var content = document.getElementsByClassName('content')[0]
  var numberList = document.getElementById('number-list').children
  var checkList = document.getElementById('check-list')
  var yesAudio = document.getElementById('yes') // 正确音频
  var tryAudio = document.getElementById('try') // 错误音频

  // 游戏框位置
  var contentX = content.offsetLeft
  var contentY = content.offsetTop

  var activeLi = null
  var activeLiX = 0
  var activeLiY = 0

  // 获取选择列表属性
  var scope = []

  // 正确数
  var cNum = 0

  for (var i = 0; i < numberList.length; i++) {
    // 鼠标按下
    numberList[i].addEventListener('mousedown', function(e) {
      // console.log(e.target.parentNode.nodeName)
      if (e.target.parentNode.nodeName === 'DIV' && cNum < 7) {
        var numWidth = e.target.offsetWidth / 2
        var numHeight = e.target.offsetHeight / 2
        activeLi = e
        activeLiX = e.clientX - contentX
        activeLiY = e.clientY - contentY
        e.target.style.cssText = 'left: ' + (e.clientX - contentX - (e.target.offsetWidth / 2)) + 'px;top:' + (e.clientY - contentY - (e.target.offsetHeight / 2)) + 'px'

        for (var i = 0; i < checkList.children.length; i++) {
          // console.log(checkList.children[i])
          // checkList.children[i].dataset.flag = data[i]
          checkList.children[i].setAttribute('data-flag', data[i])
          // checkList.children[i].children[0].dataset.flag = data[i]

          // 四个框范围
          scope.push({
            x1: checkList.children[i].offsetLeft + checkList.offsetLeft,
            x2: checkList.children[i].offsetLeft + checkList.children[i].offsetWidth + checkList.offsetLeft,
            y1: checkList.children[i].offsetTop + checkList.offsetTop,
            y2: checkList.children[i].offsetTop + checkList.children[i].offsetHeight + checkList.offsetTop,
          })
        }
        // 鼠标移动
        document.addEventListener('mousemove', function(e) {
          e.preventDefault()
          if (activeLi) {
            activeLi.target.style.cssText = 'left: ' + (e.clientX - numWidth) + 'px;top:' + (e.clientY - numHeight) + 'px'
          }
        })
      }
    })
    // 鼠标抬起
    numberList[i].addEventListener('mouseup', function(e) {
      if (e.target.parentNode.nodeName === 'DIV') {
        var x1 = e.target.offsetLeft
        var x2 = e.target.offsetLeft + e.target.offsetWidth
        var y1 = e.target.offsetTop
        var y2 = e.target.offsetTop + e.target.offsetHeight
        for (var i = 0; i < scope.length; i++) {
          // 判断是否拖放到选择框中
          if (x1 >= scope[i].x1 && x2 <= scope[i].x2 && y1 >= scope[i].y1 && y2 <= scope[i].y2) {
            // 重置前一次播放
            yesAudio.currentTime = 0
            tryAudio.currentTime = 0
            // 是否正确
            if (e.target.getAttribute('data-flag') == (checkList.children[i] ? checkList.children[i].getAttribute('data-flag') : false)) {
            // if (e.target.dataset.flag == checkList.children[i].dataset.flag) {
              // console.log('正确')
              // 判断是否已填过
              if (checkList.children[i].childNodes.length == 0) {
                cNum += 1
                yesAudio.play()
                activeLi.target.style.cssText = ''
                var clonedNode = e.target.cloneNode(true);
                checkList.children[i].appendChild(clonedNode)
                break;
              } else {
                activeLi.target.style.cssText = ''
              }
            } else {
              tryAudio.play()
              activeLi.target.style.cssText = ''
              break;
            }
          } else {
            activeLi.target.style.cssText = ''
          }
        }
        x1 = 0
        x2 = 0
        y1 = 0
        y2 = 0
        activeLi = null
      }
    })
  }
}
