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

var listBox = document.getElementById('list-box')
var hintBox = document.getElementById('hint-box')
var hand = document.getElementsByClassName('hand')[0] // 鳄鱼手
var water = document.getElementsByClassName('water')[0] // 水

// 随机排序
var list = data
for (var i = 0; i < list.length; i++) {
    list[i].list.sort(() => {
        // console.log(0.8 - Math.random()) 
        // return 0.8 - Math.random() 
        return Math.random() > 0.5 ? -1 : 1;
    })
    console.log(list[i].list)
}

list.sort(() => { return 0.5 - Math.random() })

// 初始化音频
var audioArr = []
for (var i = 0; i < list.length; i++) {
    var sound = new Audio
    sound.src = list[i].sound
    audioArr.push(sound)
}

// 当前题目
var listIndex = 0
    // 积分
var integral = 0

function answer() {
    var liHtml = ''
    for (var i = 0; i < list[listIndex].list.length; i++) {
        liHtml += '<img ondragstart="drawListStart(event)" ondragover="drawListOver(event)" draggable="true" data-order="' + list[listIndex].list[i].order + '" src="' + list[listIndex].list[i].word + '" />'
            // liHtml += '<li ondragstart="drawListStart(event)" ondragover="drawListOver(event)" draggable="true" data-order="' + list[listIndex].list[i].order + '"><img src="' + list[listIndex].list[i].word + '" /></li>'
    }
    listBox.innerHTML = liHtml
}

//获取元素在父元素中的index
function getIndex(el) {
    var index = 0;
    if (!el || !el.parentNode) {
        return -1;
    }
    while (el && (el = el.previousElementSibling)) {
        index++;
    }
    return index;
}
// 当前拖动元素
var draging = null

function drawListStart(e) {
    draging = e.target
}

function drawListOver(e) {
    event.preventDefault()
    if (e.target.nodeName === "IMG" && e.target !== draging) {
        if (getIndex(draging) < getIndex(e.target)) {
            e.target.parentNode.insertBefore(draging, e.target.nextSibling);
            draging.className = 'word-left'
        } else {
            e.target.parentNode.insertBefore(draging, e.target);
            draging.className = 'word-right'
        }
    }
}

// ok
function ok() {
    var flag = true
    for (var i = 0; i < listBox.children.length; i++) {
        if (listBox.children[i].dataset.order != (i + 1) && listBox.children[i].dataset.order != 'null') {
            flag = false
        }
    }
    if (flag === true) {
        // alert('正确')
        hand.classList.add('hand-move')
        water.style.cssText = 'display: block'
        audioArr[listIndex].play()
        totalPoints += grade
        dGrade.innerHTML = totalPoints
        setTimeout(() => {
            hand.classList.remove('hand-move')
            if (listIndex < (list.length - 1)) {
                listIndex += 1
                integral += 1
                answer()
            } else {
                // alert('完成')
                clearInterval(countDown)
                overBox.style.display = 'block'
                overTime.innerText = '时间：' + totalTime
                    // HP == 3 ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
                overIntegral.innerText = '得分：' + 100
            }
        }, parseInt(audioArr[listIndex].duration * 1000));
    } else {
        // alert('错误')
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
// 显示提示
function showHint() {
    if (list[listIndex].chImg) {
        hintBox.innerHTML = '<img src="' + list[listIndex].chImg + '" />'
    } else {
        hintBox.innerText = list[listIndex].hint
    }
    hintBox.style.cssText = 'display: block'
    setTimeout(() => {
        hintBox.style.cssText = ''
    }, 2000);
}

// 开始
function start() {
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