// types/ticket.type.ts
export type MessageType = {
  id: number;
  createdAt: string;
  file: FileType[];
  text: string;
  site: "admin" | "client";
  user: {
    id: number;
    profileImage: string | null;
    client: {
      id: number;
      firstName: string | null;
      lastName: string | null;
    };
  };
};

export type FileType = {
  id: number;
  path: string;
};
