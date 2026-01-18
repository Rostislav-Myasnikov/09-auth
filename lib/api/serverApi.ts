import { User } from "@/types/user";
import { serverApi } from "@/lib/api/api";
import { cookies } from "next/headers";

export async function fetchNotesServer(params: {
  page?: number;
  tag?: string;
  query?: string;
}) {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const { data } = await serverApi.get("/notes", {
    params: {
      page: params.page ?? 1,
      perPage: 12,
      ...(params.query && { search: params.query }),
      ...(params.tag && { tag: params.tag }),
    },
    headers: {
      Cookie: cookieString,
    },
  });

  return data;
}

export async function fetchNoteByIdServer(id: string) {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();
  
  const res = await serverApi.get(`/notes/${id}`, {
    headers: { 
      Cookie: cookieString
    },
  });
  return res.data;
}

export async function getMeServer(): Promise<User> {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const res = await serverApi.get<User>(`/users/me`, {
    headers: {
      Cookie: cookieString,
    },
  });
  return res.data;
}

export async function checkSessionServer() {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const res = await serverApi.get(`/auth/session`, {
    headers: {
      Cookie: cookieString,
    },
  });

  return res;
}