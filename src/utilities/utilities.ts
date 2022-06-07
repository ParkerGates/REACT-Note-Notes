const clamp = (num, min, max): number => Math.min(Math.max(num, min), max);

const calcAccuracyScore = (accuracy, datasize): number => { //max:6.6  min:0.3
    let accScore: number = Number((((10 - ((accuracy / datasize) * 10)) / 2) * 1.4 ).toFixed(1));
    
    //Wait till dataset is 10 before slimming calculations
    accScore = datasize < 10 ? 4 : accScore;
    return accScore;
}

const calcTimeScore = (avgTime: number): number => { //max:3.6  1s:0.7  .5s:0.4
    let timeScore: number = Number((avgTime / 1.4).toFixed(1));
    return timeScore;
}

export { clamp, calcAccuracyScore, calcTimeScore }