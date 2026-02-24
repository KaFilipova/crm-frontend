import { useState } from "react";
import { Link } from "react-router-dom";
import { WaveIcon, MailIcon, SpinnerIcon } from "../components/ui/auth-icons";

const inputBase =
  "w-full rounded-lg border border-white/30 bg-white/5 py-2.5 pl-10 pr-4 text-white placeholder:text-white/50 transition-colors hover:border-white/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-white/30";

const labelBase = "mb-1.5 block text-sm font-medium text-white";

const iconLeft = "absolute left-3 top-1/2 -translate-y-1/2 text-white/70";

const linkBase =
  "font-medium text-cyan-400 transition-colors hover:text-cyan-300 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-transparent rounded";

const buttonBase =
  "flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 py-3 font-semibold text-white shadow-lg shadow-cyan-500/25 transition-opacity hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: API call to send reset link
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-full w-full flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center px-4 py-8">
          <div className="w-full max-w-[420px] rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/30 text-white">
                <WaveIcon />
              </div>
              <h1 className="text-center text-2xl font-bold text-white">
                Проверьте почту
              </h1>
              <p className="mt-2 text-center text-sm text-white/70">
                Если аккаунт с указанным email существует, мы отправили на него
                ссылку для сброса пароля.
              </p>
            </div>

            <Link to="/login" className={`block text-center ${linkBase}`}>
              Вернуться к входу
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full w-full flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-[420px] rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
          <div className="mb-6 flex flex-col items-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/30 text-white">
              <WaveIcon />
            </div>
            <h1 className="text-2xl font-bold text-white">
              Восстановление пароля
            </h1>
            <p className="mt-1 text-center text-sm text-white/70">
              Введите email, и мы отправим ссылку для сброса пароля
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className={labelBase}>
                Электронная почта
              </label>
              <div className="relative">
                <span className={iconLeft}>
                  <MailIcon />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@mail.com"
                  required
                  disabled={isLoading}
                  className={inputBase}
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className={buttonBase}>
              {isLoading ? (
                <>
                  <SpinnerIcon />
                  <span>Отправка...</span>
                </>
              ) : (
                "Отправить ссылку"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/70">
            Вспомнили пароль?{" "}
            <Link to="/login" className={linkBase}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
