#pragma warning(disable : 4996)
#include <stdio.h>

long long memo[120];

long long fibo(int n) {
  if (n <= 3)
    return 1;
  else if (memo[n] != 0)
    return memo[n];
  else
    return memo[n] = fibo(n - 1) + fibo(n - 3);
}

int main(int argc, char* argv[]) {
  int n;

  scanf("%d", &n);

  printf("%lld", fibo(n));

  return 0;
}
