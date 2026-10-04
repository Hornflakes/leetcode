/**
https://leetcode.com/problems/maximal-square/description/

Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.

 

Example 1:

Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 4

Example 2:

Input: matrix = [["0","1"],["1","0"]]
Output: 1

Example 3:

Input: matrix = [["0"]]
Output: 0

 

Constraints:

    m == matrix.length
    n == matrix[i].length
    1 <= m, n <= 300
    matrix[i][j] is '0' or '1'.

 */
function maximalSquare(matrix: string[][]): number {
    const m = matrix.length;
    const n = matrix[0].length;
    // side is how big the side of the square a cell is part of is
    // but, calculated while traveling from left to right and top to bottom
    // basically, only the rightmost and bottommost cells know the truth
    const side: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    let best = 0;

    for (let r = 1; r <= m; r++) {
        for (let c = 1; c <= n; c++) {
            if (matrix[r - 1][c - 1] === '1') {
                side[r][c] = 1 + Math.min(side[r - 1][c - 1], side[r - 1][c], side[r][c - 1]);
                best = Math.max(best, side[r][c]);
            }
        }
    }

    return best * best;
}
