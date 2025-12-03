'use client'
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useState } from "react";
const Select = dynamic(() => import('react-select'), { ssr: false });


export const BookStatus = ({ data }: { data: any }) => {
    const t =  useTranslations('Public');
    const [status, setStatus] = useState<any>(
        { value: data?.status, label: data?.status === 'pending' ? t('Status.pending'): data?.status === 'done'? t('Status.confirmed') : t('Status.cancelled')});

    return (
        <div className="card-body pt-0">
            <input type="hidden" name='status' defaultValue={status?.value} />
            <Select
                value={status}
                classNamePrefix={'react-select'}
                onChange={setStatus}
                options={[
                    {value: 'pending', label:t('Status.pending')},
                    {value: 'done', label:t('Status.confirmed')},
                    {value: 'failed', label:t('Status.cancelled')},
                ]}
                placeholder={t('choose')}
            />
            {status?.value === 'failed' && (
                <input 
                    type="text" 
                    name='reject'
                    defaultValue={data?.rejectReason}
                    className="form-control mt-3" 
                    placeholder={t('reason_rejection_enter')}
                />
            )}
        </div>
    )
}