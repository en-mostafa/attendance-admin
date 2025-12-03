"use client";
import Spinner from "@/components/ui/spinner";
import { useActionState, useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { addUser } from "@/services/userServices";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function AddManager() {
  const router = useRouter();
  const [phone, setPhone] = useState<string>();
  const [password, setPassword] = useState(true);
  const [state, action, pending] = useActionState(addUser, null);
  const t = useTranslations("Public");

  useEffect(() => {
    if (state?.message === "success") {
      router.push("/users");
      toast.success(t("toast_success"));
    }
  }, [state]);

  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid">
        <div id="kt_app_toolbar" className="app-toolbar pt-7 pt-lg-10">
          <div
            id="kt_app_toolbar_container"
            className="app-container container-fluid d-flex align-items-stretch"
          >
            <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
              <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-3 m-0">
                  {t("User.add_new_customer")}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div
          id="kt_app_content_container"
          className="app-container container-fluid"
        >
          <div id="kt_app_content" className="app-content flex-column-fluid">
            <div className="card">
              <div className="card-body pt-6">
                <form action={action} className="form">
                  <div className="row g-9 mb-8">
                    <div className="col-md-4 fv-row">
                      <label htmlFor="basic-url" className="form-label">
                        {t("name")}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className={`form-control ${
                          state?.errors?.email && "is-invalid"
                        }`}
                        placeholder={t("name")}
                        aria-label="Server"
                      />
                      <div className="invalid-feedback">
                        {state?.errors?.firstName}
                      </div>
                    </div>
                    <div className="col-md-4 fv-row">
                      <label htmlFor="basic-url" className="form-label">
                        {t("last_name")}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className={`form-control ${
                          state?.errors?.email && "is-invalid"
                        }`}
                        placeholder={t("last_name")}
                        aria-label="Server"
                      />
                      <div className="invalid-feedback">
                        {state?.errors?.lastName}
                      </div>
                    </div>
                    <div className="col-md-4 fv-row">
                      <label htmlFor="basic-url" className="form-label">
                        {t("email")}
                      </label>
                      <input
                        type="text"
                        name="email"
                        className={`form-control ${
                          state?.errors?.email && "is-invalid"
                        }`}
                        placeholder={t("email")}
                        aria-label="Server"
                      />
                      <div className="invalid-feedback">
                        {state?.errors?.email}
                      </div>
                    </div>
                    <div className="col-md-4 fv-row">
                      <label htmlFor="basic-url" className="form-label">
                        {t("phone_number")}
                      </label>
                      <PhoneInput
                        international
                        defaultCountry="IR"
                        value={phone}
                        onChange={setPhone}
                        className="h-40px"
                      />
                      <input
                        type="text"
                        name="cellphone"
                        defaultValue={phone}
                        className={`form-control ${
                          state?.errors?.cellphone && "is-invalid"
                        }`}
                        hidden
                      />
                      <div className="invalid-feedback">
                        {state?.errors?.cellphone}
                      </div>
                    </div>
                    <div className="col-md-4 fv-row">
                      <label htmlFor="basic-url" className="form-label">
                        {t("User.password")}
                      </label>
                      <div className="position-relative ">
                        <input
                          className={`form-control bg-transparent ${
                            state?.errors?.password && "is-invalid"
                          }`}
                          type={`${password ? "password" : "text"}`}
                          placeholder={t("User.password")}
                          name="password"
                          autoComplete="off"
                        />

                        <span
                          className={`btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2`}
                          data-kt-password-meter-control="visibility"
                          onClick={() => setPassword(!password)}
                        >
                          <i
                            className={`ki-outline ki-eye-slash fs-2 ${
                              !password && "d-none"
                            }`}
                          ></i>
                          <i
                            className={`ki-outline ki-eye fs-2 ${
                              password && "d-none"
                            }`}
                          ></i>
                        </span>
                        <div
                          id="validationServerUsernameFeedback"
                          className="invalid-feedback"
                        >
                          {state?.errors?.password}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary w-150px mt-10"
                      disabled={pending}
                    >
                      {pending ? <Spinner /> : t("info_add")}
                    </button>
                  </div>
                  {state?.message === "error" && (
                    <span className="text-danger d-block mt-3 text-end">
                      {state?.error}
                    </span>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
