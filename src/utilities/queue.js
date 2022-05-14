export default class Queue {
    constructor() {
      this.data = [];
    }
  
    enqueue(element) {
      this.data.push(element);
    }
  
    dequeue() {
      return this.data.shift();
    }
  
    peek() {
      return this.data[0];
    }
  
    size() {
      return this.data.length;
    }
  }