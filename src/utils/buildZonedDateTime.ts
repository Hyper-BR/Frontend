export const buildZonedDateTime = (
  dateIso: string,
  timezone: string,
): string => {
  return `${dateIso}T00:00:00[${timezone}]`;
};
