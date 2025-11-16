export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) {
    const header = useResponseHeader('X-Engine');
    header.value = 'SaiJai-Laundry-Service';
  }
})