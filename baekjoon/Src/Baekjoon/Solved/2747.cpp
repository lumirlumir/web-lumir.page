#pragma warning(disable : 4996)
#include <stdio.h>

long long memo[10001];

long long fibo(long long n) {
  if (n <= 1)
    return n;
  else if (memo[n] != 0)
    return memo[n];
  else
    return memo[n] = fibo(n - 1) + fibo(n - 2);
}

int main(void) {
  long long n;
  scanf("%lld", &n);

  printf("%lld", fibo(n));

  return 0;
}
