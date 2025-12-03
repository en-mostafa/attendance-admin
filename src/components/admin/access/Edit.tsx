'use client'
import Modal from "@/components/ui/Modal";
import { startTransition, useActionState, useContext, useEffect, useState } from "react";
import { Permission } from "./Permissions";
import { Access } from "@/types";
import { updateAccess } from "@/services/accessServices";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { useData } from "@/hooks/useData";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";


export const EditAccess = ({ id } : { id: string }) => {
    const t = useTranslations("Public");
    const role = useContext(SessionContext);
    const { data } = useData(`/admin/access/role/${id}`);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [permission, setPermission] = useState<Access>(data?.customizedPermission);
    const [state, action, pending] = useActionState(updateAccess, null);

    useEffect(() => {
        if (data) setPermission(data?.customizedPermission);
    }, [data]);

    useEffect(() => {
        if(state?.message === 'success') {
            setShowModal(false)
            toast.success(t('toast_success'))
        }
    }, [state])

    const handleGetKey = (obj: any) => {
        let result:any[] = []
        for (const key in obj) {
            const value = obj[key];
            if (typeof value === 'object' && value !== null) {
                result = result.concat(handleGetKey(value));
            } else if (value === true) {
                result.push(key);
            }
          }
        return result
    }

    const trueKey = handleGetKey(permission);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append('id', id)
        trueKey.forEach(element => {
            formData.append('permissions', element);
        });
      
        startTransition(() => 
            action(formData)
        )
    }

    return (
        <>
            {role?.access.update_access && (
                <button type="button" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-1" onClick={() => setShowModal(true)}>
                    <i className="ki-outline ki-pencil fs-2"></i>
                </button>
            )}

            <Modal 
                title={t("access_edit")}
                customClass="mw-800px" 
                show={showModal} 
                close={() => setShowModal(false)}>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div>
                                <label htmlFor="basic-url" className="form-label d-flex">{t("access_name")}</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    defaultValue={data?.access.name}
                                    className={`form-control ${state?.message === 'validation' && 'is-invalid'}`} 
                                    placeholder={t("access_name")}
                                    aria-label="Server"
                                />
                                { state?.message === 'validation' &&  <span className="text-danger mt-2 d-block">{t("validate_name")}</span> }
                            </div>
                            <div className="my-3 overflow-y-auto h-400px list-access">
                                <label htmlFor="basic-url" className="form-label mt-4 d-flex">{t("access")}</label>
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