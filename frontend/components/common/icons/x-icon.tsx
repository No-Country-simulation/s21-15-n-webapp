import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  size?: string;
  fill?: string;
}

export const XIcon = ({ size = "40", fill = "#ffffff", ...props }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 800 800"
      fillRule="nonzero"
      {...props}
    >
      <path
        d="M200.001 133.334A66.662 66.662 0 00133.335 200v400a66.666 66.666 0 0066.666 66.667h400a66.67 66.67 0 0047.141-19.526A66.67 66.67 0 00666.668 600V200a66.667 66.667 0 00-66.667-66.666h-400zm0-66.667h400A133.336 133.336 0 01733.335 200v400a133.332 133.332 0 01-133.334 133.334h-400A133.334 133.334 0 0166.668 600V200A133.335 133.335 0 01200.001 66.667z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M325.681 219H199l150.199 197.403L208.608 582h64.958l106.333-125.246 94.42 124.095H601L446.437 377.71l.273.35 133.082-156.754h-64.957l-98.829 116.408L325.681 219zm-56.755 34.572h39.437l222.711 292.703h-39.437L268.926 253.572z"
        fill={fill}
      />
    </svg>
  );
};
