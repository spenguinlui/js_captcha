$(function(){
  let show_num = []
  // 初始化
  draw(show_num)

  // 刷新圖片
  $(".refresh_btn").on('click', () => {
    draw(show_num)
  })

  // 提交驗證
  $(".btn").on('click', () => {
    // 無分大小寫
    const input_text = $(".input-val").val().toLowerCase();
    const vaild_text = show_num.join("");
    if (input_text === '') {
      alert('請輸入驗證碼！')
    } else if (input_text === vaild_text) {
      alert('提交成功！')
      $(".input-val").val('')
    } else {
      alert('驗證碼錯誤！請重新輸入！')
      $(".input-val").val('')
    } 
  })
})

// 繪製驗證碼
function draw(show_num) {
  const canvas_width = $('#captcha_canvas').width()
  const canvas_height = $('#captcha_canvas').height()
  const canvas = document.getElementById("captcha_canvas")
  const context = canvas.getContext("2d")

  canvas.width = canvas_width;
  canvas.height = canvas_height;
  
  const code = [].concat(getNum()).concat(getSmall()).concat(getBig())
  const code_length = code.length

  // 繪製數字
  for (let i = 0; i < 4; i++) {

    // 隨機數字 & 角度
    let code_index = Math.floor(Math.random() * code_length)
    let deg = Math.random() - 0.5 
    let txt = code[code_index]

    // 將繪製文字寫回 show_num
    show_num[i] = txt.toLowerCase()

    // 座標
    let x = 10 + i * 20
    let y = 20 + Math.random() * 8

    // 繪製
    context.font = "bold 23px 微軟正黑體"
    context.translate(x, y)
    context.rotate(deg)
    context.fillStyle = randomColor()
    context.fillText(txt, 0, 0)
    context.rotate(-deg)
    context.translate(-x, -y)
  }
  // 繪製阻礙線條
  for (let i = 0; i <= 6; i++) {
    context.strokeStyle = randomColor()
    context.beginPath()
    context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height)
    context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height)
    context.stroke()
  }
  // 繪製阻礙圓點
  for (var i = 0; i <= 30; i++) {
    context.strokeStyle = randomColor()
    context.beginPath()
    var x = Math.random() * canvas_width
    var y = Math.random() * canvas_height
    context.moveTo(x, y)
    context.lineTo(x + 1, y + 1)
    context.stroke()
  }
}

// 產生隨機顏色
function randomColor() {
  var r = Math.floor(Math.random() * 256)
  var g = Math.floor(Math.random() * 256)
  var b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}

// 產生數字
function getNum(){
  let str = []
  for (let i = 0; i < 10; i++){
    str.push(i.toString())
  }
  return str
}

// 產生所有小寫字母
function getSmall(){
  let str = []
  let start = 'a'
  for(let i = 0; i < 26; i++){
    str.push(String.fromCharCode(start.charCodeAt(0) + i))
  }
  return str
}

// 產生所有大寫字母
function getBig(){
  let str = []
  let start = 'A'
  for(var i=0;i<26;i++){
    str.push(String.fromCharCode(start.charCodeAt(0) + i))
  }
  return str
}