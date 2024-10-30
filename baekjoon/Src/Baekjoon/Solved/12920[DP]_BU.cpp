/* 정답풀이 */
#pragma warning(disable : 4996)
#include <algorithm>
#include <cstdio>
using namespace std;

int table[10001] = {};

int main(int argc, char* argv[]) {
  /* Input & DP */
  int N, M;
  scanf("%d %d", &N, &M);

  for (int i = 0; i < N; i++) {
    int V, C, K;
    scanf("%d %d %d", &V, &C, &K);

    for (int j = 1; K > 0; j <<= 1) {
      int mul = min(j, K);
      K -= mul;

      for (int l = M; l >= V * mul; l--)
        table[l] = max(table[l], table[l - V * mul] + C * mul);
    }
  }

  /* Output */
  printf("%d", table[M]);

  /* End */
  return 0;
}
/* 시간 초과 풀이 */
#pragma warning(disable : 4996)
#include <algorithm>
#include <cstdio>
#include <iostream>
#include <vector>
using namespace std;

int table[10001] = {};

int main(int argc, char* argv[]) {
  /* Input & DP */
  int N, M;
  scanf("%d %d", &N, &M);

  for (int i = 0; i < N; i++) {
    int V, C, K;
    scanf("%d %d %d", &V, &C, &K);

    for (int j = M; j >= V; j--) {
      vector<int> tmp(K + 1);

      for (int l = 0; l <= K; l++)
        if (j - (K - l) * V >= 0)
          tmp[l] = table[j - (K - l) * V] + C * (K - l);

      table[j] = *max_element(tmp.begin(), tmp.end());
    }

    ///* Debug */
    // for (int i = 0; i <= M; i++)
    //     printf("%3d", table[i]);
    // printf("\n");
  }

  /* Output */
  printf("%d", table[M]);

  /* End */
  return 0;
}
/* 시간 초과 풀이 */
#pragma warning(disable : 4996)
#include <cstdio>

using namespace std;

int table[10001] = {};

int main(int argc, char* argv[]) {
  /* Input & DP */
  int N, M;
  scanf("%d %d", &N, &M);

  for (int i = 0; i < N; i++) {
    int V, C, K;
    scanf("%d %d %d", &V, &C, &K);

    for (int j = M; j >= V; j--) {
      for (int l = 0; l <= K; l++)
        if (j - (K - l) * V >= 0 && table[j] < table[j - (K - l) * V] + C * (K - l))
          table[j] = table[j - (K - l) * V] + C * (K - l);
    }

    ///* Debug */
    // for (int i = 0; i <= M; i++)
    //     printf("%3d", table[i]);
    // printf("\n");
  }

  /* Output */
  printf("%d", table[M]);

  /* End */
  return 0;
}
/* 시간 초과 풀이 */
#pragma warning(disable : 4996)
#include <algorithm>
#include <cstdio>
using namespace std;

int table[10001] = {};

int main(int argc, char* argv[]) {
  /* Input & DP */
  int N, M;
  scanf("%d %d", &N, &M);

  for (int i = 0; i < N; i++) {
    int V, C, K;
    scanf("%d %d %d", &V, &C, &K);

    for (int j = 0; j < K; j++)
      for (int k = M; k >= V; k--)
        table[k] = max(table[k], table[k - V] + C);
  }

  /* Output */
  printf("%d", table[M]);

  /* End */
  return 0;
}

/*
비트마스킹에 대해 공부하자
비트연산자에 대해 공부하자
12865 문제와 세트문제
*/
