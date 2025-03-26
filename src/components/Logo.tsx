import React from "react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-10 w-auto" }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10C0 4.47715 4.47715 0 10 0H40C45.5228 0 50 4.47715 50 10V40C50 45.5228 45.5228 50 40 50H10C4.47715 50 0 45.5228 0 40V10Z"
        fill="#1E40AF"
      />
      <path d="M22 15L35 25L22 35V15Z" fill="white" />
      <path
        d="M60 15H65.5L74 35H68L66.5 31H59L57.5 35H51.5L60 15ZM62.75 27H63.75L62.75 24.5L61.75 27Z"
        fill="white"
      />
      <path
        d="M76 15H82V29.5C82 30.5 82.5 31 83.5 31H88.5C89.5 31 90 30.5 90 29.5V15H96V30C96 33.5 93.5 36 90 36H83C79.5 36 76 33.5 76 30V15Z"
        fill="white"
      />
      <path d="M99 15H114V20H105V23H112V28H105V31H114V36H99V15Z" fill="white" />
      <path
        d="M116 15H122V25L129 15H135V35H129V25L122 35H116V15Z"
        fill="white"
      />
      <path
        d="M138 15H153.5V20H144V22.5H151.5V27.5H144V35H138V15Z"
        fill="white"
      />
      <path
        d="M156 15H162V29.5C162 30.5 162.5 31 163.5 31H168.5C169.5 31 170 30.5 170 29.5V15H176V30C176 33.5 173.5 36 170 36H163C159.5 36 156 33.5 156 30V15Z"
        fill="white"
      />
      <path
        d="M179 15H194V20H185V23H192V28H185V31H194V36H179V15Z"
        fill="white"
      />
    </svg>
  );
}
