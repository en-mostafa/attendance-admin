'use client'

import { useState } from 'react';
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/colors/red.css"
import { useRouter } from 'next/navigation';
import DateObject from 'react-date-object';

export const CalenderMonth = ({ id }: { id: string }) => {
    const [value, setValue] = useState<any>(new Date());
    const router = useRouter();

    const handleChange = (val: any) => {
        setValue(val);

        const value = new DateObject({
            date: val,
        }).format("YYYY-MM");
        const englishDate = value.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
        router.push(`/attendance/${id}?date=${englishDate}`)
    }

    return (
        <DatePicker
            value={value}
            onChange={(_val) => handleChange(_val)}
            calendar={persian}
            locale={persian_fa}
            className='custom-calendar'
            onlyMonthPicker
        />
    );
}