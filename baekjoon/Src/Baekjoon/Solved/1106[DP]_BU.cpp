#pragma warning(disable : 4996)
#include <algorithm>
#include <cstdio>
#include <iostream>
using namespace std;

int table[21][100001] = {};

int main(int argc, char* argv[]) {
  /* Input */
  int C, N;
  scanf("%d %d", &C, &N);

  pair<int, int> p[21];
  for (int i = 1; i <= N; i++) {
    int c, n;
    scanf("%d %d", &c, &n);
    p[i] = make_pair(c, n);
  }

  /* DP */
  for (int i = 1; true; i++) {
    /* DP */
    for (int j = 1; j <= N; j++)
      table[j][i] =
          max(table[j - 1][i],
              i - p[j].first >= 0 ? table[j][i - p[j].first] + p[j].second : 0);

    /* Output */
    if (table[N][i] >= C) {
      printf("%d", i);
      break;
    }
  }

  /* End */
  return 0;
}

/*
C(최대 1000)
비용(최대 100), 고객(최소 1)

따라서, table의 크기는 최대 100000
*/
