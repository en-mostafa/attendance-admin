import Department from "@/components/detail_case/Department";
import { getCaseDetails } from "@/services/case.server";

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<React.JSX.Element> {
  // تبدیل به عدد

  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const res = (id && (await getCaseDetails(+id))) || null;
  console.log("Res =>>>>", res);
  
  return (
    <Department caseID={id} invoiceDetail={res || []}/>
  );
};