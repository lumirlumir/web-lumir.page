#pragma warning(disable : 4996)
#include <stdio.h>

int count_fibo1 = 0;
int count_fibo2 = 0;

int fibo1(int n) {
  if (n == 1 || n == 2) {
    count_fibo1++;
    return 1;
  } else {
    return (fibo1(n - 1) + fibo1(n - 2));
  }
}

int fibo2(int n) {
  int fibo[41] = {0, 1, 1};

  for (int i = 3; i <= n; i++) {
    count_fibo2++;
    fibo[i] = fibo[i - 1] + fibo[i - 2];
  }

  return fibo[n];
}

int main(int argc, char* argv[]) {
  int n;
  scanf("%d", &n);

  fibo1(n);
  fibo2(n);

  printf("%d %d", count_fibo1, count_fibo2);

  return 0;
}

/* 쉬운 문제라 종이에 따로 풀이를 적지 않았다. */
