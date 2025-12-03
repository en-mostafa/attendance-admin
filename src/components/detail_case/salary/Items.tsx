import { Link } from "@/i18n/routing";
import { EditSalary } from "./Edit";
import { getLocale, getTranslations } from "next-intl/server";
import { pipeNumber } from "@/services/pipe";
import { useJalaliFormat } from "@/services/formatDate";

export default async function Items({ item }: { item: any}) {
  const t = await getTranslations("Public");
  const locale = await getLocale();

  return (
    <tr>
      <td className="text-center">
        <span className="fw-bold">{item?.user?.id}</span>
      </td>
      <td>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Link
            href={`/admin/${item?.user?.id}`}
            className="text-gray-900 fw-bold d-block mb-1 fs-6"
            target="_blank"
          >
            {item?.user?.client?.firstName} {item?.user?.client?.lastName}
          </Link>
        </div>
      </td>
      <td className="text-center">
        {pipeNumber(item?.amount)} {t("euro")}
      </td>
      <td className="text-center">
        <span
          className={
            "badge fs-7 fw-bold " +
            (item?.status === "failed"
              ? "badge-light-danger"
              : item?.status === "pending"
              ? "badge-light-warning"
              : "badge-light-success")
          }
        >
          {item?.status === "failed"
            ? t("Status.incomplete")
            : item?.status === "pending"
            ? t("Status.un_settled")
            : t("Status.settled")
          }
        </span>
      </td>
      <td className="text-center">{useJalaliFormat(item?.createdAt, locale)}</td>
      <td className="text-center">
        <div>
          <EditSalary key={item} data={item} />
        </div>
      </td>
    </tr>
  );
}
