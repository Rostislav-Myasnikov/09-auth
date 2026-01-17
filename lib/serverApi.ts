import { User } from "@/types/user";
import { serverApi } from "./api";
import { cookies } from "next/headers";

export async function fetchNotesServer(params: {
  page?: number;
  tag?: string;
  query?: string;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const cookie = [];
  if (accessToken) cookie.push(`accessToken=${accessToken}`);
  if (refreshToken) cookie.push(`refreshToken=${refreshToken}`);

  const { data } = await serverApi.get("/notes", {
    params: {
      page: params.page ?? 1,
      perPage: 12,
      ...(params.query && { search: params.query }),
      ...(params.tag && { tag: params.tag }),
    },
    headers: {
      Cookie: cookie.join("; "),
    },
  });

  return data;
}

export async function fetchNoteByIdServer(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const cookie = [];
  if (accessToken) cookie.push(`accessToken=${accessToken}`);
  if (refreshToken) cookie.push(`refreshToken=${refreshToken}`);
  const res = await serverApi.get(`/notes/${id}`, {
    headers: { Cookie: cookie.join("; ") },
  });
  return res.data;
}

export async function getMeServer(): Promise<User> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const cookie = [];
  if (accessToken) cookie.push(`accessToken=${accessToken}`);
  if (refreshToken) cookie.push(`refreshToken=${refreshToken}`);
  const res = await serverApi.get<User>(`/users/me`, {
    headers: {
      Cookie: cookie.join("; "),
    },
  });
  return res.data;
}

export async function checkSessionServer(){
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const cookie = [];
  if (accessToken) cookie.push(`accessToken=${accessToken}`);
  if (refreshToken) cookie.push(`refreshToken=${refreshToken}`);
  const res = await serverApi.get(`/auth/session`, {
    headers: {
      Cookie: cookie.join("; "),
    },
  });

  if (!res.data) {
    return null;
  }

  return res.data;
}

