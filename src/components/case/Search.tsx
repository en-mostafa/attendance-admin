'use client'

import dynamic from "next/dynamic";
import Modal from "@/components/ui/Modal";
import { FormEvent,  useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";
import { getCaseProducts } from "@/services/case.server";
import { getUsers } from "@/services/user.server";
import { getAllAdmin } from "@/services/admin.server";
import DatePickerCalnender from "../ui/DatePicker";
import { FiSearch } from "react-icons/fi";
import { formatFullDate } from "@/services/formatDate";
import Spinner from "../ui/spinner";
import { caseStatus } from "@/lib/helper/caseTask";
const Select = dynamic(() => import("react-select"), { ssr: false });


export const SearchCase = ({ setCases } : { setCases: (cases:string | null) => void }) => {
    const t = useTranslations('Public');
    const role = useContext(SessionContext);
    const [userId, setUserId] = useState("");
    const [adminId, setAdminId] = useState("");
    const [productId, setProductId] = useState("");
    const [status, setStatus] = useState("");
    const [statusPay, setStatusPay] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [caseId, setCaseId] = useState("");
    const [users, setUsers] = useState<Record<string, any>[]>([]);
    const [admins, setAdmins] = useState<Record<string, any>[]>([]);
    const [products, setProducts] = useState<Record<string, any>[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [createdAt, setCreatedAt] = useState("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [pending, setPending] = useState(false);
    const statusOptions = caseStatus(t); 

    useEffect(() => {
    const fetchData = async () => {
        try {
        const [resUsers, resAdmins, resProducts] = await Promise.all([
            getUsers(),
            getAllAdmin(),
            getCaseProducts(),
        ]);

        setUsers(resUsers || []);
        setAdmins(resAdmins || []);
        setProducts(resProducts || []);
        } catch (error) {
        toast.error(t('load_users_admins_products_error'));
        }
    };

    fetchData();
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        const query = new URLSearchParams();

        if (caseId) query.append("caseId", caseId.toString());
        if (userId) query.append("userId", userId.toString());
        if (adminId) query.append("asignerId", adminId.toString());
        if (cellphone) query.append("cellphone", cellphone.toString());
        if (productId) query.append("productId", productId.toString());
        if (status) query.append("status", status);
        if (statusPay) query.append("paymentStatus", statusPay);
        if (createdAt) query.append("createdAt", formatFullDate(createdAt));

        setCases(query.toString());
        setTimeout(() => {
            setPending(false);
            setShowModal(false);
        }, 1000)
    }

    const handleCancel = () => {
        setCaseId("");
        setCellphone("");
        setUserId("");
        setAdminId("");
        setProductId("");
        setStatus("");
        setStatusPay("");
        setCreatedAt("");
        setSelectedUser(null);
        setSelectedAdmin(null);
        setSelectedProduct(null);
        setShowModal(false);
        setCases(null)
    }

    return (
        <>
            <button
                className="btn btn-sm btn-light-primary"
                onClick={() => setShowModal(true)}
                >
                {t('search_file')}
                <FiSearch className="fs-2 mx-2" />
            </button>

            <Modal 
                title={t('search')}
                customClass="mw-800px" 
                show={showModal} 
                close={() => setShowModal(false)}>

                    <form onSubmit={handleSubmit} className="mt-auto">
                        <div className="modal-body">
                            <div className="row g-5">
                                <div className="col-md-6">
                                    <label className="form-label">{t('file_id')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={caseId}
                                        onChange={(e) => setCaseId(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{t('phone_number')}</label> 
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={cellphone}
                                        onChange={(e) => setCellphone(e.target.value)}
                                        placeholder={t('phone_number')}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{t('user_selection')}</label>
                                    <Select
                                        isLoading={!users.length}
                                        value={selectedUser}
                                        classNamePrefix={'react-select'}
                                        onChange={(option: any) => {
                                        setSelectedUser(option);
                                        setUserId(option?.value);
                                        }}
                                        placeholder= {t('user_selection')}
                                        options={users.map((user) => ({
                                        value: user.id,
                                        label: `${user.client.firstName} ${user.client.lastName}`,
                                        }))}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{t('Admin.admin_selection')}</label>
                                    <Select
                                        isLoading={!admins.length}
                                        value={selectedAdmin}
                                        classNamePrefix={'react-select'}
                                        onChange={(option: any) => {
                                        setSelectedAdmin(option);
                                        setAdminId(option?.value);
                                        }}
                                        placeholder={t('Admin.admin_selection')}
                                        options={admins.map((admin) => ({
                                        value: admin.id,
                                        label: `${admin.client.firstName} ${admin.client.lastName}`,
                                        }))}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{t('product_selection')}</label>
                                    <Select
                                        isLoading={!products.length}
                                        value={selectedProduct}
                                        classNamePrefix={'react-select'}
                                        onChange={(option: any) => {
                                        setSelectedProduct(option);
                                        setProductId(option?.value);
                                        }}
                                        placeholder={t('product_selection')}
                                        options={products.map((product) => ({
                                        value: product.id,
                                        label: product.title || `${t('product')} ${product.id}`,
                                        }))}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="basic-url" className="form-label">{t("creation_date")}</label>
                                    <div className="input-group flex-nowrap" id="kt_td_picker_simple" data-td-target-input="nearest" data-td-target-toggle="nearest">
                                        <DatePickerCalnender date={createdAt} setDate={setCreatedAt}/>
                                        <span className="input-group-text" data-td-target="#kt_td_picker_basic" data-td-toggle="datetimepicker">
                                            <i className="ki-duotone ki-calendar fs-2"><span className="path1"></span><span className="path2"></span></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{t('cases_status')}</label>
                                    <select
                                        className="form-select"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                    {statusOptions.map((status, index) => 
                                        <option 
                                            key={index}
                                            value={status.value}
                                        >
                                            {t(`Status.Case.${status.value}`)}
                                        </option>
                                    )}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">{t('salary_status')}</label>
                                    <select
                                        className="form-select"
                                        value={statusPay}
                                        onChange={(e) => setStatusPay(e.target.value)}
                                    >
                                        <option>{t("choose")}</option>
                                        <option value="done">{t("Status.settled")}</option>
                                        <option value="pending">{t("Status.un_settled")}</option>
                                        <option value="failed">{t("Status.incomplete")}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={handleCancel}>{t('clear_filter')}</button>
                            <button type="submit" className="btn btn-primary" disabled={pending}>{pending ? <Spinner /> : t('register')}</button>
                        </div>
                    </form>
            </Modal>
        </>
    )
}