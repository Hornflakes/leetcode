/** https://leetcode.com/problems/concatenation-of-array/

Given an integer array nums of length n, you want to create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n (0-indexed).

Specifically, ans is the concatenation of two nums arrays.

Return the array ans.

 

Example 1:

Input: nums = [1,2,1]
Output: [1,2,1,1,2,1]
Explanation: The array ans is formed as follows:
- ans = [nums[0],nums[1],nums[2],nums[0],nums[1],nums[2]]
- ans = [1,2,1,1,2,1]

Example 2:

Input: nums = [1,3,2,1]
Output: [1,3,2,1,1,3,2,1]
Explanation: The array ans is formed as follows:
- ans = [nums[0],nums[1],nums[2],nums[3],nums[0],nums[1],nums[2],nums[3]]
- ans = [1,3,2,1,1,3,2,1]

 

Constraints:

    n == nums.length
    1 <= n <= 1000
    1 <= nums[i] <= 1000


 */
function getConcatenation(nums: number[]): number[] {
    const n = nums.length;
    // still bad: because the array is still holey, but at least it doesn't resize
    // better: `nums.concat(nums)` or `for (const x of nums) ans.push(x)` * 2
    //
    // 1. concat => packed array, O(2*n)
    // 2?. double push => packed array, O(2*n)
    // 3?. [i] = [i + n] => holey array, O(2*n)
    //
    // BETTER SAID:
    // --------+-----------------------+--------------------------
    //         | no resize             | resizes
    // --------+-----------------------+--------------------------
    // packed  | concat / spread       | [] + push
    // holey   | new Array(2n) + index | [] + not in order writes
    // --------+-----------------------+--------------------------
    //
    // all are O(2*n) !
    const ans = new Array<number>(2 * n);

    for (let i = 0; i < n; i++) {
        ans[i] = ans[i + n] = nums[i];
    }

    return ans;
}

function getConcatenationProto(nums: number[]): number[] {
    const ans: number[] = [];
    const n = nums.length;

    nums.forEach((num, i) => {
        // bad: creates arrays every iteration
        [ans[i], ans[i + n]] = [num, num];
    });

    return ans;
}
