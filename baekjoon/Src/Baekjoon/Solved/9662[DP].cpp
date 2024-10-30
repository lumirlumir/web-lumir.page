#pragma warning(disable : 4996)
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

#define MAX(a, b) (((a) > (b)) ? (a) : (b))

#define MAX_LEN 10000
#define MAXCYCLE_LEN 536
#define SP (MAX_LEN / 2)
/*
MAXLEN : 사이클이 판별되기까지의 최대 길이를 추정한 것.
MAXCYCLE : 1000, 2000 등의 아예 큰 수를 사이클의 최대 길이로 추정해도 됨.
SP : Search Point = 사이클 탐색을 시작할 지점.
*/

bool F[MAX_LEN] = {};

int main(int argc, char* argv[]) {
  /* Input */
  int M;
  scanf("%d", &M);
  int K;
  scanf("%d", &K);

  int* A = (int*)calloc(K, sizeof(int));
  for (int i = 0; i < K; i++)
    scanf("%d", &A[i]);

  /* Calculate (Fill F[MAXLEN]) */
  /* Init */
  F[0] = 0;
  for (int i = 0; i < K; i++)
    F[A[i]] = 1;

  /* Fill F[MAXLEN] */
  for (int i = 1; i < MAX_LEN; i++) {  // MAXLEN 구간까지만 값을 구함.
    if (F[i] == 1)
      continue;

    int tmp = 1;
    for (int j = 0; j < K; j++)
      tmp = tmp && (i - A[j] >= 0 ? F[i - A[j]] : 1);
    F[i] = !tmp;
  }

  ///* debug */
  // printf("\n");
  // printf("val : ");
  // for (int i = 0; i < MAXCYCLE_LEN; i++)
  //	printf("%2d ", F[i]);
  // printf("\n");

  /* Output */
  /* Case 1 : M < MAXLEN */
  if (M < MAX_LEN) {
    // Init
    int ans = 0;

    // i <= M
    for (int i = 1; i <= M; i++)
      if (F[i] == 0)
        ans++;

    // Output
    printf("%d", ans);
  }

  /* Case 2 : MAXLEN <= M */
  else {
    /* Init */
    int maxcycle_len = 0;  // cycle 주기가 n이라면, MAXCYCLE_LEN에 가장 가까운 n의 배수값이 구해짐.

    /* Find Cycle */
    for (int cycle_len = 1; cycle_len <= MAXCYCLE_LEN; cycle_len++) {  // cycle_len값이 cycle의 길이이다.
      /* Comparison */
      for (int i = 0; i < cycle_len; i++) {  // cycle_len 길이만큼 반복.
        /* cycle : X */
        if (F[(SP + i)] != F[SP + cycle_len + i])
          break;
        /* cycle : O */
        if (i == cycle_len - 1)
          maxcycle_len = MAX(maxcycle_len, cycle_len);
      }
    }

    ///* debug */
    // printf("maxcycle_len : %d\n\n", maxcycle_len);

    /* Zero Caculate */
    // Init
    int ans = 0;

    // M < SP(5000)
    for (int i = 1; i < SP; i++)
      if (F[i] == 0) ans++;

    // SP(5000) < M : zero count
    int count_zero = 0;
    for (int i = SP; i < SP + maxcycle_len; i++)
      if (F[i] == 0) count_zero++;
    ans += ((M - SP) / maxcycle_len) * count_zero;

    // Remainder
    for (int i = SP; i <= SP + ((M - SP) % maxcycle_len); i++)
      if (F[i] == 0) ans++;

    // Output
    printf("%d", ans);
  }

  /* End */
  free(A);
  return 0;
}
