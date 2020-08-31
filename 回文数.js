// 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

// 示例 1:

// 输入: 121
// 输出: true
// 示例 2:

// 输入: -121
// 输出: false
// 解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
// 示例 3:

// 输入: 10
// 输出: false
// 解释: 从右向左读, 为 01 。因此它不是一个回文数。
// 进阶:

// 你能不将整数转为字符串来解决这个问题吗？

// 来源：力扣（LeetCode）

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    // 特俗情况处理，只有大于10且最后一位不为0（不存在010等数字）才存在回文
    if (x < 0) {
        return false;
    }
    if (x < 10) {
        return true;
    }
    if (x % 10 === 0) {
        return false;
    }
    // 取右半部分反转过来
    var rev = 0;
    var revOffset = 1;
    while(x >= revOffset) {
        rev = rev * 10 + (x % 10);
        x = parseInt(x / 10);
        revOffset *= 10;
    } // n/2
    // 反转的后半部分与前半部分比较，注意x长度存在奇数和偶数
    if (x === rev || x === parseInt(rev/10)) {
        return true;
    }
    return false;
};

console.log(isPalindrome(13231))