import { AuthStatus, useAuthStatus } from "../../lib/store/auth/authSlice";
import SearchPage from "../search/SearchPage";
import SplashPage from "../splash/Splash";

export default function HomePage() {
  const status = useAuthStatus();

  switch (status) {
    case AuthStatus.Authenticated:
      return <SearchPage />;
    case AuthStatus.Idle:
    case AuthStatus.Loading:
      return null;
    default:
      return <SplashPage />;
  }
}
