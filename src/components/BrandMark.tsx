type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <img src="/brand-kit/esthien-mark.svg" alt="" loading="eager" decoding="async" />
    </span>
  );
}
