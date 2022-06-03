export default class TimeQueue {

    static enqueue(arr: number[], next: number): number[] {
      const toAdd = next === 0 ? 5 : next / 10;
      
      arr.push(toAdd);
      if (arr.length > 10) {
        arr.shift();
      }
      return arr
    }


    static timeAverage(arr: number[]): number {
      let total = 0;

      for (let i = 0; i < arr.length; i++) {
        total += arr[i];
      }

      return total / arr.length;
    }
  
  }