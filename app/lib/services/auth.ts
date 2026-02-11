import crypto from "crypto";
import { supabaseServer } from "@/app/lib/supabase/server";

function verifyPassword(password: string, storedHash: string): boolean {
  const [algorithm, saltHex, hashHex] = storedHash.split("$");
  if (algorithm !== "scrypt" || !saltHex || !hashHex) {
    return false;
  }
  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  const derived = crypto.scryptSync(password, salt, expected.length);
  return crypto.timingSafeEqual(expected, derived);
}

export async function validateCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const { data, error } = await supabaseServer
    .from("admin_users")
    .select("password_hash")
    .eq("email", email)
    .single();

  if (error || !data?.password_hash) {
    return false;
  }

  return verifyPassword(password, data.password_hash);
}
