import { Link } from "@/i18n/routing";
import NewChat from "./NewChat";
import { getTranslations } from "next-intl/server";

type Props = {
  users: Record<string, any>[];
};

const Sidebar: React.FC<Props> = async ({ users }) => {
  const t = await getTranslations('Public.Chat');

  return (
    <div
      className="flex-column flex-lg-row-auto w-100 w-lg-300px mb-10 mb-lg-0"
      style={{ height: "87vh" }}
    >
      <div
        className="card card-flush pt-4"
        style={{ height: "100%", position: "relative" }}
      >
        <div
          style={{
            overflowY: "auto",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {!users.length ? (
            <div className="mt-10 text-center">
              <img src="/5.png" alt="not-found" className="img-fluid w-100" />
              <p className="text-muted">{t("not_found_conversation")}</p>
            </div>
          ) : (
            users.map((user: any, index: number) => (
              <Link
                key={index}
                href={`/admin-chats?chat=${user.user.id}`}
                className="text-decoration-none text-dark"
                style={{ width: "full" }}
              >
                <div
                  key={index}
                  className="w-full d-flex justify-content-between gap-6"
                >
                  <div className="d-flex align-items-center flex-row-reverse flex-sm-row gap-3">
                    <div className="symbol symbol-45px symbol-circle">
                      <img
                        alt="Pic"
                        src={
                          user.user.profileImage
                            ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/${user.user.profileImage}`
                            : "/assets/media/avatars/blank.png"
                        }
                      />
                      {user.badge && (
                        <div className="symbol-badge bg-success start-0 top-100 border-4 h-8px w-8px ms-n2 mt-n2"></div>
                      )}
                    </div>
                    <div>
                      <span
                        className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2 text-start"
                        style={{ maxWidth: "120px" }}
                      >
                        {user.user.client?.lastName ||
                          user.user.client?.firstName ||
                          "user name"}
                      </span>
                      <div
                        className="fw-semibold text-muted text-truncate"
                        style={{ maxWidth: "120px" }}
                      >
                        {user.lastMessageText}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-end">
                    <span
                      className="text-muted fs-7 mb-1"
                      style={{ width: "max-content" }}
                    >
                      <div className="text-muted d-flex align-items-center justify-content-end gap-3 mt-3">
                        <small>{user.lastMessageCreatedAt.slice(11, 16)}</small>
                        <small className="badge badge-light-primary">
                          {user.lastMessageCreatedAt.slice(0, 10)}
                        </small>
                      </div>
                    </span>
                    {user.unreadCount != 0 ? (
                      <span
                        className="px-2"
                        style={{
                          backgroundColor: "gold",
                          borderRadius: "50px",
                        }}
                      >
                        {user.unreadCount}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        <NewChat />
      </div>
    </div>
  );
};

export default Sidebar;
