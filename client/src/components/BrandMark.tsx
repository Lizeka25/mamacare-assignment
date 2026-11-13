type BrandMarkProps = { size?: number; className?: string };

export default function BrandMark({ size = 30, className = "" }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="38" height="38" rx="14" fill="#E9F0E9" />
      <path d="M20 31V19.5" stroke="#375F4A" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M19.8 20.5C14.6 20.4 11.2 17.2 11.2 12.1C16.7 12.1 20.2 15.1 20.2 20.2" fill="#8EAA91" />
      <path d="M20.1 19.7C20.5 14.3 24.2 11.5 29 12.1C28.9 17.4 25.8 20.3 20.1 20.7" fill="#5F8168" />
      <path d="M20 29.8C17.7 27.7 15.8 25.9 15.8 23.8C15.8 21.7 18.1 20.7 20 22.8C21.9 20.7 24.2 21.7 24.2 23.8C24.2 25.9 22.3 27.7 20 29.8Z" fill="#C6775C" />
    </svg>
  );
}
