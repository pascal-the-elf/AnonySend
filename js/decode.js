function decode(secure) {
    var result = {};
    var code = secure.split("-");
    result.time = parseInt(code[0], 36);
    result.ip = "";
    while(code[1]) {
        result.ip += parseInt(code[1].substring(0, 2), 36);
        code[1] = code[1].substring(2);
        if(code[1]) result.ip += ".";
    }
    result.platform = parseInt(code[2], 16).toString(36);
    result.location = parseInt(code[3], 16).toString(36);
    result.location = result.location.substring(0, 2) + "-" + result.location.substring(2);
    return result;
}
