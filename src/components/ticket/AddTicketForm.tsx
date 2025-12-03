"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Spinner from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/routing";
import { createNewTicketForm } from "@/services/ticket.server";
import { useTranslations } from "next-intl";
import Fileupload from "./Fileupload";
const Select = dynamic(() => import("react-select"), { ssr: false });

type Props = {
  usersList: Record<string, any>[];
};

export default function AddForm({ usersList }: Props) {
  const router = useRouter();
  const [users, setUsers] = useState<Record<string, any>[]>([]);
  //
  const [selectedUser, setSelectedUser] = useState<null | any>(null);
  const [selectedDep, setSelectedDep] = useState<null | any>(null);
  const [selectedStatus, setSelectedStatus] = useState<null | any>(null);
  const [files, setFiles] = useState<File[] | null>(null);
  //
  const [state, action, pending] = useActionState(createNewTicketForm, null);
  const t = useTranslations('Public');

  useEffect(() => {
    if (state?.message === "success") {
      toast.success(t('Ticket.registered_ticket_successfully'));
      router.push("/ticket/list");
    }
  }, [state]);

  useEffect(() => {
    if (usersList.length) setUsers(usersList);
  }, [usersList]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("userId", selectedUser?.value || "");
    formData.append("department", selectedDep?.value || "");
    formData.append("status", selectedStatus?.value || ""); //selectedDep?.value ||
    files &&
      files.forEach((file: File) => {
        formData.append("files", file);
      });

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="mt-4 px-4">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-4">
              <label htmlFor="basic-url mt-4" className="form-label">
                {t('title')}
              </label>
              <input
                type="text"
                name="title"
                placeholder={t('title')}
                aria-label="Server"
                className={`form-control ${
                  state?.errors?.title && "is-invalid"
                }`}
              />
              <div className="mt-2 ps-4 text-danger">
                {state?.errors?.title}
              </div>
            </div>

            <div className="col-md-4 mt-4">
              <label htmlFor="basic-url" className="form-label">
                {t('user_selection')}
              </label>
              {!users.length ? (
                <p>{t('no_exist_user')}</p>
              ) : (
                <Select
                  value={selectedUser}
                  classNamePrefix={'react-select'}
                  onChange={setSelectedUser}
                  placeholder={t('choose')}
                  options={users.map((user) => ({
                    value: user.id,
                    label: `${user.client.firstName} ${user.client.lastName}`,
                  }))}
                />
              )}
              <div className="mt-2 ps-4 text-danger">
                {state?.errors?.userId}
              </div>
            </div>

            <div className="col-md-4 mt-4">
              <label htmlFor="basic-url" className="form-label">
                {t('department_selection')}
              </label>
              <Select
                value={selectedDep}
                onChange={setSelectedDep}
                placeholder={t('choose')}
                classNamePrefix={'react-select'}
                options={[
                  { value: "accounting", label: t('accounting') },
                  { value: "hr", label: t('human_resources') },
                  { value: "public_relations", label: t('public_relations') },
                  { value: "support", label: t('support') },
                ]}
              />
              <div className="mt-2 ps-4 text-danger">
                {state?.errors?.department}
              </div>
            </div>

            <div className="col-md-4 mt-4">
              <label htmlFor="basic-url" className="form-label">
                {t('status_selection')}
              </label>
              <Select
                value={selectedStatus}
                onChange={setSelectedStatus}
                placeholder={t('choose')}
                classNamePrefix={'react-select'}
                options={[
                  { value: "new", label: t('Status.new') },
                  { value: "under_review", label: t('Status.under_review') },
                  { value: "closed", label: t('Status.closed') },
                ]}
              />
              <div className="mt-2 ps-4 text-danger">{state?.errors?.status}</div>
            </div>

            <div className="col-12 mt-8">
              <label htmlFor="text" className="form-label">
                {t('Ticket.ticket_text')}
              </label>
              <textarea
                id="text"
                name="text"
                placeholder={t('enter_your_message')}
                className={`form-control ${
                  state?.errors?.text ? "is-invalid" : ""
                }`}
                style={{ height: "150px" }}
              ></textarea>
              <div className="mt-2 ps-4 text-danger">{state?.errors?.text}</div>
            </div>

            <div className="mt-10">
              <Fileupload
                setFiles={setFiles}
                style={
                  state?.errors?.files
                    ? "border border-dashed border-danger"
                    : ""
                }
              />
              <div className="mt-2 ps-4 text-danger">
                {state?.errors?.files}
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary w-150px mt-10"
                disabled={pending}
              >
              {pending ? <Spinner /> : t('Ticket.register_new_ticket')}
            </button>
            <span className="text-danger d-block mt-3"></span>
            </div>
          </div>
        </div>
    
      </form>
    </div>
  );
}
