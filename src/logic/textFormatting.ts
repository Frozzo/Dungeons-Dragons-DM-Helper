export function convertFeetToMetersText(text: string): string {
  return text.replace(/(\d+(?:\.\d+)?)\s*[- ]?(?:ft|feet|foot|piedi|piede)\b/gi, (match, value: string) => {
    const feet = Number(value);
    if (Number.isNaN(feet)) {
      return match;
    }

    const meters = Math.round(feet * 0.3 * 10) / 10;
    const asText = Number.isInteger(meters) ? `${meters}` : meters.toFixed(1).replace(".", ",");
    return `${asText} m`;
  });
}
