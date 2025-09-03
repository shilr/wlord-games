// 场景数据（包含描述、选项、前置条件）
export const scenes = {
    supermarket: {
        id: 'supermarket',
        name: '废弃超市（B1层）',
        description: "你站在超市入口处，应急灯闪烁着微弱的光。货架东倒西歪，半袋过期的方便面散落在地。远处传来玻璃碎裂的声音，可能是丧尸在移动。",
        options: [
            {
                text: "搜索食品区（消耗10体力）",
                action: "search",
                target: "foodArea",
                cost: { stamina: 10 },
                precondition: null,
                result: {
                    success: ["找到2份压缩饼干（食物+2）", "捡到1瓶矿泉水（水+1）"],
                    failure: ["搜索区域已被搬空，只找到几包发霉的面包"],
                    probability: 0.7 // 成功率70%
                }
            },
            {
                text: "检查医疗箱（可能有药品）",
                action: "search",
                target: "medicalCabinet",
                cost: { stamina: 5 },
                precondition: null,
                result: {
                    success: ["找到3份抗生素（药品+3）"],
                    failure: ["医疗箱里只有空的注射器"],
                    probability: 0.6
                }
            },
            {
                text: "前往二楼（未知危险）",
                action: "move",
                target: "hospital",
                cost: { stamina: 20 },
                precondition: null,
                result: {
                    success: ["到达二楼，发现急救室虚掩着"],
                    failure: ["楼梯坍塌，你被落石砸伤（体力-15）"],
                    probability: 0.8
                }
            },
            {
                text: "查看收银台（可能有现金或钥匙）",
                action: "search",
                target: "cashier",
                cost: { stamina: 8 },
                precondition: null,
                result: {
                    success: ["找到20元现金（无价值）", "抽屉里有把生锈的手枪（武器+1）"],
                    failure: ["收银机被撬开，里面空无一物"],
                    probability: 0.5
                }
            }
        ]
    },
    hospital: {
        id: 'hospital',
        name: '废弃医院',
        description: "医院的消毒水味被血腥气覆盖。走廊里堆满带血的病床，急救室的门半开着，里面传来沉重的呼吸声。",
        options: [
            {
                text: "进入急救室（可能有幸存者）",
                action: "enter",
                target: "emergencyRoom",
                cost: { stamina: 10 },
                precondition: null,
                result: {
                    success: ["你救下一名腿部受伤的女性幸存者（信任度+50）"],
                    failure: ["急救室里只有具腐烂的尸体"],
                    probability: 0.6
                }
            },
            {
                text: "搜索药房（高风险高回报）",
                action: "search",
                target: "pharmacy",
                cost: { stamina: 15 },
                precondition: null,
                result: {
                    success: ["找到5份珍贵止痛药（药品+5）"],
                    failure: ["翻找时被碎玻璃划伤（感染+1）"],
                    probability: 0.4
                }
            },
            {
                text: "返回超市",
                action: "move",
                target: "supermarket",
                cost: { stamina: 15 },
                precondition: null,
                result: {
                    success: ["安全回到超市"],
                    failure: ["路上遭遇丧尸群（体力-30）"],
                    probability: 0.9
                }
            }
        ]
    }
};

// 物品数据（暂未使用，可扩展）
export const items = {
    food: { name: "食物", unit: "份" },
    water: { name: "水", unit: "份" },
    meds: { name: "药品", unit: "份" },
    stamina: { name: "体力", unit: "%" }
};
