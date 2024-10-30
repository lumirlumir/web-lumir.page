#pragma warning(disable : 4996)
#include <stdio.h>

int main(int argc, char* argv[]) {
  long long N;
  scanf("%lld", &N);
  printf("%s", N % 2 == 0 ? "CY" : "SK");

  return 0;
}
