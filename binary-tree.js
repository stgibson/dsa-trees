/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    // base case for empty tree
    if (!this.root) {
      return 0;
    }

    const leftBinaryTree = new BinaryTree(this.root.left);
    const minimumLeft = leftBinaryTree.minDepth();
    
    const rightBinaryTree = new BinaryTree(this.root.right);
    const minimumRight = rightBinaryTree.minDepth();

    return Math.min(minimumLeft + 1, minimumRight + 1);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    // base case for empty tree
    if (!this.root) {
      return 0;
    }

    const leftBinaryTree = new BinaryTree(this.root.left);
    const maximumLeft = leftBinaryTree.maxDepth();
    
    const rightBinaryTree = new BinaryTree(this.root.right);
    const maximumRight = rightBinaryTree.maxDepth();

    return Math.max(maximumLeft + 1, maximumRight + 1);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum(output=null) {
    // base case for empty tree
    if (!this.root) {
      return 0;
    }

    let isMainTree = false;
    if (!output) {
      isMainTree = true;
      output = { maximum: -Infinity };
    }

    const leftBinaryTree = new BinaryTree(this.root.left);
    const sumLeft = leftBinaryTree.maxSum(output);
    
    const rightBinaryTree = new BinaryTree(this.root.right);
    const sumRight = rightBinaryTree.maxSum(output);

    const totalTreeSum = sumLeft + sumRight + this.root.val;
    const leftAndRootSum = sumLeft + this.root.val;
    const rightAndRootSum = sumRight + this.root.val;
    const potentialSums = [
      totalTreeSum,
      leftAndRootSum,
      rightAndRootSum,
      sumLeft,
      sumRight,
      output.maximum
    ];

    if (isMainTree) {
      return Math.max(...potentialSums);
    }

    // keep track of max sum found in subtree, in case it doesn't include root
    output.maximum = Math.max(...potentialSums);

    if (leftAndRootSum === output.maximum) {
      return leftAndRootSum;
    }
    if (rightAndRootSum === output.maximum) {
      return rightAndRootSum;
    }
    // return max of either to explore paths outside of tree
    return Math.max(leftAndRootSum, rightAndRootSum);
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    // base case for empty tree
    if (!this.root) {
      return null;
    }

    const leftBinaryTree = new BinaryTree(this.root.left);
    const nextLargerLeft = leftBinaryTree.nextLarger(lowerBound);
    
    const rightBinaryTree = new BinaryTree(this.root.right);
    const nextLargerRight = rightBinaryTree.nextLarger(lowerBound);

    // case where root is larger than lowerBound
    if (this.root.val > lowerBound) {
      if (nextLargerLeft === null && nextLargerLeft === null) {
        return this.root.val;
      }
      if (nextLargerLeft === null) {
        return Math.min(nextLargerRight, this.root.val);
      }
      if (nextLargerRight === null) {
        return Math.min(nextLargerLeft, this.root.val);
      }
      return Math.min(nextLargerLeft, nextLargerRight, this.root.val);
    }
    // case where root is not larger than lowerBound
    if (nextLargerLeft === null && nextLargerRight === null) {
      return null;
    }
    if (nextLargerLeft === null) {
      return nextLargerRight;
    }
    if (nextLargerRight === null) {
      return nextLargerLeft;
    }
    return Math.min(nextLargerLeft, nextLargerRight);
  }

  /** findDepth(node, currDepth): determine depth of node, return null if not
   * found */

  findDepth(node, currDepth=0) {
    // base case 1: tree is empty
    if (!this.root) {
      return null;
    }
    // base case 2: root is node
    if (node == this.root) {
      return currDepth;
    }

    // normal case
    const leftBinaryTree = new BinaryTree(this.root.left);
    const depthLeft = leftBinaryTree.findDepth(node, currDepth + 1);
    
    const rightBinaryTree = new BinaryTree(this.root.right);
    const depthRight = rightBinaryTree.findDepth(node, currDepth + 1);

    if (!depthLeft && !depthRight) {
      return null;
    }
    if (!depthLeft) {
      return depthRight;
    }
    return depthLeft;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    // first, see if they are siblings by searching for their parent
    const nodeStack = [this.root];
    while (nodeStack.length) {
      const currNode = nodeStack.pop();
      if ((currNode.left == node1 && currNode.right == node2) ||
        (currNode.left == node2 && currNode.right == node1)) {
        return false;
      }
      if (currNode.left) {
        nodeStack.push(currNode.left);
      }
      if (currNode.right) {
        nodeStack.push(currNode.right);
      }
    }

    // find depths of each node
    const node1Depth = this.findDepth(node1);
    const node2Depth = this.findDepth(node2);
    return node1Depth === node2Depth;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    // base case: empty tree
    if (!tree.root) {
      return "[]";
    }

    const nodeArr = [];
    const nodeQueue = [tree.root];
    const depth = tree.maxDepth();
    let maxNumOfNodes = 0;
    for (let i = 0; i < depth; i++) {
      maxNumOfNodes += Math.pow(2, i);
    }
    for (let i = 0; i < maxNumOfNodes; i++) {
      const currNode = nodeQueue.shift();
      // if currNode is null, append null as children
      if (!currNode) {
        nodeArr.push(null);
        nodeQueue.push(null);
        nodeQueue.push(null);
      }
      else {
        nodeArr.push(currNode.val);
        nodeQueue.push(currNode.left);
        nodeQueue.push(currNode.right);
      }
    }
    return JSON.stringify(nodeArr);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const treeArr = JSON.parse(stringTree);

    // base case 1: empty tree
    if (treeArr === []) {
      return new BinaryTree();
    }

    // base case 2: only has root
    const root = new BinaryTreeNode(treeArr.shift());
    const newTree = new BinaryTree(root);
    if (!treeArr.length) {
      return newTree;
    }
    const nodeQueue = [root];
    while (treeArr.length) {
      const currNode = nodeQueue.shift();
      if (!currNode) {
        treeArr.shift();
        treeArr.shift();
      }
      else {
        const leftVal = treeArr.shift();
        if (leftVal) {
          const leftNode = new BinaryTreeNode(leftVal);
          currNode.left = leftNode;
          nodeQueue.push(leftNode);
        }
        else {
          nodeQueue.push(null);
        }
        const rightVal = treeArr.shift();
        if (rightVal) {
          const rightNode = new BinaryTreeNode(rightVal);
          currNode.right = rightNode;
          nodeQueue.push(rightNode);
        }
        else {
          nodeQueue.push(null);
        }
      }
    }
    return newTree;
  }

  find(node) {
    if (!this.root) {
      return false;
    }
    if (this.root === node) {
      return true;
    }
    const leftTree = new BinaryTree(this.root.left);
    const rightTree = new BinaryTree(this.root.right);
    return leftTree.find(node) || rightTree.find(node);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    // base case 1: root is a node
    if (this.root == node1 || this.root == node2) {
      return this.root;
    }

    if ((this.root.left === node1 && this.root.right === node2) ||
      (this.root.left === node1 && this.root.right === node2)) {
      return this.root;
    }

    let leftTree = null;
    if (this.root.left) {
      leftTree = new BinaryTree(this.root.left); 
    }
    let rightTree = null;
    if (this.root.right) {
      rightTree = new BinaryTree(this.root.right);
    }

    if (leftTree && leftTree.find(node1)) {
      if (rightTree && rightTree.find(node2)) {
        return this.root;
      }
      return leftTree.lowestCommonAncestor(node1, node2);
    }
    // otherwise, node1 is in rightTree
    if (leftTree && leftTree.find(node2)) {
      return this.root;
    }
    return rightTree.lowestCommonAncestor(node1, node2);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
