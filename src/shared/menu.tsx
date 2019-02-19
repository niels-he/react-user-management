export function getLeftMenuData(isAdmin: boolean) {
  const sharedMenuData = [
    {
      title: 'Profile',
      key: 'profile',
      url: '/profile',
      icon: 'icmn icmn-user'
    },
    {
      title: 'Dashboard',
      key: 'dashboard',
      url: '/dashboard',
      icon: 'icmn icmn-home'
    }
  ];

  const adminMenuData = [
    {
      divider: true
    },
    {
      title: 'Users',
      key: 'users',
      url: '/admin/users',
      icon: 'icmn icmn-users'
    }
  ];
  const logoutMenuData = [
    {
      divider: true
    },
    {
      title: 'Logout',
      key: 'logout',
      url: '/logout',
      icon: 'icmn icmn-exit'
    }
  ];

  if (isAdmin) {
    return [...sharedMenuData, ...adminMenuData, ...logoutMenuData];
  } else {
    return [...sharedMenuData, ...logoutMenuData];
  }
}
export async function getTopMenuData() {
  return [];
}
