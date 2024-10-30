/* 좀 더 복잡한 풀이 : 0, 1번 idx 기본세팅. 2번 idx부터 DP 계산 시작. */
#pragma warning(disable : 4996)
#include <algorithm>
#include <climits>
#include <cstdio>
using namespace std;

int table_src[1000][3] = {};  // R=0, G=1, B=2

int main(int argc, char* argv[]) {
  /* Input */
  int N;
  scanf("%d", &N);
  for (int i = 0; i < N; i++)
    scanf("%d %d %d", &table_src[i][0], &table_src[i][1], &table_src[i][2]);

  /* DP */
  int ans = INT_MAX;
  for (int i = 0; i < 3; i++) {
    int table_dp[1000][3] = {table_src[0][0], table_src[0][1], table_src[0][2]};

    table_dp[1][(i) % 3] = INT_MAX;
    table_dp[1][(i + 1) % 3] = table_dp[0][(i) % 3] + table_src[1][(i + 1) % 3];
    table_dp[1][(i + 2) % 3] = table_dp[0][(i) % 3] + table_src[1][(i + 2) % 3];

    for (int j = 2; j < N; j++) {
      table_dp[j][0] = table_src[j][0] + min(table_dp[j - 1][1], table_dp[j - 1][2]);
      table_dp[j][1] = table_src[j][1] + min(table_dp[j - 1][0], table_dp[j - 1][2]);
      table_dp[j][2] = table_src[j][2] + min(table_dp[j - 1][0], table_dp[j - 1][1]);
    }

    ans = min({ans, table_dp[N - 1][(i + 1) % 3], table_dp[N - 1][(i + 2) % 3]});

    ///* Debug */
    // for (int i = 0; i < N; i++) {
    //	for (int j = 0; j < 3; j++)
    //		printf("%12d", table_dp[i][j]);
    //	printf("\n");
    // }
    // printf("\n");
  }

  /* Output */
  printf("%d", ans);

  /* End */
  return 0;
}

/*
Bottom Up 방식으로 풀었다.
Top Down 방식으로도 풀 수 있을지 고민해보자.
*/

/*
1149 문제와 세트문제이다.
1149번 문제는 선형배치였다면, 17404번 문제는 원형배치이다.
*/
