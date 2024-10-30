#pragma warning(disable : 4996)
#include <stdio.h>

int fibo(int n) {
  if (n <= 1)
    return n;
  else
    return (fibo(n - 2) + fibo(n - 1));
}

int main(int argc, char* argv[]) {
  int n;
  scanf("%d", &n);

  printf("%d", fibo(n));

  return 0;
}
