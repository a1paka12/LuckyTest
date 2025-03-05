let answer;
let timerInterval;
let startTime;
let elapsedTime = 0;
let inputIndex = 0;

const answerDisplay = document.getElementById('answer');
const digitInputs = document.querySelectorAll('.digitInput');
const numberButtons = document.querySelectorAll('.numberButton');
const startButton = document.getElementById('startButton');
const resultDisplay = document.getElementById('result');
const timerDisplay = document.getElementById('timer');

startButton.addEventListener('click', startGame);

digitInputs.forEach((input, index) => {
    input.addEventListener('click', () => {
        digitInputs.forEach(i => i.classList.remove('selected'));
        input.classList.add('selected');
        inputIndex = index;
    });
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (inputIndex < 4) {
            digitInputs[inputIndex].value = button.textContent;
            digitInputs[inputIndex].classList.remove('selected');
            inputIndex++;
            if (inputIndex < 4) {
                digitInputs[inputIndex].classList.add('selected');
            }
            checkAnswer();
        }
    });
});

function startGame() {
    answer = generateAnswer();
    answerDisplay.textContent = '????';
    digitInputs.forEach(input => {
        input.value = '';
        input.classList.remove('selected');
    });
    resultDisplay.textContent = '';
    elapsedTime = 0;
    timerDisplay.textContent = '시간: 0.0초';
    startButton.disabled = true;
    inputIndex = 0;
    digitInputs[0].classList.add('selected');
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 100);
}

function generateAnswer() {
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}

function updateTimer() {
    elapsedTime = (Date.now() - startTime) / 1000;
    timerDisplay.textContent = `시간: ${elapsedTime.toFixed(1)}초`;
}

function checkAnswer() {
    const userAnswer = Array.from(digitInputs).map(input => input.value).join('');

    if (userAnswer.length !== 4) {
        resultDisplay.textContent = '';
        return;
    }

    let correctCount = 0;
    for (let i = 0; i < 4; i++) {
        if (userAnswer[i] === answer[i]) {
            correctCount++;
        }
    }

    if (correctCount === 4) {
        clearInterval(timerInterval);
        answerDisplay.textContent = answer;
        const result = getResultText(elapsedTime);
        resultDisplay.innerHTML = `<strong>${result.level}</strong><br>${result.message}`; // 레벨 이름과 문구 출력
        startButton.disabled = false;
    } else {
        resultDisplay.textContent = `${correctCount}개 맞음, ${4 - correctCount}개 틀림`;
    }
}

const fortuneMessages = {
    '최고조': [
        '당신의 천재성이 폭발하는 순간!',
        '우주의 기운이 당신을 돕고 있습니다!',
        '오늘 당신은 행운의 주인공!',
        '신이 내린 컨트롤, 역사를 새로 쓰다!',
        '당신의 능력에 모두가 감탄!',
        '이 순간을 위해 태어났다!',
        '당신의 손끝에서 기적이!',
        '예지력 상승! 미래를 보는 듯한 컨트롤!',
        '당신은 게임의 신!',
        '완벽 그 자체! 신의 경지에 도달!'
    ],
    '보통': [
        '오늘 당신의 운은 평범합니다.',
        '무난한 하루, 소소한 행복을 즐기세요.',
        '행운은 당신의 노력에 비례합니다.',
        '작은 성공들이 모여 큰 성취를 이룹니다.',
        '침착하게, 꾸준히 나아가세요.',
        '당신의 잠재력은 무한합니다.',
        '기회는 준비된 자에게 찾아옵니다.',
        '노력은 배신하지 않습니다.',
        '긍정적인 마음으로 하루를 시작하세요.',
        '성공의 열쇠는 당신 안에 있습니다.'
    ],
    '폐급': [
        '오늘 당신의 운은 좋지 않습니다.',
        '예상치 못한 어려움이 있을 수 있습니다.',
        '침착하게 상황을 판단하고 대처하세요.',
        '잠시 쉬어가는 것도 좋은 선택입니다.',
        '작은 실수들이 쌓여 큰 문제를 만들 수 있습니다.',
        '오늘은 새로운 시도를 자제하세요.',
        '주변 사람들과의 갈등에 주의하세요.',
        '건강 관리에 신경 쓰세요.',
        '오늘은 운보다 실력!',
        '오늘은 패배를 인정하는 용기가 필요합니다.'
    ],
    '개폐급': [
        '오늘 당신의 운은 최악입니다.',
        '모든 일이 뜻대로 되지 않을 수 있습니다.',
        '최대한 안전하게 하루를 보내세요.',
        '오늘은 아무것도 하지 않는 것이 최선입니다.',
        '재물 손실에 주의하세요.',
        '건강에 각별히 신경 쓰세요.',
        '오늘은 운보다 멘탈!',
        '오늘은 연습만이 살길이다!',
        '오늘은 패배를 통해 배우는 날!',
        '오늘은 모든 것을 내려놓고 휴식을 취하세요.'
    ]
};

function getRandomMessage(level) {
    const messages = fortuneMessages[level];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return { level: level, message: messages[randomIndex] }; // 레벨과 메시지 반환
}

function getResultText(seconds) {
    let level;
    if (seconds <= 10) {
        level = '최고조';
    } else if (seconds <= 20) {
        level = '보통';
    } else if (seconds <= 30) {
        level = '폐급';
    } else {
        level = '개폐급';
    }
    return getRandomMessage(level);
}
