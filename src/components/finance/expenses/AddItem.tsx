'use client'
import Modal from "@/components/ui/Modal";
import { useActionState, useContext, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { pipe } from "@/services/pipe";
import DatePickerCalnender from "@/components/ui/DatePicker";
import { addExpensese } from "@/services/expensesServices";
import { formatFullDate } from "@/services/formatDate";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";


export const AddItem = () => {
    const t = useTranslations('Public');
    const role = useContext(SessionContext);
    const [price, setPrice] = useState('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [date, setDate] = useState<any>(null);
    const [state, action, pending] = useActionState(addExpensese, null);
    const dateMilady = formatFullDate(date);

    useEffect(() => {
        if(state?.message === 'success')
            setShowModal(false);
    }, [state])

    return (
        <>  
            {role?.expense.create_expenses && (
                <button type="button" className="btn btn-flex btn-primary btn-sm" onClick={() => setShowModal(true)}>
                    {t("Finance.expenses_add")}
                </button>
            )}

            <Modal 
                title={t("Finance.expenses_add")} 
                customClass="mw-650px" 
                show={showModal} 
                close={() => setShowModal(false)}>

                    <form action={action}>
                        <div className="modal-body">
                            <div className="row">
                                <div className="d-flex col-md-6 flex-column mt-4">
                                    <label htmlFor="basic-url" className="form-label">{t("Finance.amount")} ({t("euro")})</label>
                                    <input 
                                        type="text" 
                                        name="amount"
                                        value={pipe(price)}
                                        onChange={e => setPrice(e.target.value)}
                                        className={`form-control ${state?.errors?.amount && 'is-invalid'}`} 
                                        placeholder={t("required_number")} 
                                        aria-label="Server"
                                    />
                                    {state?.errors?.amount && 
                                        <span className="text-danger mt-2 d-block">{state.errors.amount}</span>}
                                </div>

                                <div className="d-flex col-md-6 flex-column mt-4">
                                    <label htmlFor="basic-url" className="form-label">{t("Finance.text_id")}</label>
                                    <input 
                                        type="text" 
                                        name="textId"
                                        className={`form-control ${state?.errors?.textId && 'is-invalid'}`} 
                                        placeholder={t("Finance.enter_text_id")}
                                        aria-label="Server"
                                    />
                                    {state?.errors?.textId && 
                                        <span className="text-danger mt-2 d-block">{state.errors.textId}</span>}
                                </div>
                                
                                <div className="col-md-6 mt-4">
                                    <label htmlFor="basic-url" className="form-label">{t("Finance.date_pay")}</label>
                                    <div className="input-group flex-nowrap" id="kt_td_picker_simple" data-td-target-input="nearest" data-td-target-toggle="nearest">
                                        <DatePickerCalnender date={date} setDate={setDate}/>
                                        <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                                            <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                                        </span>
                                        <input type="text" name="paiedAt" defaultValue={dateMilady} hidden/>
                                    </div>
                                    <div className="text-danger mt-2">{state?.errors?.paiedAt}</div>
                                </div>

                                <div className="col-md-6 d-flex flex-column mt-4">
                                    <label htmlFor="basic-url" className="form-label">{t("Finance.file")}</label>
                                    <input 
                                        type="file" 
                                        name="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        className={`form-control ${state?.errors?.file && 'is-invalid'}`} 
                                    />
                                    <span className="block mt-1 text-muted fs-7">{t("Finance.allowed_files")} *.png، *.jpg و *.jpeg</span>
                                    {state?.errors?.file && 
                                        <span className="text-danger mt-2 d-block">{state.errors.file}</span>}
                                </div>

                                <div className="d-flex flex-column">
                                    <label htmlFor="basic-url" className="form-label">{t('description')}</label>
                                    <textarea 
                                        className="form-control" 
                                        rows={3} 
                                        name="description" 
                                        placeholder={t("Finance.enter_description")}></textarea>

                                    {state?.errors?.description && 
                                        <span className="text-danger mt-2 d-block">{state.errors.description}</span>}
                                </div>
                            </div>
                        </div>
        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>{t('cancel')}</button>
                            <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? <Spinner /> : t('register')}</button>
                        </div>
                        {state?.message === 'error' && <span className="text-danger">{state?.error}</span> }
                    </form>
            </Modal>
        </>
    )
}