export function renderProgressBar(current: number, total: number): string {
  if (total === 0) return '⬜⬜⬜⬜⬜';
  const progress = Math.round((current / total) * 5);
  return '🟩'.repeat(progress) + '⬜'.repeat(5 - progress);
}