import Image from "next/image";

export default function Logo({
  variant = "dark",
  className = "",
  priority = false,
}: {
  /** "dark" = burgundy logo for light backgrounds, "light" = white logo for dark backgrounds */
  variant?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <Image
        src={variant === "dark" ? "/images/logo.png" : "/images/logo-light.png"}
        alt="Alphabyte logo"
        fill
        sizes="(max-width: 768px) 110px, 130px"
        priority={priority}
        className="object-contain object-left"
      />
    </span>
  );
}
