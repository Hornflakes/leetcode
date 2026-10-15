/** https://leetcode.com/problems/contains-duplicate/

Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

 

Example 1:

Input: nums = [1,2,3,1]

Output: true

Explanation:

The element 1 occurs at the indices 0 and 3.

Example 2:

Input: nums = [1,2,3,4]

Output: false

Explanation:

All elements are distinct.

Example 3:

Input: nums = [1,1,1,3,3,4,3,2,4,2]

Output: true

 

Constraints:

    1 <= nums.length <= 105
    -109 <= nums[i] <= 109

 */
function containsDuplicate(nums: number[]): boolean {
    const found = new Set<number>();

    for (const num of nums) {
        if (found.has(num)) return true;
        found.add(num);
    }

    return false;
}

function containsDuplicateProto(nums: number[]): boolean {
    // bad: Set is better because its keys are not converted to strings
    //
    // approach              | time       | extra space | early exit
    // ----------------------+------------+-------------+-----------
    // Set + loop            | O(n)       | O(n)        | yes  <- best
    // object + loop         | O(n)       | O(n)        | yes  (string keys, slower)
    // new Set(nums).size    | O(n)       | O(n)        | no   (one-liner)
    // sort + check adjacent | O(n log n) | O(1)*       | yes  (mutates nums)
    //
    // * JS sort still uses some temp memory internally
    const found: Record<number, boolean> = {};

    for (const num of nums) {
        if (found[num]) return true;
        found[num] = true;
    }

    return false;
}
