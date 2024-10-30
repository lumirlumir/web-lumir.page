#pragma warning(disable : 4996)
#include <stdio.h>
#include <stdlib.h>

int F(int V[], int k, int L, int R) {
  /* Base Case */
  if (k == 0)
    return 1;
  else if (L == R) {
    if (k % V[R] == 0)
      return 1;
    else
      return 0;
  }

  /* Inductive Step */
  int sum = 0;
  for (int i = 0; i <= k / V[L]; i++) sum += F(V, k - (V[L] * i), L + 1, R);

  return sum;
}

int main(int argc, char* argv) {
  /* Input */
  int n, k;
  scanf("%d %d", &n, &k);

  int* V = (int*)calloc(n + 1, sizeof(int));
  for (int i = 1; i <= n; i++) scanf("%d", &V[i]);

  /* Output */
  printf("%d", F(V, k, 1, n));

  /* End */
  free(V);
  return 0;
}

/*
1. int 자료형이 표현할 수 있는 범위는 약 -2^31 ~ 2^31
*/
