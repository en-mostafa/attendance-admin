"use client";
import dynamic from "next/dynamic";
import { getNotifs, sendNotifToUsers } from "@/services/notif.server";
import { getUsers } from "@/services/user.server";
import { useContext, useEffect, useState } from "react";
import type { ActionMeta, MultiValue } from "react-select";
import { SessionContext } from "@/store";
import { useTranslations } from "next-intl";

const Select = dynamic(() => import("react-select"), { ssr: false });

// const customStyles = {
//   control: (provided: any) => ({
//     ...provided,
//     backgroundColor: "var(--bs-body-bg)",
//     borderColor: "var(--bs-gray-300)",
//     minHeight: "42px",
//     padding: "0 8px",
//   }),
//   menu: (provided: any) => ({
//     ...provided,
//     backgroundColor: "var(--bs-gray-100)",
//     zIndex: 9999,
//   }),
//   option: (provided: any, state: any) => ({
//     ...provided,
//     backgroundColor: state.isFocused ? "var(--bs-gray-200)" : "transparent",
//     color: "var(--bs-dark)",
//     padding: "8px 12px",
//   }),
//   multiValue: (provided: any) => ({
//     ...provided,
//     backgroundColor: "var(--bs-light)",
//   }),
//   multiValueLabel: (provided: any) => ({
//     ...provided,
//     color: "var(--bs-dark)",
//   }),
// };

type User = {
  id: number;
  client: {
    firstName: string;
    lastName: string;
  };
};

type Notif = {
  notifId: number;
  title: string;
  description: string;
  readAt: boolean;
  createdAt: string;
  userNotif: User[];
  userEmail: User[];
  allUsers: boolean;
  sendType: "both" | "email" | "notif";
};

type SendNotif = {
  title: string;
  description: string;
  userIds: number[];
  allUsers: boolean;
  sendType: "email" | "notif" | "both";
};

export default function Notif() {
  const role = useContext(SessionContext);
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedNotif, setSelectedNotif] = useState<Notif | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<
    { value: number; label: string }[]
  >([]);
  const [newNotif, setNewNotif] = useState<SendNotif>({
    title: "",
    description: "",
    userIds: [],
    allUsers: false,
    sendType: "notif",
  });

  const t = useTranslations('Public');

  useEffect(() => {
    fetchNotifs();
    fetchUsers();
  }, []);

  async function fetchNotifs() {
    setNotifs((await getNotifs()) || []);
    setLoading(false);
  }

  const fetchUsers = async () => setUsers((await getUsers()) || []);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setNewNotif((p) => ({ ...p, [name]: value }));
  }

  function handleAllUsersToggle(e: React.ChangeEvent<HTMLInputElement>) {
    const all = e.target.checked;
    setNewNotif((p) => ({
      ...p,
      allUsers: all,
      userIds: all ? [] : p.userIds,
    }));
    if (all) setSelectedUsers([]);
  }

  function handleSendTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setNewNotif((p) => {
      const other = name === "email" ? "notif" : "email";
      const otherChecked = p.sendType === "both" || p.sendType === other;
      const thisChecked = checked;
      let sendType: SendNotif["sendType"];
      if (thisChecked && otherChecked) sendType = "both";
      else if (thisChecked) sendType = name as "email" | "notif";
      else if (otherChecked) sendType = other as "email" | "notif";
      else sendType = "notif";
      return { ...p, sendType };
    });
  }

  function handleSelectChange(
    newValue: MultiValue<{ value: number; label: string }>,
    actionMeta: ActionMeta<{ value: number; label: string }>
  ) {
    const arr = Array.from(newValue || []);
    setSelectedUsers(arr);
    setNewNotif((p) => ({ ...p, userIds: arr.map((o) => o.value) }));
  }

  const handleSend = async () => {
    const res = await sendNotifToUsers(newNotif);
    console.log("====>", res);
    setNewNotif({
      title: "",
      description: "",
      userIds: [],
      allUsers: false,
      sendType: "notif",
    });
    setSelectedUsers([]);
    fetchNotifs();
    const modalEl = document.getElementById("addNotifModal");
    modalEl && (window as any).bootstrap.Modal.getInstance(modalEl)?.hide();
  };

  return (
    <div className="container py-4 mt-10">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>{t('notifs_list')}</h3>
        {role?.notification.send_notification && (
          <button
            className="btn btn-sm btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addNotifModal"
          >
            <i className="ki-outline ki-plus fs-2"></i> {t('new_notif')}
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : notifs.length === 0 ? (
        <div className="text-center py-5">{t('no_exist_notif')}</div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle table-row-dashed gy-4 text-center">
            <thead className="bg-light">
              <tr className="fw-bold text-muted">
                <th>{t('id')}</th>
                <th>{t('title')}</th>
                <th>{t('date')}</th>
                <th>{t('posting_type')}</th>
                <th>{t('details')}</th>
              </tr>
            </thead>
            <tbody>
              {notifs.map((notif: any) => (
                <tr key={notif.id}>
                  <td>{notif.id}</td>
                  <td>{notif.title}</td>
                  <td>
                    {new Date(notif.createdAt).toLocaleDateString("fa-IR")}
                  </td>
                  <td>
                    <span
                      className={`badge badge-light-${
                        notif.sendType === "notif"
                          ? "primary"
                          : notif.sendType === "email"
                          ? "success"
                          : "info"
                      }`}
                    >
                      {notif.sendType}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-light-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#notifDetailModal"
                      onClick={() => setSelectedNotif(notif)}
                    >
                      {t('show')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* مودال جزئیات */}
      <div
        className="modal fade"
        id="notifDetailModal"
        tabIndex={-1}
        aria-labelledby="notifDetailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title text-white" id="notifDetailModalLabel">
                {t('notif_details')}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {selectedNotif ? (
                <div className="row g-4">
                  <div className="col-12">
                    <label className="form-label fw-bold">{t('title')}:</label>
                    <p className="text-muted">{selectedNotif.title}</p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">{t('explanation')}:</label>
                    <p className="text-muted">{selectedNotif.description}</p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">{t('send_date')}:</label>
                    <p className="text-muted">
                      {new Date(selectedNotif.createdAt).toLocaleDateString(
                        "fa-IR"
                      )}
                    </p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">{t('users')}:</label>
                    {selectedNotif.allUsers ? (
                      <p className="text-success">{t('all_users')}</p>
                    ) : selectedNotif.userNotif.length === 0 ||
                      selectedNotif?.userEmail && selectedNotif.userEmail.length === 0 ? (
                      <p className="text-danger">{t('no_user_selected')}</p>
                    ) : (
                      <div className="table-responsive">
                        <table className="table align-middle table-row-dashed gy-4 text-center">
                          <thead className="bg-light">
                            <tr className="fw-bold text-muted">
                              <th>#</th>
                              <th>{t('full_name')}</th>
                              <th>{t('email')}</th>
                              <th>{t('read')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedNotif.userNotif.length
                              ? selectedNotif.userNotif.map(
                                  (u: any, idx: number) => (
                                    <tr key={u.id}>
                                      <td>{idx + 1}</td>
                                      <td>
                                        {u.user.client.firstName}{" "}
                                        {u.user.client.lastName}
                                      </td>
                                      <td>{u.user.email}</td>
                                      <td>
                                        <span
                                          className={`badge badge-light-${
                                            u.readAt ? "success" : "primary"
                                          }`}
                                        >
                                          {u.readAt ? t('yes') : t('no')}
                                        </span>
                                      </td>
                                    </tr>
                                  )
                                )
                              : selectedNotif?.userEmail && selectedNotif.userEmail.map(
                                  (u: any, idx: number) => (
                                    <tr key={u.id}>
                                      <td>{idx + 1}</td>
                                      <td>
                                        {u.user.client.firstName}{" "}
                                        {u.user.client.lastName}
                                      </td>
                                      <td>{u.user.email}</td>
                                      <td>
                                        <span
                                          className={`badge badge-light-${
                                            u.readAt ? "success" : "primary"
                                          }`}
                                        >
                                          {u.readAt ? t('yes') : t('no')}
                                        </span>
                                      </td>
                                    </tr>
                                  )
                                )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status" />
                </div>
              )}
            </div>
            <div className="modal-footer bg-light">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* مودال ایجاد اعلان جدید */}
      <div
        className="modal fade"
        id="addNotifModal"
        tabIndex={-1}
        aria-labelledby="addNotifModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title text-white" id="addNotifModalLabel">
                {t('new_notif')}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="row g-4">
                <div className="col-12">
                  <label className="form-label">{t('title')}</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={newNotif.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">{t('explanation')}</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows={3}
                    value={newNotif.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="allUsersChk"
                      checked={newNotif.allUsers}
                      onChange={handleAllUsersToggle}
                    />
                    <label className="form-check-label" htmlFor="allUsersChk">
                      {t('send_to_all_users')}
                    </label>
                  </div>
                </div>
                {!newNotif.allUsers && (
                  <div className="col-12">
                    <label className="form-label">{t('users_selection')}</label>
                    {users.length === 0 ? (
                      <p className="text-muted">
                        {t('no_exist_user_to_select')}
                      </p>
                    ) : (
                      <Select
                        isMulti
                        classNamePrefix={'react-select'}
                        value={selectedUsers}
                        onChange={(newValue: any, actionMeta: any) =>
                          handleSelectChange(newValue, actionMeta)
                        }
                        options={users.map((u) => ({
                          value: u.id,
                          label: `${u.client.firstName} ${u.client.lastName}`,
                        }))}
                        placeholder={t('users_selection')}
                        noOptionsMessage={() => t('not_found_user')}
                        className="basic-multi-select"
                        
                      />
                    )}
                  </div>
                )}
                <div className="col-12">
                  <label className="form-label d-block">{t('posting_type')}</label>
                  <div className="d-flex gap-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="sendNotifChk"
                        name="notif"
                        checked={
                          newNotif.sendType === "notif" ||
                          newNotif.sendType === "both"
                        }
                        onChange={handleSendTypeChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="sendNotifChk"
                      >
                        {t('system_notif')}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="sendEmailChk"
                        name="email"
                        checked={
                          newNotif.sendType === "email" ||
                          newNotif.sendType === "both"
                        }
                        onChange={handleSendTypeChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="sendEmailChk"
                      >
                        {t('email')}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-light">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {t('cancellation')}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSend}
                disabled={!newNotif.title || !newNotif.description}
              >
                {t('send_notif')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
