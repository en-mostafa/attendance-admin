"use client";

import { useEffect, useRef, useState } from "react";
import { getTicketById } from "@/services/search.server";
import { FiLoader, FiSearch } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function SearchTicket() {
  const [input, setInput] = useState("");
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const t =  useTranslations('Public')

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setTicket(null);
        setError("");
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    if (input.trim() && /^\d+$/.test(input)) {
      fetchTicket(+input);
    } else {
      setTicket(null);
      setError("");
    }
  }, [input]);

  const fetchTicket = async (id: number) => {
    setLoading(true);
    setError("");
    setTicket(null);
    const res = await getTicketById(id);
    if (res.length) {
      setTicket(res[0]);
    } else {
      setError("تیکتی با این شناسه یافت نشد.");
    }
    setLoading(false);
  };

  return (
    <div
      className="position-relative"
      ref={boxRef}
      style={{ minWidth: 400 }}
    >
      {/* Search Input */}
      <div className="input-group rounded overflow-hidden">
        <span className="input-group-text bg-transparent border-0">
          <FiSearch style={{ fontSize: "18px" }} />
        </span>
        <input
          type="text"
          className="form-control border-0"
          placeholder={t('Ticket.search_ticket_with_id')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {loading && (
          <span className="input-group-text bg-transparent border-0">
            <FiLoader className="spinner-border spinner-border-sm text-primary" />
          </span>
        )}
      </div>

      {/* Result Box */}
      {(ticket || error) && (
        <div
          className="position-absolute w-100 bg-white shadow-sm rounded mt-2"
          style={{ zIndex: 1050, top: "40px" }}
        >
          {error ? (
            <div className="p-3 text-danger d-flex align-items-center">
              <FiSearch className="me-2" />
              <span className="small mb-0">{error}</span>
            </div>
          ) : (
            <Link
              href={`/ticket/list/${ticket!.id}`}
              className="text-decoration-none text-dark"
            >
              <div className="p-8 d-flex align-items-start">
                {/* Ticket Icon */}
                <BiCommentDetail className="me-3 mt-1 text-primary" size={28} />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 className="mb-0">{t('Ticket.ticket')} #{ticket!.id}</h6>
                    <span
                      className={
                        "badge fs-7 fw-bold " +
                        (ticket.status === "new"
                          ? "badge-light-primary"
                          : ticket.status === "under_review"
                          ? "badge-light-warning"
                          : ticket.status === "answered_by_admin"
                          ? "badge-light-info"
                          : ticket.status === "answered_by_client"
                          ? "badge-light-success"
                          : "badge-light-danger")
                      }
                    >
                      {ticket.status === "new"
                        ? t('Status.new')
                        : ticket.status === "under_review"
                        ? t('Status.under_review')
                        : ticket.status === "answered_by_admin"
                        ? t('Status.answered_by_admin')
                        : ticket.status === "answered_by_client"
                        ? t('Status.answered_by_client')
                        : t('Status.closed')}
                    </span>
                  </div>
                  <p className="mb-0 text-truncate">{ticket!.title}</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
