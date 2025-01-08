import Node from "./Node.js";

export default class LinkedList {
  constructor(linkedList = {}) {
    this.list = linkedList;
  }

  append(value) {
    if (this.isEmpty) {
      this.list.value = value;
      this.list.next = null;
      return;
    }

    if (this.list.next) {
      this.list.next.append(value);
    } else {
      const newNode = new LinkedList(new Node(value));
      this.list.next = newNode;
    }
  }
  prepend(value) {
    if (this.isEmpty) {
      this.list.value = value;
      this.list.next = null;
      return;
    }

    const clone = { ...this.list };

    this.list.value = value;
    this.list.next = new LinkedList(clone);
  }
  size() {
    if (this.list.next === null) {
      return 1;
    }
    return 1 + this.list.next.size();
  }
  head() {
    return this.list;
  }
  tail() {
    if (this.list.next === null) {
      return this.list;
    }
    return this.list.next.tail();
  }
  at(index) {
    if (index === 0) {
      return this.list;
    }
    return this.list.next.at(index - 1);
  }
  pop() {
    if (this.list.next.list.next === null) {
      this.list.next = null;
      return;
    }
    return this.list.next.pop();
  }
  contains(value) {
    if (this.list.value === value) {
      return true;
    }
    if (this.list.next === null) {
      return false;
    }
    return this.list.next.contains(value);
  }
  find(value) {
    if (this.list.value === value) {
      return 1;
    }
    if (this.list.next === null) {
      return null;
    }

    return 1 + this.list.next.find(value);
  }
  toString() {
    if (!this.list.next) {
      return this.list.value;
    }
    return this.list.value + " -> " + this.list.next.toString();
  }
  insertAt(value, index) {
    const targetNode = this.at(index);
    const prevToTargetNode = this.at(index - 1);
    const nextNodes = { ...targetNode };

    prevToTargetNode.next = new LinkedList(new Node(value));
    prevToTargetNode.next.list.next = new LinkedList(nextNodes);
  }
  removeAt(index) {
    const prevToTargetNode = this.at(index - 1);
    const targetNode = this.at(index);
    const nextNodes = { ...targetNode.next.list };

    prevToTargetNode.next = new LinkedList(nextNodes);
  }

  get isEmpty() {
    return Object.keys(this.list).length === 0;
  }
}
