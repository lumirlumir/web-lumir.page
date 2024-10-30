#pragma warning(disable : 4996)
#include <stdio.h>

long long C[68] = {};

long long koong(int n) {
  /* Base Case */
  if (n < 2)
    return 1;
  else if (n == 2)
    return 2;
  else if (n == 3)
    return 4;
  /* Memoization */
  else if (C[n] != 0)
    return C[n];
  /* Inductive Step */
  else
    return C[n] = koong(n - 1) + koong(n - 2) + koong(n - 3) + koong(n - 4);
}

int main(int argc, char* argv[]) {
  int t;
  scanf("%d", &t);
  for (int i = 0; i < t; i++) {
    int n;
    scanf("%d", &n);
    printf("%lld\n", koong(n));
  }

  return 0;
}

/* long long은 약 900경 까지의 수를 표현할 수 있다. */
