import { timingSafeEqual } from 'crypto';
import { useEffect, useState } from 'react';
import useTimer from 'easytimer-react-hook';

export default function Home() {
    const [timer, isTargetAchived] = useTimer({precision: "secondTenths", updateWhenTargetAchieved: true});

    function startTimer() {
        timer.start({
            startValues: [0,0,0,0,0],
            target: {seconds: 5},
            precision: 'secondTenths',
        });
    }


    function stopTimer() {
        let times = {...timer.getTotalTimeValues()};
        timer.stop()
        console.log(times, isTargetAchived);
    }

    return(
        <div>
            <h1>Welcome Home</h1>

            <button onClick={()=>{startTimer()}}>Start</button>
            <button onClick={()=>{stopTimer()}}>Stop</button>
            <br />
            <h2>{timer.getTotalTimeValues().secondTenths}</h2>
        </div>
    );
}