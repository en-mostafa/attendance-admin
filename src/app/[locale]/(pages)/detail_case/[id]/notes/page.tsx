import Notes from "@/components/detail_case/Notes";

export default async function CaseNotesPanel({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<React.JSX.Element> {
  const { id: idStr } = await params;
  // تبدیل به عدد
  const id = parseInt(idStr, 10);

  return (
    <Notes caseID={id} />
  );
};