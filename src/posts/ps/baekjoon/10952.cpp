#pragma warning(disable : 4996)
#include <stdbool.h>
#include <stdio.h>

int main(void) {
  int a, b = 0;

  while (true) {
    scanf("%d %d", &a, &b);
    if (a == 0 && b == 0)
      break;
    else
      printf("%d\n", a + b);
  }

  return 0;
}
