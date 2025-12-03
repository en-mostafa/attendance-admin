import Tabs from "@/components/detail_case/NavigationTabs";
import { Link } from "@/i18n/routing";
import { getCaseDetails } from "@/services/case.server";
import { pipeNumber } from "@/services/pipe";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import profile from '../../../../../../public/assets/media/svg/avatars/blank.svg';
import { CaseStatus } from "@/components/detail_case/CaseStatus";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
    id: string;
  };
}
export default async function DetailCaseLayout({ children, params }: LayoutProps) {
  const { id } = await params;
  const res = (id && (await getCaseDetails(+id))) || null;
  const t = await getTranslations('Public');
  const imgUrl = res?.user?.profileImage ? process.env.NEXT_PUBLIC_API_BACKEND_URL + "/" + res.user.profileImage : profile
  
  return (
    <div>
      <div className="card mb-5 mb-xl-10">
        <div className="card-body pt-9 pb-0">
          {/* Details Section */}
          <div className="d-flex flex-wrap flex-sm-nowrap">
            {/* Profile Picture */}
            <div className="me-7 mb-4">
              <div className="symbol symbol-120px symbol-lg-160px symbol-fixed position-relative rounded overflow-hidden shadow-sm">
                <Image
                  src={imgUrl}
                  alt="profile"
                  width={200}
                  height={200}
                  className="w-full h-full object-fit-cover"
                  style={{ userSelect: "none" }}
                />

                {/* شناسه پرونده (پایین راست) */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "40px",
                    right: "5px",

                    /* نیم‑شفاف + بلور پس‌زمینه */
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",

                    padding: "6px",
                    borderRadius: "6px",
                    color: "white",
                  }}
                >
                   {t('file_id')}: {res?.id}
                </div>

                {/* وضعیت (بالا چپ) */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",

                    /* نیم‑شفاف + بلور پس‌زمینه */
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",

                    padding: "6px",
                    borderRadius: "6px",
                  }}
                >
                  <strong className="fs-7 fw-bold text-white">{t('status')}:</strong>{" "}
                  <CaseStatus status={res?.status}/>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-grow-1">
              <Link
                href={`/users/${res?.user.id}`}
                className="fw-bold fs-1 my-3"
              >
                #{res?.user?.client?.firstName} {res?.user?.client?.lastName} ({!res.user.client.isLegal ? t('real_user') : t('legal_user')})
              </Link>

              <div className="row text-gray-700 fs-5 gy-4 mt-4">
                <div className="col-md-4">
                  <strong>{t('email')}:</strong>{" "}
                  <div className="mt-2">{res?.user?.email}</div>
                </div>
                <div className="col-md-4">
                  <strong>{t('total_price')}:</strong>{" "}
                  <div className="mt-2">
                    {pipeNumber(res?.totalPrice)} {t('euro')}
                  </div>
                </div>
                <div className="col-md-4">
                  <strong>{t('creation_date')}:</strong>
                  <div className="mt-2">
                    {new Date(res?.createdAt).toLocaleDateString("fa-IR")}
                  </div>
                </div>
                <div className="col-md-4">
                  <strong>{t('marketer')}:</strong>
                  <div className="mt-2">
                    {res?.marketer?.client?.firstName}
                    {res?.marketer?.client?.lastName} <br></br> (
                    {res?.marketer?.email})
                  </div>
                </div>
                <div className="col-md-4">
                  <strong>{t('admin_creator')}:</strong>
                  <div className="mt-2">
                    {res?.mainAsigner?.client?.firstName}
                    {res?.mainAsigner?.client?.lastName} <br></br>(
                    {res?.mainAsigner?.email})
                  </div>
                </div>
                <div className="col-md-4">
                  <strong>{t('ticket_status')}:</strong>
                  <div className="mt-2" style={{display: "flex"}}>
                    <div className="badge fs-7 fw-bold bg-dark text-white w-full block rounded-end-0">
                      {res?.ticket.status === "new"
                        ? t('Status.new')
                        : res?.ticket.status === "under_review"
                        ? t('Status.under_review')
                        : res?.ticket.status === "answered_by_admin" 
                        ? t('Status.answered_by_admin')
                        : res?.ticket.status === "answered_by_client" 
                        ? t('Status.answered_by_client')
                        : t('Status.closed')
                      }
                    </div>
                    <Link href={`/ticket/list/${res?.ticket?.id}`} className="btn fs-7 fw-bold badge-light-primary rounded-start-0">
                        {t('go_to_ticket')} ←
                    </Link>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs />
        </div>
      </div>
      <div className="mb-10" style={{padding: "0 20px"}}>
      {children}
      </div>
    </div>
  );
};