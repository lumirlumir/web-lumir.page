#pragma warning(disable : 4996)
#include <stdio.h>

int main(int argc, char* argv[]) {
  int N;
  scanf("%d", &N);

  /* 위쪽 */
  for (int i = 1; i <= N; i++) {
    /* 별 찍기 */
    for (int j = 1; j <= i; j++)
      printf("*");

    /* 개행 */
    printf("\n");
  }

  /* 아래쪽 */
  for (int i = N - 1; i >= 1; i--) {
    /* 별 찍기 */
    for (int j = 1; j <= i; j++)
      printf("*");

    /* 개행 */
    printf("\n");
  }

  return 0;
}
