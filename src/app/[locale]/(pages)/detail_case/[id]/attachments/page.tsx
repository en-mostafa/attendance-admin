import Attachments from "@/components/detail_case/Attachs";

export default async function Attachment({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<React.JSX.Element> {
  // تبدیل به عدد
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);

  return (
    <Attachments caseId={id} />
  );
};