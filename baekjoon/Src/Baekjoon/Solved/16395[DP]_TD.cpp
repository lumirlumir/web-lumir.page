#pragma warning(disable : 4996)
#include <stdio.h>

int Cache[31][31] = {};

int C(int n, int k) {
  if (k == 0 || k == n)
    return 1;
  else if (Cache[n][k] != 0)
    return Cache[n][k];
  else
    return Cache[n][k] = Cache[n][n - k] = C(n - 1, k - 1) + C(n - 1, k);
}

int main(int argc, char* argv[]) {
  int n, k;
  scanf("%d %d", &n, &k);

  printf("%d", C(n - 1, k - 1));

  return 0;
}

/*
시간복잡도 Down : 파스칼의 삼각형은 대칭.
공간복잡도 Down : Cache 배열 크기 줄이기.
*/
