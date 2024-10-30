#pragma warning(disable : 4996)
#include <stdio.h>

int V[502][502] = {};  // 입력값 받을 배열
int C[502][502] = {};  // Cache (-1로 초기화)

void init(void) {
  for (int i = 0; i < 502; i++)
    for (int j = 0; j < 502; j++) C[i][j] = -1;
}

int F(int m, int n) {
  if (m == 1 && n == 1)
    return 1;
  else if (C[m][n] != -1)
    return C[m][n];
  else
    return C[m][n] = (V[m][n] < V[m - 1][n] ? F(m - 1, n) : 0) +
                     (V[m][n] < V[m + 1][n] ? F(m + 1, n) : 0) +
                     (V[m][n] < V[m][n - 1] ? F(m, n - 1) : 0) +
                     (V[m][n] < V[m][n + 1] ? F(m, n + 1) : 0);
}

int main(int argc, char* argv[]) {
  init();

  int M, N;
  scanf("%d %d", &M, &N);
  for (int i = 1; i <= M; i++)
    for (int j = 1; j <= N; j++) scanf("%d", &V[i][j]);

  printf("%d", F(M, N));

  return 0;
}
