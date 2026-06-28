/** Local icon path under public/icons/ (served by Cloudflare Pages). */
export function iconPath(iconId: string): string {
  const [collection, name] = iconId.split(":");
  if (!collection || !name) return "/noimage.svg";
  return `/icons/${collection}/${name}.svg`;
}
