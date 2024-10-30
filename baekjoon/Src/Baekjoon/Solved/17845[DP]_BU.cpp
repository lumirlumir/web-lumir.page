#pragma warning(disable : 4996)
#include <algorithm>
#include <cstdio>
using namespace std;

int table[10001] = {};

int main(int argc, char* argv[]) {
  /* Input & DP */
  int N, K;
  scanf("%d %d", &N, &K);

  for (int i = 0; i < K; i++) {
    int I, T;
    scanf("%d %d", &I, &T);

    for (int i = N; i >= T; i--)
      table[i] = max(table[i], table[i - T] + I);
  }

  /* Output */
  printf("%d", table[N]);

  /* End */
  return 0;
}
