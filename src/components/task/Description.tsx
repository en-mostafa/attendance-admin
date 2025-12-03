'use client'

import { useState } from "react"

export const Description = ({ text } : { text:string }) => {
    const [more, setMore] = useState(false);

    return (
        <div className="d-flex justify-content-between gap-4">
            <p className={`text-gray-500 fw-semibold fs-5 mt-1 mb-7 ${!more && 'w-400px text-truncate'}`} style={{ textAlign:"justify" }}>{text}</p>
            {(text.length > 68) && <i className={`ki-outline ki-${ !more ? 'plus' : 'minus'}-square fs-2 mt-1 cursor-pointer`} onClick={() => setMore(!more)}></i>}
        </div>
    )
}