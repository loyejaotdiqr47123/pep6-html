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

var kid = document.getElementById('kid') // 小孩
var origin = document.getElementsByClassName('origin')[0] // 初始台阶
var island = document.getElementsByClassName('island')[0] // 岛屿
var cloudsBox = document.getElementsByClassName('clouds-box')[0] // 云海
var topicImg = document.getElementById('topic-img')
var options = document.getElementById('options')

// 随机排序
var list = data
list.sort(function() { return 0.5 - Math.random() })

// 初始化音频
var audioArr = []
for (var i = 0; i < list.length; i++) {
    var sound = new Audio
    sound.src = list[i].sound
    audioArr.push(sound)
}

// 积分
var integral = 0
var cloudPosition = 100
var flag = true
    // 答题选择
function choice(right, index, e) {
    if (flag === true) {
        flag = false
        cloudPosition -= 10
        cloudsBox.style.cssText = 'background-position: 0 ' + cloudPosition + '%'
        if (index === 0) {
            kid.style.cssText = 'left:13.5vw;top: 14vw'
            kid.className = 'left-jump'
        } else {
            kid.className = 'right-jump'
            kid.style.cssText = 'left:32vw;top: 14vw'
        }
        origin.style.cssText = 'opacity: 0'
        audioArr[listIndex].pause()
        if (right) {
            // 正确
            audioCorrect.currentTime = 0
            audioCorrect.play()
            totalPoints += grade
            dGrade.innerText = totalPoints
            integral += 1
        } else {
            options.childNodes[listIndex + 1].className = 'vanish'
            kid.className = 'kid-vanish'
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
        }
        if (listIndex < (list.length - 1)) {
            listIndex += 1
            answer()
        } else {
            var destinationDom = document.createElement('li')
            destinationDom.innerHTML = '<div style="height:20vw"></div>'
            options.appendChild(destinationDom)
                // alert('结束，积分：' + integral)
            clearInterval(countDown)
            overBox.style.cssText = 'display: block'
            overTime.innerText = '时间：' + totalTime
            HP == 3 ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
            overIntegral.innerText = '得分：' + totalPoints
            kid.style.cssText = 'left:23vw;top: 5vw; width: 9vw;'
            island.style.cssText = 'display: block'
        }
        setTimeout(function() {
            flag = true
            kid.className = ''
            options.childNodes[listIndex].className = ''
        }, 1000)
    }
}

// 当前题目
var listIndex = 0

function answer() {
    // topicImg.src = list[listIndex].topicImg
    topicImg.innerHTML = '<img src="' + list[listIndex].topicImg + '" />' +
        '<div>' +
        '<div onclick="choice(' + list[listIndex].option[0].right + ', 0, event)">' +
        '<img src="' + list[listIndex].option[0].name + '" />' +
        '</div>' +
        '<div onclick="choice(' + list[listIndex].option[1].right + ', 1, event)">' +
        '<img src="' + list[listIndex].option[1].name + '" />' +
        '</div>' +
        '</div>'
    setTimeout(function() {
        audioArr[listIndex].play()
    }, 1000);

    var liDom = document.createElement('li')
    liDom.innerHTML = '<div onclick="choice(' + list[listIndex].option[0].right + ', 0, event)" style="background-image:url(../../../../template/yun-hai-chuan-suo/images/brick' + Math.ceil(Math.random() * 5) + '.png)"></div>' +
        '<div onclick="choice(' + list[listIndex].option[1].right + ', 1, event)"style="background-image:url(../../../../template/yun-hai-chuan-suo/images/brick' + Math.ceil(Math.random() * 5) + '.png)"></div>'
    options.appendChild(liDom)
    topicImg
}

// 开始
function start() {
    var readyGo = document.createElement('audio')
    readyGo.src = '../../../../template/sound/ready go.mp3'
    readyGo.play()

    rule.style.cssText = 'display: none'
        // audioArr[listIndex].play()
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