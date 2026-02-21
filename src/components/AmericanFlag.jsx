export function AmericanFlag({ width = 48, height = 32 }) {
  const cantonWidth = width * 0.4;
  const cantonHeight = height * (7 / 13);
  const stripeH = height / 13;

  // 50 stars in 9 rows: 6,5,6,5,6,5,6,5,6 (official US flag pattern)
  const starRows = [6, 5, 6, 5, 6, 5, 6, 5, 6];
  const starSize = Math.min(cantonWidth / 7, cantonHeight / 10);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className="american-flag"
      style={{ shapeRendering: 'crispEdges' }}
    >
      {/* 13 stripes: red, white, red, white... */}
      {Array.from({ length: 13 }).map((_, i) => (
        <rect
          key={i}
          x={0}
          y={stripeH * i}
          width={width}
          height={stripeH}
          fill={i % 2 === 0 ? '#B22234' : '#fff'}
        />
      ))}
      {/* Blue canton */}
      <rect x={0} y={0} width={cantonWidth} height={cantonHeight} fill="#3C3B6E" />
      {/* 50 stars */}
      <g fill="#fff">
        {starRows.map((cols, row) => {
          const y = (cantonHeight / 10) * (row + 0.65);
          const spacing = cantonWidth / (cols + 1);
          const stagger = row % 2 === 1 ? spacing / 2 : 0;
          return Array.from({ length: cols }).map((_, col) => {
            const x = stagger + spacing * (col + 1);
            return (
              <text
                key={`${row}-${col}`}
                x={x}
                y={y}
                fontSize={starSize}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                ★
              </text>
            );
          });
        })}
      </g>
      {/* Small black outline */}
      <rect
        x={0.5}
        y={0.5}
        width={width - 1}
        height={height - 1}
        fill="none"
        stroke="black"
        strokeWidth={1}
      />
    </svg>
  );
}
