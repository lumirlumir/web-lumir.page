#pragma warning(disable : 4996)
#include <stdbool.h>
#include <stdio.h>

int main(int argc, char* argv[]) {
  long long N;
  scanf("%lld", &N);

  printf("%s", (N % 5 == 0 || N % 5 == 2) ? "CY" : "SK");

  return 0;
}
