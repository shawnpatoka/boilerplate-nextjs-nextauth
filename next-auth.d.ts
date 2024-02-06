import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    role: number;
    access_token?: string | undefined | unknown;
    user: {
      first_name: string | null | undefined | unknown;
      last_name: string | null | undefined | unknown;
      roles: number[] | null | undefined | unknown;
    }
  }

  interface User {
    id: string;
    role: number;
    first_name: string;
    last_name: string;
    roles: number[];
    access_token: string;
    error?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: number;
  }
}