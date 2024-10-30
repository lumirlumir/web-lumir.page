#pragma warning(disable : 4996)
#include <stdio.h>

int main(int argc, char* argv[]) {
  int T;
  scanf("%d", &T);
  for (int i = 0; i < T; i++) {
    /* Init */
    int C[10001] = {1};
    int V[20] = {};

    /* Input */
    int N;
    scanf("%d", &N);
    for (int j = 0; j < N; j++) scanf("%d", &V[j]);
    int M;
    scanf("%d", &M);

    /* DP */
    for (int i = 0; i < N; i++)
      for (int j = 0; j <= M; j++) C[j] += (j >= V[i] ? C[j - V[i]] : 0);

    /* Output */
    printf("%d\n", C[M]);
  }

  return 0;
}
