export function formatTime(data: number) {
  let time = `${Math.floor(data / 60)}:${Math.floor(data % 60)
    .toString()
    .padStart(2, '0')}`;

  return time;
}
