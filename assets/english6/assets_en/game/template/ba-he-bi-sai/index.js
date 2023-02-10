// 生命
var HP = 3
// 总分
var totalPoints = 0
// 每题得分
var grade = parseInt((100 / data.length).toFixed(0))
console.log(grade)
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

var soundBox = document.getElementById('sound-box')
var optionBox = document.getElementById('option-box')
var banner = document.getElementById('banner') // 旗子
var ball = document.getElementById('ball') // 球
var people1 = document.getElementById('people1') // 人物一
var people2 = document.getElementById('people2') // 人物二
var people3 = document.getElementById('people3') // 人物三

// 随机排序
var list = data
for (var i = 0; i < list.length; i++) {
  list[i].options.sort(function() {return 0.5 - Math.random()})
}
list.sort(function() {return 0.5 - Math.random()})

var isAnimation = false

var correct = 0
// 选择答案
function choice(right, index) {
  if (isAnimation === false) {
    isAnimation = true
    if (right === true) {
      // 正确
      audioCorrect.currentTime = 0
      audioCorrect.play()
      banner.src = '../../../../template/ba-he-bi-sai/images/banner-red.png'
      switch (index) {
        case 0:
          ball.className = 'roll1'
          people2.src = '../../../../template/ba-he-bi-sai/images/people2-lose.png'
          people3.src = '../../../../template/ba-he-bi-sai/images/people3-lose.png'
          break
        case 1:
          ball.className = 'roll2'
          people1.src = '../../../../template/ba-he-bi-sai/images/people1-lose.png'
          people3.src = '../../../../template/ba-he-bi-sai/images/people3-lose.png'
          break
        case 2:
          ball.className = 'roll3'
          people1.src = '../../../../template/ba-he-bi-sai/images/people1-lose.png'
          people2.src = '../../../../template/ba-he-bi-sai/images/people2-lose.png'
          break
      }
      correct += 1
      totalPoints += grade
      dGrade.innerText = totalPoints
    } else {
      // 错误
      aduioError.currentTime = 0
      aduioError.play()
      HP -= 1
      dHP.innerText = HP
      if (HP <= 0) {
        // alert('游戏结束')
        panelImg.src = '../../../../template/images/scoring-error.png'
        overBox.style.display = 'block'
        overTime.innerText = '时间：' + totalTime
        overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
        clearInterval(countDown)
      }
      people1.src = '../../../../template/ba-he-bi-sai/images/people1-lose.png'
      people2.src = '../../../../template/ba-he-bi-sai/images/people2-lose.png'
      people3.src = '../../../../template/ba-he-bi-sai/images/people3-lose.png'
    }
    setTimeout(function() {
      if (listIndex < (list.length - 1)) {
        listIndex += 1
        answer()
        isAnimation = false
        
        people1.src = '../../../../template/ba-he-bi-sai/images/people1.png'
        people2.src = '../../../../template/ba-he-bi-sai/images/people2.png'
        people3.src = '../../../../template/ba-he-bi-sai/images/people3.png'
        ball.className = ''
        banner.src = '../../../../template/ba-he-bi-sai/images/banner-white.png'
      } else {
        // alert('游戏结束，分数：' + totalPoints)
        clearInterval(countDown)
        overBox.style.display = 'block'
        overTime.innerText = '时间：' + totalTime
        correct === list.length ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
        overIntegral.innerText = '得分：' + totalPoints
      }
    }, 2000);
  }
}

// 当前题目
var listIndex = 0

// 渲染音频和题目
var audioArr = []
for (var i = 0; i < list.length; i++) {
  audioArr.push(document.createElement('audio'))
  audioArr[i].src = list[i].sound
}

function answer() {
  var optionsHtml = ''
  for (var i = 0; i < list[listIndex].options.length; i++) {
    optionsHtml += '<div onclick="choice(' + list[listIndex].options[i].right + ', ' + i + ')">' +
    '<img src="' + list[listIndex].options[i].imgUrl + '" />' +
    '</div>'
  }
  optionBox.innerHTML = optionsHtml
  audioArr[listIndex].play()
}


// 开始
function start () {
  var readyGo = document.createElement('audio')
  readyGo.src = '../../../../template/sound/ready go.mp3'
  readyGo.play()
  
  rule.style.display = 'none'
  setTimeout(function() {
    answer()
  }, 1500)
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