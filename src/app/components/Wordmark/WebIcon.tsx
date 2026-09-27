export default function WebIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M16 3v26M3 16h26M6.8 6.8l18.4 18.4M25.2 6.8 6.8 25.2" />
      <circle cx="16" cy="16" r="5" />
      <circle cx="16" cy="16" r="10" />
    </svg>
  );
}
