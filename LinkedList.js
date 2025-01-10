import Node from "./Node.js";

export default class LinkedList {
  constructor(headNode = {}) {
    this.headNode = headNode;
  }

  isEmpty() {
    return Object.keys(this.headNode).length === 0;
  }
  append(value) {
    if (this.isEmpty()) {
      this.headNode = new Node(value);
      return;
    }

    let pointer = this.headNode;
    while (pointer.next !== null) {
      pointer = pointer.next;
    }
    pointer.next = new Node(value);
  }
  prepend(value) {
    if (this.isEmpty()) {
      this.headNode = new Node(value);
      return;
    }

    this.headNode = new Node(value, this.headNode);
  }
  size() {
    if (this.isEmpty()) {
      return 0;
    }

    let size = 1;
    let pointer = this.headNode;
    while (pointer.next !== null) {
      size++;
      pointer = pointer.next;
    }
    return size;
  }
  head() {
    return this.headNode;
  }
  tail() {
    if (this.isEmpty()) {
      return {};
    }

    let pointer = this.headNode;
    while (pointer.next !== null) {
      pointer = pointer.next;
    }
    return pointer;
  }
  at(index) {
    this._validateIndex(index);
    let pointer = this.headNode;

    while (pointer.next !== null && index > 0) {
      index--;
      pointer = pointer.next;
    }
    return pointer;
  }
  pop() {
    if (this.size() === 0) {
      return;
    }
    if (this.size() === 1) {
      this.headNode = {};
      return;
    }

    let pointer = this.headNode;
    while (pointer.next.next !== null) {
      pointer = pointer.next;
    }
    pointer.next = null;
  }
  contains(value) {
    if (this.isEmpty()) {
      return false;
    }

    let pointer = this.headNode;
    let hasValue = pointer.value === value;
    while (pointer.next !== null && !hasValue) {
      pointer = pointer.next;
      if (pointer.value === value) {
        hasValue = true;
      }
    }
    return hasValue;
  }
  findIndex(value) {
    if (this.isEmpty()) {
      return null;
    }

    let pointer = this.headNode;
    let count = 0;
    let hasFoundValue = pointer.value === value;
    while (pointer.next !== null && !hasFoundValue) {
      pointer = pointer.next;
      hasFoundValue = pointer.value === value;
      count++;
    }
    return hasFoundValue ? count : null;
  }
  find(callback) {
    if (this.isEmpty()) {
      return null;
    }

    let pointer = this.headNode;
    let hasFoundValue = callback(this.headNode);
    while (pointer.next !== null && !hasFoundValue) {
      pointer = pointer.next;
      hasFoundValue = callback(this.headNode);
    }
    return hasFoundValue ? pointer : null;
  }
  toString() {
    if (this.isEmpty()) {
      return null;
    }

    let pointer = this.headNode;
    let returnString = "";
    while (pointer !== null) {
      returnString += `${pointer.value}${pointer.next !== null ? " -> " : ""}`;
      pointer = pointer.next;
    }
    return returnString;
  }
  updateAt(value, index) {
    this._validateIndex(index);
    let pointer = this.headNode;
    while (pointer.next !== null && index > 0) {
      index--;
      pointer = pointer.next;
    }
    pointer.value = value;
  }
  insertAt(value, index) {
    if (this.isEmpty || index === 0) {
      this.prepend(value);
      return;
    }
    this._validateIndex(index);

    let pointer = this.headNode;
    let nodeBeforeTarget = null;
    while (pointer.next !== null && index > 0) {
      if (index - 1 === 0) {
        nodeBeforeTarget = pointer;
      }
      index--;
      pointer = pointer.next;
    }
    nodeBeforeTarget.next = new Node(value, pointer);
  }
  removeAt(index) {
    this._validateIndex(index);
    if (index === 0 && this.headNode.next === null) {
      this.clear();
      return;
    }

    let pointer = this.headNode;
    let nodeBeforeTarget = null;
    while (pointer.next !== null && index > 0) {
      if (index - 1 === 0) {
        nodeBeforeTarget = pointer;
      }
      index--;
      pointer = pointer.next;
    }

    if (nodeBeforeTarget === null) {
      this.headNode = this.headNode.next;
    } else {
      nodeBeforeTarget.next = pointer.next;
    }
  }
  values() {
    if (this.isEmpty()) {
      return [];
    }

    let pointer = this.headNode;
    const values = [];
    while (pointer !== null) {
      values.push(pointer.value);
      pointer = pointer.next;
    }
    return values;
  }
  clear() {
    this.headNode = {};
  }

  _validateIndex(index) {
    if (index < 0) {
      throw new Error("Index can't be negative");
    }
    if (index > this.size() - 1) {
      throw new Error("Index is out of range");
    }
    if (typeof index !== "number") {
      throw new Error("Index must be a number");
    }
  }
}
