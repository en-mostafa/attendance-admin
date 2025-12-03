import Reminders from "@/components/detail_case/Reminder";

export default async function Reminder({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<React.JSX.Element> {
  // تبدیل به عدد

  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  
  return (
    <Reminders caseId={id}/>
  );
};