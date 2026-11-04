$(function () {
    let islog = false;
    const app = {
        toast(message, type = "success", delay = 4000) {
            const all = ["danger", "primary", "warning", "secondary", "success"];
            const ait = all.includes(type) ? type : "success";
            let $box = $(".app-t");
            if (!$box.length) {
                $box = $(`
                    <div class="app-t bottom-0 start-0 m-md-5 m-3 pf z-max"></div>
                    `).appendTo("body");
            }
            const $t = $(`
    <div class="toast text-bg-${ait} border-0 shadow my-1" style="width: 300px;">
        <div class="d-fxcc jcs">
            <div class="toast-body"></div>
            <button class="btn-close m-auto me-2" data-bs-dismiss="toast"></button>
        </div>
    </div>                
                `).appendTo($box);
            $t.find(".toast-body").html(message);
            const newtoast = new bootstrap.Toast($t[0], delay);
            $t.one("hidden.bs.toast", () => remove());
            newtoast.show();
        }
    };
    function rlog() {
        if (islog) {
            return true;
        }
        app.toast('請先登入會員，才能使用這個功能。 <button class="btn t-c0 border rounded-pill toastlogin" data-bs-dismiss="toast">一鍵登入</button>', "danger");
    }
    function setlog(loggedIn) {
        islog = loggedIn;
        const $logbtn = $(".logbtn");
        if (loggedIn) {
            $logbtn.removeClass("bg-c1").addClass("bg-success").html('<i class="fa-solid fa-user me-1"></i>登出');
            app.toast("登入成功，歡迎回來。", "success");
            $("#user").modal("show");
        } else {
            $logbtn.removeClass("bg-success").addClass("bg-c1").html('<i class="fa-solid fa-user me-1"></i>登入');
            app.toast("您已登出", "secondary");
        }
        $("#aimsg,.aibtnmsg").prop("disabled",!loggedIn);
        if (loggedIn) {
            $("#aimsg").val("");
        }
        $("#aimsg").attr("placeholder",loggedIn?"請輸入訊息":"請先登入會員");
    }
    $(".logbtn").on("click", function () {
        if (islog) {
            setlog(false);
            return;
        }
        setlog(true);
    });
    $(document).on("click", ".toastlogin", function () {
        setlog(true);
    });
    $(window).on("scroll", function () {
        const $h = $(".header");
        const a = this.scrollY > 10;
        const aa = this.scrollY > 500;
        $h
            .toggleClass("a1", a)
            .toggleClass("a2", !a);
        if (aa) {
            $(".top").fadeIn(500);
        } else {
            $(".top").fadeOut(500);
        }
    }).trigger("scroll");
    function r() {
        $(".resveal , .resveal1 , .resveal2 , .resveal21 , .resveal3 , .resveal31 , .resveal01").each(function () {
            const tot = $(this).offset().top;
            const wstwh = $(window).scrollTop() + $(window).height();
            if (tot < wstwh - 40) {
                $(this).addClass("r-show");
            } else {
                $(this).removeClass("r-show");
            }
        });
    }
    $(window).on("scroll load", r);
    function num() {
        const $ns = $(".numbers");
        if ($ns.length === 0) {
            return;
        }
        const tot = $ns.offset().top;
        const wstwh = $(window).scrollTop() + $(window).height();
        if (tot < wstwh - 100) {
            const $num = $ns.find(".num");
            $num.each(function () {
                const $n = $(this);
                const $nd = $n.data("num");
                $({ number: 0 }).animate({ number: $nd }, {
                    duration: 3000,
                    step: function () {
                        $n.text(Math.floor(this.number));
                    },
                    complete: function () {
                        $n.text($nd);
                    }
                });
            });
            $(window).off("scroll load", num);
        }
    }
    $(window).on("scroll load", num);
    $(".shop").on("click",function () {
        if (!rlog()) {
            return;
        }
        $("#buy").modal("show");
    });
    const md = [
        {
            name: "提姆波頓",
            text: "歡迎大家來參覽",
            likes: 524582
        },
    ];
    const $name = $("#name");
    const $text = $("#text");
    const $msgs = $(".msgs");
    function esh(text) {
        return $("<div>").text(text).html();
    }
    function ct(data) {
        const hn = data.name.charAt(0);
        const left = Math.floor(Math.random() * 80) + "%";
        const move = Math.floor(Math.random() * 80) + "px";
        const time = Math.floor(Math.random() * 20) + 5 + "s";
        const $msgbox = $(`
                            <div class="msg pa rounded-4 bg-wt blur card p-3 shadow" style="
                    --left:${left};
                    --move:${move};
                    --time:${time};
                    ">
                    <div class="d-fxcc jcs">
                        <div class="d-fxcc t-c0 shadow rounded-pill bg-gra" style="width: 40px;height: 40px;">
                            ${hn}
                        </div>
                        <div class="px-2">
                            <div class="fw-bolder">${esh(data.name)}</div>
                            <div class="" style="transform: scale(0.8);">剛剛</div>
                        </div>
                    </div>
                    <div class="t-bt fw-bold opacity-75">${esh(data.text)}</div>
                    <div class="d-fxcc jce">
                        <button class="btn border-0 t-bt like">
                            <span>${esh(data.likes)}</span>
                            <i class="fa-solid fa-heart"></i>
                        </button>
                    </div>
                </div>
            `);
        $msgs.append($msgbox);
        $msgbox.one("animationend", function () {
            $(this).remove();
        });
    }
    md.forEach(function (message, index) {
        setTimeout(() => {
            ct(message);
        }, index * 700);
    });
    setInterval(() => {
        const ran = md[Math.floor(Math.random() * md.length)];
        ct({
            name: ran.name,
            text: ran.text,
            likes: ran.likes,
        });
    }, 1000);
    function msg() {
        if (!rlog()) {
            return;
        }
        const name = $name.val().trim();
        const text = $text.val().trim();
        let v = true;
        if (!name) {
            $name.addClass("is-invalid");
            v = false;
        } else {
            $name.removeClass("is-invalid");
        }
        if (!text) {
            $text.addClass("is-invalid");
            v = false;
        } else {
            $text.removeClass("is-invalid");
        }
        if (!v) {
            return;
        }
        const $newmsg = {
            name: name,
            text: text,
            likes: 0
        };
        md.push($newmsg);
        ct($newmsg);
        $name.val("");
        $text.val("");
        $("#msgcard").collapse("hide");
    }
    $(".msgcard").on("click", function () {
        if (!rlog()) {
            return;
        }
        $("#msgcard").collapse("toggle");
    });
    $name.keypress(function (e) {
        if (e.which === 13) {
            $text.focus();
        }
    });
    $text.keypress(function (e) {
        if (e.which === 13) {
            msg();
        }
    });
    $(".msgbtn").on("click", function () {
        msg();
    });
    $msgs.on("click", ".like", function () {
        const $btn = $(this);
        let num = parseInt($btn.find("span").text(), 10);
        if ($btn.hasClass("t-r")) {
            $btn.toggleClass("t-r t-bt");
            num--;
        } else {
            num++;
            $btn.toggleClass("t-r t-bt fa-bounce");
            setTimeout(() => {
                $btn.removeClass("fa-bounce");
            }, 1000);
        }
        $btn.find("span").text(num);
    });

    $(".aibtn").on("click",function () {
       if (!rlog()) {
        return;
       } 
       $(".AI").fadeToggle(500);
    });

    let ac = 0;
    const $cards = $(".card3d");
    const cs = $cards.length;
    function card3d() {
        $cards.each(function () {
            const $card = $(this);
            const card = $card.data("in");
            let o = card - ac;
            if (o < -2) {
                o += cs;
            }
            if (o > 2) {
                o -= cs;
            }
            if (o === 2) {
                $card.css({
                    "transform": " translateX(100%) scale(0.5) rotate(-55deg)",
                    "opacity": "0.3",
                    "z-index": "1",
                });
            }
            else if (o === 1) {
                $card.css({
                    "transform": " translateX(50%) scale(0.7) rotate(-35deg)",
                    "opacity": "0.6",
                    "z-index": "2",
                });
                
            }
            else if (o === 0) {
                $card.css({
                    "transform": " translateX(0%) scale(1) rotate(0deg)",
                    "opacity": "1",
                    "z-index": "5",
                });
                
            }
            else if (o === -1) {
                $card.css({
                    "transform": " translateX(-50%) scale(0.7) rotate(35deg)",
                    "opacity": "0.6",
                    "z-index": "2",
                });
                
            }
            else if (o === -2) {
                
                $card.css({
                    "transform": " translateX(-100%) scale(0.5) rotate(55deg)",
                    "opacity": "0.3",
                    "z-index": "1",
                });
            }
            else {
                
                $card.css({
                    "transform": " translateX(0%) scale(0) rotate(0deg)",
                    "opacity": "0",
                    "z-index": "0",
                });
            }
        });
    }
    card3d();
    $("#btn3dprev").on("click",function () {
        ac=(ac+1)%cs;
        card3d();
    });
    $("#btn3dnext").on("click",function () {
        ac=(ac-1)%cs;
        card3d();
    });
});