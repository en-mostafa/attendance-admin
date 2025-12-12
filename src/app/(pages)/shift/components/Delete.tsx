'use client'
import Modal from "@/components/ui/Modal";
import { useActionState, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { deletedShift } from "@/services/shift.services";
import { useRouter } from "next/navigation";

export const DeletedItem = ({ id }: { id: number }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(deletedShift, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            router.refresh();
            setShowModal(false);
            toast.success("با موفقیت انجام شد")
        }
    }, [state])

    return (
        <>
            <button type="button" className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm" onClick={() => setShowModal(true)}>
                <i className="ki-outline ki-trash fs-2"></i>
            </button>

            <Modal
                title="حذف"
                show={showModal}
                close={() => setShowModal(false)}>

                <form action={action} className="mt-auto">
                    <input type="hidden" name="id" defaultValue={id} />
                    <div className="modal-body text-center" style={{ paddingBottom: '8rem' }}>
                        درصورت تایید حذف میشود
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>لغو</button>
                        <button type="submit" className="btn btn-danger" disabled={pending}>{pending ? <Spinner /> : "حذف"}</button>
                    </div>
                    {state?.error === 'error' && <span className="text-danger">{state?.error}</span>}
                </form>
            </Modal>
        </>
    )
}