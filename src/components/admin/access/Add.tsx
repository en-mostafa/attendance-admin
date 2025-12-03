'use client'
import Modal from "@/components/ui/Modal";
import { startTransition, useActionState, useContext, useEffect, useState } from "react";
import { access } from "@/constant";
import { Permission } from "./Permissions";
import { Access } from "@/types";
import { addAccess } from "@/services/accessServices";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";

export const AddAccess = () => {
    const t = useTranslations("Public");
    const role = useContext(SessionContext);
    const [name, setName] = useState('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [permission, setPermission] = useState<Access>(access);
    const [state, action, pending] = useActionState(addAccess, null);

    useEffect(() => {
        if(state?.message === 'success') {
            setShowModal(false)
            setPermission(access)
            setName('')
            toast.success(t("toast_success"))
        }
    }, [state])

    const handleGetKey = (obj: any, prefix = '') => {
        let result:any[] = []
        for (const key in obj) {
            const value = obj[key];
            const path = prefix ? `${key}` : key;
            if (typeof value === 'object' && value !== null) {
                result = result.concat(handleGetKey(value, path));
            } else if (value === true) {
                result.push(path);
            }
          }
        return result
    }

    const trueKey = handleGetKey(permission);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        trueKey.forEach(element => {
            formData.append('permissions', element);
        });
      
        startTransition(() => 
            action(formData)
        )
    }

    return (
        <>
            {role?.access.create_access && (
                <button type="button" className="btn btn-flex btn-primary btn-sm" onClick={() => setShowModal(true)}>
                    {t("access_add")}   
                </button>
            )}

            <Modal 
                title={t("access_add")}
                customClass="mw-800px" 
                show={showModal} 
                close={() => setShowModal(false)}>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div>
                                <label htmlFor="basic-url" className="form-label">{t("access_name")}</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className={`form-control ${state?.message === 'validation' && 'is-invalid'}`} 
                                    placeholder={t("access_name")} 
                                    aria-label="Server"
                                />
                                {state?.message === 'validation' &&  <span className="text-danger mt-2 d-block">{t("validate_name")}</span>}
                            </div>
                            <div className="my-3 overflow-y-auto h-400px list-access">
                                <label htmlFor="basic-url" className="form-label mt-4">{t("access")}</label>
                                <Permission permission={permission} setPermission={setPermission}/>
                            </div>
                        </div>
        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>{t("cancel")}</button>
                            <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? <Spinner /> : t("register")}</button>
                        </div>
                        {state?.message === 'error' && <span className="text-danger">{state?.error}</span> }
                    </form>
            </Modal>
        </>
    )
}