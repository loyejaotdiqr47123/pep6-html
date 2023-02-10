// 字母
var letter = []
for (var i = 0; i < word.length; i++) {
  letter.push(word[i].substr(0, 1))
}

// 生命
var HP = 3
// 总分
var totalPoints = 0
// 每题得分
var grade = parseInt((100 / word.length).toFixed(0))
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

var chook = document.getElementById('chook')
var interface = document.getElementById('interface')
var wordBox = document.getElementById('word-box')
var notice = document.getElementById('notice')

// 位置
var coordinate = [
  {
    x: 20
  },
  {
    x: 30
  },
  {
    x: 40
  },
  {
    x: 50
  },
  {
    x: 60
  }
]

// 初始位置
var initialSite = 2
chook.style.cssText = 'left: ' + coordinate[initialSite].x + 'vw'

var jumpFlag = true

document.onkeydown = function(e) {
  if (e.keyCode === 37) {
    initialSite > 0 ? initialSite -= 1 : initialSite = 0
    chook.style.cssText = 'left: ' + coordinate[initialSite].x + 'vw'
  } else if (e.keyCode === 39) {
    initialSite < (coordinate.length - 1) ? initialSite += 1 : initialSite = (coordinate.length - 1)
    chook.style.cssText = 'left: ' + coordinate[initialSite].x + 'vw'
  }
  // 跳跃
  if (e.keyCode === 38 || e.keyCode === 32) {
    if (jumpFlag === true) {
      jumpFlag = false
      chook.className = 'jump'
      setTimeout(function() {
        chook.className = ''
        jumpFlag = true
      }, 500)
    }
  }
}

// 
function NewWord (content, site) {
  this.content = content
  this.siteX = site
  this.siteY = 0
}
NewWord.prototype.fall = function() {
  var wordDom = document.createElement('div')
  wordDom.className = 'word'
  wordDom.style.cssText = 'left:' + coordinate[this.siteX].x + 'vw;top:' + this.siteY + 'vw'
  wordDom.innerHTML = this.content
  wordBox.appendChild(wordDom)
  var that = this
  var timer = setInterval(function() {
    that.siteY += 2
    wordDom.style.cssText = 'left:' + coordinate[that.siteX].x + 'vw;top:' + that.siteY + 'px'
    if (that.siteY >= (chook.offsetTop - (chook.offsetWidth / 2))) {
    // if (that.siteY >= (wordBox.offsetHeight - chook.offsetHeight)) {
      clearInterval(timer)
      if (that.siteX === initialSite) {
        // console.log('接住一个')
        wordBox.removeChild(wordDom)
        if (that.content.substr(0, 1).toLowerCase() == letter[presentLetter].toLowerCase()) {
          // 正确
          audioCorrect.currentTime = 0
          audioCorrect.play()
          integral += 1
          // console.log('积分：' + integral)
          presentLetter += 1
          notice.innerHTML = letter[presentLetter] || '' // 更新字母
          totalPoints += grade
          dGrade.innerText = totalPoints
          if (presentLetter >= letter.length) {
            time = 0
            // alert('游戏结束')
            overBox.style.cssText = 'display: block'
            overTime.innerText = '时间：' + totalTime
            totalPoints == 99 ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
            overIntegral.innerText = '得分：' + totalPoints
            clearInterval(countDown)
          }
        } else {
          // 错误
          // integral -= 1
          // console.log('积分：' + integral)
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
      } else {
        wordBox.removeChild(wordDom)
      }
    }
  }, 30);
}

var integral = 0
var time = 60

// 当前字母
var presentLetter = 0
var wordTimer = null

var noWord = 0 // 非当前字母单词次数
var randomWord = ''

// 开始
function start () {
  var readyGo = document.createElement('audio')
  readyGo.src = '../../../../template/sound/ready go.mp3'
  readyGo.play()

  rule.style.cssText = 'display: none'
  interface.style.cssText = ''

  wordTimer = setInterval(function() {
    randomWord = word[Math.floor(Math.random() * word.length)]
    // console.log(randomWord.substr(0, 1), letter[presentLetter])
    // 判断未出现当前字母是否超过三次
    if (randomWord.substr(0, 1) != letter[presentLetter]) {
      noWord += 1
    }
    if (noWord >= 3) {
      for (var i = 0; i < word.length; i++) {
        if (letter[presentLetter] == word[i].substr(0, 1)) {
          randomWord = word[i]
          noWord = 0
        }
      }
    }
    var word1 = new NewWord(randomWord, Math.floor(Math.random() * 5))
    word1.fall()
  }, 2000);
  notice.innerHTML = letter[presentLetter]

  // timePanel.innerHTML = time
  // 倒计时
  countDown = setInterval(function() {
    if (totalTime <= 0) {
      clearInterval(countDown)
      clearInterval(wordTimer)
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
