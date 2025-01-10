import Node from "./Node.js";

export default class LinkedList {
  constructor(linkedList = {}) {
    this.headNode = linkedList;
  }

  append(value) {
    if (this.isEmpty) {
      this.headNode = new Node(value);
      return;
    }

    if (this.headNode.next !== null) {
      this.headNode.next.append(value);
    } else {
      const newNode = new LinkedList(new Node(value));
      this.headNode.next = newNode;
    }
  }
  prepend(value) {
    if (this.isEmpty) {
      this.headNode = new Node(value);
      return;
    }

    const clone = { ...this.headNode };

    this.headNode.value = value;
    this.headNode.next = new LinkedList(clone);
  }
  size() {
    if (this.isEmpty) {
      return 0;
    }
    if (this.headNode.next === null) {
      return 1;
    }
    return 1 + this.headNode.next.size();
  }
  head() {
    return this.headNode;
  }
  tail() {
    if (this.headNode.next === null) {
      return this.headNode;
    }
    return this.headNode.next.tail();
  }
  at(index) {
    if (index === 0) {
      return this.headNode;
    }
    if (index < 0) {
      throw new Error("Index can't be negative");
    }
    if (this.headNode.next === null) {
      throw new Error("Out of range");
    }
    return this.headNode.next.at(index - 1);
  }
  pop() {
    if (this.size() === 0) {
      throw new Error("List is empty.");
    }
    if (this.size() === 1) {
      this.headNode = {};
      return;
    }
    if (this.headNode.next.headNode.next === null) {
      this.headNode.next = null;
      return;
    }
    return this.headNode.next.pop();
  }
  contains(value) {
    if (this.headNode.value === value) {
      return true;
    }
    if (this.headNode.next === null) {
      return false;
    }
    return this.headNode.next.contains(value);
  }
  findIndex(value) {
    if (this.contains(value)) {
      return this._findIndex(value);
    }

    return null;
  }
  _findIndex(value) {
    if (this.headNode.value === value) {
      return 0;
    }

    return 1 + this.headNode.next.findIndex(value);
  }
  find(callback) {
    /*
    use callback on current head
    
    if callback return true
      return head
    else
      if there is next node
        pass callback to the next node
      else 
      return null
    */
    if (callback(this.headNode)) {
      return this.headNode;
    }
    if (this.headNode.next === null) {
      return null;
    }
    return this.headNode.next.find(callback);
  }
  toString() {
    if (this.isEmpty) {
      return null;
    }
    if (this.headNode.next === null) {
      return this.headNode.value;
    }
    return this.headNode.value + " -> " + this.headNode.next.toString();
  }
  updateAt(value, index) {
    if (index === 0) {
      this.headNode.value = value;
      return;
    }
    return this.headNode.next.updateAt(value, index - 1);
  }
  insertAt(value, index) {
    if (index > this.size()) {
      throw new Error("Out of range");
    }
    const targetNode = this.at(index);
    const prevToTargetNode = this.at(index - 1);
    const nextNodes = { ...targetNode };

    prevToTargetNode.next = new LinkedList(new Node(value));
    prevToTargetNode.next.headNode.next = new LinkedList(nextNodes);
  }
  removeAt(index) {
    if (index > this.size()) {
      throw new Error("Out of range");
    }
    if (index === 0) {
      if (this.headNode.next === null) {
        this.headNode = {};
      } else {
        this.headNode = this.headNode.next.headNode;
      }
    } else {
      const prevToTargetNode = this.at(index - 1);
      const targetNode = this.at(index);
      if (targetNode.next !== null) {
        const nextNodes = { ...targetNode.next };
        prevToTargetNode.next = new LinkedList(nextNodes);
      } else {
        this.pop();
      }
    }
  }

  values() {
    if (this.headNode.next === null) {
      return [this.headNode.value];
    }
    return [this.headNode.value].concat(this.headNode.next.values());
  }

  get isEmpty() {
    return Object.keys(this.headNode).length === 0;
  }
}
