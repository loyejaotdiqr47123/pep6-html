// 定时器
var timer = null
var timerSecond = 0
var timerMill = 0
var countDown = 3

// 结果计分板
var overBox = document.getElementById('over-box')
var overTime = document.getElementById('over-time')
var overIntegral = document.getElementById('over-integral')
var panelImg = document.getElementById('panel-img')

var listBox = document.getElementById('list-box') // 列表盒子
var timerBox = document.getElementById('timer-box') // 计时器
var ready = document.getElementById('ready') // 预备
var marquee = document.getElementById('marquee') // 跑马灯

// 渲染跑马灯
for (var i = 0; i < 13; i++) {
  var liDom = document.createElement('li')
  liDom.innerHTML = '<img width="100%" src="../../../../template/shu-er-te-fang-ge/images/light.png" />'
  marquee.appendChild(liDom)
}
// 跑马灯闪动
var lightIndex = 0
setInterval(function() {
  for(var i = 0; i < marquee.children.length; i++) {
    marquee.children[i].className = ''
  }
  marquee.children[lightIndex].className = 'light'
  if (lightIndex < 12) {
    lightIndex += 1
  } else {
    lightIndex = 0
  }
}, 500)

// 随机排序
var list = data
list.sort(function() {return 0.5 - Math.random()})

var index = 1
// 渲染方格
function apply() {
  for (var i = 0; i < list.length; i++) {
    var divDom = document.createElement('div')
    divDom.setAttribute('data-index', i)
    // console.log)
    divDom.onclick = function (e) {
      if (index < 14) {
        if (list[e.target.getAttribute('data-index')].num == index) {
          index += 1
          this.style.cssText = 'background-image: url("../../../../template/shu-er-te-fang-ge/images/b-block.png")'
        }
      } else {
        this.style.cssText = 'background-image: url("../../../../template/shu-er-te-fang-ge/images/b-block.png")'
        clearInterval(timer)
      }
    }
    divDom.innerHTML = '<img draggable="false" src="' + list[i].img + '" data-index="' + i + '" />'
    // 加入第一排
    if (i < 5) {
      listBox.children[0].appendChild(divDom)
    } else if (i >= 5 && i < 9) {
      listBox.children[1].appendChild(divDom)
    } else {
      listBox.children[2].appendChild(divDom)
    }
  }
}

// 开始
function start () {
  var readyGo = document.createElement('audio')
  readyGo.src = '../../../../template/sound/ready go.mp3'
  readyGo.play()

  apply()
  rule.style.cssText = 'display: none'
  var countTimer = setInterval(function() {
    countDown -= 1
    ready.innerHTML = countDown
  }, 1000)
  setTimeout(function() {
    clearInterval(countTimer)
    ready.style.cssText = 'display: none'
    // 开始计时
    timer = setInterval(function() {
      if (timerMill < 9) {
        timerMill += 1
      } else {
        timerMill = 0
        timerSecond += 1
      }
      timerBox.innerHTML = timerSecond + '.' + timerMill
    }, 100);
  }, 3000);
  
}

// 重新开始
function again() {
  var readyGo = document.createElement('audio')
  readyGo.src = '../../../../template/sound/ready go.mp3'
  readyGo.play()

  index = 1
  clearInterval(timer)
  timerBox.innerHTML = '0.0'
  countDown = 3
  ready.innerHTML = countDown
  ready.style.cssText = ''
  var countTimer = setInterval(function() {
    countDown -= 1
    ready.innerHTML = countDown
  }, 1000)
  listBox.innerHTML = '<li></li><li></li><li></li>'
  list.sort(function() {return 0.5 - Math.random()})
  apply()
  timerSecond = 0
  timerMill = 0
  setTimeout(function() {
    clearInterval(countTimer)
    ready.style.cssText = 'display: none'
    // 开始计时
    timer = setInterval(function() {
      if (timerMill < 9) {
        timerMill += 1
      } else {
        timerMill = 0
        timerSecond += 1
      }
      timerBox.innerHTML = timerSecond + '.' + timerMill
    }, 100);
  }, 3000);
}