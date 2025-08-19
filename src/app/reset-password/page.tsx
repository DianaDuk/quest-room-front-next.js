import ResetPasswordPage from "@/app/auth/refresh/ResetPassword";

export default function Page({ searchParams }: { searchParams: { token?: string } }) {
  return <ResetPasswordPage token={searchParams.token} />;
}
