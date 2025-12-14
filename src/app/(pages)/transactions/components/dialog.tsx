'use client'
import Modal from "@/components/ui/Modal";
import Link from "next/link";
import { useState } from "react";

export const Dialog = ({
    item,
}: {
    item: any,
}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button
                className="btn btn-light btn-sm btn-active-light-primary"
                onClick={() => setShowModal(true)}
            >
                <i className="ki-outline ki-pencil fs-2" />
            </button>

            <Modal
                title="واریزی"
                customClass="mw-650px"
                show={showModal}
                close={() => setShowModal(false)}>

                <div>
                    <div className="modal-body">
                        <div className="d-flex flex-column align-items-start mt-4">
                            <label htmlFor="basic-url" className="form-label">توضیح</label>
                            <textarea
                                className="form-control"
                                rows={3}
                                name="description"
                                defaultValue={item?.description}
                                placeholder="توضیحات"></textarea>
                        </div>
                        <div className="d-flex flex-column align-items-start mt-4">
                            <label htmlFor="uplaodFile" className="form-label">رسید پرداختی</label>
                            <a
                                href={`${process.env.NEXT_PUBLIC_API_BACKEND_URL + item.image}`}
                                target="_blank"
                                className="btn btn-success btn-sm w-25"
                            >
                                دانلود
                            </a>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-light"
                            data-bs-dismiss="modal"
                            onClick={() => setShowModal(false)}
                        >
                            بستن
                        </button>
                    </div>
                </div>
            </Modal >
        </>
    )
}