gui.create();
let isMusicCity = false;

const scene = new Object2d();
scene.isScene = true;
scene.SceneElement = document.getElementById("land");
scene.SceneElement.style.transition = '0.1s';
scene.render();

const camera = new Camera();
camera.parent = scene.SceneElement;
camera.transfer(0, 0);


class Character {
    constructor() {
        this.name = "未知";

        this.level = 0.7;
        this.speed = 10;
        this.model = null;
        this.position = vec2(0, 0);
        this.enemyGroup = [];

        //战斗属性
        this.maxHp = 100; //最大生命值
        this.hp = 100; //当前生命
        this.atk = 10.0; //基础攻击力
        this.dfn = 10.0; //基础防御力
        this.speed = 1; //基础速度

        this.multiAtk = 1.000; //攻击加成倍率=multiAtk-100%;
        this.multiDfn = 1.000; //防御倍率
        this.multiHp = 1.000; //(最大)生命值倍率

        this.upAtk = 0;
        this.upDfn = 0;
        this.upHp = 0;

        this.localUpAtk = 0; //临时攻击值加成
        this.localUpDfn = 0; //临时防御值加成
        this.localUpSpd = 0; //临时速度值加成
        this.localUpHp = 0; //临时生命值加成

        this.localMultiAtk = 1.000; //临时攻击加成倍率=multiAtk-100%;
        this.localMultiDfn = 1.000; //临时防御倍率
        this.localMultiHp = 1.000; //临时(最大)生命值倍率
    }
    update() {
        this.model.position = this.position;
        this.model.Position();
    }
    addAtkObj(talentName) {
        this.enemyGroup.forEach((e) => {
            //@para talentName,e ...
        })
    }
}
const Tasks = {
    list: [
        /*.eg:{
                id: "0",
                type:"main",
                title: "破碎的时间",
                text: "某次回调时间时，朱乐凡引发了时间熵增的浩劫！"
            }*/
    ],
}
class Task {
    constructor(id, type, title, text) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.text = text;

        this.active = false;
    }
    init() {
        if (!Tasks.list.find((ele) => ele.id == this.id) && this.active == false) {
            Tasks.list.push({
                id: this.id,
                type: this.type,
                title: this.title,
                text: this.text
            })
            this.active = true;
        }
    }
    end() {
        Tasks.list.forEach((e, i) => {
            if (e.name == this.name) {
                Tasks.list.splice(i, 1);
            }
        })
    }
}
const Task_Main_Travel = new Task("前传", "main", "破碎的时空", "前往时间之都寻找脱离困境的方法。")


const Task_World_Library_1 = new Task("图书馆1", "world", "图书社的旧梦", "前去城市图书馆整理相关资料。")
const Task_World_Library_2 = new Task("图书馆2", "world", "图书社的旧梦", "阅读相关文献并进行分析与纠正。")
const Task_World_Library_3 = new Task("图书馆3", "world", "图书社的旧梦", "登录图书社官网查看招聘信息是否完善。")

const Task_World_Weici_1 = new Task("打维词1", "world", "维词的幻影", "前去城市的一家电子设备小店调查。")
const Task_World_Weici_2 = new Task("打维词2", "world", "维词的幻影", "在小店讨伐维词。")
const Task_World_Weici_3 = new Task("打维词3", "world", "维词的幻影", "与店主交流")

const Task_World_Declassification_1 = new Task("解密1", "world", "维词的神秘资料", "城市一座办公楼内遭受维词侵袭，幸运的是，慌乱的维词将某些资料遗弃，解开相关资料的密钥或许能够帮助城市教会破解维词危机。")
const Task_World_Declassification_2 = new Task("解密2", "world", "维词的神秘资料", "尝试破解前两份资料。")
const Task_World_Declassification_3 = new Task("解密3", "world", "维词与时空旅途", "破解所有资料。")

const Task_Main_MainCity_1 = new Task("城市线", "main", "破碎的时空：城市羁旅", "在城市中获得50枚城市勋章，获得教会认可。")
const Task_Main_MainCity_2 = new Task("城市线", "main", "破碎的时空：教会缄默", "教会邀请你参加即将展开的时间熵增混乱危机商讨大会，你作为荣誉市民被邀请参加。")
const Task_Main_MainCity_3 = new Task("城市线", "main", "破碎的时空：迷途", "教会对进一步讨伐维词做出阻止，与此同时，城市仿若陷入一场无尽的寂静之中......唯有你，将打破这份寂静。")

Task_Main_Travel.init();

const taskPara = {
    Task_Main_MainCity: {
        localTaskId: 1,
        isBossExisted: false
    },
    Task_Weici: {
        taskBtn: gui.action("进入小店进行调查", () => {
            Task_World_Weici_1.end();
            taskPara.Task_Weici.taskBtn.hidden();
            musicSystem.play("遗城的萦思.mp3");
            playPerformance(task_Weici_2, () => {
                Task_World_Weici_2.init();
                Task_World_Weici_1.end();
                bagSystem.insert("城市勋章", 10);
                bagSystem.insert("比特", 25);
            })
        }),
        taskBtn2: gui.action("查看小店后的阴暗角落", () => {

            playPerformance(task_Weici_3, () => {
                //打维词
                WeiciEvent.Weici.init();
                taskPara.Task_Weici.isEnded = true;
                bagSystem.insert("比特", 15);
            })
        }),
        isEnded: false,
        isTaskEnded: false
    }
}

function Task_MainCity() {
    let taskListener = setInterval(() => {
        if (Task_Main_MainCity_1.active == true) {
            if (Task_Main_MainCity_2.active == true) {
                if (taskPara.Task_Main_MainCity.localTaskId == 2) {
                    taskPara.Task_Main_MainCity.localTaskId = 3;

                }
            } else {
                if (bagSystem.get("城市勋章") >= 50 && taskPara.Task_Main_MainCity.localTaskId == 1) {
                    Task_Main_MainCity_2.init();
                    playPerformance(task_MusicCity_1, () => {
                        let check = setInterval(() => {
                            if (player.position.x >= 200 && player.position.y <= 50) {
                                if (player.position.x <= 300 && player.position.y >= -10) {
                                    clearInterval(check);
                                    musicSystem.play("sck.mp3")
                                    playPerformance(task_MusicCity_2, () => {
                                        loadMusicCity();
                                        musicSystem.play("野外8.m4a")
                                    })
                                }
                            }
                        }, 2000)
                    })
                    taskPara.Task_Main_MainCity.localTaskId = 2;
                    Task_Main_MainCity_1.end();
                } else {}
            }
        }
        if (Task_World_Library_1.active == true) {}
        if (Task_World_Weici_1.active == true) {
            if (Task_World_Weici_2.active == true) {
                taskPara.Task_Weici.taskBtn.hidden();

                if (Task_World_Weici_3.active == true && taskPara.Task_Weici.isTaskEnded == false) {
                    taskPara.Task_Weici.isTaskEnded = true;

                    //打完维词后：
                    playPerformance(task_Weici_4, () => {
                        Task_World_Weici_3.end();
                        bagSystem.insert("城市勋章", 20);
                        bagSystem.insert("比特", 50);
                        musicSystem.play("氛围1.m4a");
                    })
                } else {
                    //第三段对话：见到维词
                    if (player.position.x > 345 && player.position.y > 55) {
                        if (player.position.x < 405 && player.position.y < 95) {
                            if (taskPara.Task_Weici.isEnded == false) {
                                taskPara.Task_Weici.taskBtn2.active();
                            } else {
                                taskPara.Task_Weici.taskBtn2.hidden();
                                //若完成维词对话后，也完成挑战，开启下一任务阶段
                                if (WeiciEvent.Weici.isEnded == true) {
                                    Task_World_Weici_2.end();
                                    Task_World_Weici_3.init();
                                }
                            }
                        } else {
                            taskPara.Task_Weici.taskBtn2.hidden();
                        }
                    } else {
                        taskPara.Task_Weici.taskBtn2.hidden();
                    }
                }
            } else {
                if (player.position.x > 345 && player.position.y > 55) {
                    if (player.position.x < 405 && player.position.y < 95) {
                        if (Task_World_Weici_2.active == false) {
                            taskPara.Task_Weici.taskBtn.active();
                        } else {
                            taskPara.Task_Weici.taskBtn.hidden();

                        }
                    } else {
                        taskPara.Task_Weici.taskBtn.hidden();
                    }
                } else {
                    taskPara.Task_Weici.taskBtn.hidden();
                }
            }
        }
        if (Task_World_Declassification_3.active == true) {}
    }, 1000)
}
Task_MainCity();

function Ending_1() {
    Task_Main_MainCity_2.end();
    Task_Main_MainCity_3.init();
    musicSystem.play("城市1.m4a")
    playPerformance(task_MusicCity_3, () => {
        gui.playEnding();
    })
}

function Task_Weici() {
    playPerformance(task_Weici_1, () => {})
}

function loadLands() {
    for (let i = 0; i < 25; ++i) {
        const grassLand = new Object2d();
        //grassLand.img = "./assets/img/grassBlock.png";
        grassLand.img = "./assets/materials/material0.png";
        grassLand.size = vec2(51, 51);
        grassLand.position = vec2(50 * (i % 5), 50 * Math.floor(i / 5));
        scene.add(grassLand);
    }

    const Trees = JSON.parse(JSON_Tree_Positions);
    //document.getElementById("land").style.transform = "translate3d(0vh,0vh,-30vh)";
    /*Trees.forEach((position) => {
        const tree = new Object2d();
        tree.img = "./assets/img/tree1.png";
        tree.size = vec2(16, 16);
        tree.dom.style.zIndex = "3";
        tree.position = vec2(position.x, position.y - 3);

        scene.add(tree);
    })
    Trees.forEach((position) => {
        const tree = new Object2d();
        tree.img = "./assets/img/tree1.png";
        tree.size = vec2(16, 16);
        tree.dom.style.zIndex = "3";
        tree.position = vec2(300 - position.x, position.y - 2);

        scene.add(tree);
    })*/

}
loadLands()

const player = new Character();
player.model = new Object2d();
player.model.img = "./assets/img/character/player1.png";
player.model.dom.style.zIndex = "100";
player.position = vec2(50, 50);
player.model.size = vec2(20, 20);
player.update();
const device = new Object2d();
//grassLand.img = "./assets/img/grassBlock.png";
device.img = "./assets/img/objects/device.png";
device.size = vec2(36, 36);
device.position = vec2(130, 50);
scene.add(device);
scene.add(player.model);

const chest = new Object2d();
chest.img = "./assets/img/objects/chest3.png";
chest.size = vec2(16, 16);
chest.position = vec2(160, 120);
scene.add(chest);

player.hpSet = (val, obj) => {
    if (player.hp + val <= player.maxHp) {
        player.hp += val;
    } else {
        player.hp = player.maxHp;
    }
    document.getElementById("playerHp").style.width = Math.round(80 * player.hp / player.maxHp) + "vw";
    document.getElementById("playerHp").innerHTML = player.hp;
    if (player.hp <= 0) {
        if (obj) obj.reset();
        player.death();
    }
}
player.death = () => {
    player.enemyGroup = []

    gui.death();
    player.hpSet(player.maxHp * 10)
}

const chestBtn = gui.action("打开", () => {
    clearTimeout(chestCheck);
    chest.dom.style.display = "none";
    chestBtn.hidden();

    bagSystem.insert("比特", 25);
    bagSystem.insert("熵石", 3);
})

let chestCheck = setInterval(() => {
    let p1 = player.position;
    let p2 = chest.position;
    let d = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

    if (d <= 45) {
        chestBtn.active();
    } else {
        chestBtn.hidden();
    }


}, 500)

const Objects = {
    timeDoor: new Object2d(),
}
Objects.timeDoor.img = "./assets/img/objects/TimeDoor.png";
Objects.timeDoor.size = vec2(36, 64);
Objects.timeDoor.dom.style.zIndex = "10";
Objects.timeDoor.position = vec2(235, 50);
scene.add(Objects.timeDoor);
let tx = 0;
const moveGroups = [];
isOvered = false;

const Graphics = {
    renderObjects: []
}

function render(t) {
    let dt = t - tx;
    ++FPS;

    Graphics.renderObjects.forEach((obj, index) => {
        if (obj.isActive == true) {
            obj.method(dt);
        }
    })

    let position = getHandle();
    let x = Math.round(position.x * 100);
    let y = Math.round(position.y * 100);
    let R = Math.sqrt(x * x + y * y);
    if (R != 0) {
        let dx = x / R;
        let dy = y / R;

        if (R >= 50) {
            //最大速度
            player.speed = 1.1;
        } else {
            player.speed = 0.6;
        }
        let mul = Math.round(600 / localFPS) / 10;
        player.position.x += player.speed * dx * mul;
        player.position.y += player.speed * dy * mul;
        player.update();


        if (isOvered == false) {
            camera.transfer(player.position.x - 50, player.position.y - 50);
        } else {
            if (player.position.x >= 240) {
                --player.position.x;
            }
            if (player.position.y >= 240) {
                --player.position.y;
            }
            if (player.position.x < 5) {
                ++player.position.x;
            }
            if (player.position.y < 5) {
                ++player.position.y;
            }
        }
    }


    tx = t;

    requestAnimationFrame(render);
}
//render()
let ti = setInterval(() => {
    /* if (player.position.x > 10 && player.position.x < 240 && player.position.y > 10 && player.position.y < 240) {
         isOvered = false;
     } else {
         //gui.print("前面的区域，以后再来探索吧！")这个加上卡成狗
         isOvered = true;
     }*/
}, 500)

scene.render();

function playPerformance(arr, f, count) {
    if (!count) count = 0;
    gui.dialog(arr[count]);
    joystick.hidden();
    setTimeout(() => {
        gui.dialogModule.onclick = () => {
            gui.dialogModule.onclick = () => {
                return false;
            }
            if (count == arr.length - 1) {
                if (f) {
                    f();
                } else {
                    console.log(6)
                }
                gui.dialogRemove();
                joystick.display();

            } else {
                playPerformance(arr, f, count + 1);
            }
        }
    }, 900)
}

const Status = {
    SceneId: 0, //默认
    phase: 0,
    dom: {
        selectScene: null,
        selectSceneIsAdded: false
    },
    para: {
        score: 0,
        isPassed: false,
        isCheckingTasks: false
    }
}
let taskBtn = null;

const Plot = {
    mainLine: 1, //主线任务进度
    checkDistance1() {
        let t = setInterval(() => {
            let p1 = player.position;
            let p2 = vec2(140, 50);
            let d = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
            if (d <= 50) {
                clearInterval(t);
                playPerformance(sets_c3, () => {
                    //displayScene();
                    Plot.checkDistance2();

                })
            }

        }, 1500)
    },
    checkDistance2() {
        const s = gui.action("进入时间虫洞", () => {
            // try {
            //const sceneId = displayScene(); //返回场景序列
            //保存当前场景
            const map1 = scene.save();
            scene.dispose();
            clearInterval(t);
            s.hidden();
            musicSystem.play("野外7.m4a");
            //boss1()
            /*
            function SceneLoad_MusicCity() {
                for (let i = 0; i < 25; ++i) {
                    const grassLand = new Object2d();
                    //grassLand.img = "./assets/img/grassBlock.png";
                    grassLand.img = "./assets/materials/floor_2.png";
                    grassLand.size = vec2(51, 51);
                    grassLand.position = vec2(50 * (i % 5), 50 * Math.floor(i / 5));
                    scene.add(grassLand);
                }

            }
            SceneLoad_MusicCity();
            scene.add(player.model);
            scene.render();
            player.position = vec2(5, 50, 0);
            player.update();
            camera.transfer(player.position.x - 50, player.position.y - 50)
            */
            loadMainCity()
            // } catch (error) {
            // console.log(error.message)

            // }
        })
        let t = setInterval(() => {
            let p1 = player.position;
            let p2 = vec2(240, 45);
            let d = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

            if (d <= 45) {
                s.active();
            } else {
                s.hidden();
            }


        }, 1000)
    }
}

function displayScene() {
    taskBtn.hidden();
    Status.para.isCheckingTasks = false;
    Status.dom.selectScene = document.createElement("div");
    Status.dom.selectScene.style = `
        position: fixed;top: 0;left: 0;
        width: 100%;height: 100%;
        z-index: 10008;
        overflow: auto;
    `
    const childStyle = `
        width: 100%;height: 35vh;
        background-size: cover;
        background-color: #000;
        background-position: center center;
        color: #fff;
        text-align:right;
        font-size: 250%;
        padding: 3vh;
    `
    const root = "./assets/scene/"
    Status.dom.selectScene.innerHTML = `
        <div style="${childStyle}background-image: url('${root}0.png')" onclick="sceneTargetById(0)">图书社的旧梦<div style='font-size: 37%;'>□ 整理E书社中的书籍</div></div>
        <div style="${childStyle}background-image: url('${root}1.png')" onclick="sceneTargetById(1)">往事幻影<div style='font-size: 37%;'>□ 维词的身影貌似出现在一家小店里</div></div>
        <div style="${childStyle}background-image: url('${root}2.png')" onclick="sceneTargetById(2)">空间密钥<div style='font-size: 37%;'>□ 解密维词的资料</div></div>
        <div style="${childStyle}background-image: url('${root}3.png')" onclick="sceneTargetById(-1)">关闭</div>
    `
    if (Status.dom.selectSceneIsAdded == false) {
        Status.dom.selectSceneIsAdded = true;
        document.body.appendChild(Status.dom.selectScene);
    }
    //Status.dom.selectScene = sceneList;
}

function sceneTargetById(sceneId, ele) {
    /*
    if (sceneId == Status.SceneId) {
        if (Status.dom.selectSceneIsAdded == true) {
            try {
                Status.dom.selectScene.parentNode.removeChild(Status.dom.selectScene);
                Status.dom.selectSceneIsAdded = false;
            } catch (error) {
                console.log(Status.dom);
                return false;
            }
            return false;
        }
    } else {
        console.log("非当前场景。")
        return sceneId;
    }*/
    try {
        Status.dom.selectScene.parentNode.removeChild(Status.dom.selectScene);
        Status.dom.selectSceneIsAdded = false;

        Status.para.isCheckingTasks = false;
    } catch (error) {
        console.log(Status.dom);
    }

    switch (sceneId) {
        case 0:
            if (Task_World_Library_1.active == false) {

                Task_World_Library_1.init();
                popTask("图书社的旧梦", "世界间章")
                document.getElementById("LIB").style.display="block";
                playPerformance(task_emit_1,()=>{
                    
                })
                musicSystem.play("野外4.m4a")
            } else {
                gui.print("已接取过了！")
            }
            break;
        case 1:
            if (Task_World_Weici_1.active == false) {
                Task_World_Weici_1.init();
                popTask("往事幻影", "世界间章")
                Task_Weici();
            } else {
                gui.print("已接取过该任务！")
            }
            break;
        case 2:
            if (Task_World_Declassification_1.active == false) {
                Task_World_Declassification_1.init();
                playPerformance(task_unlockpsd_1, () => {
                    UnlockKeys.cityTask_task_unlockpsd()
                })
                popTask("空间密钥", "世界简章")
                musicSystem.play("氛围2.m4a")
            } else {
                gui.print("已接取过该任务！")
            }
            break;
    }
}



function popTask(taskName, description) {
    const taskLayout = document.createElement("div");
    taskLayout.style = `
        position: fixed;top: 0;left: 0;
        width: 100%;height: 100%;
        z-index: 10210;
        overflow: hidden;
        background-color: #000;
        background-image: url("./assets/backgrounds/bg1.png");
        background-size: cover;
        background-position: center center;
        
        `
    const childStyle = `
            position: absolute;left: 0;top: 100vh;
            width: 100vw;text-align: center;
            color: #fff;background-color: rgb(255,255,255,0.3);
            transition: 1.5s;
        `
    taskLayout.innerHTML = `
            <div style="${childStyle}"><div style="padding: 25px;">${description}</div><div style="font-size: 200%;">${taskName}</div><br><div class="textshine">◇ 新的旅途 ◇</div><br><br<</div>
        `
    document.body.appendChild(taskLayout);
    setTimeout(() => {
        taskLayout.children[0].style.top = '20vh';
    }, 500)
    setTimeout(() => {
        document.body.removeChild(taskLayout);
    }, 4000)
}

//序章◇撕裂时空

function main() {
    render();
    musicSystem.play("场景2_0.m4a");
    document.body.style.backgroundColor = "#000";
    document.body.style.backgroundImage = "url('./assets/backgrounds/world.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center center";
    playPerformance(sets_c1, () => {
        popTask("破碎的时空", "◇序章");

        playPerformance(sets_c2, () => {
            joystick.display();
            Plot.checkDistance1();
            musicSystem.play("场景2_1.m4a");
        })

    })
}

class Boss {
    constructor() {
        this.name = "未知";
        this.hp = 100;
        this.power = 0;
        this.speed = 0;
        this.atk = 10; //攻击力
        this.def = 10; //防御力
        this.img = null;
        this.func = null;
        this.statue = 0;
        this.position = vec2(0, 0);
        this.model = null;
        this.size = vec2(50, 50);
    }
    changeStatue(info) {
        this.hp = info.live;
        this.atk = info.live;
        this.func = info.func;
        this.statue = 1;
    }
    generate() {
        console.log("生成BOSS")
        this.model = new Object2d();
        this.model.position = this.position;
        this.model.size = this.size;
        this.model.img = this.img;
        scene.add(this.model);
    }
}

function boss1() {
    const boss = new Boss();
    boss.name = "余音"
    boss.hp = 2500;
    boss.initHp = 2500;
    boss.img = "./assets/img/boss/musicBoss.png";
    musicSystem.play("战斗1.m4a")
    boss.size = vec2(100, 100);
    boss.position = vec2(180, 50);
    let m = 1;
    boss.generate();
    boss.model.dom.style.zIndex = "90";
    boss.model.dom.style.display = "block";

    boss.phase = 1; //一阶段

    player.enemyGroup = [boss];
    gui.enemy.updatePercent("余音", boss.hp / boss.initHp * 100)

    const note = new Object2d();
    note.size = vec2(9, 9);
    note.img = "./assets/img/boss/note.png";
    note.position = vec2(boss.position.x + 50, boss.position.y + 35);
    scene.add(note);
    note.dom.style.zIndex = "100";
    note.dom.style.display = "none";
    note.dom.style.transition = "0.5s";

    const enemy = new Object2d();
    enemy.size = vec2(16, 16);
    enemy.position = vec2(player.position.x - 30, player.position.y - 3);
    enemy.img = "./assets/img/boss/musicboss_d.png";
    scene.add(enemy);
    enemy.dom.style.display = "none";
    enemy.dom.style.zIndex = "80";
    enemy.dom.style.transition = "0.2s";
    boss.enemy = enemy

    const objs = [];
    let objsIndex = -1; //skill2()
    for (let i = 0; i < 12; ++i) {
        objs[i] = new Object2d();
        //console.log(objs[i])
        objs[i].size = vec2(20, 20);
        objs[i].position = vec2(boss.position.x + 40 + 64 * Math.cos(i * 3.14 / 6), boss.position.y + 40 + 64 * Math.sin(i * 3.14 / 6));

        objs[i].img = "./assets/img/boss/redStar.png";
        scene.add(objs[i]);

        objs[i].dom.style.zIndex = "80";
        objs[i].dom.style.opacity = "0";
        objs[i].dom.style.transition = "0.3s";

        objs[i].moveCount = 0;
        objs[i].method = (dt) => {
            objs[i].position.x += Math.cos(i * 3.14 / 6) * dt * 0.5;
            objs[i].position.y += Math.sin(i * 3.14 / 6) * dt * 0.5;
            objs[i].Position();
            ++objs[i].moveCount;

            if (Math.abs(player.position.x - objs[i].position.x) <= 16) {
                if (Math.abs(player.position.y - objs[i].position.y) <= 16) {
                    player.hpSet(computePlayerHurt(-50), boss);
                }
            }
        }
        objs[i].isActive = false;
        Graphics.renderObjects.push(objs[i]);

    }

    let Status = {
        skill2: false,
        skill3: false,
        position: 0
    }
    let skill1 = () => {
        note.dom.style.display = 'block';


        let dx = player.position.x - note.position.x;
        let dy = player.position.y - note.position.y;

        let count = 0;
        let t = setInterval(() => {

            note.position.x += dx / 10;
            note.position.y += dy / 10;
            //console.log(dx,dy)
            boss.model.Position()
            note.Position();
            if (count <= 16) {
                count++;
                if (Math.abs(player.position.x - note.position.x) <= 8) {
                    if (Math.abs(player.position.y - note.position.y) <= 8) {
                        player.hpSet(-5, boss);

                    }
                }
            } else {
                clearInterval(t);
                note.dom.style.display = "none";
                //boss.position = vec2(50, 50);
                note.position.x = boss.position.x + 50;
                note.position.y = boss.position.y + 20;
                note.Position();
            }
        }, 100)
    }
    let skill2 = () => {
        if (Status.skill2 == true) {
            //已经开启技能2时，取消继续执行技能2
            return 0;
        } else {
            Status.skill2 = true;
            //锁定执行技能2状态
        }
        gui.print("怪物即将沿中心位置向四周发射湮灭音符，请注意远离躲避！")
        let count = 0;
        let p = setInterval(() => {
            objs[count].dom.style.opacity = "1";
            ++count;

            if (count >= 12) {
                clearInterval(p);
                objs.forEach((obj) => {
                    obj.isActive = true;
                })
                let ActiveCount = 0;
                let spread = setInterval(() => {

                    if (ActiveCount >= 12) {
                        //所有对象发射成功后，解除技能2状态
                        clearInterval(spread);
                        objs.forEach((m, i) => {
                            m.position = vec2(boss.position.x + 40 + 50 * Math.cos(i * 3.14 / 6), boss.position.y + 40 + 50 * Math.sin(i * 3.14 / 6));
                            m.Position();
                            m.dom.style.opacity = "0";

                            //切换为可重新执行Skill2
                            Status.skill2 = false;
                        })
                        return 0;
                    }
                    objs.forEach((e) => {
                        if (e.moveCount >= 30 && e.isActive == true) {
                            //当激活渲染的对象达到30次渲染时，取消渲染
                            e.moveCount = 0;
                            e.isActive = false;
                            ActiveCount++;
                        }
                    })
                }, 500)
            }
        }, 600)


    }
    let skill3 = () => {
        if (Status.skill3 == false) {
            Status.skill3 = true;

            enemy.position = vec2(player.position.x - 30, player.position.y - 10);
            enemy.Position();

            enemy.dom.style.display = "block";

            enemy.skill = function(val) {
                let dx = player.position.x - enemy.position.x;
                let dy = player.position.y - enemy.position.y;
                let count = 0;
                let st = setInterval(() => {
                    enemy.position.x += dx / 12;
                    enemy.position.y += dy / 12;
                    enemy.Position();
                    count++;
                    if (Math.abs(player.position.x - enemy.position.x - enemy.size.x / 2) <= 12) {
                        if (Math.abs(player.position.y - enemy.position.y - enemy.size.y / 2) <= 12) {
                            player.hpSet(-val, boss);
                            player.position.x += dx / 2;
                            player.position.y += dy / 2;
                            player.update();
                            camera.transfer(player.position.x - 50, player.position.y - 50);
                            clearInterval(st);
                        }
                    }
                    if (count >= 15) {
                        clearInterval(st);
                    }
                }, 50)
            }
            if (boss.phase == 2) {
                let attack = setInterval(() => {
                    enemy.skill(computePlayerHurt(15))
                    if (boss.hp <= 0) {
                        clearInterval(attack);
                    }
                }, 3000)
            } else {
                enemy.skill(computePlayerHurt(15));
            }
        }
    }
    boss.func = () => {
        let t = setInterval(() => {
            if (boss.hp <= 0) {
                if (boss.phase == 1) {
                    gui.print("你激怒了怪物！！！")
                    boss.phase = 2;
                    musicSystem.play("boss.mp3")
                    boss.hp = 5000;
                    boss.initHp = 5000;
                } else {
                    clearInterval(t);
                    Ending_1();
                }
            } else {
                boss.power++;
                if (boss.phase == 1) {
                    let r = Math.random();
                    if (r < 0.5) {
                        skill1();
                    } else if (r < 0.85) {
                        skill3();
                    } else {
                        skill2();
                    }
                } else if (boss.phase == 2) {
                    let r = Math.random();
                    if (r < 0.3) {
                        skill1();
                        setTimeout(skill1, 800)
                    } else if (r < 0.6) {
                        skill3();
                    } else {
                        skill2();
                    }
                }
                if (Math.abs(player.position.x - boss.position.x - boss.model.size.x / 2) <= 50) {
                    if (Math.abs(player.position.y - boss.position.y - boss.model.size.y / 2) <= 50) {
                        gui.print("靠近怪物会受到大量诅咒伤害！")
                        player.hpSet(-20, boss);
                    }
                }
            }
            boss.reset = () => {
                taskPara.Task_Main_MainCity.isBossExisted = false;
                clearInterval(t);
                boss.model.dispose();
                enemy.dom.style.display = "none";
                musicSystem.play("场景1.m4a")
            }
            gui.enemy.updatePercent("余音", boss.hp / boss.initHp * 100)
        }, 2000)
    }
    boss.func();
}


const bagSystem = {
    contain: [{
        name: "比特",
        img: "./assets/img/character/deviceBg.jpg",
        count: 10
    }, {
        name: "熵石",
        img: "./assets/img/character/legoBoss1.png",
        count: 2
    }, {
        name: "城市勋章",
        img: "./assets/img/objects/cityMedal.png",
        count: 0
    }],
    insert: (name, amount) => {
        let info = `<div class="obtainContent">${name}*${amount}</div>`
        document.getElementById("obtainment").innerHTML += info;
        bagSystem.noticeBoard.push(document.getElementsByClassName("obtainContent")[document.getElementsByClassName("obtainContent").length - 1]);
        //console.log(document.getElementsByClassName("obtainContent")[document.getElementsByClassName("obtainContent").length - 1])
        setTimeout(() => {
            ++bagSystem.noticeCount;
            document.getElementsByClassName("obtainContent")[bagSystem.noticeCount].style.display = "none";
        }, 2000)
        bagSystem.contain.forEach((resourceItem) => {
            if (resourceItem.name == name) {
                resourceItem.count += amount;
                return true;
            }
        })
    },
    noticeBoard: [],
    noticeCount: -1, //用于告之setTimeout该清除哪个对象,
    get: (name) => {
        let count = 0;
        bagSystem.contain.forEach((e) => {
            if (e.name == name) {
                count = e.count;
            }
        })
        return count;
    },
    pop: (name, num) => {
        if (bagSystem.get(name) >= num) {
            bagSystem.contain.forEach((e) => {
                if (e.name == name) {
                    e.count -= num;
                }
            })
            return true;
        } else {
            return false;
        }
    }
}

const musicSystem = {
    audio: new Audio(),
    play: (name) => {
        let src = "./assets/audio/" + name;
        musicSystem.audio.addEventListener("ended", () => {
            musicSystem.play(name);
        }, {
            once: true
        })
        try {
            musicSystem.audio.src = src;
            musicSystem.audio.play()
        } catch (error) {
            musicSystem.shift("outer");
        }
    },
    shift: (type) => {
        let src = '';
        if (type == "outer") {
            let index = Math.floor(Math.random() * 8);
            src = './assets/audio/野外' + index + ".m4a";
            console.log("[Music]", type, index)
            musicSystem.audio.addEventListener("ended", () => {
                musicSystem.shift("outer");
            }, {
                once: true
            })
        }
        if (type == "battle") {
            src = './assets/audio/战斗' + Math.round(Math.random() * 1) + ".m4a";
            musicSystem.audio.ended = () => musicSystem.shift("battle");
        }
        try {
            musicSystem.audio.src = src;
            musicSystem.audio.play()
        } catch (error) {
            musicSystem.shift(type);
        }
    }
}

function loadMainCity() {
    //机制
    Task_Main_Travel.end();

    taskBtn = gui.action("查看城市公告板", () => {
        displayScene();
        Status.para.isCheckingTasks = true;
    })

    //地图部分
    scene.dispose();
    // Status.SceneId = 2;
    clearInterval(ti);
    ti = setInterval(() => {
        if (player.position.x > 480 || player.position.y < 5 || player.position.x < 5 || player.position.y > 480) {
            isOvered = true;
        } else {
            isOvered = false;
        }
        //城市公告板嵌套型判断优化性能：
        if (player.position.x > 45 && player.position.y > 50) {
            if (player.position.x < 100 && player.position.y < 100) {
                console.log(Status.para.isCheckingTasks)
                if (Status.para.isCheckingTasks == false&&isMusicCity==false) {
                    taskBtn.active();
                }
            } else {
                taskBtn.hidden();
            }
        } else {
            taskBtn.hidden();
        }
    }, 400)


    playPerformance(Main_City_1, () => {
        Task_Main_MainCity_1.init();
    })
    //加载新地图
    //资源
    for (let i = 0; i < 24; ++i) {
        const grassLand = new Object2d();
        //grassLand.img = "./assets/img/grassBlock.png";
        grassLand.img = "./assets/materials/material0.png";
        grassLand.size = vec2(51, 51);
        grassLand.position = vec2(50 * (i % 12), 50 * Math.floor(i / 12));
        scene.add(grassLand);
    }
    for (let x = 0; x < 60; ++x) {
        const road = new Object2d();
        road.size = vec2(20, 20);
        road.position = vec2(x % 30 * 20, 100 + 20 * Math.floor(x / 30));
        road.img = "./assets/materials/block_2.png";
        scene.add(road);
    }

    let buildings = [];
    buildings[0] = new Object2d();
    buildings[0].img = "./assets/img/objects/building1.png";
    buildings[0].size = vec2(90, 120);
    buildings[0].position = vec2(6, -25);
    buildings[0].dom.style.zIndex = "45";
    scene.add(buildings[0])

    buildings[1] = new Object2d();
    buildings[1].img = "./assets/img/objects/building2.png";
    buildings[1].size = vec2(36, 36);
    buildings[1].position = vec2(110, 64);
    buildings[1].dom.style.zIndex = "45";
    scene.add(buildings[1])
    buildings[2] = new Object2d();
    buildings[2].img = "./assets/img/objects/building2.png";
    buildings[2].size = vec2(36, 36);
    buildings[2].position = vec2(146, 64);
    buildings[2].dom.style.zIndex = "45";
    scene.add(buildings[2])
    buildings[3] = new Object2d();
    buildings[3].img = "./assets/img/objects/building2.png";
    buildings[3].size = vec2(36, 36);
    buildings[3].position = vec2(182, 64);
    buildings[3].dom.style.zIndex = "45";
    scene.add(buildings[3])
    buildings[4] = new Object2d();
    buildings[4].img = "./assets/img/objects/building2.png";
    buildings[4].size = vec2(36, 36);
    buildings[4].position = vec2(218, 64);
    buildings[4].dom.style.zIndex = "45";
    scene.add(buildings[4])

    buildings[5] = new Object2d();
    buildings[5].img = "./assets/img/objects/building3.png";
    buildings[5].size = vec2(36, 36);
    buildings[5].position = vec2(260, 64);
    buildings[5].dom.style.zIndex = "45";
    scene.add(buildings[5]);

    buildings[6] = new Object2d();
    buildings[6].img = "./assets/img/objects/building4.png";
    buildings[6].size = vec2(36, 36);
    buildings[6].position = vec2(365, 64);
    buildings[6].dom.style.zIndex = "45";
    scene.add(buildings[6])

    buildings[7] = new Object2d();
    buildings[7].img = "./assets/img/objects/building3.png";
    buildings[7].size = vec2(36, 36);
    buildings[7].position = vec2(400, 64);
    buildings[7].dom.style.zIndex = "45";
    scene.add(buildings[7])

    buildings[8] = new Object2d();
    buildings[8].img = "./assets/img/objects/building1.png";
    buildings[8].size = vec2(90, 120);
    buildings[8].position = vec2(450, -16);
    buildings[8].dom.style.zIndex = "45";
    scene.add(buildings[8])

    buildings[9] = new Object2d();
    buildings[9].img = "./assets/img/objects/building1.png";
    buildings[9].size = vec2(90, 120);
    buildings[9].position = vec2(530, -16);
    buildings[9].dom.style.zIndex = "45";
    scene.add(buildings[9])

    buildings[10] = new Object2d();
    buildings[10].img = "./assets/scene/library.png";
    buildings[10].size = vec2(90, 60);
    buildings[10].position = vec2(200, 15);
    buildings[10].dom.style.zIndex = "43";
    scene.add(buildings[10])

    buildings[11] = new Object2d();
    buildings[11].img = "./assets/img/objects/building1.png";
    buildings[11].size = vec2(90, 120);
    buildings[11].position = vec2(490, -49);
    buildings[11].dom.style.zIndex = "44";
    scene.add(buildings[11])


    const notice = new Object2d();
    notice.img = "./assets/materials/NoticeBoard.png";
    notice.size = vec2(60, 40);
    notice.position = vec2(60, 65);
    notice.dom.style.zIndex = "85";
    scene.add(notice);

    //添加玩家及相机控制
    scene.add(player.model);
    scene.render();
    player.position = vec2(5, 100);
    player.update();
    camera.transfer(player.position.x - 50, player.position.y - 50)

    //剧情部分

}

function loadMusicCity() {
    
    isMusicCity = true;
    scene.dispose();

    Status.SceneId = 3;

    for (let i = 0; i < 25; ++i) {
        const grassLand = new Object2d();
        //grassLand.img = "./assets/img/grassBlock.png";
        grassLand.img = "./assets/materials/floor_2.png";
        grassLand.size = vec2(51, 51);
        grassLand.position = vec2(50 * (i % 5), 50 * Math.floor(i / 5));
        scene.add(grassLand);
    }
    const piano = new Object2d();
    piano.img = "./assets/img/objects/piano.png"
    piano.size = vec2(49, 49);
    piano.position = vec2(120, 50);
    piano.dom.style.zIndex = "39";
    scene.add(piano);
    scene.add(player.model);
    scene.render();
    player.position = vec2(5, 50);
    player.update();
    camera.transfer(player.position.x - 50, player.position.y - 50);

    let pianoTask = setInterval(() => {
        if (Status.SceneId == 3) {
            let dx = Math.abs(player.position.x - piano.position.x);
            let dy = Math.abs(player.position.y - piano.position.y);
            if (dx + dy < 50) {
                pianoBtn.active();
            } else {
                pianoBtn.hidden();
            }
        }
    })

    const pianoBtn = gui.action("演奏", () => {
        //clearTimeout(chestCheck);
        //chest.dom.style.display = "none";
        musicSystem.audio.src= "";
        chestBtn.hidden();
        player.position.x = piano.position.x - 50;
        playPiano()
    })

    let waitFor = setInterval(() => {
        if (Status.para.score >= 8000 && Status.para.isPassed == false) {
            gui.print("你的琴声使得整个教堂都充满余音，十分悦耳动听，你渐渐停下了你的演奏");
            Status.para.isPassed = true;
            Status.para.score = -Status.para.score;
        } else if (Status.para.isPassed == true) {
            clearInterval(waitFor);
            MusicCityNextPhase();

        }
    }, 500)

}

function playPiano() {
    document.getElementById("musicAmusement").style.display = "block";
}

function MusicCityNextPhase() {
    //演奏完美时
    document.getElementById("musicAmusement").style.display = "none";
    //剧情

    //BOSS战
    if (taskPara.Task_Main_MainCity.isBossExisted == false) {
        boss1();
        scene.render(); //更新场景

        taskPara.Task_Main_MainCity.isBossExisted = true;
    } else {}
}


const Talents = {
    system: {
        learn: (talent) => {
            Talents.lists.forEach((e) => {
                if (talent.name == e.name) {
                    e.level++;
                }
                if (e.name == "生命旺盛") {
                    //没时间了，只能这么写了
                    e.effect()
                }
            })
        },
        release: () => {},
        waitForCd: () => {},
        equipment: () => {},
        attributeLayout: () => {
            //建议交给gui处理
        },
        equipments: [],
        skill: (index) => {
            if (index == 0) {
                Talents.lists[0].effect();
            } else {
                //时间紧迫，只实现3个副技能的配置
                Talents.lists[index].effect();
            }
        },
        updateGUI: () => {

        }
        //player.atk加成于技能。
    },
    attributeAdditions: ["生命旺盛"],
    lists: [{
            name: "普通攻击",
            icon: './assets/ui/talent/150 (1).png',
            description: () => {
                return `当前等级：以${20+5*Talents.lists.find(e=>e.name=='普通攻击').level}点攻击力加成攻击敌人。下一等级：以${20+5+5*Talents.lists.find(e=>e.name=='普通攻击').level}点攻击力加成攻击敌人。`
            },
            level: 1,
            cd: 0,
            improveConfig: [{
                name: "比特",
                amount: 10
            }],
            effect: () => {
                player.enemyGroup.forEach((e) => {
                    let skillVal = Talents.lists.find((e) => e.name = "普通攻击").level * 5;
                    if (Math.abs(player.position.x - e.model.position.x - e.size.x / 2) + Math.abs(player.position.y - e.model.position.y - e.size.y / 2) <= 80) {
                        e.hp -= computePlayerAtk(20 + skillVal);
                        if (e.name == "余音") {
                            console.log(666)
                            gui.enemy.updatePercent("余音", e.hp / e.initHp * 100)
                        }
                        //console.log(computePlayerAtk(40))
                    } else {

                    }
                })

            }
        },
        {
            name: "生命旺盛",
            icon: "./assets/ui/talent/Golden_Sword_JE3_BE2.png",
            description: () => {
                return `提升基础生命力${Talents.lists.find(e=>e.name=='生命旺盛').level*40}点。 → 提升基础生命力${Talents.lists.find(e=>e.name=='生命旺盛').level*40+40}点`
            },
            level: 0,
            cd: 0,
            improveConfig: [{
                name: "比特",
                amount: 10
            }],
            effect: () => {
                player.maxHp = 100 + Talents.lists.find(e => e.name == '生命旺盛').level * 40;
                player.hp = player.maxHp;
                player.hpSet(0);
            }
        },
        {
            name: "斩杀",
            icon: "./assets/ui/talent/Diamond_Sword_JE3_BE3.png",
            description: () => {
                return `当前等级：以${150+32*Talents.lists.find(e=>e.name=='斩杀').level}点暴击攻击力加成伤害攻击敌人，冷却时间9s。下一等级：以${150+32+32*Talents.lists.find(e=>e.name=='斩杀').level}点暴击攻击力加成伤害攻击敌人，冷却时间9s。`
            },
            level: 0,
            cd: 0,
            improveConfig: [{
                name: "比特",
                amount: 15
            }],
            effect: () => {
                let obj = Talents.lists.find(e => e.name == "斩杀");
                if (obj.cd == 0) {
                    obj.cd = 9; {
                        //do something...
                        document.getElementById("skill2").style.opacity = "0.25";

                        player.enemyGroup.forEach((e) => {

                            if (Math.abs(player.position.x - e.model.position.x - e.size.x / 2) + Math.abs(player.position.y - e.model.position.y - e.size.y / 2) <= 400) {
                                e.hp -= computePlayerAtk(150 + 32 * Talents.lists.find(e => e.name == '斩杀').level);

                            } else {

                            }
                        })

                    }
                    let temp = setInterval(() => {
                        if (obj.cd >= 1) obj.cd--;
                        if (obj.cd <= 0) {
                            obj.cd = 0;
                            clearInterval(temp);
                            document.getElementById("skill2").style.opacity = "1";
                        }
                    }, 1000)
                }
            }
        },
        {
            name: "休养生息",
            icon: "./assets/ui/talent/Golden_Sword_JE3_BE2.png",
            description: () => {
                return `恢复生命${Talents.lists.find(e=>e.name=='休养生息').level*30}点，冷却时间12s → 恢复生命${Talents.lists.find(e=>e.name=='休养生息').level*30+30}点，冷却时间12s`
            },
            level: 0,
            cd: 0,
            improveConfig: [{
                name: "比特",
                amount: 15
            }],
            effect: () => {
                let obj = Talents.lists.find(e => e.name == "休养生息");
                if (obj.cd == 0) {
                    obj.cd = 12; {
                        //do something...
                        document.getElementById("skill1").style.opacity = "0.25";
                        player.hpSet(Talents.lists.find(e => e.name == '休养生息').level * 30)
                    }
                    let temp1 = setInterval(() => {
                        if (obj.cd >= 1) obj.cd--;
                        if (obj.cd <= 0) {
                            obj.cd = 0;
                            clearInterval(temp1);
                            obj.cd = 0;
                            document.getElementById("skill1").style.opacity = "1";
                        }
                    }, 1000)
                }
            }
        },
        {
            name: "吸血鬼星系",
            icon: "./assets/materials/skill0.svg",
            description: () => {
                return `消耗自身生命生命 ${Talents.lists.find(e=>e.name==='吸血鬼星系').level*20}点，对敌方造成 ${Talents.lists.find(e=>e.name=='吸血鬼星系').level*128}的攻击，冷却时间25s → 消耗自身生命生命 ${Talents.lists.find(e=>e.name=='吸血鬼星系').level*20}点，对敌方造成 ${Talents.lists.find(e=>e.name=='吸血鬼星系').level*128+128}的攻击，冷却时间25s. `
            },
            level: 0,
            cd: 0,
            improveConfig: [{
                name: "比特",
                amount: 25
            }],
            effect: () => {
                let obj = Talents.lists.find(e => e.name == "吸血鬼星系");
                if (obj.cd == 0) {
                    obj.cd = 25; {
                        //do something...
                        document.getElementById("skill3").style.opacity = "0.25";

                        player.hpSet(-Talents.lists.find(e => e.name === '吸血鬼星系').level * 20)
                        player.enemyGroup.forEach((e) => {
                            let skillVal = Talents.lists.find((e) => e.name = "普通攻击").level * 10;
                            if (Math.abs(player.position.x - e.model.position.x - e.size.x / 2) + Math.abs(player.position.y - e.model.position.y - e.size.y / 2) <= 1600) {
                                e.hp -= computePlayerAtk(Talents.lists.find(e => e.name == '吸血鬼星系').level * 128);
                                //console.log(computePlayerAtk(40))
                            } else {

                            }
                        })

                    }
                    let temp3 = setInterval(() => {
                        if (obj.cd >= 1) obj.cd--;
                        if (obj.cd <= 0) {

                            clearInterval(temp3);
                            obj.cd = 0;
                            document.getElementById("skill3").style.opacity = "1";
                        }
                    }, 1000)
                }
            }
        },
    ]
}

function computePlayerHurt(val) {
    return val / (0.1 * player.dfn + 0.1 * player.upDfn) / (player.multiDfn + player.localUpDfn);
}

function computePlayerAtk(val) {
    setTimeout(() => {
        if (player.enemyGroup[0].name == "异变琴王") gui.enemy.updatePercent("异变琴王", 100 * player.enemyGroup[0].hp / player.enemyGroup[0].initHp);
    }, 150)
    console.log("伤害", val + 0.1 * player.atk + 0.1 * player.upAtk) * (player.multiAtk + player.localUpAtk)
    return (val + 0.1 * player.atk + 0.1 * player.upAtk) * (player.multiAtk + player.localUpAtk)
}