// Who is signed in. Kept in sessionStorage, so every Playwright browser context starts
// signed out. (The app is client-rendered — ssr: false — so sessionStorage always exists.)

const KEY = 'bookshop.session';

export function useSession() {
  const email = useState<string | null>('session', () => sessionStorage.getItem(KEY));

  function signIn(value: string): void {
    email.value = value;
    sessionStorage.setItem(KEY, value);
  }

  function signOut(): void {
    sessionStorage.clear();
    email.value = null;
    useCart().clear();
  }

  return { email, signIn, signOut };
}
