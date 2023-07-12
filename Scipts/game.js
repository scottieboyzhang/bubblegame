let currentBubble = null;
let score = 0;
let gameDuration = 60; // game duration in seconds
let gameInterval;

function createBubble() {
    // 创建气泡
    if(currentBubble != null || gameDuration == 0){return;}

    let bubble = document.createElement('div');
    bubble.className = 'bubble';

     // 创建数学表达式
     let expression = document.createElement('span');
     let operators = ['+', '-', '*'];
     let operator = operators[Math.floor(Math.random() * operators.length)];
 
     let num1, num2;
     if (operator === '*') {
         // 乘法和除法使用个位数
         num1 = Math.floor(Math.random() * 10) + 1;
         num2 = Math.floor(Math.random() * 10) + 1;
     } else {
         // 加法和减法使用两位数
         num1 = Math.floor(Math.random() * 90) + 10;
         num2 = Math.floor(Math.random() * 90) + 10;
     }
 
     expression.textContent = `${num1} ${operator} ${num2}`;
     bubble.appendChild(expression);
    
    // 保存答案
    bubble.answer = Math.round(eval(bubble.textContent));

    // 随机设置气泡的位置
    bubble.style.left = Math.random() * 700 + 'px';
    bubble.style.top = '500px';


    // 添加到游戏容器中
    document.getElementById('gameContainer').appendChild(bubble);

    // 保存当前气泡
    currentBubble = bubble;

    // 每10毫秒向上移动气泡
    let bubbleInterval = setInterval(() => {
        let y = parseFloat(bubble.style.top);

        // 每次向上移动一小部分距离
        bubble.style.top = (y - 0.9) + 'px';

        // 如果气泡已经移动到屏幕外，停止移动并消除气泡
        if (y < -50) {
            clearInterval(bubbleInterval);
            document.getElementById('gameContainer').removeChild(bubble);
            bubble.remove();
            currentBubble = null;
            createBubble();
        }
    }, 10);

    // Start game timer when the first bubble is created
    if (!gameInterval) {
        gameInterval = setInterval(() => {
            gameDuration--;
            document.getElementById('timer').textContent = `Time: ${gameDuration}`;
            if (gameDuration === 0) {
                clearInterval(gameInterval);
                clearInterval(bubbleInterval);
                alert(`Game over! Your final score is: ${score}`);
            }
        }, 1000);
    }

    // 如果在七秒内没有回答正确，消除气泡
    // setTimeout(() => {
    //     if (currentBubble === bubble) {
    //         clearInterval(bubbleInterval);
    //         bubble.remove();
    //         currentBubble = null;
    //         createBubble();
    //     }
    // }, 10000);
}

function checkAnswer() {
    let input = document.getElementById('answerInput');
    if (currentBubble && input.value == currentBubble.answer) {
        // 如果答案正确，移除气泡并生成新的气泡
        currentBubble.remove();
        currentBubble = null;
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
    }
    // 清空输入框
    input.value = '';

    createBubble();
}

// 创建第一个气泡
createBubble();
