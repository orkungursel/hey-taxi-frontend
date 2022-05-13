import { FC, useCallback } from "react";

import { LoggedInUserCard } from "../../components/shared/LoggedInUserCard";
import { useAppDispatch } from "../../lib/store";
import { LogoutAsync, useAuth } from "../../lib/store/auth/authSlice";

interface HeaderUserCardProps {}

export const HeaderUserCard: FC<HeaderUserCardProps> = () => {
  const dispatch = useAppDispatch();
  const auth = useAuth();

  const logout = useCallback(() => {
    dispatch(LogoutAsync());
  }, [dispatch]);

  if (!auth.user) {
    return null;
  }

  return (
    <LoggedInUserCard
      bigTitle={auth.user.email}
      subtitle={auth.user.role}
      avatar={{
        src: auth.user.avatar,
        alt: auth.user.email,
      }}
      onClick={logout}
      arrow
    />
  );
};
