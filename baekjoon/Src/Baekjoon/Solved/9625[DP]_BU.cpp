#pragma warning(disable : 4996)
#include <stdio.h>

int main(int argc, char* argv[]) {
  /* Input */
  int K;
  scanf("%d", &K);

  /* DP */
  int DP[2][46] = {1};

  for (int i = 1; i <= K; i++) {
    DP[0][i] = DP[1][i - 1];
    DP[1][i] = DP[1][i - 1] + DP[0][i - 1];
  }

  printf("%d %d", DP[0][K], DP[1][K]);

  return 0;
}

/*
   0     1     2     3     4     5     6     7     8
A   1     0     1     1     2
B   0     1     1     2     3

   A  B
A = -A +A
B = +B 0
*/
