'use client'

import DatePickerCalnender from "@/components/ui/DatePicker"
import Spinner from "@/components/ui/spinner"
import { addTask } from "@/services/task.server"
import { startTransition, useActionState, useEffect, useState } from "react"
import dynamic from "next/dynamic";
import TimePicker from "react-multi-date-picker/plugins/time_picker"
import { taskStatus } from "@/lib/helper/taskStatus"
import { ListAdmins } from "@/lib/helper/getAdmins"
import { toast } from "react-toastify"
import { useTranslations } from "next-intl"
const Select = dynamic(() => import('react-select'), { ssr: false });

export const FormAdd = ({ admins } : { admins:any }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<any | null>(null);
    const [endDate, setEndDate] = useState<any | null>(null);
    const [admin, setAdmin] = useState<any | null>(null);
    const adminList = ListAdmins(admins);
    const [state, action, pending] = useActionState(addTask, null);
    const t =  useTranslations('Public');

    useEffect(() => {
        if(state?.message === 'success') {
            toast.success(t('toast_success'))
        } else if (state?.message === 'error') {
            toast.error(t('toast_error'))
        }
    }, [state])

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            title,
            description,
            status,
            time: new Date(endDate).toString(),
            userId: admin?.value
        }
        startTransition(() => action(data))
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="row g-9 mb-8">
                <div className="col-md-3 fv-row">
                    <label htmlFor="basic-url" className="form-label">{t('title')}</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="form-control"
                        placeholder={t('enter_your_text')}
                    />
                </div>
                <div className="col-md-3 fv-row">
                    <label htmlFor="basic-url" className="form-label">{t('status')}</label>
                    <Select 
                        value={status}
                        classNamePrefix={'react-select'}
                        onChange={setStatus}
                        placeholder={t('choose')}
                        options={taskStatus(t)}
                    />
                </div>
                <div className="col-md-3 fv-row">
                    <label htmlFor="basic-url" className="form-label">{t('end_time')}</label>
                    <div className="input-group flex-nowrap">
                        <DatePickerCalnender 
                            format="YYYY/MM/DD HH:mm:ss" 
                            plugins={[
                                <TimePicker position="bottom" />
                            ]} 
                            date={endDate} 
                            setDate={setEndDate} 
                        />
                        <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                            <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                        </span>
                    </div>
                </div>
                <div className="col-md-3 fv-row">
                    <label htmlFor="basic-url" className="form-label">{t('Admin.admin_selection')}</label>
                    <Select 
                        value={admin}
                        classNamePrefix={'react-select'}
                        onChange={setAdmin}
                        placeholder={t('choose')}
                        options={adminList}
                    />
                </div>
                <div className="col-md-12 fv-row">
                    <label htmlFor="floatingTextarea2" className="form-label">{t('description')}</label>
                    <textarea 
                        className="form-control" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder={t('enter_your_text')}
                        id="floatingTextarea2" 
                        style={{ height: "100px" }}></textarea>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary w-150px mt-10" disabled={pending}>{pending ? <Spinner /> : t('info_recording')}</button>
            </div>
        </form>
    )
}