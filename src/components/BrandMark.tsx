type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <span className="brand-strata">
        <span />
        <span />
        <span />
      </span>
      <span className="brand-conduit" />
    </span>
  );
}
