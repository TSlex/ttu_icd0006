import router from '@/router'

export const routeIfCan = (route: string) => {
  if (!router.resolve(route)) {
    router.replace("/404")
  }
  if (router.currentRoute.path !== route) {
    router.replace(route)
  }
}
