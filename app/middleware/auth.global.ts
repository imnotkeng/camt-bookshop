// Every page except /signin needs a signed-in reader.
export default defineNuxtRouteMiddleware(to => {
  const { email } = useSession();
  if (!email.value && to.path !== '/signin') {
    return navigateTo('/signin');
  }
});
