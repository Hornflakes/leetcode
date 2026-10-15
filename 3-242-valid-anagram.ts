/** https://leetcode.com/problems/valid-anagram/
 * 
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

 

Example 1:

Input: s = "anagram", t = "nagaram"

Output: true

Example 2:

Input: s = "rat", t = "car"

Output: false

 

Constraints:

    1 <= s.length, t.length <= 5 * 104
    s and t consist of lowercase English letters.

 

Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

 */
function isAnagram(s: string, t: string): boolean {
    if (s.length != t.length) {
        return false;
    }

    // approach          | time       | extra space | notes
    // ------------------+------------+-------------+--------------------------
    // Int32Array(26)    | O(n)       | O(1)        | only a-z  <- best for this problem
    // one Map (+1/-1)   | O(n)       | O(k*)       | any chars
    // two Maps (proto)  | O(n)       | O(k*)       | any chars
    // sort both         | O(n log n) | O(n)        | split() copies the string
    //
    // * k = distinct chars (at most 26 for a-z, so Maps are O(1) as well)

    // a..z, NOT holey because it's typed (raw memory, every slot always holds a number - 0 at first) !!!
    const count = new Int32Array(26);

    for (let i = 0; i < s.length; i++) {
        // 'a' is 97 => a=0 ... z=25
        count[s.charCodeAt(i) - 97]++;
    }

    for (let i = 0; i < t.length; i++) {
        if (--count[t.charCodeAt(i) - 97] < 0) return false;
    }

    return true;
}

function isUnicodeAnagram(s: string, t: string): boolean {
    if (s.length != t.length) {
        return false;
    }

    const count = new Map<string, number>();

    // c = character (unicode too)
    for (const c of s) {
        count.set(c, (count.get(c) ?? 0) + 1);
    }

    for (const c of t) {
        const left = (count.get(c) ?? 0) - 1;
        if (left < 0) {
            return false;
        }
        count.set(c, left);
    }

    return true;
}

function isUnicodeAnagramProto(s: string, t: string): boolean {
    if (s.length != t.length) {
        return false;
    }

    const countS = count(s);
    const countT = count(t);

    for (const [char, count] of countS) {
        if (countT.get(char) != count) {
            return false;
        }
    }
    return true;
}

function count(s: string): Map<string, number> {
    const count = new Map<string, number>();

    for (const c of s) {
        count.set(c, (count.get(c) ?? 0) + 1);
    }

    return count;
}
