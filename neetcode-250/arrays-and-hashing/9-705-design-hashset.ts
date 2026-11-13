/** https://leetcode.com/problems/design-hashset/description/
 * 
Design a HashSet without using any built-in hash table libraries.

Implement MyHashSet class:

    void add(key) Inserts the value key into the HashSet.
    bool contains(key) Returns whether the value key exists in the HashSet or not.
    void remove(key) Removes the value key in the HashSet. If key does not exist in the HashSet, do nothing.

 

Example 1:

Input
["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
[[], [1], [2], [1], [3], [2], [2], [2], [2]]
Output
[null, null, null, true, false, null, true, null, false]

Explanation
MyHashSet myHashSet = new MyHashSet();
myHashSet.add(1);      // set = [1]
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(1); // return True
myHashSet.contains(3); // return False, (not found)
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(2); // return True
myHashSet.remove(2);   // set = [1]
myHashSet.contains(2); // return False, (already removed)

 

Constraints:

    0 <= key <= 106
    At most 104 calls will be made to add, remove, and contains.

 */
class MyHashSet {
    private buckets: number[][] = [];
    private numBuckets: number;
    private size: number;

    constructor() {
        // why prime?
        // keys:  10  20  30  40  50
        // % 10 -> 0   0   0   0   0    all in one bucket
        // % 7  -> 3   6   2   5   1    spread out
        this.numBuckets = 11;
        this.initBuckets();
        this.size = 0;
    }

    private initBuckets(): void {
        this.buckets = [];
        for (let i = 0; i < this.numBuckets; i++) {
            this.buckets.push([]);
        }
    }

    private hash(key: number): number {
        const n = this.numBuckets;
        return ((key % n) + n) % n;
    }

    private bucket(key: number): number[] {
        const h = this.hash(key);
        return this.buckets[h];
    }

    private resize(): void {
        const oldBkts = this.buckets;
        this.numBuckets = this.numBuckets * 2 + 1;

        this.initBuckets();

        for (const bkt of oldBkts) {
            for (const key of bkt) {
                this.bucket(key).push(key);
            }
        }
    }

    // operation | average | worst case | why
    // ----------+---------+------------+------------------------------------------
    // add       | O(1)*   | O(n)       | * amortized: a resize is O(n) but rare
    // remove    | O(1)    | O(n)       | hash -> one small bucket
    // contains  | O(1)    | O(n)       | hash -> one small bucket
    //
    // worst case = every key lands in the same bucket (bad hash / unlucky keys)
    // load factor = size / numBuckets, kept <= 0.75 by growing to 2n + 1

    add(key: number): void {
        const bkt = this.bucket(key);
        if (bkt.includes(key)) return;

        bkt.push(key);
        this.size++;

        if (this.size / this.numBuckets <= 0.75) return;
        this.resize();
    }

    remove(key: number): void {
        const bkt = this.bucket(key);
        const idx = bkt.indexOf(key);
        if (idx === -1) return;

        // avoid splice - the array elements after idx would shift down
        // can avoid because order is irrelevant
        bkt[idx] = bkt[bkt.length - 1]; // overwrite with the last element
        bkt.pop(); // drop the last slot
        this.size--;
    }

    contains(key: number): boolean {
        return this.bucket(key).includes(key);
    }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
