export function getStorageData(key, initialValue = null) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initialValue;
}
