; (function () {
    var createStyle = function () {
        return ".gameLoading{position:absolute;margin:-30px -60px;padding:0;top:50%;left:50%}" + //
            ".gameLoading ul{margin:0;padding:0;}" + //
            ".gameLoading span{color:#FFF;text-align:center;display:block;}" + //
            ".gameLoading li{list-style:none;float:left;border-radius:15px;width:15px;height:15px;background:#FFF;margin:5px 0 0 10px}" + //
            ".gameLoading li .ball,.gameLoading li .unball{background-color:#2187e7;background-image:-moz-linear-gradient(90deg,#2187e7 25%,#a0eaff);background-image:-webkit-linear-gradient(90deg,#2187e7 25%,#a0eaff);width:15px;height:15px;border-radius:50px}" + //
            ".gameLoading li .ball{transform:scale(0);-moz-transform:scale(0);-webkit-transform:scale(0);animation:showDot 1s linear forwards;-moz-animation:showDot 1s linear forwards;-webkit-animation:showDot 1s linear forwards}" + //
            ".gameLoading li .unball{transform:scale(1);-moz-transform:scale(1);-webkit-transform:scale(1);animation:hideDot 1s linear forwards;-moz-animation:hideDot 1s linear forwards;-webkit-animation:hideDot 1s linear forwards}" + //
            "@keyframes showDot{0%{transform:scale(0,0)}100%{transform:scale(1,1)}}" + //
            "@-moz-keyframes showDot{0%{-moz-transform:scale(0,0)}100%{-moz-transform:scale(1,1)}}" + //
            "@-webkit-keyframes showDot{0%{-webkit-transform:scale(0,0)}100%{-webkit-transform:scale(1,1)}}" + //
            "@keyframes hideDot{0%{transform:scale(1,1)}100%{transform:scale(0,0)}}" + //
            "@-moz-keyframes hideDot{0%{-moz-transform:scale(1,1)}100%{-moz-transform:scale(0,0)}}" + //
            "@-webkit-keyframes hideDot{0%{-webkit-transform:scale(1,1)}100%{-webkit-transform:scale(0,0)}}";
    };
    var createDom = function (id, num) {
        id = id || "gameLoading";
        num = num || 6;
        var i, item;
        var div = document.createElement("div");
        div.className = "gameLoading";
        div.id = id;
        var bar = document.createElement("ul");
        var list = [];
        for (i = 0; i < num; i++) {
            item = document.createElement("li");
            list.push({ ball: document.createElement("div"), halo: null });
            item.appendChild(list[list.length - 1].ball);
            bar.appendChild(item);
        }
        var span = document.createElement("span");
        span.innerHTML = "游戏初始化中...";
        div.appendChild(bar);
        div.appendChild(span);
        document.body.appendChild(div);
        return list;
    };
    var startAnimation = function (list, callback) {
        var index = 0;
        var direction = true;
        var time = 300;
        var animation = function () {
            var div = document.getElementById("gameLoading");
            if (div && div.parentElement) {
                window.setTimeout(function () {
                    if (callback && !callback()) {
                        return;
                    }
                    var item = list[index];
                    if (direction) {
                        item.ball.className = "ball";
                    }
                    else {
                        item.ball.className = "unball";
                    }
                    index++;
                    if (index >= list.length) {
                        direction = !direction;
                        index = 0;
                        time = 500;
                    }
                    else {
                        time = 300;
                    }
                    animation();
                }, time);
            }
        };
        animation();
    };
    (function () {
        if (typeof wx !== "undefined") {
        }
        else {
            // var bgColor = document.body.style.background;
            // document.body.style.background = "#000";
            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = createStyle();
            document.head.appendChild(style);
            var list = createDom();
            startAnimation(list, function () {
                var div = document.getElementById("gameLoading");
                // if (!div) {
                //     document.body.style.background = bgColor;
                // }
                return !!div;
            });
        }
    })();
})();
