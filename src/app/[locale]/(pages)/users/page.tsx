"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getAdminUsers } from "@/services/user.server";
import { searchUsers } from "@/services/search.server";
import AddUser from "@/components/user/manage/AddUser";
import SearchUser from "@/components/user/SearchUser";
import WindowScrollPagination from "@/components/ui/SidebarScrollHandlerClient";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Users() {
  const [page, setPage] = useState(1);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useState<any>(null);
  const t =  useTranslations('Public');

  const fetchClients = async (pageToLoad: number) => {
    if (pageToLoad === -1) return;
    setLoading(true);
    try {
      let result;
      console.log(searchParams);
      
      if (searchParams) {
        result = await searchUsers({ ...searchParams, page: pageToLoad });
      } else {
        result = await getAdminUsers(pageToLoad);
      }
      const data = result?.data || result || [];

      if (Array.isArray(data) && data.length === 0) {
        setHasMore(false);
        return;
      }

      setClients(prev => {
        const merged = [...prev, ...data];
        return Array.from(
          new Map(merged.map(item => [item.id, item])).values()
        );
      });
    } catch (err) {
      console.error("Failed to load clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients(page);
  }, [page, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (!loading && hasMore && scrollTop + clientHeight >= scrollHeight) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const handleSearchResult = (data: any[]) => {
    setClients(data);
    setHasMore(false);
  };
  const handleSearchQuery = (params: any) => {
    setSearchParams(params);
    setPage(1);
    setClients([]);
    setHasMore(true);
  };

  const userName = (user: any) =>
    user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : t('User.anonymous_user');

  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div id="kt_app_content_container" className="app-container container-xxl">
          <div className="card mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">{t('manage_user')}</span>
              </h3>
              <div className="card-toolbar gap-4 d-flex">
                <SearchUser onResult={(data) => {
                    setClients([])
                    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS", data);
                    
                    handleSearchResult(data)
                }} onQuery={handleSearchQuery} />
                <AddUser />
              </div>
            </div>
            <div className="card-body py-3 px-0">
              {clients.length === 0 && !loading ? (
                <div className="d-flex flex-column align-items-center py-5">
                  <Image
                    src="/5.png"
                    width={400}
                    height={400}
                    className="w-400px h-400px"
                    alt="not-found"
                  />
                  <div className="fs-1 fw-bolder text-dark mb-4">{t('User.not_found_user')}</div>
                  <div className="fs-6">{t('User.not_registered_member')}</div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle table-row-dashed gs-0 gy-4 text-center">
                    <thead>
                      <tr className="fw-bold text-muted bg-light border-0">
                        <th className="ps-4 min-w-150px rounded-start">{t('user')}</th>
                        <th className="min-w-125px">{t('id')}</th>
                        <th className="min-w-125px">{t('mobile')}</th>
                        <th className="min-w-200px">{t('email')}</th>
                        <th className="min-w-150px">{t('status')}</th>
                        <th className="min-w-50px rounded-end">{t('operation')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map(client => (
                        <tr key={client.id} className="text-center">
                          <td>
                            <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                              {userName(client.client)}
                            </span>
                          </td>
                          <td>
                            <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                              {client.id}
                            </span>
                          </td>
                          <td dir="ltr">
                            <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                              {client.cellphone}
                            </span>
                          </td>
                          <td>
                            <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                              {client.email}
                            </span>
                          </td>
                          <td>
                            <span className={
                              "badge fs-7 fw-bold " +
                              (client.deletedAt === null
                                ? "badge-light-success"
                                : "badge-light-danger")
                            }>
                              {client.deletedAt === null ? t('active') : t('not_active')}
                            </span>
                          </td>
                          <td>
                            <Link
                              href={`/users/${client.id}`}
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm ms-1"
                            >
                              <i className="ki-outline ki-pencil fs-2" />
                            </Link>
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
