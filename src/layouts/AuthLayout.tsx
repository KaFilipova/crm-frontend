import { Outlet } from "react-router-dom";
import authBg from "../assets/login-bg.png";

export default function AuthLayout() {
  return (
    <div
      className="fixed inset-0 flex min-h-screen w-full flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <Outlet />
      </div>
      <footer className="shrink-0 py-6 text-center">
        <p className="text-sm text-cyan-300/90">
          © 2026 Ocean App. Все права защищены.
        </p>
      </footer>
    </div>
  );
}
