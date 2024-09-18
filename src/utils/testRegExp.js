/* 이메일 유효성 검사 정규식 */
export const testEmailRegExp = (email) => {
  const emailRegExp = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
  return emailRegExp.test(email);
};

/* 비밀번호 유효성 검사 정규식 */
export const testPasswordExp = (password) => {
  const passwordRegExp = new RegExp(
    '^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,15}$'
  );
  return passwordRegExp.test(password);
};

/* 닉네임 유효성 검사 정규식 */
export const testNickNameRegExp = (nickName) => {
  const nickNameRegExp = new RegExp('^[a-zA-Z가-힣0-9_]{1,10}$');
  return nickNameRegExp.test(nickName);
};

/* 한줄 소개 유효성 검사 */
export const checkCommentsMySelfLength = (comments) => {
  return comments.length <= 30;
};
