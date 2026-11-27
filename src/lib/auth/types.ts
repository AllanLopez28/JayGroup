export interface SignInInput {
  email: string;
  password: string;
  remember: boolean;
}

export type SignInFieldErrors = Partial<Record<"email" | "password", string>>;

export type SignInResult =
  | { ok: true; session: Session }
  | {
      ok: false;
      error: "invalid_input" | "invalid_credentials" | "unavailable";
      fieldErrors?: SignInFieldErrors;
    };

export interface Session {
  id: string;
  email: string;
  createdAt: number;
  expiresAt: number;
}

export interface AuthProvider {
  signIn(input: SignInInput): Promise<SignInResult>;
  verifySession(id: string): Promise<Session | null>;
  signOut(id: string): Promise<void>;
}

export type SignInActionState =
  | { status: "idle" }
  | { status: "success"; redirectTo: string }
  | {
      status: "error";
      message?: string;
      fieldErrors?: SignInFieldErrors;
      seq: number;
    };
