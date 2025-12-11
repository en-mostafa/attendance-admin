"use client";

import { getUserNotifs } from "@/services/notif.server";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotifBox() {
  const [notifs, setNotifs] = useState<any>([]);

  useEffect(() => {
    apiCallGetNotif();
  }, []);

  const apiCallGetNotif = async () => setNotifs((await getUserNotifs()) || [])

  return (
    <>
      <Link
        href={'/ticket/list'}
        className="btn btn-icon btn-custom btn-color-gray-600 btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px position-relative"
        id="kt_drawer_chat_toggle"
      >
        <i className="ki-outline ki-notification-on fs-1"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge badge-circle badge-danger w-15px h-15px ms-n4 mt-3">
          {notifs ? notifs.unreadCount : ""}
        </span>
      </Link>
    </>
  );
}
