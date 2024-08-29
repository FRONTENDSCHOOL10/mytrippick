export function configRoutes(navigation) {
  return navigation.map((item) => {
    const route = { ...item };

    if (route.path === '/' && route.path === '') {
      route.index = true;
    }

    if (route.children) {
      route.children = configRoutes(route.children);
    }

    delete route.text;
    delete route.display;

    return route;
  });
}
