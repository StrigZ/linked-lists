import LinkedList from "./LinkedList.js";

// example uses class syntax - adjust as necessary
const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.prepend("snake");
list.append("turtle");

console.log(list.toString());

console.log(list.insertAt("as", 77));
