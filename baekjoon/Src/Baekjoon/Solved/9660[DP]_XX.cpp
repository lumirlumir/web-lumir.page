#pragma warning(disable : 4996)
#include <stdbool.h>
#include <stdio.h>

int main(int argc, char* argv[]) {
  long long N;
  scanf("%lld", &N);

  printf("%s", (N % 7 == 0 || N % 7 == 2) ? "CY" : "SK");

  return 0;
}
