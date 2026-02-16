const WeiciEvent = {
    Match: () => {
        document.getElementById("chooseNameBox").style.display = "block";
        randomName.choose('chooseName');
    },
    Weici: {
        score: 0,
        isEnded : false,
        init: () => {

            WeiciEvent.Weici.score = 0;
            WeiciEvent.Weici.update();

            document.getElementById("Weici").style.display = "block";

            let T = 60;
            let t = setInterval(() => {

                document.getElementById("wTime").innerHTML = T;
                --T;
            }, 1000)
            setTimeout(() => {
                clearInterval(t);
                document.getElementById("wBoard").style.left = "0";
                let achievement = "出错了"
                let score = WeiciEvent.Weici.score;
                if (score <= 50) {
                    achievement = "<div style='color: red'>没实力</div>"
                } else if (score <= 70) {
                    achievement = "<div style='color: orange'>适合加卡</div>"
                } else if (score < 95) {
                    achievement = "<div style ='color: green'>有实力</div>"
                } else {
                    achievement = "<div style ='color: #08f'>叹为观止</div>"

                }
                document.getElementById("wBoard").innerHTML = `
                            <div style="padding: 30px;">得分</div>
                            <div style="color: #08f;font-size: 150%;padding: 25px;">${score}</div>
                            <div>获得成就</div>
                            <div style="font-size: 100%;">${achievement}</div>
                            <br/>
                            <div style="color: #08f;border: 1px solid #eee;border-radius: 8px;" onclick="document.getElementById('Weici').style.display='none';document.getElementById('wBoard').style.left='-100%';WeiciEvent.Weici.isEnded= true;">
                            离开
                            </div>
                        `
                WeiciEvent.Weici.score = 0;
               


            }, T * 1000 + 2000)
        },
        data: [
            ["demonstrate", "证明"],
            ["function", "功能"],
            ["test", "测试"],
            ["I hit Weici", "我打维词"],
            ["I hate Weici", "我喜欢维词"],
            ["New Year's Day", "元旦"],
            ["dumplings", "饺子"],
            ["spring", "春"],
            ["miracle", "奇迹"],
            ["modest", "保守的"],
            ["monument", "纪念碑"],
            ["neglect", "忽视"],
            ["mutual", "相互的"],
            ["proportion", "份额；部分"],
            ["pillow", "抱枕"],
            ["sacrifice", "牺牲"],
            ["scan", "扫描"],
            ["regulate", "控制，调节"],
            ["quarrel", "吵架"],
            ["squeeze", "挤压"],
            ["steady", "稳定的"],
            ["temper", "脾气"],
            ["swallow", '吞下'],
            ["thumb", "拇指"],
            ["twist", "使扭动；扭曲；弯折"],
            ["underneath", '在底下'],
            ["rating", "程度，级别"],
            ["raw", "生的，未加工过的"],
            ["hatch", "孵化"],
            ["handkerchief", "纸巾"],
            ["economy", "经济"],
            ["kettle", "烧水壶"],
            ["prohibit", "禁止，阻止"],
            ["profile", "概述"],
            ["humble", "谦虚的"],
            ["essence", "本质"],
            ["envolop", '包裹住'],
            ["valid", "有效的，合理的"],
            ["wax", "蜡像"],
            ["rhythm", "节奏"],
            ["oral", "口头的"],
            ["pause", "暂停"],
            ["mayor", "市长"],
            ["intermediate", "中级的"],
            ["insult", "侮辱"],
            ["helicopter", "牢大的直升机"],
            ["manufacture", "生产制造"],
            ["fragile", "易碎的"],
        ],
        update: () => {
            let ran = Math.floor(Math.random() * WeiciEvent.Weici.data.length);
            document.getElementById("wWord").innerHTML = WeiciEvent.Weici.data[ran][0];
            let order = Math.floor(Math.random() * 3);
            let res = WeiciEvent.Weici.data[ran][1];
            let achieve1 = res == "我喜欢维词(当前废弃此功能)";
            for (let i = 0; i < 3; ++i) {
                let ans = WeiciEvent.Weici.data[Math.floor(Math.random() * WeiciEvent.Weici.data.length)][1];
                if (ans != WeiciEvent.Weici.data[ran][1]) {
                    document.getElementsByClassName("block")[i].innerHTML = ans;
                    document.getElementsByClassName("block")[i].onclick = () => {
                        if (achieve1 == true) WeiciEvent.Achieve(1);
                        document.getElementsByClassName("block")[i].style.color = "red";
                        document.getElementsByClassName("block")[i].style.border = "1px solid red";


                        document.getElementsByClassName("block")[order].style.color = "green";
                        document.getElementsByClassName("block")[order].style.border = "1px solid green";

                        setTimeout(() => {
                            WeiciEvent.Weici.update();
                            document.getElementsByClassName("block")[i].style.color = "#000";
                            document.getElementsByClassName("block")[i].style.border = "1px solid rgb(222,222,222)";

                            WeiciEvent.Weici.score -= 3;
                            document.getElementById("wScore").innerHTML = WeiciEvent.Weici.score;

                            document.getElementsByClassName("block")[order].style.color = "#000";
                            document.getElementsByClassName("block")[order].style.border = "1px solid rgb(222,222,222)";
                        }, 1000)
                    }
                } else {
                    --i;
                }
            }
            document.getElementsByClassName("block")[order].innerHTML = WeiciEvent.Weici.data[ran][1];
            document.getElementsByClassName("block")[order].onclick = () => {
                if (achieve1 == true) WeiciEvent.Achieve(1);
                document.getElementsByClassName("block")[order].style.color = "green";
                document.getElementsByClassName("block")[order].style.border = "1px solid green";
                setTimeout(() => {
                    WeiciEvent.Weici.update();
                    document.getElementsByClassName("block")[order].style.color = "#000";
                    document.getElementsByClassName("block")[order].style.border = "1px solid rgb(222,222,222)";
                    WeiciEvent.Weici.score += 5;
                    document.getElementById("wScore").innerHTML = WeiciEvent.Weici.score;
                }, 1000)
            }
        }
    }

}

const storage = {
    isWeiciEnd: false //是否完成维词打卡任务
}