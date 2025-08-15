import {twMerge} from "tailwind-merge";

export function RoundedTopBarFill(
    {
        x,
        y,
        width,
        height,
        fillOpacity,
        fill,
        stroke,
        strokeWidth,
        cornerRadius = 6,
        className,
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
            fill={fill}
            fillOpacity={fillOpacity}
            {...(stroke && {stroke})}
            {...(strokeWidth && {strokeWidth})}
            className={twMerge(className)}
        />
    );
}
