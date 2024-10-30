/* 9095번 문제의 세트문제 (세트문제 총 9개 있음.) */
/* 이 문제는 동전1 문제와 동일함 (대신 훨씬 쉬움) */
#pragma warning(disable : 4996)
#include <stdio.h>

int main(int argc, char* argv[]) {
  /* Input */
  int T;
  scanf("%d", &T);

  /* Calculate */
  for (int i = 0; i < T; i++) {
    /* Init */
    int C[10001] = {1};

    /* Input */
    int n;
    scanf("%d", &n);

    /* Calculate */
    for (int j = 1; j <= 3; j++)
      for (int k = 1; k <= n; k++)
        C[k] += (k - j >= 0 ? C[k - j] : 0);

    /* Output */
    printf("%d\n", C[n]);
  }

  /* End */
  return 0;
}
