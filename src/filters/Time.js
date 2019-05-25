const double = v => parseInt(v, 10) < 10 ? `0${v}` : `${v}`;

export const getSeconds = date => (date.getSeconds()) + (date.getMinutes() * 60) + (date.getHours() * 3600);

export const printSeconds = (value) => {
    if (value === null) return '-';
    let time = value;
    const hours = Math.floor(time / 3600);
    time -= (hours * 3600);
    const minutes = Math.floor(time / 60);
    const seconds = time - (minutes * 60);
    return `${double(hours)}:${double(minutes)}:${double(seconds)}`;
};

// eslint-disable-next-line
export const printDate = date => !(date instanceof Date) ? '-' : `${double(date.getHours())}:${double(date.getMinutes())}:${double(date.getSeconds())}`;

export const timeDiff = ([date1, date2]) => {
    if (date1 === null || date2 === null) return '-';
    return printSeconds(getSeconds(date1) - getSeconds(date2));
};
