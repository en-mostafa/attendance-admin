'use client'
import Modal from "@/components/ui/Modal";
import { FormEvent, startTransition, useActionState, useContext, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { defineIps } from "@/services/settings.server";
import { useTranslations } from "next-intl";

export const AddIp = () => {
    const [inputValue, setInputValue] = useState('');
    const [name, setName] = useState("");
    const [inputError, setInputError] = useState("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(defineIps, null);
    const t = useTranslations('Public.Setting.Ip');

    useEffect(() => {
        if (state?.message === 'success') {
            setShowModal(false);
            setName("");
            setInputValue("");
            toast.success(t('toast_success'))
        }
    }, [state])

    const validateIp = (ip: string) => {
        const pattern = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
        return pattern.test(ip);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue === '' || name === '') {
            setInputError(t('required_ip_title'));
            return
        }
        if (!validateIp(inputValue)) {
            setInputError(t('ip_format_not_valid'));
            return;
        }
        const data = {
            ipAddress: inputValue,
            name
        }
        startTransition(() => action(data))
    }


    return (
        <>
            <button type="button" className="btn btn-flex btn-primary btn-sm" onClick={() => setShowModal(true)}>
                {t('add_ip')}
            </button>

            <Modal
                title={t('add_ip')}
                show={showModal}
                close={() => setShowModal(false)}>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div>
                            <label htmlFor="basic-url" className="form-label">{t('title')}</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={t('enter_title')}
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="basic-url" className="form-label">{t('ip_en')}</label>
                            <input
                                type="text"
                                className="form-control"
                                style={{ fontFamily: "sans-serif" }}
                                placeholder={t('ip_example')}
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>{t('cancle')}</button>
                        <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? <Spinner /> : t('register')}</button>
                    </div>
                    {state?.message === 'error' && <span className="text-danger fs-5 text-center d-block mx-10 mb-4">{state?.error}</span>}
                    {inputError && <span className="text-danger fs-5 text-center d-block mx-10 mb-4">{inputError}</span>}
                </form>
            </Modal>
        </>
    )
}