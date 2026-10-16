/** https://leetcode.com/problems/longest-common-prefix/

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

 

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"

Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.

 

Constraints:

    1 <= strs.length <= 200
    0 <= strs[i].length <= 200
    strs[i] consists of only lowercase English letters if it is non-empty.

 */
function longestCommonPrefix(strs: string[]): string {
    // approach                    | time           | extra space | notes
    // ----------------------------+----------------+-------------+--------------------------------
    // column by column            | O(n·L)         | O(1)        | stops at first mismatch <- best
    // Map of prefix counts        | O(n·L²)        | O(n·L²)     | builds + stores every prefix
    const first = strs[0];

    for (let i = 0; i < first.length; i++) {
        const c = first[i];

        for (const str of strs) {
            // this string is shorter than first OR character at index is NOT identical
            if (i === str.length || str[i] !== c) {
                return first.slice(0, i);
            }
        }
    }

    return first;
}

function longestCommonPrefixProto(strs: string[]): string {
    const prefixesCount = new Map<string, number>();
    let best = '';

    for (const str of strs) {
        let prefix = '';

        for (const c of str) {
            prefix += c;

            const count = (prefixesCount.get(prefix) ?? 0) + 1;
            prefixesCount.set(prefix, count);

            if (count === strs.length && prefix.length > best.length) {
                best = prefix;
            }
        }
    }

    return best;
}
