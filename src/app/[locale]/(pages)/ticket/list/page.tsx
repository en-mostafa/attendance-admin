"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTicketsList } from "@/services/ticket.server";
import { searchTickets } from "@/services/search.server";
import EditStatus from "@/components/ticket/EditStatus";
import SearchTicket from "@/components/ticket/SearchTicket";
import WindowScrollPagination from "@/components/ui/SidebarScrollHandlerClient";
import { useTranslations } from "next-intl";

const TicketList = () => {
  const [page, setPage] = useState(1);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useState<any>(null);
  const t = useTranslations('Public');

  // Fetch tickets or search results
  const fetchTickets = async (pageToLoad: number) => {
    if (pageToLoad === -1) return;
    setLoading(true);
    try {
      let result;
      if (searchParams) {
        result = await searchTickets({ ...searchParams, page: pageToLoad });
      } else {
        result = await getTicketsList(pageToLoad);
      }
      const newData = result?.data || result || [];

      if (Array.isArray(newData) && newData.length === 0) {
        setHasMore(false);
        return;
      }

      setTickets((prev) => {
        const merged = [...prev, ...newData];
        return Array.from(
          new Map(merged.map((item) => [item.id, item])).values()
        );
      });
    } catch (err) {
      console.error("Failed to load tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial and paginated fetch
  useEffect(() => {
    fetchTickets(page);
  }, [page, searchParams]);

  // Scroll handler for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (!loading && hasMore && scrollTop + clientHeight >= scrollHeight) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // Handlers from SearchTicket
  const handleSearchResult = (data: any[]) => {
    setTickets(data);
    setHasMore(false);
  };
  const handleSearchQuery = (params: any) => {
    setSearchParams(params);
    setPage(1);
    setTickets([]);
    setHasMore(true);
  };

  return (
    <div className="container py-4">
      <div className="card mb-5 mb-xl-8">
        <div className="card-header d-flex justify-content-between align-items-center border-0 pt-5">
          <h3 className="card-title fw-bold fs-3 mb-1">{t('Ticket.tickets_list')}</h3>
          <SearchTicket
            onResult={handleSearchResult}
            onQuery={handleSearchQuery}
          />
        </div>
        <div className="card-body py-3">
          {tickets.length === 0 && !loading ? (
            <div className="d-flex flex-column align-items-center py-5">
              <Image
                src="/5.png"
                width={400}
                height={400}
                className="w-400px h-400px"
                alt="not-found"
              />
              <div className="fs-1 fw-bolder text-dark mb-3">
                {t('Ticket.not_found_ticket')}
              </div>
              <div className="fs-6">{t('Ticket.not_sent_ticket')}</div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle table-row-dashed gs-0 gy-4 text-center">
                <thead>
                  <tr className="fw-bold text-muted bg-light border-0">
                    <th className="ps-4 rounded-start">{t('id')}</th>
                    <th>{`${t('full_name')}/${t('id')}`}</th>
                    <th>{t('department')}</th>
                    <th>{t('creation_date')}</th>
                    <th>{t('status')}</th>
                    <th>{t('status_edit')}</th>
                    <th className="rounded-end"></th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((item) => (
                    <tr key={item.id} className="text-center">
                      <td>
                        <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                          {item.id}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <span className="badge badge-light-primary rounded fw-bold fs-6">
                            {item.client.id}
                          </span>
                          <Link
                            href={`/users/${item.client.id}`}
                            className="text-gray-900 fw-bold d-block mb-1 fs-6"
                            target="_blank"
                          >
                            {item.client.firstName} {item.client.lastName}
                          </Link>
                        </div>
                      </td>
                      <td>
                        <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                          {item.department?.type === "accounting"
                            ? t('accounting')
                            : item.department?.type === "hr"
                            ? t('human_resources')
                            : item.department?.type === "public_relations"
                            ? t('public_relations')
                            : item.department?.type === "support"
                            ? t('support')
                            : item.department?.type === "sell"
                            ? t('sale')
                            : "-"}
                        </span>
                      </td>
                      <td>
                        <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                          {item.createdAt?.slice(0, 10)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={
                            "badge fs-7 fw-bold " +
                            (item.status === "new"
                              ? "badge-light-primary"
                              : item.status === "under_review"
                              ? "badge-light-warning"
                              : item.status === "answered_by_admin"
                              ? "badge-light-info"
                              : item.status === "answered_by_client"
                              ? "badge-light-success"
                              : "badge-light-danger")
                          }
                        >
                          {item.status === "new"
                            ? t('Status.new')
                            : item.status === "under_review"
                            ? t('Status.under_review')
                            : item.status === "answered_by_admin"
                            ? t('Status.answered_by_admin')
                            : item.status === "answered_by_client"
                            ? t('Status.answered_by_client')
                            : t('Status.closed')}
                        </span>
                      </td>
                      <td>
                        <EditStatus
                          ticketId={item.id}
                          onUpdate={() => {
                            setTickets([]);
                            setPage(1);
                            setHasMore(true);
                          }}
                        />
                      </td>
                      <td className="text-end">
                        <Link
                          href={`/ticket/list/${item.id}`}
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        >
                          <i className="ki-outline ki-arrow-left fs-2"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {loading && (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        {t('loading')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <WindowScrollPagination
          onPageChange={(p) => setPage(p)}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default TicketList;
