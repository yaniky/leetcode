// 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

// '.' 匹配任意单个字符
// '*' 匹配零个或多个前面的那一个元素
// 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

// 说明:

// s 可能为空，且只包含从 a-z 的小写字母。
// p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
// 示例 1:

// 输入:
// s = "aa"
// p = "a"
// 输出: false
// 解释: "a" 无法匹配 "aa" 整个字符串。
// 示例 2:

// 输入:
// s = "aa"
// p = "a*"
// 输出: true
// 解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
// 示例 3:

// 输入:
// s = "ab"
// p = ".*"
// 输出: true
// 解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
// 示例 4:

// 输入:
// s = "aab"
// p = "c*a*b"
// 输出: true
// 解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
// 示例 5:

// 输入:
// s = "mississippi"
// p = "mis*is*p*."
// 输出: false

// 来源：力扣（LeetCode）

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    var dp = [];
    // 空匹配空成功
    dp[0] = [true];
    for (var i = 1; i <= s.length; i++) {
        dp[0].push(false);
    }
    for (var j = 1; j <= p.length; j++) {
        dp[j] = [];
        for (var i = 0; i <= s.length; i++) {
            // 初始化i === 0，用于 i > 0推导，若s取空，p长度取偶数且每个字符后跟着*才能匹配成功，否则失败
            if (i === 0) {
                if (j % 2 !== 0) {
                    dp[j][i] = false;
                } else {
                    for (var m = 1; m < j; m += 2) {
                        if (p[m] !== "*") {
                            dp[j][i] = false;
                            break;
                        }
                    }
                    if (typeof dp[j][i] === "undefined") {
                        dp[j][i] = true;
                    }
                }
            } else {
                // 若s最后一位字符匹配p最后一位字符，则s除最后一位与p除最后一位能匹配则匹配成功
                if (s[i - 1] === p[j - 1] || p[j - 1] === ".") {
                    dp[j][i] = dp[j - 1][i - 1];
                } else if (p[j - 1] !== "*") {
                    // 若最后一位匹配不成功且p最后一位不为*，这匹配失败
                    dp[j][i] = false;
                } else if (!p[j - 2]) {
                    // 若p==="*"匹配失败
                    dp[j][i] = false;
                }else if (s[i - 1] === p[j - 2] || p[j - 2] === ".") {
                    // *前一位字符等于s最后一位字符，可能匹配s最后n个字符或一个字符或0个字符
                    dp[j][i] = dp[j][i - 1] || dp[j - 2][i - 1] || dp[j - 2][i];
                } else {
                    // *前一位字符不等与s最后一位字符，*代表前一个字符取0
                    dp[j][i] = dp[j - 2][i];
                }
            }
        }
    }
    return dp[p.length][s.length];
};
