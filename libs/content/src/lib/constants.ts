export const DEPLOYMENT_PLACEHOLDER = 'DEPLOYMENT_URL';

export function getDeploymentUrl(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_DEPLOYMENT_URL ||
    (process.env.NEXT_PUBLIC_SITE_URL as string | undefined) ||
    (process.env.NEXT_PUBLIC_VERCEL_URL as string | undefined) ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined) ||
    undefined
  );
}
