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

var topic = document.getElementById('topic') // 题目
var options = document.getElementById('options') // 选项
var score = document.getElementById('score') // 得分

var list = data
list.sort(function() {return 0.5 - Math.random()})

var listIndex = 0

function option(right) {
  if (right) {
    // 正确
    audioCorrect.currentTime = 0
    audioCorrect.play()
    totalPoints += grade
    dGrade.innerText = totalPoints
    score.innerHTML = '+' + grade
    score.style.cssText = 'display: block'
    setTimeout(function() {
      score.style.cssText = ''
    }, 1000)
  } else {
    // 错误
    aduioError.currentTime = 0
    aduioError.play()
    HP -= 1
    dHP.innerText = HP
    if (HP <= 0) {
      // alert('游戏结束')
      panelImg.src = '../../../../template/images/scoring-error.png'
      overBox.style.cssText = 'display: block'
      overTime.innerText = '时间：' + totalTime
      overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
      clearInterval(countDown)
    }
  }
  if (listIndex < (list.length - 1)) {
    listIndex += 1
    answer()
  } else {
    overBox.style.cssText = 'display: block'
    overTime.innerText = '时间：' + totalTime
    HP == 3 ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
    overIntegral.innerText = '得分：' + totalPoints
  }
}

// 渲染题目
function answer() {
  topic.innerHTML = '<img src="' + list[listIndex].topic + '" />'
  var listHtml = ''
  for (var i = 0; i < list[listIndex].options.length; i++) {
    listHtml += '<img onclick="option(' + list[listIndex].options[i].right + ')" src="' + list[listIndex].options[i].title + '" />'
  }
  options.innerHTML = listHtml
}

// 开始
function start () {
  var readyGo = document.createElement('audio')
  readyGo.src = '../../../../template/sound/ready go.mp3'
  readyGo.play()

  rule.style.cssText = 'display: none'
  answer()
  // 倒计时
  countDown = setInterval(function() {
    if (totalTime <= 0) {
      clearInterval(countDown)
      panelImg.src = '../../../../template/images/scoring-error.png'
      overBox.style.cssText = 'display: block'
      overTime.innerText = '时间：' + totalTime
      overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
    } else {
      totalTime -= 1
      dCountDown.innerText = totalTime
    }
  }, 1000)
}