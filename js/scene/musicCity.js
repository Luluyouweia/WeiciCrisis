function SceneLoad_MusicCity() {
    for (let i = 0; i < 25; ++i) {
        const grassLand = new Object2d();
        //grassLand.img = "./assets/img/grassBlock.png";
        grassLand.img = "./assets/materials/floor_2.png";
        grassLand.size = vec2(51, 51);
        grassLand.position = vec2(50 * (i % 5), 50 * Math.floor(i / 5));
        scene.add(grassLand);
    }
   

}/*
console.log("#")
{
    console.log("d")
    let isCheckBtn = false;
    const tskBtn = gui.action("进入音乐庭", () => {
        isCheckBtn = true;
        tskBtn.hidden();
        loadMusicCity();
    })
    let t = setInterval(() => {
        console.log("s")
        if (player.position.x > 500&& player.position.y > 50) {
            if (player.position.x < 550 && player.position.y < 100) {
                if (isCheckBtn == true) {
                    tskBtn.hidden();
                } else {
                    tskBtn.active();
                }
            }
        } else {
            tskBtn.hidden();
        }

    }, 1000)
}*/