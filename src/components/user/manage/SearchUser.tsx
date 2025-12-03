'use client'
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import "../../../../public/assets/plugins/custom/date-picker/mobile.css"
import DatePickerCalnender from "@/components/ui/DatePicker";
import { useTranslations } from "next-intl";


export default function SearchUser() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [date, setDate] = useState<null | any>(null);
    const t = useTranslations('Public');


    return (
        <>
            <button type="button" className="btn btn-flex btn-outline btn-color-gray-700 btn-active-color-primary bg-body btn-sm" onClick={() => setShowModal(true)}>
                {t('search')}   
            </button>
            <Modal title={t('search_user')} show={showModal} close={() => setShowModal(false)}>
                <form action="">
                    <div className="modal-body">
                        <div>
                            <label htmlFor="basic-url" className="form-label">{t('name')}</label>
                            <input type="text" className="form-control" placeholder={t('name')} aria-label="Server"/>
                        </div>
                        <div className="my-3">
                            <label htmlFor="basic-url" className="form-label">{t('last_name')}</label>
                            <input type="text" className="form-control" placeholder={t('last_name')} aria-label="Server"/>
                        </div>
                        <div className="my-3">
                            <label htmlFor="basic-url" className="form-label">{t('verify_status')}</label>
                            <select className="form-select" data-placeholder="Select an option" defaultValue={t('choose')}>
                                <option value={t('choose')} disabled hidden>{t('choose')}</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                            </select>
                        </div>

                        <div className="my-3">
                            <label htmlFor="basic-url" className="form-label">{t('last_name')}</label>
                            <div className="input-group flex-nowrap" id="kt_td_picker_simple" data-td-target-input="nearest" data-td-target-toggle="nearest">
                                <DatePickerCalnender date={date} setDate={setDate}/>
                                <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                                    <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                                </span>
                            </div>
                        </div>
                    </div>
    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>{t('cancel')}</button>
                        <button type="button" className="btn btn-primary">{t('search')}</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}