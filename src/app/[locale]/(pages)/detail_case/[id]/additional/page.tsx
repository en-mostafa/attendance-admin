// app/[locale]/(pages)/detail_case/[id]/additional/page.tsx
import Additional from "@/components/detail_case/Additional";

export default async function AdditionalPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<React.JSX.Element> {
  // اول پارامترها را await می‌کنیم
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);

  return <Additional caseId={id} />;
}
