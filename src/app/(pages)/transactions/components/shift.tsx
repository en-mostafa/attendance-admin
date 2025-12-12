'use client'

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ListShift } from '../../employe-add/components/list-shift';

const Select = dynamic(() => import('react-select'), { ssr: false });

export const Shift = ({
    shifts,
    shiftId
}: {
    shifts: any,
    shiftId: number
}) => {
    const selectedShift = shifts.find((s: any) => s.id === shiftId)
    const [shift, setShift] = useState<any>({ label: selectedShift?.name, value: selectedShift?.id });

    return (
        <>
            <Select
                value={shift}
                onChange={setShift}
                classNamePrefix={'react-select'}
                className='w-100'
                placeholder="انتخاب کنید"
                options={ListShift(shifts)}
            />
            <input type="hidden" name="shiftId" defaultValue={shift?.value} />
        </>
    )
}