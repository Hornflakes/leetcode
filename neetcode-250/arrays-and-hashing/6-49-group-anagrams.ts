/** https://leetcode.com/problems/group-anagrams/
 * 
Given an array of strings strs, group the anagrams together. You can return the answer in any order.

 

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

    There is no string in strs that can be rearranged to form "bat".
    The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
    The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

Example 2:

Input: strs = [""]

Output: [[""]]

Example 3:

Input: strs = ["a"]

Output: [["a"]]

 

Constraints:

    1 <= strs.length <= 104
    0 <= strs[i].length <= 100
    strs[i] consists of lowercase English letters.

 */
function groupAnagrams(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();

    // approach              | time           | extra space | notes
    // ----------------------+----------------+-------------+--------------------------------------
    // sorted string as key  | O(n · L log L) | O(n·L)      | simple, fast for short strings
    // letter counts as key  | O(n · L)       | O(n·L)      | better big-O, but 26-number key per string
    //
    // n = number of strings, L = max string length
    // space is O(n·L) either way: the groups hold every string
    const count = new Int32Array(26);

    for (const s of strs) {
        count.fill(0); // reset for every string

        for (let i = 0; i < s.length; i++) {
            count[s.charCodeAt(i) - 97]++;
        }

        const key = count.join(); // "1,0,0,0,1,...,1,..." for "eat"/"tea"/"ate"

        const group = groups.get(key);
        if (group) group.push(s);
        else groups.set(key, [s]);
    }

    return [...groups.values()];
}

function groupAnagramsProto(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();

    for (const s of strs) {
        const key = s.split('').sort().join('');
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key)!.push(s);
    }

    return [...groups.values()];
}
