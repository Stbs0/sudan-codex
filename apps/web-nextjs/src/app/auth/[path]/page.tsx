import { AuthView } from "@daveyplate/better-auth-ui";
import { authViewPaths } from "@daveyplate/better-auth-ui/server";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { path: authViewPaths.SIGN_IN },
    { path: authViewPaths.SIGN_UP },
    { path: authViewPaths.CALLBACK },
    { path: authViewPaths.SIGN_OUT },
  ];
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <main className='container flex grow flex-col items-center justify-center self-center p-4 md:p-6'>
      <AuthView path={path} />
    </main>
  );
}
