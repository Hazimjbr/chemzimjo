// Admin Configuration
// List of email addresses that have admin access

export const ADMIN_EMAILS = [
    'h75jbr@gmail.com',
];

export function isAdmin(email: string | null | undefined): boolean {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email.toLowerCase());
}
