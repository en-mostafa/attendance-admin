'use client'

import { useState } from 'react';
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/colors/red.css"
import { useRouter } from 'next/navigation';
import DateObject from 'react-date-object';
import gregorian from "react-date-object/calendars/gregorian";

export const CalenderYear = ({ id }: { id: string }) => {
    const [value, setValue] = useState<any>(new Date());
    const router = useRouter();

    const handleChange = (val: any) => {
        setValue(val);
        const gregDate = val.convert(gregorian);
        const year: string = gregDate.format("YYYY");
        const englishDate = year.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
        router.push(`/salary/${id}?date=${englishDate}`);
    }

    return (
        <DatePicker
            value={value}
            onChange={(_val) => handleChange(_val)}
            calendar={persian}
            locale={persian_fa}
            inputClass='w-75'
            onlyYearPicker
        />
    );
}