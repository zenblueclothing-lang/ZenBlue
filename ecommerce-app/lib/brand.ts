/**
 * Adds the trademark mark to human-readable ZenBlue brand mentions.
 * Technical identifiers (email addresses, URLs, handles and filenames) are
 * deliberately left unchanged.
 */
export function withTrademark(value: string): string {
  return value.replace(/\bzen\s*blue\b(?!™)/gi, (match, offset, source: string) => {
    const previous = source[offset - 1] ?? "";
    const next = source[offset + match.length] ?? "";
    const technicalBoundary = "@/._-";
    const touchesTechnicalBoundary =
      (previous.length > 0 && technicalBoundary.includes(previous)) ||
      (next.length > 0 && technicalBoundary.includes(next));
    return touchesTechnicalBoundary
      ? match
      : `${match}™`;
  });
}

/**
 * Applies the mark throughout CMS/settings display data while leaving fields
 * that represent technical identifiers untouched. `withTrademark` still
 * protects embedded emails, URLs and filenames inside ordinary copy.
 */
export function withTrademarkInDisplayData<T>(value: T, key = ""): T {
  const technicalKey = /(?:url|href|link|image|images|video|poster|email|phone|handle|id|key|code|palette|currency|symbol)$/i;

  if (typeof value === "string") {
    return (technicalKey.test(key) ? value : withTrademark(value)) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => withTrademarkInDisplayData(item, key)) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([childKey, childValue]) => [
        childKey,
        withTrademarkInDisplayData(childValue, childKey),
      ])
    ) as T;
  }
  return value;
}
