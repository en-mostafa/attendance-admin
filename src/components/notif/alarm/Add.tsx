'use client'

import DatePickerCalnender from "@/components/ui/DatePicker";
import { sendAlarmToUsers } from "@/services/notif.server";
import { useTranslations } from "next-intl";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { toast } from "react-toastify";

export const AddAlarm = () => {
    const [time, setTime] = useState<any>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [state, action] = useActionState(sendAlarmToUsers, null);  
    const closeBtnRef = useRef<HTMLButtonElement | null>(null);
    const t = useTranslations('Public');
  
    
    useEffect(() => {
        if(state?.message === 'success') {
        toast.success(t('toast_success'))
        } else if (state?.message === 'error') {
        toast.error(t('toast_error'))
        }
    }, [state])

  const handleSend = async () => {
    const data = {
      title,
      description,
      time: new Date(time).toString(),
      sendType:"notif"
    }
    startTransition(() =>  action(data))
    closeBtnRef.current?.click();
  };

    return (
        <>
        <button
          className="btn btn-sm btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addNotifModal"
        >
          <i className="ki-outline ki-plus fs-2"></i> {t('new_alarm')}
        </button>
        <div
            className="modal fade"
            id="addNotifModal"
            tabIndex={-1}
            aria-labelledby="addNotifModalLabel"
            aria-hidden="true"
        >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title text-white" id="addNotifModalLabel">
                 {t('new_alarm')}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeBtnRef}
              />
            </div>
            <div className="modal-body">
              <div className="row g-4">
                <div className="col-12">
                    <label className="form-label">{t('title')}</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">{t('explanation')}</label>
                    <textarea
                        name="description"
                        className="form-control"
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">{t('send_time')}</label>
                    <div className="input-group flex-nowrap">
                        <DatePickerCalnender 
                            format="YYYY/MM/DD HH:mm:ss" 
                            plugins={[
                                <TimePicker position="bottom" />
                            ]} 
                            date={time} 
                            setDate={setTime} 
                        />
                        <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                            <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                        </span>
                    </div>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-light">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {t('cancellation')}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSend}
                disabled={!title || !description}
              >
                {t('register')}
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}
