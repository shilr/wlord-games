import { addLog, random, checkCondition, updateStatusBar } from './utils.js';
import { scenes } from './data.js';

// 游戏初始状态
const initialState = {
    currentScene: 'supermarket', // 当前场景ID
    stamina: 100,                 // 体力（0-100）
    food: 3,                      // 食物（份）
    water: 3,                     // 水（份）
    meds: 1,                      // 药品（份）
    day: 1,                       // 生存天数
    infection: 0,                 // 感染度（0-100）
    trust: 0,                     // 信任度（0-100）
    inventory: [],                // 物品栏
    isAlive: true                 // 存活状态
};

// 游戏状态管理器
class GameManager {
    constructor() {
        this.state = { ...initialState };
        this.statusBar = document.getElementById('status-bar');
        this.init();
    }

    // 初始化游戏
    init() {
        this.renderStatusBar();
        this.renderScene();
        addLog("系统启动... 检测到末日生存模式已激活。当前位置：" + scenes.supermarket.description);
    }

    // 渲染状态栏
    renderStatusBar() {
        const statusBarHtml = `
            <div class="status-item">体力：<span>${this.state.stamina}</span>%</div>
            <div class="status-item">食物：<span>${this.state.food}</span>份</div>
            <div class="status-item">水：<span>${this.state.water}</span>份</div>
            <div class="status-item">药品：<span>${this.state.meds}</span>份</div>
            <div class="status-item">天数：<span>${this.state.day}</span></div>
        `;
        this.statusBar.innerHTML = statusBarHtml;
        updateStatusBar(this.state, this.statusBar);
    }

    // 渲染当前场景
    renderScene() {
        const scene = scenes[this.state.currentScene];
        if (!scene) return;

        // 更新场景描述
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = `【${scene.name}】${scene.description}`;
        document.getElementById('game-log').prepend(logEntry);

        // 生成操作按钮
        const buttonsContainer = document.getElementById('action-buttons');
        buttonsContainer.innerHTML = ''; // 清空旧按钮

        scene.options.forEach(option => {
            const button = document.createElement('button');
            if (option.cost) {
                const costText = Object.entries(option.cost)
                    .map(([key, value]) => `${key}-${value}`)
                    .join(' ');
                button.title = `消耗：${costText}`;
            }
            if (option.precondition && !checkCondition(this.state, option.precondition)) {
                button.disabled = true;
                button.title = "条件不满足";
            }
            button.textContent = option.text;
            button.onclick = () => this.handleAction(option);
            buttonsContainer.appendChild(button);
        });
    }

    // 处理玩家操作
    handleAction(option) {
        if (this.state.isAlive === false) return;

        const scene = scenes[this.state.currentScene];
        const optionData = scene.options.find(opt => opt.text === option.text);

        // 扣除消耗
        if (optionData.cost) {
            Object.entries(optionData.cost).forEach(([key, value]) => {
                this.state[key] = Math.max(0, this.state[key] - value);
            });
        }

        // 执行结果
        const result = this.calculateResult(optionData.result);
        result.forEach(text => addLog(text));

        // 处理特殊状态（如感染、死亡）
        if (result.some(t => t.includes('感染'))) this.state.infection += 20;
        if (this.state.infection >= 100) {
            addLog("你的伤口严重感染，最终因败血症死亡...");
            this.state.isAlive = false;
        }

        // 更新界面
        this.renderStatusBar();
        if (this.state.isAlive) this.renderScene();
    }

    // 计算行动结果（成功率机制）
    calculateResult(resultConfig) {
        const successRate = resultConfig.probability;
        const isSuccess = random(1, 100) <= successRate * 100;

        return isSuccess 
            ? resultConfig.success 
            : resultConfig.failure || ["行动失败，没有发生特别的事情"];
    }
}

// 启动游戏
window.onload = () => new GameManager();
