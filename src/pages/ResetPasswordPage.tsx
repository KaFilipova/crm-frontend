import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  WaveIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  SpinnerIcon,
} from "../components/ui/auth-icons";

const inputWithIconRight =
  "w-full rounded-lg border border-white/30 bg-white/5 py-2.5 pl-10 pr-10 text-white placeholder:text-white/50 transition-colors hover:border-white/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-white/30";

const labelBase = "mb-1.5 block text-sm font-medium text-white";

const iconLeft = "absolute left-3 top-1/2 -translate-y-1/2 text-white/70";

const iconRight =
  "absolute right-3 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white focus:text-white";

const linkBase =
  "font-medium text-cyan-400 transition-colors hover:text-cyan-300 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-transparent rounded";

const buttonBase =
  "flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 py-3 font-semibold text-white shadow-lg shadow-cyan-500/25 transition-opacity hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: API call to reset password with token
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-full w-full flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center px-4 py-8">
          <div className="w-full max-w-[420px] rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/30 text-white">
                <WaveIcon />
              </div>
              <h1 className="text-center text-2xl font-bold text-white">
                Пароль изменён
              </h1>
              <p className="mt-2 text-center text-sm text-white/70">
                Ваш пароль успешно обновлён. Теперь вы можете войти в аккаунт.
              </p>
            </div>

            <Link
              to="/login"
              className="block w-full rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 py-3 text-center font-semibold text-white shadow-lg shadow-cyan-500/25 transition-opacity hover:opacity-95"
            >
              Войти
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex min-h-full w-full flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center px-4 py-8">
          <div className="w-full max-w-[420px] rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/30 text-white">
                <WaveIcon />
              </div>
              <h1 className="text-center text-2xl font-bold text-white">
                Недействительная ссылка
              </h1>
              <p className="mt-2 text-center text-sm text-white/70">
                Ссылка для сброса пароля недействительна или истекла. Запросите
                новую ссылку.
              </p>
            </div>

            <Link to="/forgot-password" className={`block text-center ${linkBase}`}>
              Запросить ссылку снова
            </Link>
            <p className="mt-4 text-center text-sm text-white/70">
              <Link to="/login" className={linkBase}>
                Вернуться к входу
              </Link>
            </p>
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
            <h1 className="text-2xl font-bold text-white">Новый пароль</h1>
            <p className="mt-1 text-center text-sm text-white/70">
              Введите новый пароль для вашего аккаунта
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className={labelBase}>
                Новый пароль
              </label>
              <div className="relative">
                <span className={iconLeft}>
                  <LockIcon />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  required
                  minLength={6}
                  disabled={isLoading}
                  className={inputWithIconRight}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                  className={iconRight}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelBase}>
                Подтвердите пароль
              </label>
              <div className="relative">
                <span className={iconLeft}>
                  <LockIcon />
                </span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••"
                  required
                  minLength={6}
                  disabled={isLoading}
                  className={inputWithIconRight}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  disabled={isLoading}
                  aria-label={
                    showConfirmPassword ? "Скрыть пароль" : "Показать пароль"
                  }
                  className={iconRight}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon />
                  ) : (
                    <EyeIcon />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className={buttonBase}>
              {isLoading ? (
                <>
                  <SpinnerIcon />
                  <span>Сохранение...</span>
                </>
              ) : (
                "Сохранить пароль"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/70">
            <Link to="/login" className={linkBase}>
              Вернуться к входу
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
