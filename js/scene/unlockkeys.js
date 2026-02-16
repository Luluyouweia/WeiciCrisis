const UnlockKeys = {
    lists: [{
        question: "I.##23&@3（a-z）。(奖励：2bit,2声望)",
        answer: "wc",
        //后续更改：序列2为城市声望
        award: ["比特", 2,2]
    }, {
        question: "II.Wei26ci12crisis6。(奖励：3bit,3声望)",
        answer: "ZLF",
        award: ["比特", 3,3]
    }, {
        question: "III.以下密文使用凯撒密码加密（每个字母向后偏移4位，例如A偏移4位后为E）。请解密：<h1>lyier</h1>解题提示: 凯撒密码中，解密时需向前偏移4位（如L偏移-4位为H）。所有字母均为小写。(奖励：10bit,5声望)",
        answer: "huean",
        award: ["比特", 10,5]
    }, {
        question: "IV.Comb_Wei26ci12crisis6+lyier_ination。(15bit,5声望)",
        answer: "ZhuLeFan",
        award: ["比特", 15,5]
    }, {
        question: "V.以下密文使用Atbash密码加密（A变成Z、B变成Y、C变成X，依此类推）。请解密：<h1>DVRXR</h1>解题提示: Atbash密码是反向替换（如D对应W，因为A-Z、B-Y、C-X、D-W）。解密后字母组合为拼音形式，如：ZhuLeFan。(30bit,5声望)",
        answer: "WeiCi",
        award: ["比特", 30,5]
    }, {
        question: "VI.以下密文使用栅栏密码加密（2条轨道）。栅栏密码的规则是：将明文按“之”字形写在两条轨道上，先读上轨字母，再读下轨字母。例如，“HELLO”加密为“HLOEL”。请解密：<h1>VcoEgih etrnls</h1>解题提示: 密文已分为两部分（VcoEgih和etrnls），分别对应上轨和下轨字母。解密时需将两轨字母交替拼接（第一个字母上轨、第二个字母下轨，依此类推）。(50bit,10声望,答案结果无空格）",
        answer: "VectorEnglish",
        award: ["比特", 50,10]
    }, {
        question: "VII.以下密文使用凯撒密码加密，但偏移量未知（偏移量范围1-25）。解密后应得到一个常见英文单词（4个字母），其反转形式也符合密码要求：<h1>YNRJ</h1>解题提示: 尝试不同偏移量解密（如偏移-5：Y→T、N→I,J→E）。",
        answer: "TIME",
        ans: "EMIT",
        award: ["比特", 100,15]
    }],
    process: 1,
    ask: () => {
        document.getElementById("unlockKeys").style.display = "block";
        document.getElementById("issue").innerHTML = UnlockKeys.lists[UnlockKeys.process - 1].question;
    },
    confirm: (psd) => {
        if(UnlockKeys.process ==8){
            return false;
        }
        let next = () => {
            UnlockKeys.ask();
            document.getElementById("thatsCorrect").innerHTML = ""
        }
        console.log(psd, UnlockKeys.lists[UnlockKeys.process - 1].answer)
        
        if (psd == UnlockKeys.lists[UnlockKeys.process - 1].answer && UnlockKeys.process != 7) {
            bagSystem.insert("比特", UnlockKeys.lists[UnlockKeys.process - 1].award[1]);
            bagSystem.insert("城市勋章", UnlockKeys.lists[UnlockKeys.process - 1].award[2]);
            
            
            document.getElementById("thatsCorrect").innerHTML = "<b style='color: green;'>正确！已获得奖励！</b>";
            
            
            UnlockKeys.process += 1;
            setTimeout(next, 5000)
        } else if (UnlockKeys.process == 7) {
            if (psd == UnlockKeys.lists[UnlockKeys.process - 1].answer) {
                bagSystem.insert("比特", UnlockKeys.lists[UnlockKeys.process - 1].award[1]);
                bagSystem.insert("城市勋章", UnlockKeys.lists[UnlockKeys.process - 1].award[2]);
                document.getElementById("thatsCorrect").innerHTML = "<b style='color: green;'>正确！已获得奖励！</b>您已完成破译！"
                UnlockKeys.process += 1;
                Task_World_Declassification_1.end();
            } else if (psd == UnlockKeys.lists[UnlockKeys.process - 1].ans) {
                bagSystem.insert("比特", 200);
                bagSystem.insert("城市勋章",100)
                document.getElementById("thatsCorrect").innerHTML = "<b style='color: green;'>正确！恭喜你发现彩蛋并获得额外奖励(+100bit)！</b>您出色地完成了破译！"
                UnlockKeys.process += 1;
                Task_World_Declassification_1.end();
            } else {
                document.getElementById("thatsCorrect").innerHTML = "<b style='color: red;'>错误</b>"
            }
        } else {
            document.getElementById("thatsCorrect").innerHTML = "<b style='color: red;'>错误</b>"
        }
    },
    back: () => {
        document.getElementById("unlockKeys").style.display = "none";
        UnlockKeys.isCheckBtn  = false;
    },
    isCheckBtn : false,
    cityTask_task_unlockpsd: () =>{
        const tskBtn = gui.action("开始破译", () => {
            UnlockKeys.isCheckBtn  = true;
            tskBtn.hidden();
            UnlockKeys.ask();
        })
        let process = 2;
        UnlockKeys.isCheckBtn  = false;
        let t = setInterval(() => {
            if (player.position.x > 150 && player.position.y > 40) {
                if (player.position.x < 250 && player.position.y < 80&&isMusicCity==false) {
                    if (process == 2) {
                        process = 3;
                        playPerformance(task_unlockpsd_1, () => {
                            clearInterval(t);
                            t = setInterval(() => {
                                if (UnlockKeys.isCheckBtn  == true) {
                                    tskBtn.hidden();
                                } else {
                                    tskBtn.active();
                                }
                            }, 500)
                        })
                    } else {
                        tskBtn.active();
                    }
                } else {
                    tskBtn.hidden();
                }
            } else {
                tskBtn.hidden();
            }
        }, 1000)
        playPerformance(task_unlockpsd_1, () => {
            process = 1;

        })
    }

}