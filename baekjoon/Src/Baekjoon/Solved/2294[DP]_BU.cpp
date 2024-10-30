#pragma warning(disable : 4996)
#include <limits.h>
#include <stdio.h>

#define min(a, b) (((a) < (b)) ? (a) : (b))

int C[10001] = {};
int V[100] = {};

int main(int argc, char* argv[]) {
  /* Input */
  int n, k;
  scanf("%d %d", &n, &k);
  for (int i = 0; i < n; i++) scanf("%d", &V[i]);

  /* DP */
  // init
  for (int i = 1; i <= k; i++) C[i] = SHRT_MAX;
  // DP
  for (int i = 0; i < n; i++)
    for (int j = 1; j <= k; j++)
      C[j] = min(((j - V[i]) >= 0 ? (C[j - V[i]] + 1) : SHRT_MAX), C[j]);

  /* Output */
  printf("%d", C[k] == SHRT_MAX ? -1 : C[k]);

  /* End */
  return 0;
}

/*
INT_MAX 자체를 그대로 사용할 경우, C[j - V[i]] + 1에서 INT_MAX + 1 값이
발생하여 오버플로우가 발생한다. 따라서, 답이 이상하게 출력되므로
SHRT_MAX로 무한대의 값을 설정해 주었다.
(동전의 가치의 최솟값은 1이고, k값의 최댓값은 10000이므로,
사용될 수 있는 동전의 최대 개수는 10000 이다. 따라서 SHRT_MAX를 사용해도 문제
없다.)
*/
