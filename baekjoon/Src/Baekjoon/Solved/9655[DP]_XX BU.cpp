#pragma warning(disable : 4996)
#include <stdio.h>

int main(int argc, char* argv[]) {
  int N;
  scanf("%d", &N);
  printf("%s", N % 2 == 0 ? "CY" : "SK");

  return 0;
}
