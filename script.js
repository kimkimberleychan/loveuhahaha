let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

const params = new URLSearchParams(window.location.search);
let username = params.get("name");

// 限制用户名长度，避免页面样式崩坏
const maxLength = 20;
const safeUsername = username ? username.substring(0, maxLength) : "???";

// 防止 `null` 变成 `"null"`
if (username) {
  questionText.innerText = questionText.innerText + safeUsername;
}

let clickCount = 0; // 记录点击 No 的次数

// No 按钮的文字变化
const noTexts = [
  "？你認真嗎…",
  "你lum清楚啦?",
  "nooooooooo！ ",
  "傷心了嗚嗚嗚…",
  "達咩des:(",
  "really？？？:(",
];

// No 按钮点击事件
noButton.addEventListener("click", function () {
  clickCount++;

  // 让 Yes 变大，每次放大 2 倍
  let yesSize = 1 + clickCount * 1.2;
  yesButton.style.transform = `scale(${yesSize})`;

  // 挤压 No 按钮，每次右移 50px
  let noOffset = clickCount * 50;
  noButton.style.transform = `translateX(${noOffset}px)`;

  // 让图片和文字往上移动
  let moveUp = clickCount * 25;
  mainImage.style.transform = `translateY(-${moveUp}px)`;
  questionText.style.transform = `translateY(-${moveUp}px)`;

  // No 文案变化（前 5 次变化）
  if (clickCount <= 5) {
    noButton.innerText = noTexts[clickCount - 1];
  }

  // 图片变化（前 5 次变化）
  if (clickCount === 1) mainImage.src = "images/shocked.png"; // 震惊
  if (clickCount === 2) mainImage.src = "images/think.png"; // 思考
  if (clickCount === 3) mainImage.src = "images/angry.png"; // 生气
  if (clickCount === 4) mainImage.src = "images/crying.png"; // 哭
  if (clickCount >= 5) mainImage.src = "images/crying.png"; // 之后一直是哭
});

// Yes 按钮点击后，进入表白成功页面
const loveTest = `!!!嘿嘿愛你哦!! ( >᎑<)♡︎ᐝ  ${
  username ? `${safeUsername}  ♡︎ᐝ(>᎑< )` : ""
}`;

yesButton.addEventListener("click", function () {
  // 计算在一起的天数（从2025年8月15日开始）
  const togetherDate = new Date(2025, 7, 15); // 注意：月份是0-based，所以8月是7
  const now = new Date();
  const diffTime = now - togetherDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // 如果在一起日期是未来的，处理为即将在一起
  const daysText = diffDays >= 0 ? 
    `我們已經在一起 ${diffDays} 天 ❤️` : 
    `再過 ${Math.abs(diffDays)} 天，我們就在一起啦！`;

  // 创建成功页面
  document.body.innerHTML = `
    <div class="yes-screen">
      <h1 class="yes-text"></h1>
      <img src="images/hug.png" alt="拥抱" class="yes-image">
      <div class="timer-container">
        <div class="timer-title">💕 紀念日計時器 💕</div>
        <div class="timer">
          <div class="timer-item">
            <span id="days" class="timer-number">${diffDays}</span>
            <span class="timer-label">天</span>
          </div>
          <div class="timer-item">
            <span id="hours" class="timer-number">00</span>
            <span class="timer-label">小時</span>
          </div>
          <div class="timer-item">
            <span id="minutes" class="timer-number">00</span>
            <span class="timer-label">分鐘</span>
          </div>
          <div class="timer-item">
            <span id="seconds" class="timer-number">00</span>
            <span class="timer-label">秒</span>
          </div>
        </div>
        <div class="anniversary-date">🎉 從 2025年8月15日 開始 🎉</div>
      </div>
    </div>
  `;

  // 确保用户名安全地插入
  document.querySelector(".yes-text").innerText = loveTest;

  // 禁止滚动，保持页面美观
  document.body.style.overflow = "hidden";

  // 启动实时计时器（每秒更新）
  if (diffDays >= 0) {
    startRealTimeTimer(togetherDate);
  }
});

// 实时计时器函数
function startRealTimeTimer(startDate) {
  function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    
    // 计算天、小时、分钟、秒
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // 更新显示
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl) daysEl.textContent = days.toString().padStart(3, '0');
    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
  }
  
  // 立即更新一次，然后每秒更新
  updateTimer();
  setInterval(updateTimer, 1000);
}
;