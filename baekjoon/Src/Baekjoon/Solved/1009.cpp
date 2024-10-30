#pragma warning(disable : 4996)  // visual studio scanf 오류 방지.
#include <stdio.h>

int table[10][4];

int power(int a, int b) {
  if (b == 0)
    return 1;
  else
    return power(a, b - 1) * a;
}

void make_table(void) {
  for (int i = 0; i < 10; i++)
    for (int j = 1; j <= 4; j++)
      table[i][j % 4] = (int)power(i, j) % 10;
  /*
  math.h의 pow()를 이용하여,
  table[i][j % 4] = (int)pow(i, j) % 10;
  으로 구현해도 된다.
  (math.h 함수는 반환형이 double이므로, int로 형변환 해준다.)
  */
}

int main(int argc, char* argv[]) {
  /* 변수선언 */
  int a, b, T;

  /* 테이블 만들기 */
  make_table();

  /* 입력값 받은 후 연산 */
  scanf("%d", &T);
  for (int i = 0; i < T; i++) {
    scanf("%d %d", &a, &b);
    printf("%d\n", table[a % 10][b % 4] == 0 ? 10 : table[a % 10][b % 4]);
  }

  return 0;
}
