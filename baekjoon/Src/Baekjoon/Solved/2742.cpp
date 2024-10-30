#include <stdio.h>

int main(void) {
  int input;

  scanf("%d", &input);

  for (int i = input; i >= 1; i--)
    printf("%d\n", i);

  return 0;
}
