/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { safeParse } from "../utils/format";

/*
 * Demo authentication — everything lives in this browser's localStorage.
 * There is no server, so this is NOT secure authentication. Passwords are
 * hashed (SHA-256) rather than stored in plain text, but a real deployment
 * needs a proper backend.
 */
const USERS_KEY = "registeredUsers";
const LEGACY_USER_KEY = "registeredUser";
const SESSION_KEY = "user";

const AuthContext = createContext(null);

async function hash(text) {
  if (!globalThis.crypto?.subtle) return text;
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

function readUsers() {
  const users = safeParse(localStorage.getItem(USERS_KEY), []);
  const list = Array.isArray(users) ? users : [];
  // Carry over the account created by the original version of the site.
  const legacy = safeParse(localStorage.getItem(LEGACY_USER_KEY), null);
  if (legacy?.email && !list.some((u) => u.email === legacy.email.toLowerCase())) {
    list.push({
      firstName: legacy.firstName,
      lastName: legacy.lastName,
      email: legacy.email.toLowerCase(),
      legacyPassword: legacy.password,
    });
  }
  return list;
}

const publicUser = ({ firstName, lastName, email }) => ({ firstName, lastName, email });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = safeParse(localStorage.getItem(SESSION_KEY), null);
    return saved?.email ? publicUser(saved) : null;
  });

  const signUp = useCallback(async ({ firstName, lastName, email, password }) => {
    await wait(500);
    const users = readUsers();
    const normalized = email.trim().toLowerCase();
    if (users.some((u) => u.email === normalized)) {
      return { ok: false, error: "An account with this email already exists." };
    }
    users.push({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalized,
      passwordHash: await hash(password),
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { ok: true };
  }, []);

  const signIn = useCallback(async (email, password) => {
    await wait(500);
    const normalized = email.trim().toLowerCase();
    const found = readUsers().find((u) => u.email === normalized);
    const valid =
      found &&
      (found.passwordHash
        ? found.passwordHash === (await hash(password))
        : found.legacyPassword === password);
    if (!valid) return { ok: false, error: "Incorrect email or password." };
    const session = publicUser(found);
    setUser(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true };
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const value = useMemo(() => ({ user, signUp, signIn, signOut }), [user, signUp, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
