export function getNavigationItems(navigation) {
  const filtered = navigation.filter((item) => item.display === undefined);
  const navigationItems = filtered.map(({ path, text }) => ({ path, text }));
  return navigationItems;
}
