export function getStorageData(key, initialValue = null) {
  const data = localStorage.getItem(key);
  console.log(data);
  return data ? JSON.parse(data) : initialValue;
}
