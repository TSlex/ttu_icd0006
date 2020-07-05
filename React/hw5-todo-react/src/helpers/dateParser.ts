import moment from "moment-timezone";


export function dateToString(date: Date | string) {
    return parseTimeZone(date).format("YYYY-MM-DD, H:mm")
}

export function parseTimeZone(date: Date | string) {
    if (typeof date === "string") {
        return moment.tz(date, "UTC")
    } else {
        return moment.tz(date.toISOString(), "UTC")
    }
}

export function changeToUTC(date: Date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()))
}