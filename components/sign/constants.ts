export const PLACEHOLDER = {
  email: '이메일을 입력해 주세요.',
  password: '영문, 숫자를 조합해 8자 이상 입력해 주세요.',
  confirmedPassword: '비밀번호와 일치하는 값을 입력해 주세요.',
  nickname: '닉네임을 입력해 주세요.',
};

export const ERROR_MESSAGE = {
  emailRequired: '이메일을 입력해 주세요.',
  emailInvalid: '올바른 이메일 형식으로 작성해 주세요.',
  emailAlreadyExist: '이미 사용 중인 이메일입니다.',
  passwordInvalid: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
  confirmedPasswordNotMatch: '비밀번호가 일치하지 않습니다.',
  nicknameRequired: '닉네임에는 특수문자를 사용하실 수 없습니다.',
  nicknameLimit: '닉네임은 10자를 초과할 수 없습니다.',
};

export const SUCCESS_JOIN_MESSAGE = '회원가입이 완료되었습니다.';

export const VALID_PASSWORD_REG = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
export const VALID_EMAIL_REG =
  /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
