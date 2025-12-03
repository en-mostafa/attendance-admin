"use client";

import { getAllAdmin } from "@/services/admin.server";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const NewChat = () => {
  const t = useTranslations("Public.Chat");
  const router = useRouter();
  const [admins, setAdmins] = useState<any>([]);
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllAdmin();
        setAdmins(data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleList = () => setShowList((prev) => !prev);

  const addParamToUrl = (id: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("chat", id.toString());
    router.push(`?${params}`);
    setShowList(false);
  };

  return (
    <>
      <button
        onClick={toggleList}
        type="button"
        className="btn btn-primary btn-sm px-2 py-2 rounded-pill d-inline-flex align-items-center"
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 1100,
        }}
      >
        <svg
          width={26}
          height={26}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6V12M12 12V18M12 12H18M12 12H6M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="visually-hidden">{t("new_chat")}</span>
      </button>

      {showList && (
        <div
          className="position-absolute border rounded shadow p-2"
          style={{
            width: 260,
            maxHeight: 300,
            overflowY: "auto",
            bottom: 70,
            right: 20,
            zIndex: 1050,
          }}
        >
          {loading ? (
            <div className="text-center py-3">
              <div className="spinner-border spinner-border-sm" role="status" />
            </div>
          ) : admins.length > 0 ? (
            <ul className="list-group border">
              {admins.map((admin: any) => (
                <li
                  key={admin.id}
                  className="list-group-item list-group-item-action"
                  style={{
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    borderColor: "gray",
                  }}
                  onClick={() => addParamToUrl(admin.client.id)}
                >
                  {admin.name ||
                    `${admin.client.firstName} ${admin.client.lastName}`}
                  <br />
                  <small style={{ fontSize: "10px", color: "gray" }}>
                    {admin.email}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-muted py-3">
              {t("not_found_admin")}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NewChat;
