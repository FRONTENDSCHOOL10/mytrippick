import pb from './pb';

// collectionName은 DB에 저장된 보내고 싶은 collectionName 작성하면 되고
// datas는 API 보고 그거에 맞게 작성해서 보내고 싶은 데이터 넣어주시면 됩니다
// 데이터 받아야 할게 있다면 const ex = CreateDatas(cN, d) 이런 형태로 저장하시면 될거에요

export async function CreateDatas(collectionName, datas) {
  const record = await pb.collection(collectionName).create(datas);
  return record;
}
