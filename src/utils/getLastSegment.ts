/**
 * Extracts the last segment from a URL pathname.
 * @param pathname The full pathname from which to extract the last segment.
 * @returns The last segment of the pathname.
 */
export function getLastSegment(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean); // This removes any empty segments caused by trailing slashes
  return segments.pop() || ''; // Return the last segment or an empty string if none exists
}
