// Asset paths are served by Lovable, not by external hosts such as Vercel.
export function assetUrl(path: string): string {
  return path.startsWith('/__l5e/assets-v1/')
    ? `https://mary-candy.lovable.app${path}`
    : path;
}