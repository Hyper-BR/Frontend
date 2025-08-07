export function formatSecondsTime(data: number) {
  let time = `${Math.floor(data / 60)}:${Math.floor(data % 60)
    .toString()
    .padStart(2, '0')}`;

  return time;
}

export function formatZonedDate(date: Date | string | number): string {
  const zoned = new Date(date);

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(zoned);
}
