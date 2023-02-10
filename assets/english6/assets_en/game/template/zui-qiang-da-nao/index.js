// 生命
var HP = 3
// 总分
var totalPoints = 0
// 每题得分
var grade = parseInt((100 / data.length).toFixed(0))
// 倒计时定时器
var countDown = null

// 计分板
var dHP = document.getElementById('HP')
var dGrade = document.getElementById('grade')
var dCountDown = document.getElementById('count-down')
// 结果计分板
var overBox = document.getElementById('over-box')
var overTime = document.getElementById('over-time')
var overIntegral = document.getElementById('over-integral')
var panelImg = document.getElementById('panel-img')
// 声音
var audioCorrect = document.getElementById('audio-correct')
var aduioError = document.getElementById('aduio-error')

var content = document.getElementsByClassName('content')[0]
var numberList = document.getElementById('number-list').children
var checkList = document.getElementById('check-list')

 // 游戏框位置
 var contentX = content.offsetLeft
 var contentY = content.offsetTop

 var activeLi = null
 var activeLiX = 0
 var activeLiY = 0

 // 获取选择列表属性
 var scope = []

 var correct = 0

for (var i = 0; i < numberList.length; i++) {
  // 鼠标按下
  numberList[i].addEventListener('mousedown', function(e) {
    // console.log(e.target.parentNode.nodeName)
    if (e.target.parentNode.nodeName === 'DIV') {
      var numWidth = e.target.offsetWidth / 2
      var numHeight = e.target.offsetHeight / 2
      activeLi = e
      activeLiX = e.clientX - contentX
      activeLiY = e.clientY - contentY
      e.target.style = 'left: ' + e.clientX - contentX - (e.target.offsetWidth / 2) + 'px;top: ' + e.clientY - contentY - (e.target.offsetHeight / 2) + 'px'
    
      for (var i = 0; i < checkList.children.length; i++) {
        // console.log(checkList.children[i].setAttribute('flag', data[i]))
        // console.log(checkList.children[i].getAttribute('flag'))
        checkList.children[i].setAttribute('data-flag', data[i])
        // checkList.children[i].dataset.flag = data[i]
        // checkList.children[i].dataset.flag = data[i]
        // 四个框范围
        scope.push({
          x1: checkList.children[i].offsetLeft,
          x2: checkList.children[i].offsetLeft + checkList.children[i].offsetWidth,
          y1: checkList.children[i].offsetTop,
          y2: checkList.children[i].offsetTop + checkList.children[i].offsetHeight,
        })
      }
      // 鼠标移动
      document.addEventListener('mousemove', function(e) {
        e.preventDefault()
        if (activeLi) {
          // console.log(e.clientX - numWidth)
          activeLi.target.style.left = e.clientX - numWidth + 'px'
          activeLi.target.style.top = e.clientY - numHeight + 'px'
          // activeLi.target.style.cssText = 'left:' + e.clientX - numWidth + 'px;top:' + e.clientY - numHeight + 'px'
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
      // 判断是否拖放到选择框中
      for (var i = 0; i < scope.length; i++) {
        // 判断是否拖入方框
        if ((x1 >= scope[i].x1 && x2 <= scope[i].x2 && y1 >= scope[i].y1 && y2 <= scope[i].y2)) {
          // 打断前一次播放
          // 是否正确
          console.log(e.target.getAttribute('data-flag'), checkList.children[i].getAttribute('data-flag'))
          if (e.target.getAttribute('data-flag') == checkList.children[i].getAttribute('data-flag')) {
          // if (e.target.dataset.flag == checkList.children[i].dataset.flag) {
            // console.log('正确')
            audioCorrect.currentTime = 0
            audioCorrect.play()
            correct += 1
            totalPoints += grade
            dGrade.innerHTML = totalPoints
            // checkList.children[i].append(e.target)
            checkList.children[i].appendChild(e.target)
            activeLi.target.style = ''
            if (correct >= data.length) {
              clearInterval(countDown)
              overBox.style.display = 'block'
              overTime.innerText = '时间：' + totalTime
              HP == 3 ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
              console.log(totalPoints)
              overIntegral.innerText = '得分：' + totalPoints
            }
            break;
          } else {
            // console.log('错误')
            aduioError.currentTime = 0
            aduioError.play()
            HP -= 1
            dHP.innerText = HP
            totalPoints -= 10
            dGrade.innerHTML = totalPoints
            if (HP <= 0) {
              // alert('游戏结束')
              panelImg.src = '../../../../template/images/scoring-error.png'
              overBox.style = 'display: block'
              overTime.innerText = '时间：' + totalTime
              overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
              clearInterval(countDown)
            }
            activeLi.target.style.cssText = ''
            break;
          }
        } else {
          // console.log(activeLi.target.style.cssText)
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


// 开始
function start() {
  var readyGo = document.createElement('audio')
  readyGo.src = '../../../../template/sound/ready go.mp3'
  readyGo.play()
  
  var soundDoc = document.createElement('audio')
  soundDoc.src = sound
  soundDoc.play()

  rule.style.cssText = 'display: none'
  // 倒计时
  countDown = setInterval(function() {
    if (totalTime <= 0) {
      clearInterval(countDown)
      panelImg.src = '../../../../template/images/scoring-error.png'
      overBox.style.display = 'block'
      overTime.innerText = '时间：' + totalTime
      overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
    } else {
      totalTime -= 1
      dCountDown.innerText = totalTime
    }
  }, 1000)
}