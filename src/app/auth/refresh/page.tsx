import ResetPasswordPage from "@/app/auth/refresh/ResetPassword";

interface PageProps {
  searchParams: { token?: string };
}

export default function Page({ searchParams }: PageProps) {
  return <ResetPasswordPage token={searchParams.token} />;
}
