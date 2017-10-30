export const initTimer = (time) => {

    let pastTime = Math.round(time / 1000);
    let seconds = pastTime % 60;

    pastTime = pastTime - seconds;
    pastTime = Math.round(pastTime / 60);
    let minutes = pastTime % 60;

    pastTime = pastTime - minutes;
    pastTime = Math.round(pastTime / 60);
    let hours = pastTime % 60;

    if(seconds < 10){
        seconds = `0${seconds}`;
    }

    if(minutes < 10){
        minutes = `0${minutes}`;
    }

    if(hours < 10){
        hours = `0${hours}`;
    }

    return {seconds: seconds, minutes: minutes, hours: hours}
};
