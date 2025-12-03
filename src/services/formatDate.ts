import moment from "jalali-moment";
import { useLocale } from "next-intl";

export const formatFullDate = (value: string | any) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return year + '-' + month + '-' + day
}
export const dateJalaliFormat = (date: string) => {
    if(!date) return;
    const locale = useLocale();
    const time = new Date(date);
    const year = time.getFullYear()
    const month = (time.getMonth() + 1);
    const day = time.getDate();
    const jalaliMonth = moment(`${year}-${month}-${day}`, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    
    const datePicker = locale === 'fa' ? jalaliMonth : year + "-" + month + '-' + day
    return datePicker
}

export const dateTimeFormat = (date: string) => {
    if(!date) return;
    const locale = useLocale();
    const time = new Date(date);
    const year = time.getFullYear();
    const month = (time.getMonth() + 1);
    const day = time.getDate();
    const hours = time.getHours();   
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const jalaliMonth = moment(`${year}-${month}-${day}`, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    
    const datePicker = locale === 'fa' ? jalaliMonth + " - " + hours + ":" + minutes : year + "-" + month + '-' + day + "-" + hours + ":" + minutes
    return datePicker
}


export const useJalaliFormat = (date: string, locale: string) => {
    if(!date) return ''; 
    const formatter = new Intl.DateTimeFormat(locale === "fa" ? "fa-IR-u-ca-persian" : "en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
    return formatter.format(new Date(date));
}