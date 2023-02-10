// 结果计分板
var overBox = document.getElementById('over-box')
// 声音
var audioCorrect = document.getElementById('audio-correct')
var aduioError = document.getElementById('aduio-error')

var prompt = document.getElementById('prompt') // 提示框
var hair = document.getElementById('hair') // 头发
var face = document.getElementById('face') // 脸
var eye = document.getElementById('eye') // 眼睛
var mouth = document.getElementById('mouth') // 嘴巴
var nose = document.getElementById('nose') // 鼻子
var clothing = document.getElementById('clothing') // 衣服
var trousers = document.getElementById('trousers') // 裤子

var list = data
list = list.sort(function() {return 0.5 - Math.random()})

// 当前题目
var listIndex = 0

// 渲染音频
var audioArr = []
for (var i = 0; i < list.length; i++) {
  audioArr.push(document.createElement('audio'))
  audioArr[i].src = list[i].sound
}

// 再次播放
function againPlay() {
  audioArr[listIndex].pause()
  audioArr[listIndex].play()
}

// 选择颜色
function tintage(color) {
  if (color == list[listIndex].color) {
    // 正确
    audioCorrect.currentTime = 0
    audioCorrect.play()
    switch (list[listIndex].name) {
      case 'hair':
        hair.style.cssText = 'display:block'
        break
      case 'face':
        face.style.cssText = 'display:block'
        break
      case 'eyes':
        eye.style.cssText = 'display:block'
        break
      case 'mouth':
        mouth.style.cssText = 'display:block'
        break
      case 'nose':
        nose.style.cssText = 'display:block'
        break
      case 'clothing':
        clothing.style.cssText = 'display:block'
        break
      case 'trousers':
        trousers.style.cssText = 'display:block'
        break
    }
    if (listIndex < (list.length - 1)) {
      listIndex += 1
      answer()
    } else {
      overBox.style.cssText = 'display: block'
    }
  } else {
    // alert('错误')
    aduioError.currentTime = 0
    aduioError.play()
  }
}

// 渲染题目
function answer() {
  audioArr[listIndex].play()
  switch (list[listIndex].name) {
    case 'hair':
      prompt.className = 'prompt-hair'
      break
    case 'face':
      prompt.className = 'prompt-face'
      break
    case 'eyes':
      prompt.className = 'prompt-eyes'
      break
    case 'mouth':
      prompt.className = 'prompt-mouth'
      break
    case 'nose':
      prompt.className = 'prompt-nose'
      break
    case 'clothing':
      prompt.className = 'prompt-clothing'
      break
    case 'trousers':
      prompt.className = 'prompt-trousers'
      break
  }
}

// 开始
function start () {
  var readyGo = document.createElement('audio')
  readyGo.src = '../../../../template/sound/ready go.mp3'
  readyGo.play()
  
  rule.style.cssText = 'display: none'
  setTimeout(function() {
    answer()
  }, 1500)
}