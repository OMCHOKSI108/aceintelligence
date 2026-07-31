import type { SVGProps } from "react";

/**
 * Stripe-style hover arrow. Sits inline in the button flow (reserves
 * its 10px so the label never jumps), hidden by default, and slides
 * in from the left on button hover via the `.btn-hover-arrow` CSS.
 */
export function HoverArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={`btn-hover-arrow ${props.className ?? ""}`}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M0.5 5.5h7" />
      <path d="M1.5 1.5l4 4-4 4" />
    </svg>
  );
}
