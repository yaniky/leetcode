/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (numRows === 1) {
        return s;
    }

    let xKey = 0;
    let yKey = 0;
    let directY = true;
    let arr = [];

    for (var i = 0; i < numRows; i++) {
        arr[i] = [];
    }
    
    for (var i = 0; i < s.length; i++) {
        arr[yKey][xKey] = s[i];
        if (directY) {
            // 沿纵向向下
            if (yKey < numRows - 1) {
                yKey++;
            } else {
                directY = false;
                yKey--;
                xKey++;
            }
        } else {
            // 斜向上
            if (yKey > 0) {
                yKey--;
                xKey++;
            } else {
                directY = true;
                yKey++;
            }
        }
    }

    
    let result = "";
    for (var i = 0; i < arr.length; i++) {
        result += arr[i].join("");
    }

    return result;
};

console.log("LCIRETOESIIGEDHN" === convert("LEETCODEISHIRING", 3))