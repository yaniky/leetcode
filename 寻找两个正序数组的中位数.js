// 给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。

// 请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

// 你可以假设 nums1 和 nums2 不会同时为空。

//  

// 示例 1:

// nums1 = [1, 3]
// nums2 = [2]

// 则中位数是 2.0
// 示例 2:

// nums1 = [1, 2]
// nums2 = [3, 4]

// 则中位数是 (2 + 3)/2 = 2.5


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // 处理特殊情况
    if (nums1.length === 0 && nums2.length === 0) {
        return null;
    }
    // 其中一个[]
    if (nums1.length === 0 || nums2.length === 0) {
        const newNums = nums1.length === 0 ? nums2 : nums1;
        const k = parseInt(newNums.length / 2, 10);
        if (newNums.length % 2 === 0) {
            return (newNums[k - 1] + newNums[k]) / 2;
        } else {
            return newNums[k];
        }
    }


    const k = Math.ceil((nums1.length + nums2.length) / 2);
    let start = 0;
    let end = nums1.length;
    let i;

    while(true) {
        i = parseInt((start + end) / 2, 10);
        if (i >= 0 && i <= nums1.length) {
            if (k - i >= 0 && k - i <= nums2.length) {
                if (i === 0) {
                    if (nums2[k - i - 1] <= nums1[i]) {
                        // 判断奇偶
                        if ((nums1.length + nums2.length) % 2 === 0) {
                            const after = typeof nums2[k - i] !== "undefined" && nums2[k - i] < nums1[i] ? nums2[k - i] : nums1[i];
                            return (nums2[k - i - 1] + after) / 2;
                        } else {
                            return nums2[k - i - 1];
                        }
                    } else {
                        // i 太小
                        start = i + 1;
                    }
                } else if (k - i === 0) {
                    if (nums1[i - 1] <= nums2[k - i]) {
                        // 判断奇偶
                        if ((nums1.length + nums2.length) % 2 === 0) {
                            const after = typeof nums1[i] !== "undefined" && nums1[i] < nums2[k - i] ? nums1[i] : nums2[k - i];
                            return (nums1[i - 1] + after) / 2;
                        } else {
                            return nums1[i - 1];
                        }
                    } else {
                        // i 太大
                        end = i - 1;
                    }
                } else {
                    if ((k - i >= nums2.length || nums1[i - 1] <= nums2[k - i]) && (i >= nums1.length || nums2[k - i - 1] <= nums1[i])) {
                        // nums1[i - 1] 或 nums2[k - i - 1]
                        const before = nums1[i - 1] > nums2[k - i - 1] ? nums1[i - 1] : nums2[k - i - 1];
                        if ((nums1.length + nums2.length) % 2 === 0) {
                            let after;
                            if (i >= nums1.length) {
                                after = nums2[k - i];
                            } else if (k - i >= nums2.length) {
                                after = nums1[i];
                            } else {
                                after = nums1[i] < nums2[k - i] ? nums1[i] : nums2[k - i];
                            }
                            return (before + after) / 2;
                        } else {
                            return before;
                        }
                    } else if (nums1[i - 1] > nums2[k - i]) {
                        // i 太大
                        end = i - 1;
                    } else {
                        // i 太小
                        start = i + 1;
                    }
                }
            } else if (k - i < 0) {
                // i 太大
                end = i - 1;
            } else {
                // i 太小
                start = i + 1;
            }
        } else {
            return null;
        }
    }
};

// console.log(findMedianSortedArrays([1, 3], [2]))
// console.log(findMedianSortedArrays([1, 2], [3, 4]))
// console.log(findMedianSortedArrays([2], []))
// console.log(findMedianSortedArrays([], [2, 3]))
// console.log(findMedianSortedArrays([3], [1,2,4]))
// console.log(findMedianSortedArrays([0,0], [0,0]))
console.log(findMedianSortedArrays([4], [1,2,3]))