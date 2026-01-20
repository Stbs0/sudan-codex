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
    <div className='container mx-auto flex h-full items-center justify-center'>
      <AuthView path={path} />
    </div>
  );
}
