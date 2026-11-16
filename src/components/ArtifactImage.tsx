import {useState} from 'react';
import {Landmark} from 'lucide-react';

interface ArtifactImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  zoomScale?: number;
  originPercent?: {x: number; y: number};
}

export function ArtifactImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  zoomScale = 1,
  originPercent = {x: 50, y: 50},
}: ArtifactImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EBE6DF] via-[#F5F1EA] to-[#DFD7C8] p-6 text-center text-[#57534E] ${className}`}
      >
        <Landmark className="h-8 w-8 text-[#8C3B1A]/70" aria-hidden="true" />
        <p className="mt-3 font-serif text-sm font-medium text-[#1C1917]">
          {fallbackTitle || alt}
        </p>
        <p className="mt-1 text-xs text-[#57534E]">Tư liệu hình ảnh lưu trữ Đường Lâm</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      style={{
        transform: `scale(${zoomScale})`,
        transformOrigin: `${originPercent.x}% ${originPercent.y}%`,
      }}
      className={`transition-transform duration-200 ease-out ${className}`}
    />
  );
}
