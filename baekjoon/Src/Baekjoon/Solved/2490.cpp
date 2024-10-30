#include <stdio.h>

int main(void) {
  int A, B, C, D, Sum = 0;
  char Answer[3] = {0};

  for (int i = 0; i < 3; i++) {
    scanf("%d %d %d %d", &A, &B, &C, &D);

    Sum = A + B + C + D;

    if (Sum == 3)
      Answer[i] = 'A';
    else if (Sum == 2)
      Answer[i] = 'B';
    else if (Sum == 1)
      Answer[i] = 'C';
    else if (Sum == 0)
      Answer[i] = 'D';
    else
      Answer[i] = 'E';
  }

  for (int i = 0; i < 3; i++)
    printf("%c\n", Answer[i]);

  return 0;
}
