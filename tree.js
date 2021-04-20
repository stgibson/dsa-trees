/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    // base case for empty tree
    if (!this.root) {
      return 0;
    }

    const nodeStack = [this.root];
    let sum = 0;
    while (nodeStack.length) {
      const currNode = nodeStack.pop();
      sum += currNode.val;
      for (let child of currNode.children) {
        nodeStack.push(child);
      }
    }
    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    // base case for empty tree
    if (!this.root) {
      return 0;
    }

    const nodeStack = [this.root];
    let count = 0;
    while (nodeStack.length) {
      const currNode = nodeStack.pop();
      if (currNode.val % 2 === 0) {
        count++;
      }
      for (let child of currNode.children) {
        nodeStack.push(child);
      }
    }
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    // base case for empty tree
    if (!this.root) {
      return 0;
    }

    const nodeStack = [this.root];
    let count = 0;
    while (nodeStack.length) {
      const currNode = nodeStack.pop();
      if (currNode.val > lowerBound) {
        count++;
      }
      for (let child of currNode.children) {
        nodeStack.push(child);
      }
    }
    return count;
  }
}

module.exports = { Tree, TreeNode };
