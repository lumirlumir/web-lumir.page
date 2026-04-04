#pragma warning(disable : 4996)  // visual studio scanf 오류 방지.
#include <stdio.h>

int cycle(int n) {
  int original = n;
  int count = 0;

  /* 식이 최소 1번은 실행되어야 하기에, do while 사용 */
  do {
    n = ((n % 10) * 10) + (((n / 10) + (n % 10)) % 10);
    count++;
  } while (original != n);

  return count;
}

int main(int argc, char* argv[]) {
  int N;
  scanf("%d", &N);

  printf("%d", cycle(N));

  return 0;
}
