#include <stdio.h>

int main(void) {
  int num1, num2, MAX, MIN, Count;

  scanf("%d", &Count);

  for (int j = 1; j <= Count; j++) {
    scanf("%d %d", &num1, &num2);

    if (num1 > num2)
      MAX = num1, MIN = num2;
    else
      MAX = num2, MIN = num1;

    for (int i = 1; 1; i++) {
      if ((MAX * i) % MIN == 0) {
        printf("%d\n", MAX * i);
        break;
      }
    }
  }
  return 0;
}
