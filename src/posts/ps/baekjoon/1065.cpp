#pragma warning(disable : 4996)
#include <stdio.h>
#include <stdlib.h>

int main(void) {
  int N = 0;
  int count = 0;
  scanf("%d", &N);

  for (int i = 1; i <= N; i++) {
    if (1 <= i && i <= 99)
      count++;
    else if (((i / 100) - (i / 10) % 10) == ((i / 10) % 10 - (i % 10)))
      count++;
  }
  printf("%d", count);

  return 0;
}
