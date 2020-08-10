// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

// 示例 1：

// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。
// 示例 2：

// 输入: "cbbd"
// 输出: "bb"


// Manacher算法
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    // 处理奇偶问题
    const newS = [];
    for (var i = 0; i < s.length; i++) {
        newS.push("#");
        newS.push(s[i]);
    }
    newS.push("#");

    const p = [];
    let maxRightCenter = -1;
    // 记录最大回文中心index
    let result = -1;
    // 初始化p
    for (var i = 0; i < newS.length; i++) {
        p[i] = 0;
    }

    newS.forEach((item, index) => {
        if (maxRightCenter !== -1 && (maxRightCenter + p[maxRightCenter]) >= index) {
            if ((2 * maxRightCenter - index - p[2 * maxRightCenter - index]) === maxRightCenter - p[maxRightCenter]) {
                // 镜像回文左边界等于父回文左边界，以此长度继续扩散
                p[index] = p[2 * maxRightCenter - index];
                while(true) {
                    if (index - p[index] - 1 >= 0 && newS[index + p[index] + 1] === newS[index - p[index] - 1]) {
                        p[index]++;
                    } else {
                        break;
                    }
                }
            } else if ((2 * maxRightCenter - index - p[2 * maxRightCenter - index]) > maxRightCenter - p[maxRightCenter]) {
                // 镜像回文左边界大于父回文左边界，长度等于镜像回文
                p[index] = p[2 * maxRightCenter - index];
            } else {
                // 镜像回文左边界小于父回文左边界
                p[index] = p[maxRightCenter] + maxRightCenter - index;
            }
        } else {
            // 不在臂长范围内，扩散
            while(true) {
                if (index - p[index] - 1 >= 0 && newS[index + p[index] + 1] === newS[index - p[index] - 1]) {
                    p[index]++;
                } else {
                    break;
                }
            }
        }
        // 记录最长结果
        // p数组，最大值为最长回文子串长度
        if (result === -1 || p[index] > p[result]) {
            result = index;
        }
    });
    // 获取字符串
    let substr = "";
    for (var i = result - p[result]; i <= result + p[result]; i++) {
        if (newS[i] !== "#") {
            substr += newS[i];
        }
    }

    return substr;
};

console.log(`bab ==> ${longestPalindrome("babad")}`)
console.log(`bb ==> ${longestPalindrome("cbbd")}`)