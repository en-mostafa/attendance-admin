'use client'

import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import "../../../public/assets/plugins/custom/date-picker/mobile.css"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { useLocale, useTranslations } from "next-intl";

interface Props {
    date: any,
    setDate: (date: any) => void,
    placeholder?: string,
    format?: string,
    plugins?: any,
    multiple?: any
}

export default function DatePickerCalnender({ placeholder, date, setDate, format, plugins, multiple }: Props) {
    const [isMobile, setIsMobile] = useState(false);
    const locale = useLocale();
    const calen = locale === 'fa' ? persian : gregorian;
    const local = locale === 'fa' ? persian_fa : gregorian_en;

    const t = useTranslations("Public");

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <DatePicker
            value={date}
            format={format}
            inputClass="form-control border-end-0 rounded-end-0"
            onChange={setDate}
            containerClassName="w-100"
            mobileLabels={{
                OK: "Accept",
                CANCEL: "Close",
            }}
            className={`date-mobile ${isMobile ? "rmdp-mobile" : ""}`}
            calendar={calen}
            locale={local}
            placeholder={placeholder ?? t('date_selection')}
            plugins={plugins}
            multiple={multiple}
        />
    )
}