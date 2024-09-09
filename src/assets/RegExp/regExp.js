/* 이메일 유효성 검사 정규식 */
export const emailRegExp = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');

/* 비밀번호 유효성 검사 정규식 */
export const passwordRegExp = new RegExp(
  '^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,15}$'
);

/* 닉네임 유효성 검사 정규식 */
export const nickNameRegExp = new RegExp('^[a-zA-Z가-힣0-9_]{1,12}$');
