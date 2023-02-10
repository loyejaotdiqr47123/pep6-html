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

var targetList = document.getElementById('target-list') //  靶子列表
var targetListClick = document.getElementById('target-list-click') // 可点击靶子
var chick = document.getElementById('chick') // 小鸡
var egg = document.getElementById('egg') // 蛋
var stone = document.getElementById('stone') // 石头


// 打乱顺序
var list = data
list.sort(function() { return 0.5 - Math.random() })

// 当前题目
var listIndex = 0

// 点击靶子
var eggFlag = true
var flag = true

function targetClick(e, right) {
    if (flag === true) {
        flag = false
            // 飞蛋
        eggFlag = false
        chick.src = '../../../../template/xiao-ji-da-mao-xian/images/chick2.png'
        egg.className = 'egg-fly'
        setTimeout(function() {
            egg.src = '../../../../template/xiao-ji-da-mao-xian/images/egg2.png'
        }, 500);
        setTimeout(function() {
            egg.src = '../../../../template/xiao-ji-da-mao-xian/images/egg.png'
            egg.className = ''
            eggFlag = true
            if (right === true) {
                // console.log('正确')
                audioCorrect.currentTime = 0
                audioCorrect.play()
                totalPoints += grade
                dGrade.innerText = totalPoints
                for (var j = 0; j < targetList.childNodes.length; j++) {
                    if (e.target.getAttribute('data-target') == targetList.childNodes[j].getAttribute('data-target')) {
                        console.log(j)
                        console.log(targetList.childNodes[j])
                        e.target.className = 'target-fall'
                        targetList.childNodes[j].className = 'target-fall'
                    }
                }
            } else {
                // console.log('错误')
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
                for (var j = 0; j < targetList.childNodes.length; j++) {
                    targetList.childNodes[j].className = 'target-fall'
                }
            }
            setTimeout(function() {
                if (listIndex < (list.length - 1)) {
                    listIndex += 1
                    answer()
                } else {
                    // console.log('结束')
                    clearInterval(countDown)
                    overBox.style.cssText = 'display: block'
                    overTime.innerText = '时间：' + totalTime
                    HP == 3 ? totalPoints = 100 : totalPoints = totalPoints.toFixed(0)
                    overIntegral.innerText = '得分：' + totalPoints
                }
                flag = true
            }, 600);
        }, 1000);
    }
}

// 渲染题目
function answer() {
    stone.innerHTML = '<img src="' + list[listIndex].topic + '" />'

    var htmlStr = ''
    var htmlStrClick = ''
    for (var i = 0; i < list[listIndex].options.length; i++) {
        htmlStrClick += '<li data-target="' + i + '" onclick="targetClick(event,' + list[listIndex].options[i].right + ')"></li>'
        htmlStr += '<li data-target="' + i + '"><img src="' + list[listIndex].options[i].letter + '" /></li>'
    }
    targetListClick.innerHTML = htmlStrClick
    targetList.innerHTML = htmlStr
}

document.addEventListener('mousemove', function(e) {
    //小鸡运动
    chick.style.cssText = 'left:' + (e.pageX - chick.offsetWidth / 2) + 'px;'
    if (eggFlag === true) {
        egg.style.cssText = 'left:' + (e.pageX - egg.offsetWidth / 2) + 'px;'
    }
})

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