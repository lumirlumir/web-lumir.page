#pragma warning(disable : 4996)
#include <stdio.h>

long C[10001] = {0, 1};

int fibonacci(int P, int Q) {
  if (Q == 1)  // Q가 1일때 예외조건을 만들어야 함.... 이거 안하면 100%에서 멈춤
    return 0;

  for (int i = 2; i <= P; i++)
    C[i] = (C[i - 2] + C[i - 1]) % Q;

  return C[P];
}
/*
C[i] = ((C[i - 1] % Q) + (C[i - 2] % Q)) % Q;
위에 것을 사용하면 시간초과가 뜸. 연산횟수를 줄여야 한다.

이 부분 증명에 대해 공부. (알고리즘 문자열 강의에 증명 있음.)
*/

int main(int argc, char* argv[]) {
  int T;
  scanf("%d", &T);

  for (int i = 0; i < T; i++) {
    int P, Q;
    scanf("%d %d", &P, &Q);
    printf("Case #%d: %d\n", i + 1, fibonacci(P, Q));
  }

  return 0;
}
