import { StatusOption } from "./StatusOption";
import { localOnlyDate, localTime, weekDate } from "../../work_shift/TimeZone";
import { useJalaliFormat } from "@/services/formatDate";
import { useLocale } from "next-intl";

export default function Items({ item }: { item: any }) {
  const local = useLocale();

  return item?.data.map((data: any) => (
    <tr key={data.id}>
      <td>
        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 px-4">
          {weekDate(data.randomDate)}
        </span>
      </td>
      <td>
        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
          {localOnlyDate(data.randomDate)}
        </span>
      </td>
      <td>
        <span className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
          {new Date(data.randomDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </td>
      <td className="text-end px-8">
        <div className="d-flex align-items-center justify-content-end gap-20">
          <StatusOption id={data.id} status={data.status} />
        </div>
      </td>
    </tr>
  ));
}
