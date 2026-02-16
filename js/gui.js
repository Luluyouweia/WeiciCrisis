document.getElementById("library").style.display = "none";
const gui = {
    dialogModule: null,
    message: [],
    create(name) {
        document.body.innerHTML += "<section id='gui'></section>";

        const module = document.createElement("section");
        module.innerHTML = `
        
        `
        module.style.display = "none";
        module.style.zIndex = "10009";
        document.getElementById("gui").appendChild(module);
        let c = document.getElementById("gui").children;
        gui.dialogModule = c[c.length - 1];

        gui.menu.display();

        const bagInsert = document.createElement("div");
        bagInsert.id = "obtainment";
        document.getElementById("gui").appendChild(bagInsert);
    },
    dialog(data) {
        gui.dialogModule.innerHTML = `
            <section style="position: absolute;bottom: 0;padding: 9px;width: 100vw;background: rgb(0,0,0,0.4);">
            <section class="name" style ="text-align:center;font-size: 120%;padding: 6px;">${data.name}</section>
            <section class="text" style ="padding: 18px 16px;">${data.text}</section>
        </section>
        `
        gui.dialogModule.style = `
            color: #fff;
            position: fixed;
            top: 0;left: 0;width: 100%;height: 100%;
            background-image: url(${data.img});
            background-position: center bottom;
            background-size: cover;
            background-color: rgb(0,0,0,0.85);
            z-index: 10011;
        `

        setTimeout(() => {
            gui.dialogModule.style.display = "block";
        }, 500)

    },
    dialogRemove() {
        gui.dialogModule.style.display = "none";
        return true;
    },
    action(text, func) {
        const actiondom = document.createElement("div");
        actiondom.className = "btn0";
        actiondom.innerText = text;
        actiondom.style.display = "none";
        actiondom.style.zIndex = 10010;
        document.getElementById("gui").appendChild(actiondom);
        let c = document.getElementById("gui").children;
        c = c[c.length - 1];
        c.onclick = function() {
            func();
        }
        return {
            active: () => {
                c.style.display = "block";
            },
            hidden: () => {
                c.style.display = "none";
            }
        }
    },
    print(msg) {
        if (msg != null) {
            gui.message.push(msg);
        }
        gui.message.forEach((obj) => {
            if (obj !== null) {
                const dom = document.createElement("div");
                dom.className = "print";
                dom.innerHTML = obj;
                document.getElementById("gui").appendChild(dom);
                obj = null;
                setTimeout(() => {
                    document.getElementById("gui").removeChild(dom);
                    print(null);
                }, 3000)
            }
        })
    },
    menu: {
        ele: `
        <div class='actionObjects' style='background-image: url(./assets/ui/ui_bag1.png)' onclick="gui.menu.def.openBag();"></div>
        <div class='actionObjects' style='background-image: url(./assets/ui/Book_and_Quill.png)' onclick="gui.checkTasks()"></div>
        <div class='actionObjects' style="background-image: url('./assets/ui/talent/150(2).png')" onclick="gui.menu.def.talent();"></div>
        <div id="LIB" class='actionObjects' style='display: none;background-image: url(./assets/ui/Book_and_Quill.png)' onclick="gui.library()"></div>
        `,
        doms: {
            bag: null
        },
        def: {
            openBag: () => {
                //alert(6)
                gui.menu.doms.bag = document.createElement("section");
                gui.menu.doms.bag.className = "bagLayout";
                let con = "";
                for (let i = 0; i < 45; ++i) {
                    let name = '';
                    let amount = '';
                    let img = "";
                    if (bagSystem.contain[i]) {
                        let object = bagSystem.contain[i];
                        name = object.name;
                        amount = object.count;
                        if (object.img) {
                            img = object.img;
                        }
                    }
                    con += `
                    <div class='bagContent' style="background-image: url(${img});background-size: cover;background-position: center center;">
                        <div style="bottom: 0;text-align: right;width: 100%;height: 100%;color: #fff;">${name}<br/>${amount}</div>
                    </div>`
                }
                gui.menu.doms.bag.innerHTML = `
                <section class="bagContentsParent">
                    <div class="bagContentsLab">
                        <div class="lab">任务道具</div>
                        <div class="lab">武器装备</div>
                        <div class="lab">功能道具</div>
                        <div class="lab">特殊物品</div>
                        <div class="lab" onclick="gui.menu.def.closeBag();">关闭背包</div>
                    </div>
                    ${con}
                </section>`

                document.getElementById("gui").appendChild(gui.menu.doms.bag);
            },
            closeBag: () => {
                document.getElementById("gui").removeChild(gui.menu.doms.bag);
            },
            talent: () => {
                gui.talent.displayLayout();
            }
        },
        display: () => {
            let obj = document.createElement("section");
            obj.className = "actions";
            obj.innerHTML = gui.menu.ele;
            document.getElementById("gui").appendChild(obj);

        }
    },
    talent: {
        localTransfer: null,
        displayLayout: () => {
            let obj = document.createElement("section");
            obj.className = "talent";
            obj.style = `
                position: fixed;top: 0;left: 0;width: 100vw;height: 100vh;
                z-index: 10030;
                background-color: #000;
                background-image: url('./assets/scene/2.png');
                background-size: cover;
                color: #fff;
                overflow: auto;
            `
            obj.innerHTML = `
                <div name="title" style="width: 100vw;padding: 3vh;font-size: 3vh;text-align: center;">技能学习</div>
            `
            const dom = document.createElement("div");
            dom.innerHTML = "╳";
            dom.style = "position: absolute;right: 5vh;top: 5vh;font-size: 3vh;border: 2px solid #fff;text-align: center;width: 7vh;height: 7vh;";
            obj.appendChild(dom);

            Talents.lists.forEach((e) => {
                /*
                name: "",
                icon: "",
                level: 0,
                description: "",
                improveConfig: [{
                name: "",
                amount: 0
                }],
                effect: () => {}
                },*/
                let improveText = "进阶";
                if (e.level == 0) {
                    improveText = "学习";
                }
                let desc = e.description()
                const skillUi = document.createElement("div");
                skillUi.style = "background-color: rgb(0,0,0,0.6);color: #fff;width: 100vw;heigth: 18vh;position: relative;border-bottom: 0.3vh solid #fff;padding: 1vh";
                skillUi.innerHTML = `
                    <h1 style="font-size: 3.5vh;padding: 2vh 1vh;"><i style="display: inline-block;width: 3vh;height: 3vh;background-image: url('${e.icon}');background-size: 100% 100%;"></i>${e.name}</h1>
                    <div style="font-size: 2vh;padding: 1vh 1vh;">${desc}</div>
                    <div style="position: absolute;top: 1.5vh;right: 5vh;textCalign: center;">
                        <div style="padding: 0.9vh">lv.${e.level}</div>
                        <button onclick="gui.talent.learn('${e.name}')" style = "color: #08f;background: #fff;border: #08f;border-radius: 3vh;padding: 1.2vh;">${improveText}</button>
                    </div>
                `
                obj.appendChild(skillUi);
            })

            dom.addEventListener('click', () => {
                obj.removeChild(dom);
                document.getElementById("gui").removeChild(obj);
            }, {
                once: true
            })

            document.getElementById("gui").appendChild(obj);
            gui.talent.localTransfer = obj;
        },
        learn(objName) {
            Talents.lists[0].name = "普通攻击"; //特殊代码片段!：不知道为什么要加，但不加跑不起来
            Talents.lists.forEach((e) => {
                if (e.name == objName) {
                    obj = e;
                }
            });

            let msgbox = document.createElement("section");
            msgbox.style = "position: fixed;padding: 5vh;z-index: 10301;top: 0;left: 0;right: 0;bottom: 0;width: 80vw;height: 80vh;text-align: center;margin: auto;background:#000;color: #fff;border: 1px solid #fff;";
            let requirement = ``;
            let btnText = "学习";
            let isEnough = true;
            let name;
            let amount;
            obj.improveConfig.forEach((source) => {
                name = source.name;
                amount = source.amount;

                let player_amount = bagSystem.get(name);

                if (player_amount < amount) {
                    isEnough = false;
                    btnText = "材料不足，取消学习"
                }

                requirement += `
                    <div style="width: 100%;">
                        <div>
                            ${name}
                        </div>
                        <div>
                            <span>${player_amount}</span>/
                            <span>${amount}</span>
                        </div>
                    </div>
                `
            })

            msgbox.innerHTML = `
                <h1>资源材料清单</h1>
                <div>本次提升需要：
                    ${requirement}
                </div>
            `
            let btn = document.createElement("button");
            btn.style = "color: #08f;background: #fff;border: #08f;border-radius: 3vh;padding: 1.2vh;";
            btn.innerHTML = btnText;
            msgbox.appendChild(btn);
            btn.onclick = () => {
                if (isEnough == true) {
                    isEnough = false;
                    const Obj = obj;
                    Talents.system.learn(Obj);
                    bagSystem.pop(name, amount);
                    msgbox.removeChild(btn);
                    document.getElementById("gui").removeChild(msgbox);
                    gui.print("升级成功！");

                    gui.talent.localTransfer.style.display = "none";

                    gui.talent.localTransfer = null;

                    gui.talent.displayLayout();
                } else {
                    msgbox.removeChild(btn);
                    document.getElementById("gui").removeChild(msgbox);
                }
            }

            let back = document.createElement("button");
            back.style = "margin-left: 5vw;color: #08f;background: #fff;border: #08f;border-radius: 3vh;padding: 1.2vh;";
            back.innerHTML = "取消";
            msgbox.appendChild(back);
            back.onclick = () => {
                msgbox.removeChild(back);
                msgbox.removeChild(btn);
                document.getElementById("gui").removeChild(msgbox);
            }
            document.getElementById("gui").appendChild(msgbox);
        },
        equipe: () => {

            let obj = document.createElement("section");
            obj.className = "talent";
            obj.style = `
                                position: fixed;top: 0;left: 0;width: 100vw;height: 100vh;
                                z-index: 10030;
                                background-color: #000;
                                background-image: url('./assets/scene/2.png');
                                background-size: cover;
                                color: #fff;
                                overflow: auto;
                            `
            obj.innerHTML = `
                                <div name="title" style="width: 100vw;padding: 8vh;font-size: 8vh;text-align: center;">技能配置</div>
                            `
            const dom = document.createElement("div");
            dom.innerHTML = "╳";
            dom.style = "position: absolute;right: 5vh;top: 5vh;font-size: 3vh;border: 2px solid #fff;text-align: center;width: 7vh;height: 7vh;";
            obj.appendChild(dom);

            Talents.lists.forEach((e) => {
                let improveText = "装配";
                let isEquiped = false;
                if (Talents.system.equipments.find(y => y.name == e.name) != undefined) {
                    improveText = "卸下";
                    isEquiped = true;
                }
                let desc = e.description()
                const skillUi = document.createElement("div");
                skillUi.style = "background-color: rgb(0,0,0,0.6);color: #fff;width: 100vw;heigth: 18vh;position: relative;border-bottom: 0.3vh solid #fff;padding: 2vh";
                skillUi.innerHTML = `
                                    <h1 style="font-size: 5vh;padding: 2vh 2vh;"><i style="display: inline-block;width: 7vh;height: 7vh;background-image: url('${e.icon}');background-size: 100% 100%;"></i>${e.name}</h1>
                                    <div style="padding: 2vh 8vh;">${desc}</div>
                                    <div style="position: absolute;top: 2vh;right: 5vh;textCalign: center;">
                                        <div style="padding: 0.9vh">lv.${e.level}</div>
                                        <button onclick="gui.talent.learn('${e.name}')" style = "color: #08f;background: #fff;border: #08f;border-radius: 3vh;padding: 1.2vh;">${improveText}</button>
                                    </div>
                                `
                obj.appendChild(skillUi);
            })

            dom.addEventListener('click', () => {
                obj.removeChild(dom);
                document.getElementById("gui").removeChild(obj);
            }, {
                once: true
            })

            document.getElementById("gui").appendChild(obj);
        }
    },
    enemy: {
        updatePercent(name, percent) {
            document.getElementById("enemyName").style.display = "block";
            document.getElementById("enemyName").innerText = name;
            document.getElementById("enemyHp").style.display = "block";
            document.getElementById("enemyHp").style.width = 80 * percent * 0.01 + "vw";

        },
        hiddenStatus: () => {
            document.getElementById("enemyName").style.display = "none";
            document.getElementById("enemyHp").style.display = "none";
        }
    },
    checkTasks: () => {
        const para = Tasks; //传递任务参数

        let obj = document.createElement("section");
        obj.style = `top: 0;left: 0;width: 100vw;height: 100vh;
        position: fixed;`
        obj.style.zIndex = "10019";
        let main = '';
        let world = '';

        Tasks.list.forEach((e) => {
            let template = `
                <div>
                    <h3 style="color: #FFB700">${e.title}</h3>
                    <div style="color: #fff">${e.text}</div>
                </div>
            `
            if (e.type == "main") {
                main += template;
            } else {
                world += template;
            }
        })

        obj.innerHTML = `
            <section style="position: absolute;top: 0;left: 0;;z-index: 10001;height: 100vh;width: 100vw;background-image: url('./assets/backgrounds/img2.jpg');background-position: center center;background-repeat: no-repeat;background-size: cover;background-color: rgb(0,0,0,0.6);filter: blur(3px);"></section>
            
            

            <section style="z-index: 10010;position: absolute;top: 0; left: 0;background: rgb(0,0,0,0.5);width: 100vw;height: 100vh;padding: 3vh;">
            <h1 style='color: #E8E8FF;font-size: 150%;'>任务</h1><br>
            <h2 style='color: #FF1723;font-size: 120%;'>主线任务</h2><br>
            ${main}
            <h2 style='color: #46BBFF;font-size: 120%;'>世界任务</h2><br>
            ${world}
            
            </section>
            
        `
        const dom = document.createElement("div");
        dom.innerHTML = "╳";
        dom.style = "z-index: 10019;position: fixed;top: 3vh; right: 8vh;color: #74E8FF;font-size: 150%;";
        obj.appendChild(dom);

        dom.addEventListener('click', () => {
            obj.removeChild(dom);
            document.getElementById("gui").removeChild(obj);
        }, {
            once: true
        })
        document.getElementById("gui").appendChild(obj);
        console.log("CheckTasks.end")
    },
    death() {
        let obj = document.createElement("section");
        obj.style = `top: 0;left: 0;width: 100vw;height: 100vh;
        position: fixed;`
        obj.style.zIndex = "10029";


        obj.innerHTML = `
        <section style="position: absolute;top: 0;left: 0;;z-index: 10001;height: 100vh;width: 100vw;background-image: url('./assets/backgrounds/img2.jpg');background-position: center center;background-repeat: no-repeat;background-size: cover;background-color: rgb(0,0,0,0.6);filter: blur(3px);"></section>
             <section style="z-index: 10010;position: absolute;top: 0; left: 0;background: rgb(0,0,0,0.5);width: 100vw;height: 100vh;padding: 3vh;">
         
            <div style="font-size: 300%;position: absolute;left: 0;right: 0;top: 16vh;color: #fff;text-align: center;">你与这片时空断开了链接</div>
              </section>
        `
        const dom = document.createElement("div");
        dom.innerHTML = "回溯时空";
        dom.style = "z-index: 10019;position: absolute;bottom: 23vh;left: 0;right: 0;text-align:center;color: #0088ff;font-size: 150%;";
        obj.appendChild(dom);

        dom.addEventListener('click', () => {
            obj.removeChild(dom);
            document.getElementById("gui").removeChild(obj);

        }, {
            once: true
        })
        document.getElementById("gui").appendChild(obj);
    },
    playEnding() {
        let obj = document.createElement("section");
        obj.style = `top: 0;left: 0;width: 100vw;height: 100vh;
        position: fixed;`
        obj.style.zIndex = "10029";


        obj.innerHTML = `
            <section style="position: absolute;top: 0;left: 0;;z-index: 10001;height: 100vh;width: 100vw;background-image: url('./assets/backgrounds/img2.jpg');background-position: center center;background-repeat: no-repeat;background-size: cover;background-color: rgb(0,0,0,0.6);filter: blur(3px);"></section>
             <section id="ending" style="z-index: 10010;position: absolute;top: 100vh; left: 0;background: rgb(0,0,0,0.75);left: 0;right: 0;margin: auto;width: 80vw;height: 10000vh;padding: 3vh;transition: 0.5s;text-align:center;color: #fff;">
             ${ending}
             </section>
        `
        document.getElementById("gui").appendChild(obj);
        let time = 100;
        setInterval(() => {
            time--;
            document.getElementById("ending").style.top = time + "vh";
        }, 300)
    },
    libraryId: 0,
    library() {
        if (gui.libraryId < 7) {
            document.getElementById("library").style.display = "block";
            let data = articles[gui.libraryId];
            document.getElementById("libraryTitle").innerHTML = data.title;
            document.getElementById("libraryContent").innerHTML = data.text;
            gui.libraryId += 1;

            bagSystem.insert("比特", 10);
            bagSystem.insert("城市勋章", 5)
        } else {
          
            playPerformance(task_emit_2,()=>{
              Task_World_Library_1.end();
            //bagSystem.insert("比特", 25);
            document.getElementById("library").style.display = "none";
            })
        }
    }
}