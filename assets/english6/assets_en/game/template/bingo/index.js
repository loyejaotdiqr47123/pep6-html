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

var pencli = document.getElementById('pencli') // 铅笔
var title = document.getElementById('title') // 题目
var inputBox = document.getElementById('input-box') // 输入框
var letters = document.getElementById('letters') // 字母键盘
var tip = document.getElementById('tip') // 提示框
var ok = document.getElementById('ok') // 确认
var back = document.getElementById('back') // 后退
var clear = document.getElementById('clear') // 清除
var light = document.getElementById('light') // 灯

var wordArr = []
    // 渲染字母方法
function writeWord() {
    var wordStr = ''
    for (var i = 0; i < wordArr.length; i++) {
        wordStr += wordArr[i]
    }
    inputBox.innerHTML = wordStr
    return wordStr
}

// 随机排序
var list = data
list.sort(function() { return 0.5 - Math.random() })
    // 当前题目
var listIndex = 0
    // 渲染题目
function answer() {
    console.log(list[listIndex].word);
    var keyList = ''
        // console.log(list[listIndex])
    for (var j = 0; j < list[listIndex].wordKey.length; j++) {
        if (/[A-Z]/.test(list[listIndex].wordKey[j])) {
            keyList += '<li onclick="letterClick(event, &quot;' + list[listIndex].wordKey[j] + '&quot;)" onmouseover="letterMove(event)" onmouseout="letterOut(event)">' +
                '<img src="../../../../template/bingo/images/' + list[listIndex].wordKey[j] + '2.png" draggable="false" alt="">' +
                '</li>'
        } else {
            keyList += '<li onclick="letterClick(event, &quot;' + list[listIndex].wordKey[j] + '&quot;)" onmouseover="letterMove(event)" onmouseout="letterOut(event)">' +
                '<img src="../../../../template/bingo/images/' + list[listIndex].wordKey[j] + '.png" draggable="false" alt="">' +
                '</li>'
        }
        letters.innerHTML = keyList
    }
    title.innerHTML = '<img src="' + list[listIndex].title + '" />'
    tip.innerHTML = '<img src="' + list[listIndex].tip + '" />'
}

// 选择字母
function letterClick(e, word) {
    // console.log(word)
    wordArr.push(word)
    writeWord()
}
// 后退
back.addEventListener('click', function() {
        wordArr.pop()
        writeWord()
    })
    // 清除
clear.addEventListener('click', function() {
        wordArr = []
        writeWord()
    })
    // 确认
var flag = true
ok.addEventListener('click', function() {
    if (flag === true) {
        flag = false
        if (writeWord() == list[listIndex].word) {
            // 正确
            audioCorrect.currentTime = 0
            audioCorrect.play()
            totalPoints += grade
            dGrade.innerText = totalPoints
            light.src = '../../../../template/bingo/images/light-green.png'
            if (listIndex < (list.length - 1)) {
                listIndex += 1
                answer()
            } else {
                clearInterval(countDown)
                overBox.style.cssText = 'display: block'
                overTime.innerText = '时间：' + totalTime
                HP == 3 ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
                overIntegral.innerText = '得分：' + totalPoints
            }
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
            light.src = '../../../../template/bingo/images/light-red.png'
        }
        setTimeout(() => {
            light.src = '../../../../template/bingo/images/light.png'
            wordArr = []
            writeWord()
            flag = true
        }, 100);
    }
})

function letterOut(e) {
    // e.target.style.cssText = ''
    for (var i = 0; i < letters.childNodes.length; i++) {
        letters.childNodes[i].style.cssText = ''
    }
}

function letterMove(e) {
    for (var i = 0; i < letters.childNodes.length; i++) {
        letters.childNodes[i].style.cssText = ''
    }
    if (e.target.nodeName === 'LI') {
        e.target.style.cssText = 'background-image: url("../../../../template/bingo/images/btn2.png")'
    } else {
        e.target.parentNode.style.cssText = 'background-image: url("../../../../template/bingo/images/btn2.png")'
    }
}

// 开始
function start() {
    var readyGo = document.createElement('audio')
    readyGo.src = '../../../../template/sound/ready go.mp3'
    readyGo.play()

    // 铅笔移动
    document.addEventListener('mousemove', function(e) {
        // activeLi.target.style.cssText = 'left: ' + (e.clientX - numWidth) + 'px;top:' + (e.clientY - numHeight) + 'px'
        pencli.style.cssText = 'left: ' + (e.clientX + 3) + 'px;top:' + (e.clientY - pencli.offsetHeight - 3) + 'px'
    })

    answer()

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