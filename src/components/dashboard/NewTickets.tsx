import { Link } from "@/i18n/routing";
import NodataItems from "../ui/NodataItems";
import { useJalaliFormat } from "@/services/formatDate";
import { useLocale, useTranslations } from "next-intl";


export default function NewTickets({ data } : { data:any }) {
    const t = useTranslations('Public');
    const locale = useLocale();

    return (
        <div className="content flex-column-fluid mt-5 mt-xl-10" id="kt_content">
            <div className="card">
                <div className="card-header border-0 pt-6">
                    <div className="card-title">
                        <div className="page-title d-flex flex-column mb-5">
                            <h1 className="d-flex text-dark fw-bold my-1 fs-3">{t('Ticket.new_tickets')}</h1>
                        </div>
                    </div>
                    <div className="card-toolbar">
                        <div className="d-flex justify-content-end" data-kt-customer-table-toolbar="base">
                            <button type="button" className="btn btn-light-primary me-3">
                                {t('number')}: {data?.tickets.length}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card-body pt-0">
                    <div id="kt_customers_table_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                        <div className="table-responsive">
                            <table className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer" id="kt_customers_table">
                                <thead>
                                    <tr className=" text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                                        <th className="text-center">{t('rank')}</th>
                                        <th className="text-center">{t('User.user_name')}</th>
                                        <th className="text-center w-200px">{t('title')}</th>
                                        <th className="text-center">{t('Ticket.ticket_id')}</th>
                                        <th className="text-center">{t('create_time')}</th>
                                        <th className="text-center">{t('status')}</th>
                                        <th className="text-center">{t('operation')}</th>
                                    </tr>
                                </thead>
                                <tbody className="tbody-ticket fw-semibold text-gray-600">
                                    {
                                        data?.tickets.length === 0 ? (
                                            <NodataItems colSpan={6} />
                                        ) : (
                                            data?.tickets?.map((ticket:any, index:number) => 
                                                <tr key={ticket.id}>
                                                    <td className="text-center">
                                                        {index}
                                                    </td>
                                                    <td className="mb-1 text-center">
                                                        {ticket?.client?.firstName + ticket?.client?.lastName}
                                                    </td>
                                                    <td className="text-gray-600 mb-1 text-center">
                                                        <span className="text-center d-block text-truncate" style={{ maxWidth: '200px' }}>{ticket.title}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        {ticket.id}
                                                    </td>
                                                    <td className="text-center">
                                                        {useJalaliFormat(ticket.createdAt, locale)}
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="badge badge-light-success">{ticket.status === 'new' && t('new')}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <Link href={`/ticket/list/${ticket.id}`} className="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click"
                                                            data-kt-menu-placement="bottom-end">{t('show')}</Link>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}