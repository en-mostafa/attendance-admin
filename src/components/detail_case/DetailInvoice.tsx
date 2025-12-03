"use client";

import { pipeNumber } from "@/services/pipe";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

type AddressObj = {
  address: string;
  city: number;
  country: number;
  postCode: string;
};

type Client = {
  id: number;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  address?: AddressObj | null;
  companyName?: string;
  postalCode?: string;
  nationalIdNumber?: string;
  registrationNumber?: string;
  economicNumber?: string;
  isLegal: boolean;
  legal: {
    companyName: string;
    addressCompany: string;
    registrationNumber: string;
    nationalNumber: string;
    economicCode: string;
    postCode: string;
  };
};

type ProductInfo = {
  id: number;
  title: string;
  singlePrice: number;
  tax: number;
  discount: number;
  createdAt: string;
};

type ProductCase = {
  id: number;
  productId: number;
  count: number;
};

type InvoiceEntry = {
  id: number;
  percent: number;
  step: number;
  status: string;
  amount: number;
  description: string;
  paiedAt: string | null;
};

type CaseDetails = {
  id: number;
  createdAt: string;
  totalPrice: number;
  percent: number;
  status: string;
  step: number;
  description: string;
  user: {
    cellphone: string;
    client: Client;
    email: string;
  };
  mainAsigner: {
    cellphone: string;
    client: Client;
    email: string;
    registrationNumber: string;
  };
  products: ProductInfo[];
  productCase: ProductCase[];
  invoices: InvoiceEntry[];
};

type Props = {
  invoiceId: number;
  invoice: CaseDetails;
};

export default function DetailInvoice({ invoiceId, invoice }: Props) {
  const router = useRouter();
  const t = useTranslations('Public');
  const selectedEntry = invoice.invoices.find(
    (entry) => entry.id === invoiceId
  ) ||
    invoice.invoices[invoice.invoices.length - 1] || {
      percent: invoice.percent,
      status: invoice.status,
      step: invoice.step,
      description: invoice.description,
      paiedAt: null,
      id: 0,
      amount: 0,
    };

  const renderAddress = (addr?: AddressObj | null) =>
    addr ? addr.address : "-";

  const statusColor =
    selectedEntry.status === "done"
      ? "success"
      : selectedEntry.status === "pending"
      ? "warning"
      : selectedEntry.status === "failed"
      ? "danger"
      : "secondary";

  return (
    <div
      className="position-fixed d-flex bg-white text-black justify-content-center align-items-center"
      style={{ zIndex: 1000000000, inset: 0, flexDirection: "column" }}
    >
      <div style={{ textAlign: "end" }} className="no-print w-100 p-5">
        <button
          className="btn btn-sm btn-light-primary"
          onClick={() => router.back()}
          style={{ textAlign: "end" }}
        >
          <IoArrowBack style={{ fontSize: "20px" }} />
        </button>
      </div>
      <div
        className="overflow-auto w-100 p-5"
        style={{ minWidth: "-webkit-fill-available", overflow: "auto" }}
      >
        <div>
          {/* اطلاعات فاکتور */}
          <div
            className="mb-4 autoDev"
            style={{
              display: "flex",
              gap: "60px",
              fontSize: "15px",
              minWidth: "1200px",
            }}
          >
            <span>{t('invoice_number')}: {invoiceId}</span>
            <span>
               {t('creation_date')}:{" "}
              {new Date(invoice.createdAt).toLocaleDateString("fa-IR")}
            </span>
            <span>
              {t('Finance.date_pay')}:{" "}
              {selectedEntry.paiedAt
                ? new Date(selectedEntry.paiedAt).toLocaleDateString("fa-IR")
                : "-"}
            </span>
            <div>
              {t('status')}:
              <span className={`badge bg-${statusColor} text-white fs-6`}>
                {selectedEntry.status === "done"
                  ? t('Status.done')
                  : selectedEntry.status === "pending"
                  ? t('Status.awaiting_payment')
                  : t('Status.unsuccessfull')}
              </span>
            </div>
          </div>

          {/* کارت اصلی */}
          <div
            style={{
              border: "1.5px solid #bdbdbd",
              borderRadius: "12px",
              fontSize: "16px",
              minWidth: "1200px",
            }}
            className="autoDev"
          >
            {/* فروشنده */}
            <div
              style={{
                borderBottom: "1px solid #bdbdbd",
                padding: "18px 18px 0 18px",
              }}
            >
              <div
                style={{ display: "flex", gap: "30px", marginBottom: "10px" }}
              >
                <span> {t('company_name')}: {t('tourism_company')} Ic Raga</span>
                <span> {t('registration_number')}: 5-460481</span>
                <span>{t('email')}: İnfo@icraga.com</span>
                <span> {t('contact_number')}: + 7440632260 44 </span>
              </div>
              <div style={{ minHeight: "28px", padding: "13px 0" }}>
                <span>
                  {t('address')}: Hacıahmet mah، Kurtuluş Deresi cad، No:15-21K، Beyoğlu/
                  İstanbul
                </span>
              </div>
            </div>

            {/* مشتری */}
            <div style={{ padding: "18px 18px" }}>
              <div style={{ display: "flex", gap: "30px" }}>
                <span>
                  {t('customer')}: {invoice.user.client.firstName}{" "}
                  {invoice.user.client.lastName}
                </span>
                <span>
                  {t('contact_number')}: <span dir="ltr">{invoice.user.cellphone}</span>
                </span>
                <span>{t('email')}: {invoice.user.email}</span>
                <span>{t('address')}: {renderAddress(invoice.user.client.address)}</span>
              </div>
            </div>

            {invoice.user.client.isLegal ? (
              <div
                style={{ padding: "18px 18px", borderTop: "1px solid #bdbdbd" }}
              >
                <div style={{ display: "flex", gap: "30px" }}>
                  <span>{t('company_name')}: {invoice.user.client.legal.companyName}</span>
                  <span>
                     {t('company_address')}: {invoice.user.client.legal.addressCompany}
                  </span>
                  <span>
                     {t('registration_number')}: {invoice.user.client.legal.registrationNumber}
                  </span>
                  <span>
                    {t('national_id')}: {invoice.user.client.legal.nationalNumber}
                  </span>
                  <span>
                    {t('economic_code')}: {invoice.user.client.legal.economicCode}
                  </span>
                  <span>{t('postal_code')}: {invoice.user.client.legal.postCode}</span>
                </div>
              </div>
            ) : (
              ""
            )}

            <div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                {/* هدر جدول */}
                <thead>
                  <tr style={{ background: "#e3f2fd", textAlign: "center" }}>
                    <th
                      style={{
                        border: "1px solid #bdbdbd",
                        borderRight: "0",
                        padding: "15px 0px",
                      }}
                    >
                      {t('rank')}
                    </th>
                    <th
                      style={{
                        border: "1px solid #bdbdbd",
                        padding: "15px 0px",
                      }}
                    >
                      {t('product')}
                    </th>
                    <th
                      style={{
                        border: "1px solid #bdbdbd",
                        padding: "15px 0px",
                      }}
                    >
                      {t('number')}
                    </th>
                    <th
                      style={{
                        border: "1px solid #bdbdbd",
                        padding: "15px 0px",
                      }}
                    >
                      {t('unit_price')}
                    </th>
                    <th
                      style={{
                        border: "1px solid #bdbdbd",
                        padding: "15px 0px",
                      }}
                    >
                      {t('discount')}
                    </th>
                    <th
                      style={{
                        border: "1px solid #bdbdbd",
                        padding: "15px 0px",
                      }}
                    >
                      {t('taxes')}
                    </th>
                    <th
                      style={{
                        border: "1px solid #bdbdbd",
                        borderLeft: "0",
                        padding: "15px 0px",
                      }}
                    >
                     {t('final_price')}
                    </th>
                  </tr>
                </thead>

                {/* بدنه جدول */}
                <tbody>
                  {invoice.products.map((item, index) => {
                    const count = invoice.productCase[index]?.count || 1;
                    const totalPrice =
                      item.singlePrice *
                      count *
                      (1 + (item.tax || 0) / 100) *
                      (1 - (item.discount || 0) / 100);

                    return (
                      <tr key={item.id}>
                        <td
                          style={{
                            border: "1px solid #bdbdbd",
                            borderRight: "0",
                            padding: "15px 0px",
                            textAlign: "center",
                          }}
                        >
                          {index + 1}
                        </td>
                        <td
                          style={{
                            border: "1px solid #bdbdbd",
                            padding: "15px 0px",
                            textAlign: "center",
                          }}
                        >
                          {item.title}
                        </td>
                        <td
                          style={{
                            border: "1px solid #bdbdbd",
                            padding: "15px 0px",
                            textAlign: "center",
                          }}
                        >
                          {count} {t('count')}
                        </td>
                        <td
                          style={{
                            border: "1px solid #bdbdbd",
                            padding: "15px 0px",
                            textAlign: "center",
                          }}
                        >
                          {item.singlePrice} {t('euro')}
                        </td>
                        <td
                          style={{
                            border: "1px solid #bdbdbd",
                            padding: "15px 0px",
                            textAlign: "center",
                          }}
                        >
                          {item.discount ?? "-"} %
                        </td>
                        <td
                          style={{
                            border: "1px solid #bdbdbd",
                            padding: "15px 0px",
                            textAlign: "center",
                          }}
                        >
                          {item.tax ?? "-"} %
                        </td>
                        <td
                          style={{
                            border: "1px solid #bdbdbd",
                            borderLeft: "0",
                            padding: "15px 0px",
                            textAlign: "center",
                          }}
                        >
                          {totalPrice.toFixed(2)} {t('euro')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                {/* فوتر جدول */}
                <tfoot className="py-20">
                  <tr>
                    <td colSpan={6}>
                      <div className="px-6">
                        <div style={{ marginBottom: "10px" }}>
                           {t('invoice_description')}: {selectedEntry.description}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            gap: "200px",
                            marginTop: "40px",
                          }}
                        >
                          <span>{t('customer_sign')}</span>
                          <div className="position-relative">
                            <span>{t('seller_sign')}</span>
                            {selectedEntry.status === "done" ? (
                              <div
                                className="position-absolute"
                                style={{ bottom: -45 }}
                              >
                                <img src="/sign.png" alt="sign" width={300} />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          border: "1px solid #bdbdbd",
                          borderTop: "0",
                          borderBottom: "0",
                          minWidth: "180px",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            borderBottom: "1px solid #e0e0e0",
                            padding: "10px",
                            background: "#e3f2fd",
                            fontWeight: "bold",
                            backgroundColor: "#ECFAE5",
                          }}
                        >
                         {t('amount_payable')}
                        </div>
                        <div
                          style={{
                            padding: "18px",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          {pipeNumber(selectedEntry?.amount)} {t('euro')}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* لوگو و دکمه پرداخت */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "32px",
              minWidth: "1200px",
            }}
            className="autoDev"
          >
            <img src="/logo.svg" alt={t('logo')} style={{ height: "32px" }} />
            <button
              className="no-print btn btn-primary w-150px"
              onClick={() => window.print()}
            >
              {t('print')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
