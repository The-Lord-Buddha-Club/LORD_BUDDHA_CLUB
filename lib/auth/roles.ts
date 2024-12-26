export type Role = 'owner' | 'admin' | 'member';

export interface Permission {
  action: string;
  subject: string;
}

const rolePermissions: Record<Role, Permission[]> = {
  owner: [
    { action: 'manage', subject: 'all' },
    { action: 'transfer', subject: 'ownership' },
    { action: 'manage', subject: 'admins' },
  ],
  admin: [
    { action: 'manage', subject: 'posts' },
    { action: 'manage', subject: 'projects' },
    { action: 'manage', subject: 'members' },
  ],
  member: [
    { action: 'read', subject: 'posts' },
    { action: 'create', subject: 'posts' },
    { action: 'manage', subject: 'own_posts' },
  ],
};

export function can(userRole: Role, action: string, subject: string): boolean {
  const permissions = rolePermissions[userRole];
  return permissions.some(
    permission =>
      (permission.action === action || permission.action === 'manage') &&
      (permission.subject === subject || permission.subject === 'all')
  );
}