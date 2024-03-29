export default class TimeQueue {

    static enqueue(arr: number[], next: number): number[] {
      //timer stops and equals 0 after 5 seconds
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

      return Number((total / arr.length).toFixed(1))
    }
  
  }