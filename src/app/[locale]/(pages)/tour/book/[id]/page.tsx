import { ButtonSubmit } from "@/components/tour/book/Button";
import { Form } from "@/components/tour/book/Form";
import { BookStatus } from "@/components/tour/book/Status";
import { DownloadLink } from "@/components/ui/DownloadLink";
import { Link } from "@/i18n/routing";
import { getData } from "@/services/fetchData";
import { useJalaliFormat } from "@/services/formatDate";
import { pipeNumber } from "@/services/pipe";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Page({ 
    params 
}: { 
    params: Promise<{ id: string }> }
){
    const { id } = await params;
    const locale = await getLocale();
    const data = await getData(`/payment/product/tour/${id}`);
    const t = await getTranslations('Public');
    console.log(data)

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div id="kt_app_toolbar" className="app-toolbar pt-5 pt-lg-10">
                <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack flex-wrap">
                    <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                        <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                            <h1 className="page-heading d-flex flex-column justify-content-center text-gray-900 fw-bold fs-3 m-0">{t('detail_order')}</h1>
                        </div>
                        <div className="d-flex align-items-center gap-2 gap-lg-3">
                            <Link href="/tour/book">
                                <i className="ki-duotone ki-arrow-left fs-1">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                </i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="d-flex flex-column gap-7 gap-lg-10">
                        <div className="d-flex flex-column flex-xl-row gap-7 gap-lg-10">
                            <div className="card card-flush py-4 flex-row-fluid">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>{t('detail_order')} ({data?.id}#)</h2>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="table-responsive">
                                        <table className="table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px">
                                            <tbody className="fw-semibold text-gray-600">
                                                <tr>
                                                    <td className="text-muted">
                                                        <div className="d-flex align-items-center">
                                                        <i className="ki-outline ki-calendar fs-2 me-2"></i>{t('bought_date')}</div>
                                                    </td>
                                                    <td className="fw-bold text-end">{useJalaliFormat(data?.paiedAt, locale)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-muted">
                                                        <div className="d-flex align-items-center">
                                                        <i className="ki-outline ki-wallet fs-2 me-2"></i>{t('Tour.method_pay')}</div>
                                                    </td>
                                                    <td className="fw-bold text-end">{data?.paiedType === 'ATM' ? t('card_to_card') : t('currency')}</td>
                                                </tr>
                                                {data?.paiedType === 'ATM' ? (
                                                    <tr>
                                                        <td className="text-muted">
                                                        <div className="d-flex align-items-center">
                                                        <i className="ki-outline ki-cheque fs-2 me-2"></i>
                                                        {t('transaction_receipt')}</div>
                                                        </td>
                                                        <td className="fw-bold text-end">
                                                            <DownloadLink url={process.env.NEXT_PUBLIC_API_BACKEND_URL + "/" + data?.filePath} fileName={data?.filePath}/>
                                                        </td>
                                                    </tr>
                                                ): (
                                                    <tr>
                                                        <td className="text-muted">
                                                            <div className="d-flex align-items-center">
                                                            <i className="ki-outline ki-cheque fs-2 me-2"></i>
                                                        {t('text_id')}</div>
                                                        </td>
                                                        <td className="fw-bold text-end">{data?.textId ?? '--'}</td>
                                                    </tr>
                                                )}
                                              
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-flush py-4 flex-row-fluid">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>{t('customer_detail')}</h2>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="table-responsive">
                                        <table className="table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px">
                                            <tbody className="fw-semibold text-gray-600">
                                                <tr>
                                                    <td className="text-muted">
                                                        <div className="d-flex align-items-center">
                                                        <i className="ki-outline ki-profile-circle fs-2 me-2"></i>{t('customer')}</div>
                                                    </td>
                                                    <td className="fw-bold text-end">
                                                        <div className="d-flex align-items-center justify-content-end">
                                                            <Link href={`/users/${data?.user.id}`} className="text-gray-600 text-hover-primary">{data?.user.client.firstName + " " + data?.user.client.lastName}</Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-muted">
                                                        <div className="d-flex align-items-center">
                                                        <i className="ki-outline ki-sms fs-2 me-2"></i>{t('email')}</div>
                                                    </td>
                                                    <td className="fw-bold text-end">
                                                        <a href="apps/user-management/users/view.html" className="text-gray-600 text-hover-primary">{data?.user.email}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-muted">
                                                        <div className="d-flex align-items-center">
                                                        <i className="ki-outline ki-phone fs-2 me-2"></i>{t('telephone')}</div>
                                                    </td>
                                                    <td className="fw-bold text-end" dir="ltr">{data?.user.cellphone}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-flush py-4 flex-row-fluid">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>{t('Tour.tour_details')}</h2>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="table-responsive">
                                        <table className="table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px">
                                            <tbody className="fw-semibold text-gray-600">
                                                <tr>
                                                    <td className="text-muted">
                                                        <div className="d-flex align-items-center">
                                                            <i className="ki-outline ki-route fs-2 me-2"></i>
                                                            {t('Tour.tour_title')}
                                                        </div>
                                                    </td>
                                                    <td className="fw-bold text-end">
                                                        <Link href={`/tour/list/${data?.items.id}`} className="text-gray-600 text-hover-primary">{data?.items.title}</Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-muted">
                                                        <div className="d-flex align-items-center">
                                                            <i className="ki-outline ki-calendar fs-2 me-2"></i>
                                                            {t('Tour.start_date')}
                                                        </div>
                                                    </td>
                                                    <td className="fw-bold text-end">
                                                        <span className="fw-bold text-end">{useJalaliFormat(data?.items.startDate, locale)}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-muted">
                                                        <div className="d-flex align-items-center">
                                                            <i className="ki-outline ki-calendar fs-2 me-2"></i>
                                                            {t('Tour.return_date')}
                                                        </div>
                                                    </td>
                                                    <td className="fw-bold text-end">
                                                        <span className="fw-bold text-end">{useJalaliFormat(data?.items.endDate, locale)}</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-content">
                            <Form>
                                <input type="hidden" name="id" defaultValue={data?.id} />
                                <div className="tab-pane fade show active" id="kt_ecommerce_sales_order_summary" role="tab-panel">
                                    <div className="d-flex flex-column gap-7 gap-lg-10">
                                        <div className="d-flex flex-column flex-xl-row gap-7 gap-lg-10">
                                            <div className="card card-flush py-4 flex-row-fluid position-relative">
                                                <div className="card-header">
                                                    <div className="card-title">
                                                        <h2>{t('Tour.departure_time')}</h2>
                                                    </div>
                                                </div>
                                                <div className="card-body pt-0">
                                                    <input 
                                                        type="text" 
                                                        name="startTime"
                                                        defaultValue={data?.options?.optionOne}
                                                        className="form-control" 
                                                        placeholder={t('Tour.departure_time_example')}
                                                    />
                                                </div>
                                            </div>
                                            <div className="card card-flush py-4 flex-row-fluid position-relative">
                                                <div className="card-header">
                                                    <div className="card-title">
                                                        <h2>{t('Tour.departure_location')}</h2>
                                                    </div>
                                                </div>
                                                <div className="card-body pt-0">
                                                    <input 
                                                        type="text" 
                                                        name="startLocation"
                                                        defaultValue={data?.options?.optionTwo}
                                                        className="form-control" 
                                                        placeholder={t('Tour.enter_departure_location')}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column flex-xl-row gap-7 gap-lg-10">
                                            <div className="card card-flush py-4 flex-row-fluid position-relative w-100">
                                                <div className="card-header">
                                                    <div className="card-title">
                                                        <h2>{t('Tour.order_description')}</h2>
                                                    </div>
                                                </div>
                                                <div className="card-body pt-0">
                                                    <input 
                                                        type="text" 
                                                        name="description"
                                                        defaultValue={data?.options?.optionThree}
                                                        className="form-control" 
                                                        placeholder={t('Tour.enter_order_description')}
                                                    />
                                                </div>
                                            </div>
                                            <div className="card card-flush py-4 flex-row-fluid position-relative w-100">
                                                <div className="card-header">
                                                    <div className="card-title">
                                                        <h2>{t('Tour.order_status')}</h2>
                                                    </div>
                                                </div>
                                                <BookStatus data={data}/>
                                            </div>
                                        </div>

                                        <div className="card card-flush py-4 flex-row-fluid overflow-hidden">
                                            <div className="card-header">
                                                <div className="card-title">
                                                    <h2>{t('Tour.info_person')}</h2>
                                                </div>
                                            </div>
                                            <div className="card-body pt-0">
                                                <div className="table-responsive">
                                                    <table className="table align-middle table-row-dashed fs-6 gy-5 mb-0">
                                                        <thead>
                                                            <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                                                                <th className="min-w-175px">{t('user_name')}</th>
                                                                <th className="min-w-100px text-end">{t('national_code')}</th>
                                                                <th className="min-w-70px text-end">{t('contact_number')}</th>
                                                                <th className="min-w-100px text-end">{t('Tour.passport_number')}</th>
                                                                <th className="min-w-100px text-end"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="fw-semibold text-gray-600">
                                                            {data?.people.map((item:any) => 
                                                                <tr key={item.id}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <div>
                                                                                <div className="fw-bold text-gray-600 text-hover-primary">{item.firstName + " " + item.lastName}</div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-end">{item.nationalCode}</td>
                                                                    <td className="text-end" dir="ltr">{item.phoneNumber}</td>
                                                                    <td className="text-end">{item.passportNumber}</td>
                                                                </tr>
                                                            )}
                                                            <tr>
                                                                <td className="text-start fw-bold fs-3 text-black">{t('Tour.payment_details')}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={4} className="text-end">{t('Tour.total_amount')}</td>
                                                                <td className="text-end">{pipeNumber(data?.pureAmount)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={4} className="text-end">{t('Tour.total_discount')}({data?.discount}%)</td>
                                                                <td className="text-end">{pipeNumber(data?.discountPrice)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={4} className="text-end">{t('Tour.total_tax')}({data?.tax}%)</td>
                                                                <td className="text-end">{pipeNumber(data?.taxPrice)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={4} className="fs-3 text-gray-900 text-end">{t('Tour.total_payment')}</td>
                                                                <td className="text-gray-900 fs-3 fw-bolder text-end">{pipeNumber(data?.amount)}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 d-flex justify-content-end">
                                    <ButtonSubmit />
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}