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

var soundBox = document.getElementById('sound-box')
var optionBox = document.getElementById('option-box')
var snail = document.getElementById('snail')
var audioBtn = document.getElementById('audio-btn')

// 随机排序
var list = data
for (var i = 0; i < list.length; i++) {
    list[i].options.sort(function() { return 0.5 - Math.random() })
}
list.sort(function() { return 0.5 - Math.random() })

// 积分
var integral = 0

var isAnimation = false
    // 选择答案
function choice(right, index) {
    if (isAnimation === false) {
        isAnimation = true
        switch (index) {
            case 0:
                snail.style.cssText = 'left: 11vw;'
                break
            case 1:
                snail.style.cssText = 'left: 35vw;'
                break
            case 2:
                snail.style.cssText = 'left: 55vw;'
                break
        }
        if (right === true) {
            // 正确
            audioCorrect.currentTime = 0
            audioCorrect.play()
            totalPoints += grade
            dGrade.innerText = totalPoints > 100 ? 100 : totalPoints
            snail.className = 'snail-climb'
            integral += 1
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
            snail.className = 'snail-down'
        }
        setTimeout(function() {
            snail.style.cssText = ''
            snail.className = ''
            if (listIndex < (list.length - 1)) {
                listIndex += 1
                answer()
                isAnimation = false
            } else {
                // alert('游戏结束，分数：' + integral)
                clearInterval(countDown)
                overBox.style.cssText = 'display: block'
                overTime.innerText = '时间：' + totalTime
                HP == 3 ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
                overIntegral.innerText = '得分：' + totalPoints
            }
        }, 3500);
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
        optionsHtml += '<div onclick="choice(' + list[listIndex].options[i].right + ',' + i + ')">' +
            '<img src="' + list[listIndex].options[i].imgUrl + '" />' +
            '</div>'
    }
    optionBox.innerHTML = optionsHtml
    audioArr[listIndex].play()
}

// 播放音频
audioBtn.addEventListener('click', function() {
    audioArr[listIndex].play()
})

// 开始
function start() {
    var readyGo = document.createElement('audio')
    readyGo.src = '../../../../template/sound/ready go.mp3'
    readyGo.play()

    rule.style.cssText = 'display: none'
    setTimeout(function() {
            answer()
        }, 1500)
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