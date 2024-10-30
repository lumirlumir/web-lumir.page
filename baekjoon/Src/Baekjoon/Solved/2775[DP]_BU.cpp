#pragma warning(disable : 4996)
#include <stdio.h>

int C[15][15] = {};

int main(int argc, char* argv[]) {
  int T;
  scanf("%d", &T);
  for (int i = 0; i < T; i++) {
    /* Input */
    int k, n;
    scanf("%d %d", &k, &n);

    /* DP */
    for (int j = 0; j <= n; j++) C[0][j] = j;

    for (int j = 1; j <= k; j++)
      for (int k = 1; k <= n; k++) C[j][k] = C[j - 1][k] + C[j][k - 1];

    /* Output */
    printf("%d\n", C[k][n]);
  }

  return 0;
}

/*
0Ãþ : (0) 1  2  3  4  5  6  7  8  9  10  ...
1Ãþ : (0) 1  3  6  10 ...
*/
