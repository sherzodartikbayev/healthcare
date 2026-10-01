import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/input.tsx";
import Button from "../components/ui/button.tsx";
import { useLogin } from "../hooks/useAuth.ts";
import { useAuthStore } from "../stores/auth.store.ts";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useAuthStore((state) => state.setUser);
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login({ email: email.trim(), password },
      {
        onSuccess: ({ user }) => {
          setUser(user);
          navigate("/", { replace: true });
          toast.success("Dasturga muvaffaqiyatli kirdingiz!")
        },

        onError: () => {
          toast.error("Email yoki parol noto'g'ri");
        },
      }
    );
  };

  return (
    <section className="login-bg">
      <div className="container h-screen d-flex px-5">
        <div className="md:p-8 md:py-10 py-8 px-5 border-2 border-gray rounded-4xl bg-white">
          <h3 className="font-bold text-black md:text-2xl text-xl text-center">Kirish</h3>
          <p className="md:text-base text-xs text-gray mb-5">
            Iltimos dasturga kirish uchun login va parolni kiriting
          </p>

          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              icon="/icons/user.svg"
              placeholder="Email manzilingizni kiriting"
              className="mb-3"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isPending}
              autoComplete="email"
              required
            />

            <Input
              label="Parol"
              type="password"
              icon="/icons/lock.svg"
              placeholder="Parolingizni kiriting"
              className="mb-3"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isPending}
              autoComplete="current-password"
              minLength={8}
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full d-flex"
              disabled={isPending}
            >
              <span className="text-center md:text-base text-sm">
                {isPending ? "Kirish..." : "Kirish"}
              </span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
