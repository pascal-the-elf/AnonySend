var secure = (async function(){
    var code = "";
    var t = Date.now().toString(36);
    var p = "";
    var ipgeo = await fetch("https://ipapi.co/json/")
        .then(d => d.json());
    if(ipgeo.ip.includes(".")) {
        p += "4";
        var dp = ipgeo.ip.split(".");
        for(var i = 0; i < dp.length; i++) {
            p += parseInt(dp[i]).toString(36).padStart(2, "0");
        }
    } else {
        p += "6";
        var dp = ipgeo.ip.split(":");
        for(var i = 0; i < dp.length; i++) {
            p += parseInt(dp[i], 16).toString(36).padStart(4, "0");
        }
    }
    var plt = parseInt(navigator.platform.toLowerCase().replace(" ", "").replace(".", ""), 36).toString(16);
    var g = parseInt((ipgeo.country + ipgeo.city).replace(" ", "").replace(".", ""), 36).toString(16);
    code = t + "-" + p + "-" + plt + "-" + g;
    return code;
})().then(x => secure = x);

function decode(secure) {
    var result = {};
    var code = secure.split("-");
    result.time = parseInt(code[0], 36);
    result.ip = "";
    if(code[1].substring(0,1) == "4") {
        code[1] = code[1].substring(1);
        while(code[1]) {
            result.ip += parseInt(code[1].substring(0, 2), 36);
            code[1] = code[1].substring(2);
            if(code[1]) result.ip += ".";
        }
    } else {
        code[1] = code[1].substring(1);
        while(code[1]) {
            result.ip += parseInt(code[1].substring(0, 4), 36).toString(16);
            code[1] = code[1].substring(4);
            if(code[1]) result.ip += ":";
        }
    }
    result.platform = parseInt(code[2], 16).toString(36);
    result.location = parseInt(code[3], 16).toString(36);
    result.location = result.location.substring(0, 2) + "-" + result.location.substring(2);
    return result;
}
