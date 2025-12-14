'use client'
import Modal from "@/components/ui/Modal";
import { ChangeEvent, startTransition, useActionState, useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import { pipe, pipeNumber } from "@/services/pipe";
import { paymentSalary } from '@/services/salary.services'
import DatePickerCalnender from "@/components/ui/DatePicker";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const Payment = ({
    item,
    userId
}: {
    item: any,
    userId: number
}) => {
    const [price, setPrice] = useState('');
    const [date, SetDate] = useState('');
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | any>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [state, action, pending] = useActionState(paymentSalary, null);
    const router = useRouter();

    const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFile(file);
        }
    };

    useEffect(() => {
        if (state?.success) {
            setShowModal(false);
            router.refresh();
            toast.success("با موفقیت انجام شد");

            setPrice('');
            SetDate('')
            setDescription('');
            setFile(null)
        }
    }, [state])

    const handleInputPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newValue = value.replace(/,/g, "");
        setPrice(newValue)
    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("id", item.id);
        formData.append("salary", item.totalSalary);
        formData.append("userId", `${userId}`);
        formData.append('amount', price);
        formData.append("date", date);
        formData.append('description', description);
        formData.append('image', file);
        startTransition(() => action(formData))
    }

    return (
        <>
            {item.status !== "SETTLED" ? (
                <button
                    className="btn btn-light btn-sm btn-active-light-primary"
                    onClick={() => setShowModal(true)}
                    disabled={item.status === "SETTLED"}
                >
                    پرداخت
                </button>
            ) : "---"}

            <Modal
                title="پرداخت"
                customClass="mw-650px"
                show={showModal}
                close={() => setShowModal(false)}>

                <div>
                    <div className="modal-body">
                        <input type="hidden" name="id" defaultValue={item?.id} />
                        <div className="d-flex flex-column align-items-start mt-4">
                            <label htmlFor="basic-url" className="form-label">پرداختی (تومان)</label>
                            <input
                                type="text"
                                name="amount"
                                defaultValue={pipeNumber(435435435)}
                                readOnly
                                className={`form-control bg-gray-100`}
                            />
                        </div>
                        <div className="d-flex flex-column align-items-start mt-4">
                            <label htmlFor="basic-url" className="form-label">مبلغ  (تومان)</label>
                            <input
                                type="text"
                                name="amount"
                                value={pipe(price)}
                                onChange={handleInputPrice}
                                className={`form-control`}
                                placeholder="مبلغ مورد نظر را وارد نمایید"
                                aria-label="Server"
                            />
                        </div>
                        <div className="d-flex flex-column align-items-start mt-4">
                            <label htmlFor="basic-url" className="form-label">توضیح</label>
                            <textarea
                                className="form-control"
                                rows={3}
                                name="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="توضیحات"></textarea>
                        </div>
                        <div className="d-flex flex-column align-items-start mt-4">
                            <label htmlFor="basic-url" className="mb-2">تاریخ</label>
                            <div className="input-group flex-nowrap" id="kt_td_picker_simple" data-td-target-input="nearest" data-td-target-toggle="nearest">
                                <DatePickerCalnender
                                    date={date}
                                    setDate={SetDate}
                                />
                                <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                                    <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                                </span>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-start mt-4">
                            <label htmlFor="uplaodFile" className="form-label">آپلود رسید</label>
                            <input
                                id="uplaodFile"
                                type="file"
                                name="file"
                                onChange={updateImage}
                            />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-light"
                            data-bs-dismiss="modal"
                            onClick={() => setShowModal(false)}
                        >
                            لغو
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            disabled={pending}
                            onClick={handleSubmit}
                        >
                            {pending ? <Spinner /> : 'ثبت'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}