import Invoices from "@/components/detail_case/Invoices";

export default async function InvoicesPage ({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<React.JSX.Element> {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  return(
    <Invoices caseID={id}/>
  )
};