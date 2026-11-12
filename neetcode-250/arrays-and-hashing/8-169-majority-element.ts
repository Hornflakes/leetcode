/** https://leetcode.com/problems/majority-element/
 * 
Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

 

Example 1:

Input: nums = [3,2,3]
Output: 3

Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2

 

Constraints:

    n == nums.length
    1 <= n <= 5 * 104
    -109 <= nums[i] <= 109
    The input is generated such that a majority element will exist in the array.

 
Follow-up: Could you solve the problem in linear time and in O(1) space?
 */
function majorityElement(nums: number[]): number {
    let candidate = 0;
    let count = 0;

    // approach            | time       | extra space | notes
    // --------------------+------------+-------------+----------------------------------
    // Boyer-Moore voting  | O(n)       | O(1)        | follow-up answer <- best
    // Map of counts       | O(n)       | O(n)        | the obvious one
    // sort, take middle   | O(n log n) | O(1)*       | mutates nums
    //
    // * JS sort still uses some temp memory internally
    for (const n of nums) {
        if (count === 0) candidate = n;
        count += n === candidate ? 1 : -1;
    }

    return candidate;
}

function majorityElementProto(nums: number[]): number {
    nums.sort((a, b) => a - b);
    return nums[Math.floor(nums.length / 2)];
}

function majorityElementProtoProto(nums: number[]): number {
    const count = new Map<number, number>();
    const half = nums.length / 2;

    for (const n of nums) {
        const c = (count.get(n) ?? 0) + 1;
        if (c > half) return n;
        count.set(n, c);
    }

    return -1;
}
