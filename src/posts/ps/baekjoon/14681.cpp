#include <stdio.h>

int main(int argc, char *argv[])

{
  int A, B = 0;
  scanf("%d %d", &A, &B);

  if (A > 0 && B > 0)
    printf("1");

  else if (A < 0 && B > 0)
    printf("2");

  else if (A < 0 && B < 0)
    printf("3");

  else if (A > 0 && B < 0)
    printf("4");

  return 0;
}
