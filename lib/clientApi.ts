import type { Note } from "@/types/note";
import type { User} from "@/types/user";
import { apiNext } from "./api";

export interface NewNote {
  title: string;
  content: string;
  tag: string;
}

export type FetchNotesParams = {
  tag?: string;
  query?: string;
  page?: number;
};

export interface FetchNoteResponse {
  notes: Note[];
  totalPages: number;
}

export type RegisterRequest = {
  email: string;
  password: string;
  userName?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type UpdateUser = {
    username: string
}

type SessionResponse = {
  success: boolean;
};

export async function fetchNotes({
  tag,
  query,
  page = 1,
}: FetchNotesParams): Promise<FetchNoteResponse> {
  const res = await apiNext.get<FetchNoteResponse>(`/notes`, {
    params: {
      page,
      perPage: 12,
      ...(query && { search: query }),
      ...(tag && { tag }),
    },
  });
  return res.data;
}

export async function createNote(userNote: NewNote): Promise<void> {
  await apiNext.post<void>(`/notes`, userNote);
}

export async function deleteNote(id: string): Promise<void> {
  await apiNext.delete<void>(`/notes/${id}`);
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await apiNext.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function register(body: RegisterRequest): Promise<User> {
  const { data } = await apiNext.post<User>(`/auth/register`, body);
  return data;
}

export async function login(body: LoginRequest): Promise<User> {
  const { data } = await apiNext.post<User>(`/auth/login`, body);
  return data;
}

export async function logout(): Promise<void> {
  await apiNext.post(`/auth/logout`);
}

export async function checkSession(): Promise<boolean> {
  const res = await apiNext.get<SessionResponse>(`/auth/session`);
  return res.data.success
}

export async function getMe() {
  const res = await apiNext.get(`/users/me`);
  return res.data;
}
export async function updateMe(data: UpdateUser) {
  const res = await apiNext.patch(`/users/me`, data);
  return res.data;
}
