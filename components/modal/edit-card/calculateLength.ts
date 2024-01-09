export default function calculateLength(value: string) {
  let length = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    if (char > 127) {
      // 한글일 경우
      length += 2;
    } else {
      // 영문일 경우
      length += 1;
    }
  }
  return length;
}
