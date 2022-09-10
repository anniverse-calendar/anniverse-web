export function formatWareki(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    year: 'numeric',
  }).format(date);
}
