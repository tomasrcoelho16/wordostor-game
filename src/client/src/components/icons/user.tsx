type SVGUserProps = {
  classname?: string
}

export function SVGUser(props: SVGUserProps) {
  const { classname } = props

  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="50.000000pt"
      height="50.000000pt"
      viewBox="0 0 50.000000 50.000000"
      preserveAspectRatio="xMidYMid meet"
      className={classname}
    >
      <g
        transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M155 456 c-60 -28 -87 -56 -114 -116 -36 -79 -19 -183 42 -249 33
   -36 115 -71 167 -71 52 0 134 35 167 71 34 37 63 110 63 159 0 52 -35 134 -71
   167 -37 34 -110 63 -159 63 -27 0 -65 -10 -95 -24z m180 -15 c76 -34 125 -113
   125 -201 0 -41 -33 -118 -54 -126 -8 -3 -35 4 -60 15 -52 23 -57 38 -26 89 22
   35 28 129 10 161 -24 46 -125 51 -155 8 -23 -32 -20 -129 5 -169 31 -51 26
   -66 -26 -89 -25 -11 -52 -18 -60 -15 -23 9 -54 86 -54 134 -1 151 159 255 295
   193z"
        />
      </g>
    </svg>
  )
}
