const ADMIN_EMAIL = "admin@repomotors.com";
const ADMIN_PASSWORD = "admin123";

export async function validateCredentials(
  email: string,
  password: string
): Promise<boolean> {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}
