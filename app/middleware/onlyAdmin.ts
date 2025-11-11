import { authClient } from '~/utils/auth-client'

export default defineNuxtRouteMiddleware(async () => {
  const options = import.meta.server
    ? { fetchOptions: { headers: useRequestHeaders(['cookie']) } }
    : undefined

  const session = await authClient.getSession(options)
  console.log("Session: ", session)

  if (session.error) {
    console.error('Failed to retrieve session', session.error)
    return navigateTo('/')
  }

  const user = session.data?.user
  const role = (user as { role?: string })?.role

  if (!user || role !== 'ADMIN') {
    return navigateTo('/')
  }

  if(user && role === 'ADMIN'){
    return navigateTo('/admin')
  }
})
