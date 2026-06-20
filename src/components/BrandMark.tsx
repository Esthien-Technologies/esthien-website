type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <rect x="2.5" y="2.5" width="19" height="19" />
        <path d="M7 7H17M7 12H14M7 17H17" />
        <circle cx="17" cy="12" r="1.7" />
      </svg>
    </span>
  );
}
