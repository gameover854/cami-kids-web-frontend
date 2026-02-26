"use client";

import { login } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@cami.local");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace("/admin");
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await login({ email, password });
      const token = res?.data?.token;

      if (!token) {
        setError("Dang nhap that bai. Vui long thu lai.");
        return;
      }

      localStorage.setItem("token", token);
      document.cookie = `auth_token=${token}; path=/; max-age=${8 * 60 * 60}; samesite=lax`;
      router.push("/admin");
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      const message =
        errorObj?.response?.data?.message ||
        "Dang nhap that bai. Vui long thu lai.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -right-[10%] top-[40%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="z-10 flex min-h-screen w-full items-center justify-center p-4">
        <div className="w-full max-w-[440px] overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-[#182429] dark:ring-white/10">
          <div
            className="relative flex h-40 flex-col justify-end overflow-hidden bg-[#111618]"
            style={{
              backgroundImage:
                'linear-gradient(0deg, rgba(24, 36, 41, 1) 0%, rgba(0, 0, 0, 0) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxXVErEg3-UttsEc9IVd0LupVatdF-Ywb9gdvTBkcoole2TDvEY-8uqoK8vNqpCe6npLVGiLzpr577OK2kohp23SThm_dVPhhJHVa_v2byountcu-0LHqblYLpXwYgIqOLnbyzA7CubEaEojU6-wTIRq_S2uejJJH3iB2xZEcQKfBPddFRi4cVWOOnFaYbvjRdKoKUo43KGSRU7dLd2_Oe9ThMxh0XG0t8m8vJTdVJCnvW_WuppD-WKDJPgE9MTuY_gji0i5UZ36Fw")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10 flex flex-col px-6 pb-4">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined">checkroom</span>
              </div>
              <p className="text-[22px] font-bold leading-tight tracking-tight text-white">
                Admin Dashboard
              </p>
            </div>
          </div>

          <div className="flex flex-col px-6 py-6 pt-2">
            <div className="mb-6">
              <h3 className="pb-1 text-xl font-bold leading-tight tracking-tight text-[#111418] dark:text-white">
                Chao mung tro lai!
              </h3>
              <p className="text-sm font-normal leading-normal text-[#637588] dark:text-[#9db2b9]">
                Vui long dang nhap de quan ly cua hang thoi trang.
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <label className="flex flex-col">
                <p className="pb-2 text-sm font-medium leading-normal text-[#111418] dark:text-white">
                  Email hoac ten dang nhap
                </p>
                <div className="flex w-full items-stretch overflow-hidden rounded-lg bg-white ring-1 ring-[#dce0e5] transition-shadow focus-within:ring-2 focus-within:ring-primary dark:bg-[#101d22] dark:ring-[#3b4d54]">
                  <input
                    className="h-12 w-full flex-1 border-none bg-transparent px-4 text-base font-normal leading-normal text-[#111418] placeholder:text-[#637588] focus:outline-none focus:ring-0 dark:text-white dark:placeholder:text-[#6f828a]"
                    placeholder="admin@kidfashion.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="flex items-center justify-center px-4 pl-2 text-[#637588] dark:text-[#6f828a]">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                </div>
              </label>

              <label className="flex flex-col">
                <div className="flex items-center justify-between pb-2">
                  <p className="text-sm font-medium leading-normal text-[#111418] dark:text-white">
                    Mat khau
                  </p>
                </div>
                <div className="flex w-full items-stretch overflow-hidden rounded-lg bg-white ring-1 ring-[#dce0e5] transition-shadow focus-within:ring-2 focus-within:ring-primary dark:bg-[#101d22] dark:ring-[#3b4d54]">
                  <input
                    className="h-12 w-full flex-1 border-none bg-transparent px-4 text-base font-normal leading-normal text-[#111418] placeholder:text-[#637588] focus:outline-none focus:ring-0 dark:text-white dark:placeholder:text-[#6f828a]"
                    placeholder="Nhap mat khau"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    className="flex cursor-pointer items-center justify-center px-4 pl-2 text-[#637588] transition-colors hover:text-primary dark:text-[#6f828a]"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </label>

              <div className="mt-1 flex items-center justify-between">
                <label className="group flex cursor-pointer items-center gap-2">
                  <input
                    className="h-4 w-4 cursor-pointer rounded border-[#dce0e5] bg-white text-primary focus:ring-primary focus:ring-offset-0 dark:border-[#3b4d54] dark:bg-[#101d22]"
                    type="checkbox"
                  />
                  <span className="text-sm text-[#637588] transition-colors group-hover:text-[#111418] dark:text-[#9db2b9] dark:group-hover:text-white">
                    Ghi nho dang nhap
                  </span>
                </label>
                <button
                  className="text-sm font-medium text-primary transition-colors hover:text-[#0fa0d1]"
                  type="button"
                >
                  Quen mat khau?
                </button>
              </div>

              {error ? (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                  {error}
                </p>
              ) : null}

              <button
                className="mt-2 flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-[#11a3d4] active:bg-[#0e8eb9] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Dang dang nhap..." : "Dang nhap"}
              </button>
            </form>
          </div>

          <div className="flex justify-center border-t border-[#e5e7eb] bg-[#f6f8f8] px-6 py-4 dark:border-[#2d3a42] dark:bg-[#131d21]">
            <p className="text-xs text-[#637588] dark:text-[#6f828a]">
              © 2024 KidFashion System. Bao mat tuyet doi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
