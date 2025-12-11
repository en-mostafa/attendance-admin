'use client'
import Modal from "@/components/ui/Modal";
import { FormEvent, startTransition, useActionState, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { defineIps } from "@/services/settings.server";

export const AddIp = () => {
    const [inputValue, setInputValue] = useState('');
    const [name, setName] = useState("");
    const [inputError, setInputError] = useState("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(defineIps, null);

    useEffect(() => {
        if (state?.message === 'success') {
            setShowModal(false);
            setName("");
            setInputValue("");
            toast.success("با موفقیت انجام شد")
        }
    }, [state])

    const validateIp = (ip: string) => {
        const pattern = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
        return pattern.test(ip);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue === '' || name === '') {
            setInputError("required_ip_title");
            return
        }
        if (!validateIp(inputValue)) {
            setInputError("ip_format_not_valid");
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
                افزودن آی پی
            </button>

            <Modal
                title="آی پی"
                show={showModal}
                close={() => setShowModal(false)}>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div>
                            <label htmlFor="basic-url" className="form-label">عنوان</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="عنوان"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="basic-url" className="form-label">IP</label>
                            <input
                                type="text"
                                className="form-control"
                                style={{ fontFamily: "sans-serif" }}
                                placeholder="مثال: 192.168.0.1"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>لغو</button>
                        <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? <Spinner /> : "ثبت"}</button>
                    </div>
                    {state?.message === 'error' && <span className="text-danger fs-5 text-center d-block mx-10 mb-4">{state?.error}</span>}
                    {inputError && <span className="text-danger fs-5 text-center d-block mx-10 mb-4">{inputError}</span>}
                </form>
            </Modal>
        </>
    )
}