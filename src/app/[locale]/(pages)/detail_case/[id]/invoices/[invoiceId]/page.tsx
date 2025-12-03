import DetailInvoice from "@/components/detail_case/DetailInvoice";
import { getCaseDetails } from "@/services/case.server";

export default async function DetailFactor({
  params,
}: {
  params: Promise<{ locale: string; invoiceId: string, id : string}>;
}): Promise<React.JSX.Element> {
  const {invoiceId: invoiceID, id} = await params
  const invoiceId = parseInt(invoiceID, 10);
  const res = (invoiceId && (await getCaseDetails(+id))) || null;
  console.log(res);
  
  return (
    <DetailInvoice invoiceId={invoiceId} invoice={res}/> 
  );
}
