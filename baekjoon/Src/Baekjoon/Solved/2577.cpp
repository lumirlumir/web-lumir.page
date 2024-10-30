#include <stdio.h>

int main(void) {
  int Countnum[10] = {0};
  int A, B, C, Result;

  scanf("%d %d %d", &A, &B, &C);
  Result = A * B * C;

  while (Result) {
    Countnum[Result % 10]++;
    Result /= 10;
  }

  for (int i = 0; i < 10; i++)
    printf("%d\n", Countnum[i]);

  return 0;
}
