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

var table = document.getElementById('table') // 表格
var titleShow = document.getElementById('title-show') // 题目显示
var wordShow = document.getElementById('word-show') // 单词展示

// 打乱顺序
var list = data
list.sort(function() {return 0.5 - Math.random()})

var listIndex = 0 // 当前第几道

var activeX = null
var activeY = null
var firstTd = ''
var wordStr = ''
var tdArr = []
function letterClick(e, x, y) {
  wordStr = ''
  if (x == activeX) {
    // 数列单词
    var firstY = parseInt(firstTd.getAttribute('data-y'))
    var lastY = parseInt(e.target.parentNode.getAttribute('data-y'))
    var tdNode = null
    if (lastY > firstY) {
      // console.log('数列向下')
      // 清除残留样式
      for (var p = 0; p < tdArr.length; p++) {
        tdArr[p].style.cssText = 'background-color: #f2c47c;'
        tdArr[p].childNodes[0].src = '../../../../template/ai-ji-gu-bao-mi-gong/images/' + tdArr[p].getAttribute('data-letter') + '.png'
      }
      tdArr = []
      for (var z = firstY; z <= lastY; z++) {
        tdNode = table.childNodes[0].childNodes[z].childNodes[activeX]
        tdNode.style.cssText = 'background-color: #df8f1b;'
        tdNode.childNodes[0].src = '../../../../template/ai-ji-gu-bao-mi-gong/images/' + tdNode.getAttribute('data-letter') + '2.png'
        wordStr += tdNode.getAttribute('data-letter')
        tdArr.push(tdNode)
      }
    } else {
      // console.log('数列向上')
      // 清除残留样式
      for (var p = 0; p < tdArr.length; p++) {
        tdArr[p].style.cssText = 'background-color: #f2c47c;'
        tdArr[p].childNodes[0].src = '../../../../template/ai-ji-gu-bao-mi-gong/images/' + tdArr[p].getAttribute('data-letter') + '.png'
      }
      tdArr = []
      for (var z = lastY; z <= firstY; z++) {
        tdNode = table.childNodes[0].childNodes[z].childNodes[activeX]
        tdNode.style.cssText = 'background-color: #df8f1b;'
        tdNode.childNodes[0].src = '../../../../template/ai-ji-gu-bao-mi-gong/images/' + tdNode.getAttribute('data-letter') + '2.png'
        wordStr += tdNode.getAttribute('data-letter')
        tdArr.push(tdNode)
      }
    }
  } else if (y == activeY) {
    // 横排单词
    var firstX = parseInt(firstTd.getAttribute('data-x'))
    var lastX = parseInt(e.target.parentNode.getAttribute('data-x'))
    var tdNode = null
    if (lastX > firstX) {
      // console.log('横排向右')
      // 清除残留样式
      for (var p = 0; p < tdArr.length; p++) {
        tdArr[p].style.cssText = 'background-color: #f2c47c;'
        tdArr[p].childNodes[0].src = '../../../../template/ai-ji-gu-bao-mi-gong/images/' + tdArr[p].getAttribute('data-letter') + '.png'
      }
      tdArr = []
      for (var z = firstX; z <= lastX; z++) {
        tdNode = table.childNodes[0].childNodes[activeY].childNodes[z]
        tdNode.style.cssText = 'background-color: #df8f1b;'
        tdNode.childNodes[0].src = '../../../../template/ai-ji-gu-bao-mi-gong/images/' + tdNode.getAttribute('data-letter') + '2.png'
        wordStr += tdNode.getAttribute('data-letter')
        tdArr.push(tdNode)
        // wordStr += firstTd.parentNode..childNodes[z].getAttribute('data-letter')
      }
    } else {
      // console.log('横排想左')
      // 清除残留样式
      for (var p = 0; p < tdArr.length; p++) {
        tdArr[p].style.cssText = 'background-color: #f2c47c;'
        tdArr[p].childNodes[0].src = '../../../../template/ai-ji-gu-bao-mi-gong/images/' + tdArr[p].getAttribute('data-letter') + '.png'
      }
      tdArr = []
      for (var z = lastX; z <= firstX; z++) {
        tdNode = table.childNodes[0].childNodes[activeY].childNodes[z]
        tdNode.childNodes[0].src = '../../../../template/ai-ji-gu-bao-mi-gong/images/' + tdNode.getAttribute('data-letter') + '2.png'
        tdNode.style.cssText = 'background-color: #df8f1b;'
        wordStr += tdNode.getAttribute('data-letter')
        tdArr.push(tdNode)
        // wordStr += firstTd.parentNode..childNodes[z].getAttribute('data-letter')
      }
    }
  } else {
    activeX = x
    activeY = y
    tdArr = []
    if (e.target.nodeName === 'IMG') { // 是否点击到img标签
      firstTd = e.target.parentNode
      var trNodes = e.target.parentNode.parentNode.parentNode.childNodes
      for (var n = 0; n < trNodes.length; n++) {
        trNodes[n].removeAttribute('style')
        for (var m = 0; m < trNodes[n].childNodes.length; m++) {
          trNodes[n].childNodes[m].removeAttribute('style')
          trNodes[n].childNodes[m].childNodes[0].src = '../../../../template/ai-ji-gu-bao-mi-gong/images/' + trNodes[n].childNodes[m].getAttribute('data-letter') + '.png'
          if (x == parseInt(trNodes[n].childNodes[m].getAttribute('data-x'))) {
            trNodes[n].childNodes[m].style.cssText = 'background-color: #f2c47c;'
          }
        }
      }
      e.target.parentNode.style.cssText = 'background-color: #df8f1b;'
      e.target.parentNode.parentNode.style.cssText = 'background-color: #f2c47c;'
      e.target.src = '../../../../template/ai-ji-gu-bao-mi-gong/images/' + e.target.parentNode.getAttribute('data-letter') + '2.png'
      wordStr = e.target.parentNode.getAttribute('data-letter')
    } else {
      firstTd = e.target
      var trNodes = e.target.parentNode.parentNode.childNodes
      for (var n = 0; n < trNodes.length; n++) {
        trNodes[n].removeAttribute('style')
        for (var m = 0; m < trNodes[n].childNodes.length; m++) {
          trNodes[n].childNodes[m].removeAttribute('style')
          console.log(trNodes[n].childNodes[m], trNodes[n])
          trNodes[n].childNodes[m].childNodes[0].src = '../../../../template/ai-ji-gu-bao-mi-gong/images/' + trNodes[n].childNodes[m].getAttribute('data-letter') + '.png'
          if (x == parseInt(trNodes[n].childNodes[m].getAttribute('data-x'))) {
            trNodes[n].childNodes[m].style.cssText = 'background-color: #f2c47c;'
          }
        }
      }
      e.target.style.cssText = 'background-color: #df8f1b;'
      e.target.parentNode.style.cssText = 'background-color: #f2c47c;'
      e.target.childNodes[0].src = '../../../../template/ai-ji-gu-bao-mi-gong/images/' + e.target.getAttribute('data-letter') + '2.png'
      wordStr = e.target.getAttribute('data-letter')
    }
  }
  wordShow.innerHTML = wordStr
}

// 渲染表格
function applyTable() {
  var htmlTable = ''
  for (var i = 0; i < matrix.length; i++) {
    htmlTable += '<tr>'
    for (var j = 0; j < matrix[i].length; j++) {
      htmlTable += '<td onclick="letterClick(event, ' + j + ', ' + i + ')" data-x="' + j + '" data-y="' + i + '" data-letter="' + matrix[i][j] + '"><img  src="../../../../template/ai-ji-gu-bao-mi-gong/images/' + matrix[i][j] + '.png"/></td>'
    }
    htmlTable += '</tr>'
  }
  table.innerHTML = htmlTable
}

// 渲染题目
function answer() {
  applyTable()
  titleShow.innerHTML = '<img width="100%" src="' + list[listIndex].image + '" />'
}

// 确认
function ok() {
  if (wordStr == list[listIndex].word) {
    console.log('正确')
    audioCorrect.currentTime = 0
    audioCorrect.play()
    totalPoints += grade
    dGrade.innerText = totalPoints
    wordShow.innerHTML = ''
    if (listIndex < (list.length - 1)) {
      listIndex += 1
      answer()
    } else {
      clearInterval(countDown)
      overBox.style.display = 'block'
      overTime.innerText = '时间：' + totalTime
      HP == 3 ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
      overIntegral.innerText = '得分：' + totalPoints
    }
  } else {
    console.log('错误')
    aduioError.currentTime = 0
    aduioError.play()
    HP -= 1
    dHP.innerText = HP
    dGrade.innerHTML = totalPoints
    if (HP <= 0) {
      // alert('游戏结束')
      panelImg.src = '../../../../template/images/scoring-error.png'
      overBox.style = 'display: block'
      overTime.innerText = '时间：' + totalTime
      overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
      clearInterval(countDown)
    }
  }
}

// 开始
function start () {
  var readyGo = document.createElement('audio')
  readyGo.src = '../../../../template/sound/ready go.mp3'
  readyGo.play()
  
  applyTable()
  answer()
  rule.style.cssText = 'display: none'
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