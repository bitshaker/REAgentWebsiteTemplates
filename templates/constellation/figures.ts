import type { Draw } from './shapes';
export const key: Draw = (c, s) => {
  c.lineWidth = s * 0.07;
  c.beginPath();
  c.arc(s * 0.3, s * 0.5, s * 0.15, 0, Math.PI * 2);
  c.stroke();
  c.beginPath();
  c.moveTo(s * 0.45, s * 0.5);
  c.lineTo(s * 0.88, s * 0.5);
  c.moveTo(s * 0.78, s * 0.5);
  c.lineTo(s * 0.78, s * 0.64);
  c.moveTo(s * 0.67, s * 0.5);
  c.lineTo(s * 0.67, s * 0.6);
  c.stroke();
};

/** SOLD yard sign. */
export const sold: Draw = (c, s) => {
  c.lineWidth = s * 0.03;
  c.beginPath();
  c.moveTo(s * 0.2, s * 0.92);
  c.lineTo(s * 0.2, s * 0.18);
  c.lineTo(s * 0.86, s * 0.18);
  c.stroke();
  c.strokeRect(s * 0.3, s * 0.3, s * 0.52, s * 0.3);
  c.font = `700 ${s * 0.17}px system-ui, sans-serif`;
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillText('SOLD', s * 0.56, s * 0.46);
};

/** Agent network: hub + ring of nodes. */
export const network: Draw = (c, s) => {
  const nodes = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2 - Math.PI / 2;
    return [0.5 + Math.cos(a) * 0.38, 0.5 + Math.sin(a) * 0.38];
  });
  c.lineWidth = s * 0.008;
  c.beginPath();
  nodes.forEach(([x, y], i) => {
    c.moveTo(s * 0.5, s * 0.5);
    c.lineTo(x * s, y * s);
    const [nx, ny] = nodes[(i + 1) % nodes.length];
    c.moveTo(x * s, y * s);
    c.lineTo(nx * s, ny * s);
  });
  c.stroke();
  [[0.5, 0.5, 0.08], ...nodes.map(([x, y]) => [x, y, 0.04])].forEach(
    ([x, y, r]) => {
      c.beginPath();
      c.arc(x * s, y * s, r * s, 0, Math.PI * 2);
      c.fill();
    },
  );
};
