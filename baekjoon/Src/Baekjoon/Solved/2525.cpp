#pragma warning(disable : 4996)
#include <stdio.h>

int main(void) {
  int h = 0;
  int m = 0;
  int time = 0;

  scanf("%d %d", &h, &m);
  scanf("%d", &time);

  int total = (60 * h) + m + time;

  printf("%d %d", (total / 60) % 24, total % 60);

  return 0;
}
