#pragma warning(disable : 4996)
#include <stdio.h>

long long memo[91];

long long fibo(int n) {
  memo[0] = 0;
  memo[1] = 1;

  for (int i = 2; i <= n; i++) memo[i] = memo[i - 1] + memo[i - 2];

  return memo[n];
}

int main(void) {
  int n;
  scanf("%d", &n);

  printf("%lld", fibo(n));

  return 0;
}
