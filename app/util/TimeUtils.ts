export const secondsLeftUntilNextDay = ():number => {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var secondsUntilEndOfDate = 86400 - (h*60*60) - (m*60) - s;
    return secondsUntilEndOfDate;
}