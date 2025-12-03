"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "@/i18n/routing";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUsers } from "@/services/user.server";
import { getMarketerLists } from "@/services/admin.server";
import { getProducts } from "@/services/services.server";
import {
  createOrder,
  getCaseDetails,
  getOneCase,
  InvoiceStep,
  ProductOption,
  updateCase,
} from "@/services/case.server";
import { useTranslations } from "next-intl";
import { caseStatus } from "@/lib/helper/caseTask";
import { pipeNumber } from "@/services/pipe";
const Select = dynamic(() => import("react-select"), { ssr: false });


interface Option {
  value: any;
  label: string;
}
interface User {
  id: number;
  client: { firstName: string; lastName: string };
}
interface Marketer {
  id: number;
  client: { firstName: string; lastName: string };
}
interface Product {
  id: number;
  title: string;
  singlePrice: number;
  tax: number;
  discount: number;
}

type Props = {
  caseID?: number;
};

const NewCase: React.FC<Props> = ({ caseID }) => {
  const router = useRouter();
  const t = useTranslations("Public");

  const [invoice, setInvoice] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [marketers, setMarketers] = useState<Marketer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedUser, setSelectedUser] = useState<Option | null>(null);
  const [selectedMarketer, setSelectedMarketer] = useState<Option | null>(null);
  const [marketerShare, setMarketerShare] = useState<number>(0);

  const [selectedProducts, setSelectedProducts] = useState<Option[]>([]);
  const [counts, setCounts] = useState<Record<number, number>>({});

  // initialize all 3 steps at once
  const [invoicePercents, setInvoicePercents] = useState<number[]>([0, 0, 0]);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const [invoiceError, setInvoiceError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
  const rowTotals = selectedProducts.map((opt) => {
    const p = products.find((x) => x.id === opt.value)!;
    const cnt = counts[p.id] || 1;
    const priceWithTax = p.singlePrice * (1 + p.tax / 100);
    const priceAfterDiscount = priceWithTax * (1 - p.discount / 100);
    return priceAfterDiscount * cnt;
  });
  const grandTotal = rowTotals.reduce((a, b) => a + b, 0);

  useEffect(() => {
    (async () => {
      if (caseID) {
        const datasInvoice = await getCaseDetails(+caseID);
        if (datasInvoice?.invoices) {
          const statusInvoice = datasInvoice?.invoices.some(
            (item: any) => item.status === "done"
          );
          console.log(">>>>", statusInvoice);
          setInvoice(statusInvoice);
        }
      }

      const [resUsers, resMarketer, resProducts] = await Promise.all([
        getUsers(),
        getMarketerLists(),
        getProducts(),
      ]);

      setUsers(resUsers || []);
      setMarketers(resMarketer || []);
      setProducts(resProducts || []);

      if (caseID && !isNaN(+caseID)) {
        const res = await getOneCase(+caseID);
        // map status to option
        const statusOptions: Option[] = caseStatus(t);
        const foundStatus = statusOptions.find((o) => o.value === res.status);
        foundStatus && setSelectedStatus(foundStatus);

        // directly initialize invoicePercents array based on step index
        const initPercents = [0, 0, 0];
        res.invoice.forEach((item: any) => {
          // step is 1-3, map into 0-based index
          initPercents[item.step - 1] = item.percent;
        });
        setInvoicePercents(initPercents);

        // marketer
        if (res.marketerId) {
          const m = resMarketer.find((m: any) => +m.id === +res.marketerId);
          if (m)
            setSelectedMarketer({
              value: m.id,
              label: `${m.client.firstName} ${m.client.lastName}`,
            });
          res.marketerShare && setMarketerShare(res.marketerShare);
        }

        // user
        const u = resUsers.find((u: any) => +u.id === +res.userId);
        if (u)
          setSelectedUser({
            value: u.id,
            label: `${u.client.firstName} ${u.client.lastName}`,
          });

        // products
        if (res.productOption?.length) {
          const opts: Option[] = [];
          const cnts: Record<number, number> = {};
          res.productOption.forEach(
            (po: { productId: number; count: number }) => {
              const p = resProducts.find((rp: any) => rp.id === po.productId);
              if (p) {
                opts.push({
                  value: p.id,
                  label: `${p.title} - ${p.singlePrice} ${t("euro")}`,
                });
                cnts[p.id] = po.count;
              }
            }
          );
          setSelectedProducts(opts);
          setCounts(cnts);
        }
      }
    })();
  }, []);

  useEffect(() => {
    const total = invoicePercents.reduce((a, b) => a + b, 0);
    setInvoiceError(
      total !== grandTotal
        ? `${t("total_percentage_warning")} (${t("now")} ${total})`
        : ""
    );
  }, [invoicePercents, grandTotal]);

  function onInvoiceChange(i: number, valIn: number) {
    let v = Math.max(0, valIn);
    const sumOther = invoicePercents.reduce(
      (sum, v2, idx) => (idx === i ? sum : sum + v2),
      0
    );
    const maxAllowed = grandTotal - sumOther;
    if (v > maxAllowed) v = maxAllowed;
    const arr = [...invoicePercents];
    arr[i] = v;
    setInvoicePercents(arr);
  }

  function handleProductChange(opts: any) {
    const newSel = opts || [];
    setSelectedProducts(newSel);
    setCounts((prev) => {
      const updated: Record<number, number> = {};
      newSel.forEach((opt: Option) => {
        updated[opt.value] = prev[opt.value] || 1;
      });
      return updated;
    });
  }
  function increment(id: number) {
    setCounts((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  }
  function decrement(id: number) {
    setCounts((prev) => ({ ...prev, [id]: prev[id] > 1 ? prev[id] - 1 : 1 }));
  }
  function removeProduct(id: number) {
    setSelectedProducts((prev) => prev.filter((opt) => opt.value !== id));
    setCounts((prev) => {
      const c = { ...prev };
      delete c[id];
      return c;
    });
  }

  const productOptions = products.map((p) => ({
    value: p.id,
    label: `${p.title} - ${pipeNumber(p.singlePrice)} ${t("euro")}`,
  }));
  const canSubmit =
    !!selectedUser &&
    selectedProducts.length > 0 &&
    invoiceError === "" &&
    invoicePercents.reduce((a, b) => a + b, 0) === grandTotal &&
    !loading;

  async function handleSubmit() {
    if (!canSubmit) return;
    setLoading(true);
    const productOption: ProductOption[] = selectedProducts.map((opt) => ({
      productId: opt.value,
      count: counts[opt.value],
    }));
    const invoices: InvoiceStep[] = invoicePercents.map((percent, idx) => ({
      step: (idx + 1) as 1 | 2 | 3,
      percent: +((percent / grandTotal) * 100).toFixed(6),
    }));

    if (caseID) {
      if (invoice) {
        console.log({
          userId: undefined,
          marketerId: undefined,
          marketerShare: undefined,
          productOption: undefined,
          invoices: undefined,
          status: selectedStatus?.value || "created",
        });
        
        const res = await updateCase(caseID, {
          userId: undefined,
          marketerId: undefined,
          marketerShare: undefined,
          productOption: undefined,
          invoices: undefined,
          status: selectedStatus?.value || "created",
        });
        if (res) {
          toast.success(t("file_updated_successfully"));
          router.push(`/case`);
        } else {
          toast.error(t("file_updated_error"));
        }
      } else {
        const res = await updateCase(caseID, {
          userId: selectedUser!.value,
          marketerId: selectedMarketer?.value || null,
          marketerShare: selectedMarketer ? marketerShare : null,
          productOption,
          invoices,
          status: selectedStatus?.value || "created",
        });
        if (res) {
          toast.success(t("file_updated_successfully"));
          router.push(`/case`);
        } else {
          toast.error(t("file_updated_error"));
        }
      }
    } else {
      const res = await createOrder({
        userId: selectedUser!.value,
        marketerId: selectedMarketer?.value || null,
        marketerShare: selectedMarketer ? marketerShare : null,
        productOption,
        invoices,
      });
 
      if (res) {
        toast.success(t("file_created_successfully"));
        router.push(`/case`);
      } else {
        toast.error(t("file_created_error"));
      }
    }
    setLoading(false);
  }



  return (
    <>
      <div className="row px-8 py-4">
        {/* انتخاب کاربر */}
        <div
          className="col-md-4 mt-4"
          style={{
            pointerEvents: invoice ? "none" : "auto",
            opacity: invoice ? "65%" : "100%",
          }}
        >
          <label className="form-label">{t("user_selection")}</label>
          {users.length === 0 ? (
            <p>{t("not_exist_user")}</p>
          ) : (
            <Select
              value={selectedUser}
              onChange={(v) => setSelectedUser(v as any)}
              placeholder={t("user_selection")}
              classNamePrefix={'react-select'}
              options={users.map((u) => ({
                value: u.id,
                label: `${u.client.firstName} ${u.client.lastName}`,
              }))}
            />
          )}
        </div>
        {/* انتخاب بازاریاب */}
        <div
          className="col-md-4 mt-4"
          style={{
            pointerEvents: invoice ? "none" : "auto",
            opacity: invoice ? "65%" : "100%",
          }}
        >
          <label className="form-label">{t("marketer_selection")}</label>
          {marketers.length === 0 ? (
            <p>{t("no_exist_marketer")}</p>
          ) : (
            <Select
              value={selectedMarketer}
              onChange={(v) => setSelectedMarketer(v as any)}
              placeholder={t("marketer_selection")}
              classNamePrefix={'react-select'}
              options={marketers.map((m) => ({
                value: m.id,
                label: `${m.client.firstName} ${m.client.lastName}`,
              }))}
            />
          )}
        </div>
        {/* سهم بازاریاب */}
        <div
          className="col-md-4 mt-4"
          style={{
            pointerEvents: invoice ? "none" : "auto",
            opacity: invoice ? "65%" : "100%",
          }}
        >
          <label className="form-label">
            {t("marketer_share")}({t("euro")})
          </label>
          <input
            type="number"
            className="form-control"
            value={marketerShare}
            onChange={(e) => setMarketerShare(+e.target.value)}
            disabled={!selectedMarketer}
          />
        </div>
        {/* انتخاب وضعیت*/}
        {selectedStatus ? (
          <div className="col-md-4 mt-4">
            <label className="form-label">{t("status_selection")}</label>
            <Select
              value={selectedStatus}
              onChange={(v: any) => setSelectedStatus(v)}
              placeholder={t("status_selection")}
              options={caseStatus(t)}
              classNamePrefix={'react-select'}
            />
          </div>
        ) : (
          ""
        )}
        {/* انتخاب محصول */}
        <div
          className="col-md-8 mt-4"
          style={{
            pointerEvents: invoice ? "none" : "auto",
            opacity: invoice ? "65%" : "100%",
          }}
        >
          <label className="form-label">{t("product_selection")}</label>
          {products.length === 0 ? (
            <p>{t("no_exist_product")}</p>
          ) : (
            <Select
              isMulti
              value={selectedProducts}
              onChange={handleProductChange}
              placeholder={t("select_product")}
              classNamePrefix={'react-select'}
              options={productOptions.filter(
                (opt) => !selectedProducts.some((s) => s.value === opt.value)
              )}
            />
          )}
        </div>
      </div>

      {selectedProducts.length > 0 && (
        <div
          className="table-responsive mt-4"
          style={{
            padding: "0 25px",
            pointerEvents: invoice ? "none" : "auto",
            opacity: "65%",
          }}
        >
          <table className="table align-middle table-row-dashed gy-4 text-center">
            <thead className="bg-light">
              <tr className="fw-bold text-muted">
                <th>{t("title")}</th>
                <th>{t("price")}</th>
                <th>{t("taxes")}</th>
                <th>{t("discount")}</th>
                <th>{t("number")}</th>
                <th>{t("final_price")}</th>
                <th>{t("delete")}</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((opt) => {
                const p = products.find((x) => x.id === opt.value)!;
                const cnt = counts[p.id] || 1;
                const priceWithTax = p.singlePrice * (1 + p.tax / 100);
                const priceAfterDiscount =
                  priceWithTax * (1 - p.discount / 100);
                const rowTotal = priceAfterDiscount * cnt;
                return (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>{pipeNumber(p.singlePrice)} €</td>
                    <td>{p.tax}%</td>
                    <td>{p.discount}%</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-light"
                          onClick={() => decrement(p.id)}
                        >
                          -
                        </button>
                        <span>{cnt}</span>
                        <button
                          className="btn btn-sm btn-light"
                          onClick={() => increment(p.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{pipeNumber(rowTotal)} €</td>
                    <td>
                      <button
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        onClick={() => removeProduct(p.id)}
                      >
                        <i className="ki-outline ki-trash fs-2"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}

              {/* جمع کل */}
              <tr className="fw-bold">
                <td colSpan={5} className="text-end pe-4">
                  {t("total_amount")}
                </td>
                <td>{pipeNumber(grandTotal)} €</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {/* مراحل فاکتور */}
      <div
        className="row mt-5 px-8"
        style={{
          pointerEvents: invoice ? "none" : "auto",
          opacity: invoice ? "65%" : "100%",
        }}
      >
        <div className="col-md-12">
          <h5>{t("payment_share")}</h5>
        </div>
        {invoicePercents.map((val, i) => {
          const sumOther = invoicePercents.reduce(
            (sum, v, idx) => (idx === i ? sum : sum + v),
            0
          );
          const maxAllowed = grandTotal - sumOther;

          return (
            <div className="col-md-4 mt-3" key={i}>
              <label className="form-label">
                {t("stage")} {i + 1} ({t('euro')})
              </label>
              <input
                type="number"
                className="form-control"
                value={val}
                min={0}
                max={maxAllowed}
                disabled={maxAllowed === 0}
                onChange={(e) => onInvoiceChange(i, +e.target.value)}
              />
            </div>
          );
        })}
        {invoiceError && (
          <div className="col-md-12 mt-2 text-danger">{invoiceError}</div>
        )}
      </div>
      <div className="mt-6 px-6">
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary w-150px mt-10"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {loading ? t("Chat.sending") : caseID ? t("update") : t("add")}
          </button>
        </div>
      </div>
    </>
  );
};

export default NewCase;
