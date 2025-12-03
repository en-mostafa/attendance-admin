import { AddAlarm } from "@/components/notif/alarm/Add";
import { DeleteAlarm } from "@/components/notif/alarm/Delete";
import { EditAlarm } from "@/components/notif/alarm/Edit";
import { GetTime } from "@/components/notif/alarm/GetTime";
import NodataItems from "@/components/ui/NodataItems";
import { getData } from "@/services/fetchData";
import { getTranslations } from "next-intl/server";

export default async function Alarm() {
  const data = await getData('/reminder')
  const t = await getTranslations('Public');
  return (
    <div className="container py-4 mt-10">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>{t('alarms_list')}</h3>
        <AddAlarm />
      </div>

        <div className="table-responsive">
          <table className="table align-middle table-row-dashed gy-4 text-center">
            <thead className="bg-light">
              <tr className="fw-bold text-muted">
                <th>{t('id')}</th>
                <th>{t('title')}</th>
                <th>{t('send_time')}</th>
                <th>{t('status')}</th>
                <th className="text-end px-14">{t('operation')}</th>
              </tr>
            </thead>
            <tbody>
                {data?.map((notif: any) => (
                    <tr key={notif.id}>
                        <td>{notif.id}</td>
                        <td>{notif.title}</td>
                        <td>
                          <GetTime time={notif.time}/>
                        </td>
                        <td>
                        <span
                            className={`badge badge-light-${
                            notif.readAt === null
                                ? "success"
                                : "danger"
                            }`}
                        >
                          {notif.readAt ? t('inactive') : t('active') }
                        </span>
                        </td>
                        <td>
                          <div className="d-flex justify-content-end">
                            <EditAlarm notif={notif}/>
                            <DeleteAlarm id={notif?.id}/>
                          </div>
                        </td>
                    </tr>
                ))}
                { data?.length === 0 && <NodataItems colSpan={6}/> }
            </tbody>
          </table>
        </div>
      
    </div>
  );
}
