export const isWhiteColor = (color: string) => {
  if (!color) return false;
  const c = color.toLowerCase().replace(/\s+/g, "");
  if (c === "#fff" || c === "#ffffff") return true;
  const rgbMatch = c.match(/^rgba?\((\d+),(\d+),(\d+)/);
  if (rgbMatch) {
    const [r, g, b] = rgbMatch.slice(1, 4).map(Number);
    if (r === 255 && g === 255 && b === 255) return true;
  }
  const hslMatch = c.match(/^hsla?\((\d+),(\d+)%?,(\d+)%?/);
  if (hslMatch) {
    const [h, s, l] = hslMatch.slice(1, 4).map(Number);
    if (s === 0 && l === 100) return true;
  }

  return false;
};
