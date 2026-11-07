/** Samples N points (in a -1..1 box, y up) from a shape drawn on an offscreen canvas. */
export type Draw = (ctx: CanvasRenderingContext2D, s: number) => void;

export function sample(draw: Draw, n: number, size = 400): Float32Array {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d', { willReadFrequently: true })!;
  ctx.fillStyle = ctx.strokeStyle = '#fff';
  ctx.lineCap = ctx.lineJoin = 'round';
  draw(ctx, size);
  const data = ctx.getImageData(0, 0, size, size).data;
  const hits: number[] = [];
  for (let y = 0; y < size; y += 2) {
    for (let x = 0; x < size; x += 2) {
      if (data[(y * size + x) * 4 + 3] > 128) hits.push(x, y);
    }
  }
  const out = new Float32Array(n * 3);
  const count = hits.length / 2 || 1;
  for (let i = 0; i < n; i++) {
    const k = Math.floor(Math.random() * count) * 2;
    out[i * 3] = (((hits[k] ?? size / 2) + Math.random() * 2) / size) * 2 - 1;
    out[i * 3 + 1] = -(
      (((hits[k + 1] ?? size / 2) + Math.random() * 2) / size) * 2 -
      1
    );
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
  }
  return out;
}
