"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
const Select = dynamic(() => import("react-select"), { ssr: false });
import BootstrapModal from "@/components/ui/BootstrapModal";
import { getUsers } from "@/services/user.server";
import { searchTickets } from "@/services/search.server"; // Adjust import if needed
import { useTranslations } from "next-intl";

interface Option {
  value: number | string;
  label: string;
}

interface Props {
  onResult: (tickets: any[]) => void;
  onQuery: (params: any) => void;
}

// Static departments


export default function SearchTicket({ onResult, onQuery }: Props) {
  const [ticketId, setTicketId] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<Option | null>(null);
  const [selectedDept, setSelectedDept] = useState<Option | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);

  const t = useTranslations('Public');

  const [users, setUsers] = useState<Option[]>([]);

  useEffect(() => {
    // Fetch users for select
    const fetchUsers = async () => {
      try {
        const resUsers = await getUsers();
        const opts = (resUsers || []).map((u: any) => ({
          value: u.id,
          label: `${u.client.firstName} ${u.client.lastName}`,
        }));
        setUsers(opts);
      } catch (err) {
        toast.error(t('fetching_users_list_error'));
      }
    };
    fetchUsers();
  }, []);

  const departmentOptions: Option[] = [
  { value: "accounting", label: t('accounting') },
  { value: "hr", label: t('human_resources') },
  { value: "public_relations", label: t('public_relations') },
  { value: "support", label: t('support') },
  { value: "sell", label: t('sale') },
];

// Static statuses
const statusOptions: Option[] = [
  { value: "new", label: t('Status.new') },
  { value: "under_review", label: t('Status.under_review') },
  { value: "answered_by_admin", label: t('Status.answered_by_admin')},
  { value: "answered_by_client", label: t('Status.answered_by_client') },
  { value: "closed", label: t('Status.closed') },
];

  const handleSearch = async () => {
    const queryParams = {
      ticketId: ticketId ? Number(ticketId) : undefined,
      userId: selectedUser?.value || undefined,
      department: selectedDept?.value || undefined,
      status: selectedStatus?.value || undefined,
      createdAt: createdAt || undefined,
      page: 1,
    };

    try {
      const data = await searchTickets(queryParams);
      if (Array.isArray(data)) {
        onResult(data);
        onQuery(queryParams);
      } else {
        toast.error(t('Ticket.search_ticket_error'));
      }
    } catch (error) {
      toast.error(t('Ticket.search_ticket_error'));
    }
  };

  return (
    <>
      <button
        className="btn btn-sm btn-light-primary"
        data-bs-toggle="modal"
        data-bs-target="#searchTicketModal"
      >
        {t('Ticket.search_ticket')}
        <FiSearch className="fs-2 mx-2" />
      </button>

      <BootstrapModal
        id="searchTicketModal"
        title={t('Ticket.search_ticket')}
        onConfirm={handleSearch}
        textConfirm={t('search')}
      >
        <div className="mb-3">
          <label className="form-label">{t('Ticket.ticket_id')}</label>
          <input
            type="number"
            className="form-control"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('user_selection')}</label>
          <Select
            isLoading={!users.length}
            classNamePrefix={'react-select'}
            value={selectedUser}
            onChange={(option: any) => setSelectedUser(option)}
            placeholder={t('user_selection')}
            options={users}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('department')}</label>
          <Select
            value={selectedDept}
            classNamePrefix={'react-select'}
            onChange={(option: any) => setSelectedDept(option)}
            placeholder={t('department_selection')}
            options={departmentOptions}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('creation_date')}</label>
          <input
            type="date"
            className="form-control"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('status')}</label>
          <Select
            value={selectedStatus}
            classNamePrefix={'react-select'}
            onChange={(option: any) => setSelectedStatus(option)}
            placeholder={t('status_selection')}
            options={statusOptions}
          />
        </div>
      </BootstrapModal>
    </>
  );
}
