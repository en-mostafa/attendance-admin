import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

export const jalali = (date: DateObject) => {
    const value = new DateObject({
        date: date,
    }).format("YYYY-MM-DD");
    const englishDate = value.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
    return englishDate;
};


export const jalaliTime = (date: string) => {
    const value = new DateObject({
        date: date,
        calendar: persian,
        locale: persian_fa,
    }).format("YYYY-MM-DD HH:MM");
    const englishDate = value.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
    return englishDate;
};