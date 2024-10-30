/* Header */
#pragma warning(disable : 4996)
#include <stdio.h>

/* Global */
int M[502][502] = {};      // 입력값 받을 배열
int C_arr[502][502] = {};  // Cache (-1로 초기화)
//'0으로 초기화' 및 'idx 0, 501 활용을 위해 크기를 502로 설정'

/* Function */
void init(void) {
  for (int i = 0; i < 502; i++)
    for (int j = 0; j < 502; j++) C_arr[i][j] = -1;
}

int C_func(int m, int n) {
  /* Base Case */
  if (m == 1 && n == 1) return 1;
  /* Memoization */
  else if (C_arr[m][n] != -1)
    return C_arr[m][n];
  // ★예제의 C[3][5]의 값은 0 이 되므로, Cache 배열을 0으로 초기화하며 안된다.
  /* Inductive Step */
  else
    return C_arr[m][n] = (M[m][n] < M[m - 1][n] ? C_func(m - 1, n) : 0) +
                         (M[m][n] < M[m + 1][n] ? C_func(m + 1, n) : 0) +
                         (M[m][n] < M[m][n - 1] ? C_func(m, n - 1) : 0) +
                         (M[m][n] < M[m][n + 1] ? C_func(m, n + 1) : 0);
}

/* Main */
int main(int argc, char* argv[]) {
  /* Init */
  init();

  /* Input */
  int M, N;
  scanf("%d %d", &M, &N);
  for (int i = 1; i <= M; i++)
    for (int j = 1; j <= N; j++) scanf("%d", &M[i][j]);

  /* Debug */
  // printf("\n");
  // for (int i = 0; i <= M + 1; i++) {
  //	for (int j = 0; j <= N + 1; j++)
  //		printf("%3d", V[i][j]);
  //	printf("\n");
  // }
  // printf("\n");

  /* Output */
  printf("%d", C_func(M, N));

  /* End */
  return 0;
}

/*
상하좌우의 모든 방향으로 길을 이동할 수 있어(조건에만 맞는다면)
BU 방식을 이용하기에는 부담이 따른다.
*/
