export function formatTime(data: number) {
  return `${Math.floor(data / 60)}:${Math.floor(data % 60)
    .toString()
    .padStart(2, '0')}`;
}
