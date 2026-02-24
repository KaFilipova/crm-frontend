import { useState } from "react";
import { Link } from "react-router-dom";
import {
  WaveIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  SpinnerIcon,
} from "../components/ui/auth-icons";

const inputBase =
  "w-full rounded-lg border border-white/30 bg-white/5 py-2.5 pl-10 pr-4 text-white placeholder:text-white/50 transition-colors hover:border-white/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-white/30";

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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex min-h-full w-full flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-[420px] rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
          {/* Header */}
          <div className="mb-6 flex flex-col items-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/30 text-white">
              <WaveIcon />
            </div>
            <h1 className="text-2xl font-bold text-white">Войти в аккаунт</h1>
            <p className="mt-1 text-sm text-white/70">
              Добро пожаловать обратно
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
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
                  type="email"
                  placeholder="example@mail.com"
                  disabled={isLoading}
                  className={inputBase}
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className={labelBase}>
                  Пароль
                </label>
                <Link
                  to="/forgot-password"
                  className={`text-sm ${linkBase}`}
                >
                  Забыли пароль?
                </Link>
              </div>
              <div className="relative">
                <span className={iconLeft}>
                  <LockIcon />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
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

            <button
              type="submit"
              disabled={isLoading}
              className={buttonBase}
            >
              {isLoading ? (
                <>
                  <SpinnerIcon />
                  <span>Вход...</span>
                </>
              ) : (
                "Войти"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/70">
            Нет аккаунта?{" "}
            <Link to="/register" className={linkBase}>
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
