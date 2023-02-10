// 生命
let HP = 3
// 总分
let totalPoints = 0
// 每题得分
let grade = parseInt((100 / data.length).toFixed(0))
// 倒计时定时器
let countDown = null

// 计分板
const dHP = document.getElementById('HP')
const dGrade = document.getElementById('grade')
const dCountDown = document.getElementById('count-down')
// 结果计分板
const overBox = document.getElementById('over-box')
const overTime = document.getElementById('over-time')
const overIntegral = document.getElementById('over-integral')
const panelImg = document.getElementById('panel-img')
// 声音
const audioCorrect = document.getElementById('audio-correct')
const aduioError = document.getElementById('aduio-error')

const soundBox = document.getElementById('sound-box')
const optionBox = document.getElementById('option-box')
const monkey = document.getElementById('monkey') // 猴子
const basket = document.getElementById('basket') // 篮子

// 随机排序
let list = data
list.sort(() => {return 0.5 - Math.random()})

// 积分
let integral = 0
// 当前选中字母
let checkedWord = []
let flag = true

// 选择答案
function choice(word, e) {
  if (flag === true && e.target.dataset.click != 'false') {
    flag = false
    // 判断是否正确
    if (list[listIndex].word.indexOf(word) >= 0) {
      // 判断是否重复
      let repetition = false
      // for (let i = 0; i < checkedWord.length; i++) {
      //   if (checkedWord[i] == word) {
      //     console.log('重复')
      //     repetition = true
      //   }
      // }
      if (repetition === false) {
        checkedWord.push(word)
        // e.target.style = 'background: green'
        // 抓苹果
        monkey.style = `left: ${e.target.offsetLeft - (monkey.offsetWidth / 3)}px; top:0`
        setTimeout(() => {
          monkey.children[0].src = imgPath.monkey2
          let img = document.createElement('div')
          img.className = 'monkey-apple'
          img.innerHTML = word
          monkey.append(img)
          e.target.style = 'opacity: 0;'
          e.target.dataset.click = false
          monkey.classList.add('harvest')
          setTimeout(() => {
            monkey.children[0].src = imgPath.monkey
            monkey.removeChild(img)
            monkey.className = ''
            monkey.style = ''
            // console.log(checkedWord)
            let basketStr = ''
            for (let j = 0; j < checkedWord.length; j++) {
              for(let i = 0; i < list[listIndex].word.length; i++) {
                // console.log(list[listIndex].word[i], checkedWord[j])
                if (list[listIndex].word[i] == checkedWord[j]) {
                  basketStr += checkedWord[j]
                  break
                }
              }
            }
            // console.log(basketStr)
            basket.innerHTML = basketStr
            flag = true
          }, 1000)
        }, 500)
        // 判断是否全选
        if (checkedWord.length == list[listIndex].word.length) {
          setTimeout(() => {
            // 正确
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
              overBox.style = 'display: block'
              overTime.innerText = '时间：' + totalTime
              overIntegral.innerText = '得分：' + 100
            }
          }, 2500)
        }
      }
    } else {
      // 错误
      aduioError.play()
      HP -= 1
      dHP.innerText = HP
      if (HP <= 0) {
        panelImg.src = imgPath.scoringError
        overBox.style = 'display: block'
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
let listIndex = 0

// 渲染音频和题目
let audioArr = []
for (let i = 0; i < list.length; i++) {
  audioArr.push(document.createElement('audio'))
  audioArr[i].src = list[i].sound
}

function answer() {
  let optionsHtml = ''
  for (let i = 0; i < list[listIndex].allLetter.length; i++) {
    optionsHtml += `<li onclick="choice('${list[listIndex].allLetter.substr(i, 1)}', event)">${list[listIndex].allLetter.substr(i, 1)}</li>`
  }
  optionBox.innerHTML = optionsHtml
  audioArr[listIndex].play()
}


// 开始
function start () {
  let readyGo = document.createElement('audio')
  readyGo.src = '../../../../template/sound/ready go.mp3'
  readyGo.play()

  rule.style = 'display: none'
  setTimeout(() => {
    answer()
  }, 1000)
  // 倒计时
  countDown = setInterval(() => {
    if (totalTime <= 0) {
      clearInterval(countDown)
      panelImg.src = imgPath.scoringError
      overBox.style = 'display: block'
      overTime.innerText = '时间：' + totalTime
      overIntegral.innerText = '得分：' + totalPoints.toFixed(0)
    } else {
      totalTime -= 1
      dCountDown.innerText = totalTime
    }
  }, 1000)
}