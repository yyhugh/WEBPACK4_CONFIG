import "src/styles/index.css";
import "src/styles/home.less";
import "src/fonts/iconfont.css";

export function homeInit()
{
    const r = document.querySelector("#app .r");

    const img = document.createElement("img");

    img.src = require("src/imgs/rocket.svg");

    r.appendChild(img);
}
