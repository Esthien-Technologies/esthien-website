type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <path className="brand-strata-e" d="M4 5H14.8V8H7.3V10.6H13.4V13.4H7.3V16H14.8V19H4V5Z" />
        <path className="brand-strata-bar brand-strata-bar--logic" d="M16 5H18.1V19H16V5Z" />
        <path className="brand-strata-bar brand-strata-bar--signal" d="M19.1 5H21.2V19H19.1V5Z" />
        <path className="brand-strata-bridge" d="M16 8.3H21.2M16 15.7H21.2" />
        <circle className="brand-strata-node" cx="17.05" cy="12" r="0.78" />
        <circle className="brand-strata-node" cx="20.15" cy="12" r="0.78" />
      </svg>
    </span>
  );
}
