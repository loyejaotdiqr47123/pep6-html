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
var chook = document.getElementById('chook') // 小鸡
var chookBox = document.getElementById('chook-box')
var listBox = document.getElementById('list-box') // 选择列表栏
var colourBar = document.getElementById('colour-bar') // 彩带

var list = data
for (var i = 0; i < list.length; i++) {
    list[i].options.sort(function() { return 0.5 - Math.random() })
}
list.sort(function() { return 0.5 - Math.random() })

// 选择
function choice(e, right, index) {
    $(listBox).css({
        pointerEvents: 'none'
    })
    var chookImg = 1
    var chookTimer = setInterval(function() {
        if (chookImg === 1) {
            chookImg = 2
            chook.src = '../../../../template/xiao-ji-guo-he/images/chook2.png'
                // console.log(chook.)
        } else {
            chookImg = 1
            chook.src = '../../../../template/xiao-ji-guo-he/images/chook1.png'
        }
    }, 100)
    if (right === true) {

        // 正确
        audioCorrect.currentTime = 0
        audioCorrect.play()
        var correctTimer = null
        chookBox.className = 'chook-box-jump'
        chook.className = 'correct'
        totalPoints += grade
        dGrade.innerText = totalPoints
        setTimeout(function() {
            clearInterval(chookTimer)
            setTimeout(function() { colourBar.style.cssText = 'display: block' }, 200)
            var correctImg = 1
            correctTimer = setInterval(function() {
                if (correctImg === 1) {
                    correctImg = 2
                    chook.src = '../../../../template/xiao-ji-guo-he/images/correct2.png'
                } else {
                    correctImg = 1
                    chook.src = '../../../../template/xiao-ji-guo-he/images/correct1.png'
                }
            }, 200)
        }, 3500)

        clearInterval(correctTimer)
        colourBar.style.cssText = ''
        chook.src = '../../../../template/xiao-ji-guo-he/images/chook1.png'
        if (listIndex >= (data.length - 1)) {
            // alert('游戏结束')
            clearInterval(countDown)
            overBox.style.cssText = 'display: block'
            overTime.innerText = '时间：' + totalTime
            HP == 3 ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
            overIntegral.innerText = '得分：' + totalPoints
        } else {

            setTimeout(function() {
                colourBar.style.cssText = ''
                chook.src = '../../../../template/xiao-ji-guo-he/images/chook1.png'
                clearInterval(correctTimer)
                chookBox.className = ''
                chook.className = ''
                listIndex += 1
                switchTopic()
            }, 4500);
        }

    } else {
        // 错误
        chookBox.className = 'chook-box-jump-err'
        chook.className = 'error'
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

        colourBar.style.cssText = ''
        clearInterval(chookTimer)
        chook.src = '../../../../template/xiao-ji-guo-he/images/chook1.png'
        if (listIndex >= (data.length - 1)) {
            clearInterval(countDown)
            overBox.style.cssText = 'display: block'
            overTime.innerText = '时间：' + totalTime
            HP == 3 ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
            overIntegral.innerText = '得分：' + totalPoints
        } else {

            setTimeout(function() {
                chookBox.className = ''
                chook.className = ''
                listIndex += 1
                switchTopic()
            }, 3000);
        }

    }
}

// 渲染题目函数
function switchTopic() {
    topic.innerHTML = '<img src="' + list[listIndex].topic + '" />'
    var listHtml = ''
    for (var i = 0; i < list[listIndex].options.length; i++) {
        listHtml += '<li onclick="choice(event, ' + list[listIndex].options[i].right + ',&quot;' + i + '&quot;)">' +
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