/* 9095번 문제의 세트문제 (세트문제 총 9개 있음.) */
#pragma warning(disable : 4996)
#include <stdio.h>

long long cache[1000001] = {0, 1, 2, 4};

int main(int argc, char* argv[]) {
  /* Input */
  int T;
  scanf("%d", &T);

  /* Calculate */
  for (int i = 0; i < T; i++) {
    /* Input */
    int n;
    scanf("%d", &n);

    /* Calculate */
    for (int i = 4; i <= n; i++)
      cache[i] = (cache[i - 1] + cache[i - 2] + cache[i - 3]) % 1000000009;

    /* Output */
    printf("%lld\n", cache[n]);
  }

  /* End */
  return 0;
}
