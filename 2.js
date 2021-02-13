const tests = require('./test')

// NB: I prefer using built-in array instead of self-written linked list, but that's the task condition
// NB: I think that better way is to convert lists to the strings, then to BitInts, but I must have some code to show

// Also it can be written in functional style without mutating any data (recreating each item and each list at any changes), but whatever

class ListItem {
  constructor(n) {
    this._n = n;
    this._next = null;
  }

  value() {
    return this._n;
  }

  next() {
    return this._next;
  }

  setNext(item) {
    this._next = item;
  }

  setValue(value) {
    this._n = value;
  }
}

class List {
  constructor() {
    this._head = null;
  }

  head() {
    return this._head;
  }

  prepend(item) {
    item.setNext(this._head);
    this._head = item;
  }

  static fromArray(arr) {
    const list = new List();
    arr.forEach(n => {
      list.prepend(new ListItem(n));
    });
    return list;
  }

  static fromString(str) {
    return List.fromArray(str.split('').map(chr => +chr));
  }

  _toArrayAsIs() {
    let result = [];
    let cur = this._head;
    while (cur) {
      result.push(cur.value());
      cur = cur.next();
    }
    return result;
  }

  toArray() {
    return this._toArrayAsIs().reverse();
  }

  toString() {
    return this.toArray().join('');
  }

  show() {
    return this._toArrayAsIs().join(' -> ');
  }
}

function addWithCarry(v1, v2) {
  const resValue = v1 + v2;
  if (resValue >= 10) {
    return [resValue - 10, 1];
  } else {
    return [resValue, 0];
  }
}

function addValueToItems(item, value) {
  let resItems = null;
  let resItemsTail = null;
  let valueToAdd = value;
  let carry = 0;
  let cur = item;
  while (cur) {
    let newValue;
    [newValue, carry] = addWithCarry(cur.value(), valueToAdd + carry);
    const newResItem = new ListItem(newValue);
    if (!resItems) {
      resItems = newResItem;
    } else {
      resItemsTail.setNext(newResItem);
    }
    resItemsTail = newResItem;
    cur = cur.next();
    valueToAdd = 0;
    if (!carry) {
      break;
    }
  }
  if (carry) {
    resItemsTail.setNext(new ListItem(carry));
  } else {
    resItemsTail.setNext(cur)
  }
  return resItems;
}

function addTwo(l1, l2) {
  const resultList = new List();
  let lastResultItem = null;

  function addResultItem(item) {
    if (lastResultItem) {
      lastResultItem.setNext(item);
    } else {
      resultList.prepend(item);
    }
    lastResultItem = item;
  }

  let cur1 = l1.head();
  let cur2 = l2.head();
  let carry = 0;
  while (cur1 && cur2) {
    let newValue = cur1.value() + cur2.value() + carry;
    if (newValue >= 10) {
      carry = 1;
      newValue = newValue - 10;
    } else {
      carry = 0;
    }
    const newItem = new ListItem(newValue);
    addResultItem(newItem);
    cur1 = cur1.next();
    cur2 = cur2.next();
  }
  const leftoverList = cur1 || cur2;
  if (leftoverList) {
    addResultItem(addValueToItems(leftoverList, carry));
  } else {
    if (carry) {
      addResultItem(new ListItem(carry));
    }
  }
  return resultList;
}

function add(lists) {
  let res = null;
  lists.forEach(list => {
    if (!res) {
      res = list;
    } else {
      res = addTwo(res, list);
    }
  });
  return res;
}



/*const TESTS = [
  [[
    List.fromString('12'),
    List.fromString('34'),
    List.fromString('999990000000000000000'),
  ], ],
];*/

console.log(add([
  List.fromString('12'),
  List.fromString('34'),
  List.fromString('999990000000000000000'),
]).toString());
console.log(add([
  List.fromString('999'),
  List.fromString('999'),
  List.fromString('9999'),
  List.fromString('2'),
  List.fromString('1'),
]).toString());
console.log(add([
  List.fromString('0'),
  List.fromString('0'),
]).toString());
