// 生成带时间戳的日志条目
export function addLog(text) {
    const logContainer = document.getElementById('game-log');
    const now = new Date();
    const timestamp = `[${now.toLocaleDateString()} ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]`;
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `<span class="timestamp">${timestamp}</span> ${text}`;
    logContainer.appendChild(entry);
    logContainer.scrollTop = logContainer.scrollHeight; // 自动滚动到底部
}

// 计算随机数（闭区间）
export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 检查状态是否满足条件
export function checkCondition(state, condition) {
    if (!condition) return true;
    return condition.every(rule => {
        const value = state[rule.key];
        return rule.type === 'min' ? value >= rule.value : value <= rule.value;
    });
}

// 更新状态栏显示
export function updateStatusBar(state, statusBar) {
    const elements = statusBar.getElementsByClassName('status-item');
    Object.keys(state).forEach((key, index) => {
        if (['stamina', 'food', 'water', 'meds', 'day'].includes(key)) {
            elements[index].querySelector('span').textContent = state[key];
        }
    });
}
