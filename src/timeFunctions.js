export const getElapsedTime = then => {
    const now = new Date().getTime();
    const difference = now - then;
    let seconds = difference / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;

    minutes = Math.floor(minutes);
    hours = Math.floor(hours);
    days = Math.floor(days);

    if (days) {
        let word;
        if (days === 1) word = 'dzień';
        else word = 'dni';
        return `${days} ${word} temu`;
    } else if (hours) {
        let word;
        if (hours === 1) word = 'godzinę';
        else if (hours < 5) word = 'godziny';
        else word = 'godzin';
        return `${hours} ${word} temu`;
    } else if (minutes) {
        let word;
        if (minutes === 1) word = 'minutę';
        else if (minutes < 5) word = 'minuty';
        else word = 'minut';
        return `${minutes} ${word} temu`;
    } else return `Przed chwilą`;
};
