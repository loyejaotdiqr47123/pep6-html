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

var rule = document.getElementById('rule') // 规则页面
var listBox = document.getElementById('list-box') // 列表盒子

//解决IE8之类不支持getElementsByClassName
function getElClassName(className, tagName) {
  //如果浏览器支持getElementsByClassName()就直接返回
  if(document.getElementsByClassName){
      return document.getElementsByClassName(className)
  }
  //否则遍历document文档指定的标签名集合
  var children = document.getElementsByTagName(tagName);
  //此数组用于保存遍历后得到的class元素
    var elements = new Array();

    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var classNames = child.className.split(' ');            //分割多个class元素
        for (var j = 0; j < classNames.length; j++) {
            if (classNames[j] == className) {
                elements.push(child);
                break;
            }
        }
    }
    return elements;
};

// 配对
var permit = false
var record = 0
var dom1 = null
var correct = 0
var flag = false
function pair(e, type, name) {
  if (flag === true) {
    flag = false
    // 判断是否重复点击
    if (permit === true && (dom1 ? e.target.parentNode.getAttribute('data-name') !== dom1.target.parentNode.getAttribute('data-name') : true)) {
      if (record === 0) {
        // e.target.style = 'color: red'
        // 翻转动画
        e.target.parentNode.classList.add('turnover-rem')
        setTimeout(function() {
          // e.target.innerHTML = `<img src="${e.target.dataset.name}" />`
          e.target.src = e.target.parentNode.getAttribute('data-name')
          dom1 = e
          record = type
          flag = true
        }, 300)
      } else {
        // console.log(dom1.target.dataset.name)
        // dom1.target.innerHTML = dom1.target.dataset.name
        e.target.parentNode.classList.add('turnover-rem')
        setTimeout(function() {
          // e.target.innerHTML = `<img src="${e.target.dataset.name}" />`
          e.target.src = e.target.parentNode.getAttribute('data-name')
          dom1.target.style.cssText = ''
          if (record === type) {
            // 正确
            audioCorrect.currentTime = 0
            audioCorrect.play()
            totalPoints += grade
            dGrade.innerText = totalPoints
            correct += 1
            setTimeout(function() {
              flag = true
              dom1.target.style.cssText = 'opacity: 0;'
              e.target.style.cssText = 'opacity: 0;'
              dom1 = null
            }, 1000);
            // dom1.target.innerHTML = ''
            // e.target.innerHTML = ''
            record = 0
            if (correct === (list.length / 2)) {
              // alert('全部答完')
              clearInterval(countDown)
              overBox.style.cssText = 'display: block'
              overTime.innerText = '时间：' + totalTime
              // overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
              // HP == 3 ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
              overIntegral.innerText = '得分：' + 100
            }
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
            record = 0
            setTimeout(function() {
              // e.target.innerHTML = ''
              // dom1.target.innerHTML = ''
              // 翻牌动画
              e.target.parentNode.className = 'list turnover'
              dom1.target.parentNode.className = 'list turnover'
              setTimeout(function() {
                flag = true
                e.target.src = cookieImg
                dom1.target.src = cookieImg
                dom1 = null
              }, 300)
            }, 1000);
          }
        }, 300)
        
      }
    } else {
      flag = true
    }
  }
}

// 列表数据
var list = []
for (var i = 0; i < data.length; i++) {
  list.push({
    display: data[i].display1,
    matching: data[i].matching
  })
  list.push({
    display: data[i].display2,
    matching: data[i].matching
  })
}
// 随机排序
list.sort(function() {return 0.5 - Math.random()})
// 渲染列表
var listStr = ''
for (var i = 0; i < list.length; i++) {
  listStr += '<li class="list" onclick="pair(event, &quot;' + list[i].matching + '&quot;, &quot;' + list[i].display + '&quot;)" data-name="' + list[i].display + '">' +
    '<img src="' + list[i].display + '" />' +
    '</li>'
}
listBox.innerHTML = listStr

// 开始
function start () {
  var readyGo = document.createElement('audio')
  readyGo.src = '../../../../template/sound/ready go.mp3'
  readyGo.play()

  rule.style.cssText = 'display: none'
  listBox.style.display = 'flex'
  setTimeout(function() {
    permit = true
    // document.getElementsByClassName('list')[0].innerHTML = ''
    for (var i = 0; i < document.getElementsByClassName('list').length; i++) {
      // 翻转动画
      document.getElementsByClassName('list')[i].classList.add('turnover')
      setTimeout(function() {
        for (var j = 0; j < document.getElementsByClassName('list').length; j++) {
          // console.log(document.getElementsByClassName('list')[i])
          document.getElementsByClassName('list')[j].innerHTML = '<img src="' + cookieImg + '" />'
        }
      }, 300)
    }
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
    flag = true
  }, memoryTime);
}