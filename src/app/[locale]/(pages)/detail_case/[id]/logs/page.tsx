import { Description } from "@/components/log/Description";
import { getLogs } from "@/services/case.server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

interface Log {
  id: number;
  user: {
    client: {
      name: string;
      lastName: string;
    };
  };
  createdAt: string;
  status: "new" | "under_review" | "closed";
  title: string;
  description: string;
  email: string;
}

export default async function Logs({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<React.JSX.Element> {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const logs: Log[] = await getLogs(id); 
  const t = await getTranslations ('Public');


  const persianStatus = (status: string) => {
    switch (status) {
      case "new":
        return t('Status.new');
      case "under_review":
        return t('Status.under_review');
      case "closed":
        return t('Status.closed');
      default:
        return t('Status.uncertain');
    }
  };

  const badgeColor = (status: string) => {
    switch (status) {
      case "new":
        return "badge-light-primary";
      case "under_review":
        return "badge-light-warning";
      case "closed":
        return "badge-light-danger";
      default:
        return "badge-light-secondary";
    }
  };
 
  return (
    <div>
      {logs.length === 0 ? (
        <div className="d-flex flex-column flex-center">
          <Image
            src={"/5.png"}
            width={250}
            height={250}
            className="w-250px h-250px"
            alt="not-found"
          />
          <div className="fs-1 fw-bolder text-dark mb-4">{t('not_found_log')}</div>
          <div className="fs-6">{t('nothing_log_show')}</div>
        </div>
      ) : (
        <div className="d-flex flex-column flex-column-fluid">
          <div id="kt_app_content" className="app-content flex-column-fluid">
            <div
              id="kt_app_content_container"
              className="app-container container-xxl"
            >
              <div className="card mb-5 mb-xl-8">
                <div className="card-header border-0 pt-5">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold fs-3 mb-1">
                     {t('logs_list')}
                    </span>
                  </h3>
                </div>
                <div className="card-body py-3">
                  <div className="table-responsive">
                    <table className="table align-middle table-row-dashed gs-0 gy-4">
                      <thead>
                        <tr className="fw-bold text-muted bg-light border-0 text-center">
                          <th className="ps-4 rounded-start">{t('id')}</th>
                          <th className="min-w-150px">{t('user')}</th>
                          <th className="min-w-150px">{t('user_email')}</th>
                          <th className="min-w-150px">{t('creation_date')}</th>
                          <th className="min-w-150px">{t('creation_time')}</th>
                          <th className="min-w-150px">{t("explanation")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map((log: any) => (
                          <tr key={log.id} className="text-center">
                            <td>
                              <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                {log.id}
                              </span>
                            </td>
                            <td>
                              <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                {log.user?.client?.firstName +
                                  " " +
                                  log.user?.client?.lastName || t('uncertain')}
                              </span>
                            </td>
                            <td>
                              <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                {log?.user?.email}
                              </span>
                            </td>
                            <td>
                              <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                {log?.createdAt.slice(0, 10)}
                              </span>
                            </td>
                            <td>
                              <span className="text-gray-900 fw-bold d-block mb-1 fs-6">
                                {log?.createdAt.substr(11, 8)}
                              </span>
                            </td>
                            <td
                              className="text-truncate"
                              style={{ maxWidth: "150px" }}
                            >
                              <Description item={log.description}/>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
