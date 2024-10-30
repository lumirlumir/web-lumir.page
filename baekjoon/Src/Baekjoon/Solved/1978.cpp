#include <stdio.h>

int main(void) {
  int PN[100] = {0};
  int num, count = 0;
  scanf("%d", &num);

  for (int i = 0; i < num; i++)
    scanf("%d", &PN[i]);

  for (int i = 0; PN[i] != 0; i++) {
    for (int j = 2; j <= PN[i]; j++)
      if (PN[i] % j == 0) {
        if (PN[i] == j)
          count++;
        break;
      }
  }
  printf("%d", count);
  return 0;
}
