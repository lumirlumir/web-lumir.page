#pragma warning(disable : 4996)
#include <stdio.h>

#define min(a, b) (((a) < (b)) ? (a) : (b))

int table[1001][3] = {};  // R=0, G=1, B=2

int main(int argc, char* argv[]) {
  /* Input */
  int N;
  scanf("%d", &N);
  for (int i = 1; i <= N; i++)
    scanf("%d %d %d", &table[i][0], &table[i][1], &table[i][2]);

  /* DP */
  for (int i = 2; i <= N; i++) {
    table[i][0] += min(table[i - 1][1], table[i - 1][2]);
    table[i][1] += min(table[i - 1][0], table[i - 1][2]);
    table[i][2] += min(table[i - 1][0], table[i - 1][1]);
  }

  /* Output */
  printf("%d", min(table[N][0], min(table[N][1], table[N][2])));

  /* End */
  return 0;
}

/*
Bottom Up 방식으로 풀었다.
Top Down 방식으로도 풀 수 있을지 고민해보자.
*/
