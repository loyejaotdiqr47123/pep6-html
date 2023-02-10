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
var optionBox = document.getElementById('option-box') // 选项盒子

// 打乱顺序
var list = data
for (var i = 0; i < list.length; i++) {
    list[i].sort(function() { return 0.5 - Math.random() })
}
list.sort(function() { return 0.5 - Math.random() })

var errorNum = 0 // 错题数
var listIndex = 0 // 当前第几道

// 创建题目
var flag = false
var timer // 动画计时器
var outTimer // 结束计时
function reactTopic() {
    if (listIndex <= (data.length - 1)) {
        var listHtml = ''
        for (var i = 0; i < list[listIndex].length; i++) {
            listHtml += '<li onclick="choice(' + list[listIndex][i].right + ', event)">' +
                '<img src="' + list[listIndex][i].title + '" />' +
                '</li>'
        }
        optionBox.innerHTML = listHtml

        // 第一次移动
        setTimeout(function() {
                optionBox.childNodes[0].className = 'move1'
                optionBox.childNodes[0].style.left = '25vw'

                optionBox.childNodes[1].className = 'move2'
                optionBox.childNodes[1].style.left = '0vw'
                setTimeout(function() {
                    optionBox.childNodes[0].className = ''
                    optionBox.childNodes[1].className = ''
                    optionBox.childNodes[2].className = ''
                }, 1000)
            }, 500)
            // 第二次移动
        setTimeout(function() {
                optionBox.childNodes[0].className = 'move1'
                optionBox.childNodes[0].style.left = '50vw'

                optionBox.childNodes[2].className = 'move2'
                optionBox.childNodes[2].style.left = '25vw'

                setTimeout(function() {
                    optionBox.childNodes[0].className = ''
                    optionBox.childNodes[1].className = ''
                    optionBox.childNodes[2].className = ''
                }, 1000)
            }, 1000)
            // 第三次移动
        setTimeout(function() {
                optionBox.childNodes[1].className = 'move1'
                optionBox.childNodes[1].style.left = '25vw'

                optionBox.childNodes[2].className = 'move2'
                optionBox.childNodes[2].style.left = '0vw'
                setTimeout(function() {
                    optionBox.childNodes[0].className = ''
                    optionBox.childNodes[1].className = ''
                    optionBox.childNodes[2].className = ''
                }, 900)
            }, 1500)
            // 第四次移动
        setTimeout(function() {
            optionBox.childNodes[0].className = 'move1'
            optionBox.childNodes[0].style.left = '25vw'

            optionBox.childNodes[1].className = 'move2'
            optionBox.childNodes[1].style.left = '50vw'
            setTimeout(function() {
                optionBox.childNodes[0].className = ''
                optionBox.childNodes[1].className = ''
                optionBox.childNodes[2].className = ''
                flag = true
            }, 1000)
        }, 2000)

        outTimer = setTimeout(function() {
            errorNum += 1
            listIndex += 1
            reactTopic()
        }, 150000);
    } else {
        clearInterval(countDown)
        overBox.style.cssText = 'display: block'
        overTime.innerText = '时间：' + totalTime
        HP == 3 ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
        overIntegral.innerText = '得分：' + totalPoints
            // kid.style = 'left:23vw;top: 5vw; width: 9vw;'
            // island.style.cssText = 'display: block'
    }
}

function choice(right, e) {
    if (flag === true) {
        flag = false
        if (listIndex <= (data.length - 1)) {
            clearInterval(timer)
            clearInterval(outTimer)
            if (right === false) {
                // 答对
                var add = document.createElement('div')
                add.className = 'add'
                add.innerHTML = '+' + grade
                if (e.target.nodeName === 'LI') {
                    e.target.appendChild(add)
                } else {
                    e.target.parentNode.appendChild(add)
                }
                audioCorrect.currentTime = 0
                audioCorrect.play()
                totalPoints += grade
                dGrade.innerText = totalPoints
            } else {
                // 答错
                var subtract = document.createElement('div')
                subtract.className = 'subtract'
                subtract.innerHTML = '错误'
                if (e.target.nodeName === 'LI') {
                    e.target.appendChild(subtract)
                } else {
                    e.target.parentNode.appendChild(subtract)
                }
                errorNum += 1
                aduioError.currentTime = 0
                aduioError.play()
                HP -= 1
                dHP.innerText = HP
                if (HP <= 0) {
                    // alert('游戏结束')
                    panelImg.src = '../../../../template/images/scoring-error.png'
                    overBox.style.display = 'block'
                    overTime.innerText = '时间：' + totalTime
                    overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
                    clearInterval(countDown)
                }
            }
            setTimeout(function() {
                listIndex += 1
                reactTopic()
            }, 2000)
        } else {
            // alert('完成错题' + errorNum + '个')
            clearInterval(countDown)
            overBox.style.cssText = 'display: block'
            overTime.innerText = '时间：' + totalTime
            HP == 3 ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
            overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
                // kid.style = 'left:23vw;top: 5vw; width: 9vw;'
                // island.style.cssText = 'display: block'
        }
    }
}

// 开始
function start() {
    var readyGo = document.createElement('audio')
    readyGo.src = '../../../../template/sound/ready go.mp3'
    readyGo.play()

    // rule.style.cssText = 'display: none'
    rule.style.display = 'none'
    reactTopic()
        // 倒计时
    countDown = setInterval(function() {
        if (totalTime <= 0) {
            clearInterval(countDown)
            panelImg.src = '../../../../template/images/scoring-error.png'
            overBox.style = 'display: block'
            overTime.innerText = '时间：' + totalTime
            overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
        } else {
            totalTime -= 1
            dCountDown.innerText = totalTime
        }
    }, 1000)
}