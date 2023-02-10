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
var topic = document.getElementById('topic') // 题目栏
var aircraft = document.getElementById('aircraft') // 飞机
var aircraftExplode = document.getElementById('aircraft-explode') // 飞机爆炸图片
var listBox = document.getElementById('list-box') // 选择列表栏
var bullet = document.getElementById('bullet') // 子弹

var list = data
list.sort(function() { return 0.5 - Math.random() })
for (var i = 0; i < list.length; i++) {
    list[i].options.sort(function() { return 0.5 - Math.random() })
}

var correct = 0
    // 选择
function choice(e, right, index) {
    $(listBox).css({
        pointerEvents: 'none'
    })
    switch (index) {
        case 0:
            aircraft.style.cssText = 'bottom: 28vw;'
            break;
        case 1:
            aircraft.style.cssText = 'bottom: 18vw;'
            break;
        case 2:
            aircraft.style.cssText = 'bottom: 8vw;'
            break;
    }
    setTimeout(function() {
        bullet.style.cssText = 'opacity: 1'
        bullet.className = 'bullet-launch'
    }, 500)

    setTimeout(function() {
        aircraft.style.cssText = ''
        bullet.style.cssText = ''
        bullet.className = ''
        if (right === true) { // 正确
            audioCorrect.currentTime = 0
            audioCorrect.play()
            totalPoints += grade
            correct += 1
            dGrade.innerText = totalPoints
            var explode = document.createElement('img')
            explode.className = 'explode'
            explode.src = '../../../../template/kong-zhong-da-zhan/images/explode.png'
            if (e.target.nodeName === 'LI') {
                e.target.appendChild(explode)
            } else {
                e.target.parentNode.appendChild(explode)
            }
            setTimeout(function() {
                if (listIndex >= (data.length - 1)) {
                    // alert('游戏结束')
                    clearInterval(countDown)
                    overBox.style.cssText = 'display: block'
                    overTime.innerText = '时间：' + totalTime
                    correct === list.length ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
                    overIntegral.innerText = '得分：' + totalPoints
                } else {
                    listIndex += 1
                    switchTopic()
                }
            }, 1000);
        } else {
            // 错误
            aduioError.currentTime = 0
            aduioError.play()
            HP -= 1
            dHP.innerText = HP
            if (HP <= 0) {
                panelImg.src = '../../../../template/images/scoring-error.png'
                overBox.style.cssText = 'display: block'
                overTime.innerText = '时间：' + totalTime
                overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
                clearInterval(countDown)
            }
            aircraftExplode.className = 'aircraft-boom'
            setTimeout(function() {
                aircraftExplode.className = ''
                if (listIndex >= (data.length - 1)) {
                    // alert('游戏结束')
                    clearInterval(countDown)
                    panelImg.src = '../../../../template/images/scoring-error.png'
                    overBox.style.cssText = 'display: block'
                    overTime.innerText = '时间：' + totalTime
                    overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
                } else {
                    listIndex += 1
                    switchTopic()
                }
            }, 1000);
        }

    }, 1000);
}

// 渲染题目函数
function switchTopic() {
    topic.innerHTML = '<img src="' + list[listIndex].topic + '" />'
    var listHtml = ''
    for (var i = 0; i < list[listIndex].options.length; i++) {
        listHtml += '<li onclick="choice(event, ' + list[listIndex].options[i].right + ', ' + i + ')">' +
            '<img src="' + list[listIndex].options[i].title + '" />' +
            '</li>'
    }
    listBox.innerHTML = listHtml
    $(listBox).css({
        pointerEvents: 'auto'
    })
}

// 当前第几道
var listIndex = 0

// 开始
function start() {
    var readyGo = document.createElement('audio')
    readyGo.src = '../../../../template/sound/ready go.mp3'
    readyGo.play()

    rule.style.cssText = 'display: none'
    switchTopic()
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