let positions = []
document.getElementById("land").onclick = (e) => {
    
    const dom = document.getElementById("land");
    const tree = new Object2d();
    tree.img = "./assets/img/tree1.png";
    tree.size = vec2(10,10)
    let p = handleEvent(dom,e)
    tree.position = vec2(p.x, p.y);
    
    scene.add(tree);
    tree.dom.style.background = "#08f";
    positions.push(vec2(p.x,p.y))
    
    
    scene.render();
}

function handleEvent(ele,event) {
  // 获取触发事件的元素
  const element = ele;
  // 获取元素的位置和尺寸信息
  const rect = element.getBoundingClientRect();
  
  // 计算相对于元素左上角的坐标（像素）
  const xPixel = event.clientX - rect.left;
  const yPixel = event.clientY - rect.top;
  
  // 获取视口尺寸
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  
  // 转换为视口单位
  const xVW = (xPixel / viewportWidth) * 100;   // 水平用vw
  const yVH = (yPixel / viewportHeight) * 100;  // 垂直用vh
  
  return {x:xVW.toFixed(2),y:yVH.toFixed(2)}
}

// 示例：绑定点击事件
//document.querySelector('.your-element').addEventListener('click', handleEvent);