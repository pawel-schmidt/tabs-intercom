export default function isBrowser(): boolean {
  return (
    typeof window !== 'undefined' && typeof window.document !== 'undefined'
  );
}
