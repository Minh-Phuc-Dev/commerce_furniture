import {twMerge} from "tailwind-merge";

export function RoundedTopBar(
    {
        x,
        y,
        width,
        height,
        fillOpacity,
        className,
        cornerRadius = 6,
    }: any
) {
    const roundedHeight = Math.max(cornerRadius, height);
    const path = `
    M${x},${y + roundedHeight}
    L${x},${y + cornerRadius}
    Q${x},${y} ${x + cornerRadius},${y}
    L${x + width - cornerRadius},${y}
    Q${x + width},${y} ${x + width},${y + cornerRadius}
    L${x + width},${y + roundedHeight}
    Z
  `;
    return (
        <path
            d={path}
            fillOpacity={fillOpacity}
            className={twMerge('fill-[#d4dcfa] dark:fill-[#7c88b2]', className)}
        />
    );
}
