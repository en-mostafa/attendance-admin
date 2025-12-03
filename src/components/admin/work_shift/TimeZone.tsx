import moment from "jalali-moment";
import { DateTime } from "luxon";
import { useLocale } from "next-intl";

export const TimeZone = ( date: string, selectedTimezone:string ) => {
    const formatted = DateTime.fromISO(new Date(date).toISOString(), { zone: selectedTimezone })
        .toFormat('yyyy-MM-dd HH:mm:ss');
  
    return formatted.toString();
};

export const localDate = (datetime: string) => {
    const locale = useLocale();
    const m = moment.utc(datetime); 
    const datePart = m.format("YYYY-MM-DD");
    const timePart = m.format("HH:mm:ss");
    const jalaliMonth = moment(datePart, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    const datePicker = locale === 'fa' ? jalaliMonth : datePart;
    return `${datePicker} ${timePart}`
} 

export const localOnlyDate = (datetime: string) => {
    const locale = useLocale();
    const m = moment.utc(datetime); 
    const datePart = m.format("YYYY-MM-DD");
    const jalaliMonth = moment(datePart, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    const datePicker = locale === 'fa' ? jalaliMonth : datePart;
    return datePicker
} 

export const localTime = (datetime: string) => {
    const m = moment.utc(datetime); 
    const timePart = m.format("HH:mm:ss");
    return timePart
} 

export const weekDate = (datetime: string) => {
    const locale = useLocale();
    const week = moment(datetime).locale(locale).format("dddd"); 
    return week
}

