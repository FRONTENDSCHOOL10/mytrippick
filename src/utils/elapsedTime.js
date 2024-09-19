export function elapsedTime(date) {
  const created = new Date(date);
  const now = new Date();

  const seconds = Math.floor((now - created) / 1000);
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (seconds < 60) return '방금 전';
  if (minutes < 60) return `${Math.floor(minutes)}분`;
  if (hours < 24) return `${Math.floor(hours)}시간`;
  if (days < 7) return `${Math.floor(days)}일`;
  else if (days < 30) return `${Math.floor(days / 7)}주`;
  else if (days < 365) return `${Math.floor(days / 30)}달`;
  else return '오래 전';
}
