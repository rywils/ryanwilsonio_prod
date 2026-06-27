export type ProjectOverwrite = 'Yes' | 'No';

/** Use local markdown body when overwrite is Yes or when no GitHub repo is set. */
export function shouldUseLocalProjectBody(
  overwrite: ProjectOverwrite = 'No',
  github?: string,
): boolean {
  if (overwrite === 'Yes') return true;
  if (!github?.trim()) return true;
  return false;
}
