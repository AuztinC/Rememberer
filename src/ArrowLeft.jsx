import * as React from "react"

function ArrowLeft(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 60"
      y={0}
      x={0}
      {...props}
    >
      <g strokeLinejoin="round" strokeLinecap="round">
        <g stroke="#fff" strokeWidth={10} fill="none">
          <path
            d="M6.943 30h47.433M17.615 20.907L5.624 30l11.991 9.093V20.907zM30.77 20.907L18.779 30l11.991 9.093V20.907z"
            transform="matrix(-1 0 0 1 60 0)"
          />
        </g>
        <g stroke="#000" strokeWidth={5.3869}>
          <path
            d="M4.859 31.749h51.103"
            fill="none"
            transform="matrix(-1 0 0 1 60 0) translate(2.433 .532) scale(.92817)"
          />
          <g fillRule="evenodd" fill="#000">
            <path
              d="M16.357 21.952l-12.92 9.797 12.92 9.797V21.952zM30.53 21.952l-12.919 9.797 12.919 9.796V21.952z"
              transform="matrix(-1 0 0 1 60 0) translate(2.433 .532) scale(.92817)"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default ArrowLeft