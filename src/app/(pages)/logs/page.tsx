"use client";

import { useState, useEffect } from "react";
import { getData } from "@/services/fetchData";
import Image from "next/image";
import WindowScrollPagination from "@/components/ui/SidebarScrollHandlerClient";
import { Description } from "@/components/log/Description";
import { useTranslations } from "next-intl";

interface Log {
  id: number;
  user: {
    client: {
      firstName: string;
      lastName: string;
    };
    email: string;
    id: number;
  };
  createdAt: string;
  description: string;
}

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const t = useTranslations('Public');

  const fetchLogs = async (pageToLoad: number) => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const response: Log[] = await getData(`/log?page=${pageToLoad}`);
      if (!response || response.length === 0) {
        setHasMore(false);
        return;
      }

      setLogs(prev => {
        const merged = [...prev, ...response];
        return Array.from(new Map(merged.map(item => [item.id, item])).values());
      });
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(page);
  }, [page]);

  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div id="kt_app_content_container" className="app-container container-xxl">
          <div className="card mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">{t('logs_list')}</span>
              </h3>
            </div>
            <div className="card-body py-3">
              {logs.length === 0 && !loading ? (
                <div className="d-flex flex-column flex-center py-5">
                  <Image src="/5.png" width={250} height={250} alt="not-found" />
                  <div className="fs-1 fw-bolder text-dark mb-4">{t('not_found_log')}</div>
                  <div className="fs-6">{t('nothing_log_show')}</div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle table-row-dashed gs-0 gy-4 text-center">
                    <thead>
                      <tr className="fw-bold text-muted bg-light border-0">
                        <th className="ps-4 rounded-start">{t('id')}</th>
                        <th className="min-w-150px">{t('user')}</th>
                        <th className="min-w-150px">{t('user_email')}</th>
                        <th className="min-w-150px">{t('creation_date')}</th>
                        <th className="min-w-150px">{t('creation_time')}</th>
                        <th className="min-w-150px">{t('explanation')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((log) => (
                        <tr key={log.id}>
                          <td>
                            <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                              {log.id}
                            </span>
                          </td>
                          <td>
                            <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                              {log.user?.client?.firstName + " " + log.user?.client?.lastName || t('uncertain')}
                            </span>
                          </td>
                          <td>
                            <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                              {log.user?.email || "-"}
                            </span>
                          </td>
                          <td>
                            <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                              {log.createdAt.slice(0, 10)}
                            </span>
                          </td>
                          <td>
                            <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                              {new Date(log.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </span>
                          </td>
                          <td className="text-truncate" style={{ maxWidth: "150px" }}>
                            <Description item={log.description || ''}/>
                          </td>
                        </tr>
                      ))}
                      {loading && (
                        <tr>
                          <td colSpan={6} className="text-center py-4">
                            {t('loading')}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <WindowScrollPagination onPageChange={p => setPage(p)} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}
