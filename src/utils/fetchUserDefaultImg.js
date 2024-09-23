export async function fetchUserDefaultImg(url) {
  const response = await fetch(url);
  if (!response.ok) {
    alert('이미지 받아오는 것에 실패했습니다');
  }
  const blobs = await response.blob();

  return blobs;
}
