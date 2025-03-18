import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  size?: string;
  fill?: string;
}

export const InstagramIcon = ({ size = "33", fill = "#ffffff", ...props }: Props) => {
  return (
    <svg
      xmlns="http:/ /www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 667 667"
      fillRule="nonzero"
      {...props}
    >
      <path
        d="M133.333 66.667a66.666 66.666 0 00-66.666 66.666v400A66.67 66.67 0 00133.333 600h400a66.67 66.67 0 0047.141-19.526A66.67 66.67 0 00600 533.333v-400a66.668 66.668 0 00-66.667-66.666h-400zm0-66.667h400a133.333 133.333 0 01133.334 133.333v400a133.332 133.332 0 01-133.334 133.334h-400A133.333 133.333 0 010 533.333v-400A133.333 133.333 0 01133.333 0z"
        fill={fill}
        />
      <path
        clipRule="evenodd"
        d="M417.143 127H247.857C185.528 127 135 179.83 135 245v177c0 65.168 50.528 118 112.857 118h169.286C479.471 540 530 487.168 530 422V245c0-65.17-50.529-118-112.857-118z"
        stroke={fill}
        strokeWidth="48"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        clipRule="evenodd"
        d="M332.5 422c-46.669 0-84.5-39.621-84.5-88.5s37.831-88.5 84.5-88.5 84.5 39.621 84.5 88.5c0 23.47-8.903 45.982-24.75 62.578C376.403 412.675 354.909 422 332.5 422z"
        stroke={fill}
        strokeWidth="48"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M445.5 186c-15.74 0-28.5 13.208-28.5 29.5s12.76 29.5 28.5 29.5 28.5-13.208 28.5-29.5-12.76-29.5-28.5-29.5z"
        fill={fill}
      />
      <path
        d="M445 201c-7.732 0-14 6.492-14 14.5s6.268 14.5 14 14.5 14-6.492 14-14.5-6.268-14.5-14-14.5z"
        stroke={fill}
        strokeWidth="32"
        strokeLinecap="round"
      />
    </svg>
  );
};
