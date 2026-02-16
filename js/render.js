function vec2(x, y) {
    return {
        x,
        y
    }
}
class Render {
    constructor() {

    }
    render(id) {}
}
class Object2d {
    constructor() {
        this.img = null;
        this.position = vec2(0, 0);
        this.size = vec2(0, 0);
        this.z = 0;
        this.dynamic = false;
        this.children = [];
        this.parent = null;
        this.template = "<div class='obj2d'></div>";

        this.isScene = false;
        this.SceneElement = null;

        this.dom = document.createElement("div");
        this.dom.className = "obj2d";
        this.isRendered = false;
    }
    add(obj) {
        this.children.push(obj);
        obj.parent = this;
        return obj;
    }
    Position() {
        if (this.dom) {
            this.dom.style.top = `${this.position.y}vh`;
            this.dom.style.left = `${this.position.x}vh`;
        }
        return true;
    }
    render() {
        //this.children
        this.children.sort((a, b) => {
            return a.position.y - b.position.y;
        })
        this.children.forEach((e, i) => {
            e.render();
        })

        if (this.dynamic == true) {
            this.style += `transform: translate3d(0,0,0)`
        }

        if (this.isScene == false) {
            this.dom.style.backgroundSize = "100% 100%";
            this.dom.style.backgroundImage = `url("${this.img}")`; // 注意 URL 的引号

            this.dom.style.top = `${this.position.y}vh`;
            this.dom.style.left = `${this.position.x}vh`;
            this.dom.style.width = `${this.size.x}vh`;
            this.dom.style.height = `${this.size.y}vh`;
            this.parent.dom.appendChild(this.dom);
            this.dom.style.position = "absolute";

        } else if (this.isRendered == false) {
            this.isRendered = true;
            this.SceneElement.appendChild(this.dom);
            this.SceneElement.style.position = "absolute";
        }

    }
    save() {
        return this;
    }
    dispose() {
        this.children = [];
        if (this.isScene == true) {
            this.dom.innerHTML = ``;
        }else{
            this.dom.style.display = "none";
            //this.dom.style = '';
        }
        
    }
    loadMap(Map) {
        this.children = Map.children;
    }
}

class Camera {
    constructor() {
        this.position = vec2(0, 0);
        this.parent = null;
    }
    transfer(x, y) {
        this.position = vec2(x, y);
        //this.parent.style.transform = `translate3d(${-x}vh,${-y}vh,0)`;
        this.parent.style.top = `${-y}vh`;
        this.parent.style.left = `${-x}vh`;

    }
}

class ObjectGroups {
    constructor() {
        this.sets = [];
    }
    add(obj) {
        this.sets.push(obj);
    }
    render() {
        this.sets.forEach((e) => render());
    }
}

function pubbleSort(arr) {
    for (let i = 0; i < arr.length; ++i) {
        for (let v = 0; v < arr.length; ++v) {
            if (arr[v - 1] > arr[v]) {
                let temp = arr[v - 1];
                arr[v - 1] = arr[v];
                arr[v] = temp;
            }
        }
    }
    return arr;
}