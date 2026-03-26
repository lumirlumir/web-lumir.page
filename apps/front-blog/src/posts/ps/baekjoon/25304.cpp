#pragma warning(disable : 4996)  // visual studio scanf 오류 방지.
#include <stdio.h>

int main(int argc, char* argv[]) {
  int X = 0;
  int N, a, b;

  scanf("%d", &X);
  scanf("%d", &N);
  for (int i = 0; i < N; i++) {
    scanf("%d %d", &a, &b);
    X -= (a * b);
  }

  if (X == 0)
    printf("Yes");
  else if (X != 0)
    printf("No");

  return 0;
}
