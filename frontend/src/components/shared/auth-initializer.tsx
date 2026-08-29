import { useEffect } from "react";
import { getMe } from "../../api/auth.api.ts";
import { useAuthStore } from "../../stores/auth.store";

const AuthInitializer = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser, setLoading]);

  return null;
};

export default AuthInitializer;
