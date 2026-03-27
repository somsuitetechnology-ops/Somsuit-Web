import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

/**
 * Light UI: `logo.png` · Dark UI: `logo-light.png` (both from `/public`).
 */
export function BrandLogo({
  className,
  width = 200,
  height = 64,
  priority,
}: BrandLogoProps) {
  return (
    <>
      <Image
        src="/logo.png"
        alt="Somsuite Technology"
        width={width}
        height={height}
        className={cn("dark:hidden", className)}
        priority={priority}
      />
      <Image
        src="/logo-light.png"
        alt="Somsuite Technology"
        width={width}
        height={height}
        className={cn("hidden dark:block", className)}
        priority={priority}
      />
    </>
  );
}
