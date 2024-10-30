#pragma warning(disable : 4996)
#include <stdio.h>

int cache[11] = {0, 1, 2, 4};

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
      cache[i] = cache[i - 1] + cache[i - 2] + cache[i - 3];

    /* Output */
    printf("%d\n", cache[n]);
  }

  /* End */
  return 0;
}

/* 동전 문제와 비슷하지만 다른 문제. 문제 해설 쓰기전에 동전 문제 다시 풀고
 * 오자. */
/* Bottom Up 으로 품 */

/*
1, 2, 3 더하기 세트문제로 총 9개의 같은 종류의 문제가 있다.
한번에 해설 올리자.
*/
