let front = document.getElementById("front");
let main = document.getElementById("main");

/* sleep */

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};



/* scroll to top on refresh */

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

/* Pour savoir quelle "animationend" utiliser selon le navigateur */

function whichAnimationEvent() {
    var t,
        el = document.createElement("fakeelement");

    var animations = {
        "animation": "animationend",
        "OAnimation": "oAnimationEnd",
        "MozAnimation": "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
    };

    for (t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
}

var animationEvent = whichAnimationEvent();


front.addEventListener('wheel', function () {
    front.style.animation = "front-up 1.5s ease forwards";
    b4.style.display = "flex";
    $(this).one(animationEvent,
        function (event) {
            front.style.display = "none";
        });
});


/* base react */

/* direction = 1 : scroll up
   direction = 0 : scroll down
 */

let t = 1;
let zero = 0;
let actual_dist = [0, 1, 2, 3, 4];   //down
let old_dist = [0, 0, 0, 0, 0]; // 1,0,1,2,3 | 2,1,0,1,2 | 3,2,1,0,1 | 4,3,2,1,0 | 0,1,2,3,4

function distance_loop(direction) {
    if (direction === 0 && actual_dist[4] === 0) {
        actual_dist = [0, 1, 2, 3, 4];
        old_dist = [1, 0, 1, 2, 3];
        console.log("Boucle de bas vers haut !");
    } else if (direction === 1 && actual_dist[0] === 0) {
        actual_dist = [4, 3, 2, 1, 0];
        old_dist = [3, 2, 1, 0, 1];
        console.log("Boucle de haut vers bas !");
    }
}

function distance_updater(direction) { // from 2,1,0,1,2

    distance_loop(direction);

    zero = actual_dist.findIndex(element => element === 0);

    if (direction === 1) { //up
        for (let i = 0; i < actual_dist.length; i++) {
            old_dist[i] = actual_dist[i];
            if (i < zero) {
                actual_dist[i]--;
            }
            if (i >= zero) {
                actual_dist[i]++;
            }
        }
    } else if (direction === 0) { //down
        for (let i = 0; i < actual_dist.length; i++) {
            old_dist[i] = actual_dist[i];
            if (i <= zero) {
                actual_dist[i]++;
            }
            if (i > zero) {
                actual_dist[i]--;
            }
        }
    }

}

function distance_smoother() {
    let dif = 0;
    for (let i = 0; i < nav.childElementCount; i++) {
        if (nav.children[i].id[1] !== t) {
            dif = actual_dist[i] - old_dist[i];
            if (dif > 0) {
                switch (actual_dist[i]) {
                    case(1):
                        nav.children[i].style.animation = "out_selected 0.5s ease forwards,distance_1_from_0 0.5s ease forwards";
                        break;
                    case(2):
                        nav.children[i].style.animation = "out_selected 0.5s ease forwards,distance_2_from_1 0.5s ease forwards";
                        break;
                    case(3):
                        nav.children[i].style.animation = "out_selected 0.5s ease forwards,distance_3_from_2 0.5s ease forwards";
                        break;
                    case(4):
                        nav.children[i].style.animation = "out_selected 0.5s ease forwards,distance_4_from_3 0.5s ease forwards";
                        break;
                }
            } else if (dif < 0) {
                switch (actual_dist[i]) {
                    case(1):
                        nav.children[i].style.animation = "out_selected 0.5s ease forwards,distance_1_from_2 0.5s ease forwards";
                        break;
                    case(2):
                        nav.children[i].style.animation = "out_selected 0.5s ease forwards,distance_2_from_3 0.5s ease forwards";
                        break;
                    case(3):
                        nav.children[i].style.animation = "out_selected 0.5s ease forwards,distance_3_from_4 0.5s ease forwards";
                        break;
                    case(4):
                        nav.children[i].style.animation = "out_selected 0.5s ease forwards,distance_4_from_5 0.5s ease forwards";
                        break;
                }
            }
        }
    }
}


/*
function distance_calculator_smoothness() {
    let dist;
    let origin = 0;
    let name = "";
    let current_t;
    for (let i = 0; i < nav.childElementCount; i++) {
        if (nav.children[i].id[1] !== t) {
            origin = parseInt(window.getComputedStyle(document.getElementById(nav.children[i].id)).getPropertyValue("opacity"));
            dist = Math.abs(parseInt(nav.children[i].id[1]) - t);
            switch (dist) {
                case(1):
                    name = "distance_1";
                    keyframe_updater(origin,name);
                    nav.children[i].style.animation = "out_selected 0.5s ease forwards,distance_1 0.5s ease forwards";
                    break;
                case(2):
                    name = "distance_2";
                    keyframe_updater(origin,name);
                    nav.children[i].style.animation = "out_selected 0.5s ease forwards,distance_2 0.5s ease forwards";
                    break;
                case(3):
                    name = "distance_3";
                    keyframe_updater(origin,name);
                    nav.children[i].style.animation = "out_selected 0.5s ease forwards,distance_3 0.5s ease forwards";
                    break;
                case(4):
                    name = "distance_4";
                    keyframe_updater(origin,name);
                    nav.children[i].style.animation = "out_selected 0.5s ease forwards,distance_4 0.5s ease forwards";
                    break;
            }
        }
    }
}

*/
/*keyframe updater*/
/*
function keyframe_updater(origin,name) {
    let
        stylesheet = document.styleSheets[0] // replace 0 with the number of the stylesheet that you want to modify
        // document.styleSheets[0].rules.item(i).cssRules.keyText
        , rules = stylesheet.rules
        , ite = rules.length
        , keyframes
        , keyframe
    ;
    ite = rules.length;
    while (ite--) {
        console.log(ite);
        keyframes = rules.item(ite);
        if ((keyframes.type === keyframes.KEYFRAMES_RULE || keyframes.type === keyframes.WEBKIT_KEYFRAMES_RULE) && keyframes.name === name && keyframes !== null && keyframes !== undefined) {
            console.log("found one !");
            rules = keyframes.cssRules;
            ite = rules.length;
            while (ite--) {
                keyframe = rules.item(ite);
                if ((keyframe.type === keyframe.KEYFRAME_RULE || keyframe.type === keyframe.WEBKIT_KEYFRAME_RULE) && keyframe.keyText === "0%") {
                    console.log("found the animation !");
                    console.log(keyframe.style.opacity+"");
                    keyframe.style.opacity = origin;
                    console.log(keyframe.style.opacity+"");
                    break;
                }
            }
            break;
        }
    }
}
*/


/*wheel*/

main.addEventListener('wheel',function(){
    if (event.deltaY < 0) { //scrolling up
        if(t > 1){
            distance_updater(1);
            //document.getElementById("t" +t).style.animation = "out_selected 0.5s ease forwards";

            t--;

            document.getElementById("t" + t).style.animation = "in_selected 0.5s ease forwards";
            window['b' + t].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        }
        else{
            distance_loop(1);
            //document.getElementById("t" +t).style.animation = "out_selected 0.5s ease forwards";

            t = (nav.childElementCount);

            document.getElementById("t" + t).style.animation = "in_selected 0.5s ease forwards";
            window['b' + t].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        }
    }
    else if (event.deltaY > 0) { //scrolling down
        if(t < main.childElementCount){
            distance_updater(0);
            //document.getElementById("t" +t).style.animation = "out_selected 0.5s ease forwards";

            t++;

            document.getElementById("t" + t).style.animation = "in_selected 0.5s ease forwards";
            window['b' + t].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        }
        else{
            distance_loop(0);
            //document.getElementById("t" +t).style.animation = "out_selected 0.5s ease forwards";

            t -=(t-1);

            document.getElementById("t" + t).style.animation = "in_selected 0.5s ease forwards";
            window['b' + t].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        }
    }
    distance_smoother();
    /*sleep(500).then(() => {
        distance_calculator_v2();
    })*/
});




