"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Tabs = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Public');

  const tabs = [
    { path: `more`, label: t('details') },
    { path: `notes`, label: t('notes') },
    { path: `logs`, label: t('logs') },
    { path: `additional`, label: t('additional') },
    { path: `attachments`, label: t('attachments') },
    { path: `invoices`, label: t('invoices') },
    { path: `department`, label: t('department') },
    { path: `reminder`, label: t('reminder') },
    { path: `salary`, label: t('salary') }
   
  ];

  const addTabToUrl = (path: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", path);
    router.push(`?${params}`)
  };

  return (
    <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
      {tabs.map((item, index) => {
        const isActive = pathname.includes(item.path);
        return (
          <li key={index} className="nav-item mt-2">
            <Link
              onClick={() => addTabToUrl(item.path)}
              className={`nav-link text-active-primary ms-0 me-10 py-5 ${
                isActive ? "active" : ""
              }`}
              href={item.path}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Tabs;
