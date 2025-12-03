
import Table from "@/components/detail_case/salary/Table";
import { getData } from "@/services/fetchData";
import { getTranslations } from "next-intl/server";

export default async function Salary({ 
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const t = await getTranslations("Public")
  const { id } = await params
  const data = await getData(`/case/personnel/${id}`);

  return (
    <div className="d-flex flex-column flex-column-fluid">
      <div id="kt_app_content" className="app-content flex-column-fluid">
        <div id="kt_app_content_container" className="app-container container-xxl">
          <div className="card mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">{t('salary_list')}</span>
              </h3>

            </div>
            {/*Tabel*/}
            <div className="card-body py-3">
              <div className="table-responsive">
                <Table data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
