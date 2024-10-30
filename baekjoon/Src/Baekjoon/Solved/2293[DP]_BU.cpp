#pragma warning(disable : 4996)
#include <stdio.h>

int C[10001] = {1};
int V[100] = {};

int main(int argc, char* argv[]) {
  /* Input */
  int n, k;
  scanf("%d %d", &n, &k);
  for (int i = 0; i < n; i++) scanf("%d", &V[i]);

  /* DP */
  for (int i = 0; i < n; i++)
    for (int j = 0; j <= k; j++) C[j] += (j >= V[i] ? C[j - V[i]] : 0);

  /* Output */
  printf("%d", C[k]);

  /* End */
  return 0;
}
