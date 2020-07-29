// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

// 示例 1:

// 输入: "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:

// 输入: "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:

// 输入: "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // map,方便快速查重 {a: 3, b: 4, c: 2}
    const indexMap = {};

    if (s.length === 0) {
        return 0;
    }

    indexMap[s[0]] = 0;
    let maxLen = 0; // 记录最大长度
    let curLen = 0; // 每次出现重复字符串后，计算不包括重复字符下最大长度
    let startIndex = 0; // 不包括重复字符开始下标

    for (var i = 1; i < s.length; i++) {
        if (typeof indexMap[s[i]] !== "undefined" && indexMap[s[i]] >= startIndex) {
            curLen = i - startIndex;
            if (maxLen < curLen) {
                maxLen = curLen;
            }
            startIndex = indexMap[s[i]] + 1;
        }
        indexMap[s[i]] = i;
    }

    curLen = s.length - startIndex;
    if (maxLen < curLen) {
        maxLen = curLen;
    }
    return maxLen;
};