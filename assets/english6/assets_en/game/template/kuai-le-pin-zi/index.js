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
var monkey = document.getElementById('monkey') // 猴子
var basket = document.getElementById('text_info') // 篮子

// 随机排序
var list = data
list.sort(function() { return 0.5 - Math.random() })

// 积分
var integral = 0
    // 当前选中字母
var checkedWord = []
var flag = true

// 选择答案
function choice(word, e) {
    if (flag === true && e.target.getAttribute('data-click') != 'false') {
        flag = false
            // 判断是否正确
        if (list[listIndex].word.indexOf(word) >= 0) {
            // 判断是否重复
            var repetition = false
                // for (var i = 0; i < checkedWord.length; i++) {
                //   if (checkedWord[i] == word) {
                //     console.log('重复')
                //     repetition = true
                //   }
                // }
            if (repetition === false) {
                checkedWord.push(word)
                    // e.target.style = 'background: green'
                var basketStr = ''
                for (var j = 0; j < checkedWord.length; j++) {
                    for (var i = 0; i < list[listIndex].word.length; i++) {
                        // console.log(list[listIndex].word[i], checkedWord[j])
                        if (list[listIndex].word[i] == checkedWord[j]) {
                            if(basketStr == "go"){
                                basketStr = basketStr + " "
                            }
                            basketStr += checkedWord[j]
                           
                            break
                        }
                        
                    }
                }
              

                // console.log(basketStr)
                basket.innerHTML = basketStr
                    // 判断是否全选
                if (checkedWord.length == list[listIndex].word.length) {
                    if(list[listIndex].word == "gofishing"){
                        basket.innerHTML = insertStr(list[listIndex].word , 2 ," ")
                    }else{
                        basket.innerHTML = list[listIndex].word
                    }
                
                        // 抓苹果
                    monkey.style = 'left: ' + e.target.offsetLeft - (monkey.offsetWidth / 3) + 'px; top:0'
                    setTimeout(function() {
                        monkey.children[0].src = imgPath.monkey2
                        var img = document.createElement('div')
                        img.className = 'monkey-apple'
                            // img.innerHTML = word
                        monkey.appendChild(img)
                        e.target.style.cssText = 'opacity: 0;'
                        e.target.setAttribute('data-click', false)
                        monkey.classList.add('harvest')
                        setTimeout(function() {
                            monkey.children[0].src = imgPath.monkey
                            monkey.removeChild(img)
                            monkey.className = ''
                            monkey.style.cssText = ''
                            flag = true
                        }, 1000)
                    }, 500)
                    setTimeout(function() {
                        // 正确
                        audioCorrect.currentTime = 0
                        audioCorrect.play()
                        totalPoints += grade
                        dGrade.innerText = totalPoints
                        checkedWord = []
                        basket.innerHTML = ''
                        if (listIndex < (list.length - 1)) {
                            listIndex += 1
                            answer()
                        } else {
                            // alert('全部完成')
                            clearInterval(countDown)
                            overBox.style.cssText = 'display: block'
                            overTime.innerText = '时间：' + totalTime
                            overIntegral.innerText = '得分：' + 100
                        }
                    }, 2500)
                } else {
                    e.target.style.cssText = 'opacity: 0;'
                    e.target.setAttribute('data-click', false)
                    flag = true
                }
            }
        } else {
            // 错误
            aduioError.currentTime = 0
            aduioError.play()
            HP -= 1
            dHP.innerText = HP
            if (HP <= 0) {
                panelImg.src = imgPath.scoringError
                overBox.style.cssText = 'display: block'
                overTime.innerText = '时间：' + totalTime
                overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
                clearInterval(countDown)
            }
            flag = true
                // e.target.style = 'background: red'
        }
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
    for (var i = 0; i < list[listIndex].allLetter.length; i++) {
        optionsHtml += '<li onclick="choice(' + '&quot;' + list[listIndex].allLetter.substr(i, 1) + '&quot;' + ', event)">' + list[listIndex].allLetter.substr(i, 1) + '</li>'
    }
    
    optionBox.innerHTML = optionsHtml
    setTimeout(function(){
        audioArr[listIndex].play();  
        audioArr[listIndex].volume  = 1.0;
    },1000)
}
// 插入空格
function insertStr(soure, start, newStr){   
    return soure.slice(0, start) + newStr + soure.slice(start);
 }
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
            panelImg.src = imgPath.scoringError
            overBox.style.cssText = 'display: block'
            overTime.innerText = '时间：' + totalTime
            overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
        } else {
            totalTime -= 1
            dCountDown.innerText = totalTime
        }
    }, 1000)
}