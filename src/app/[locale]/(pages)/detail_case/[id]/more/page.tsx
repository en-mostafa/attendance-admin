import EditCase from "@/components/detail_case/EditCase";

export default async function More({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<React.JSX.Element> {
  const { id: idStr } = await params;
  // تبدیل به عدد
  const id = parseInt(idStr, 10);

  return (
    <EditCase caseID={id} />
  );
};
