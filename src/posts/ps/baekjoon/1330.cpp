#include <stdio.h>

int main(int argc, char *argv[]) {
  int A, B = 0;
  scanf("%d %d", &A, &B);

  if (A > B)
    printf(">");

  else if (A < B)
    printf("<");

  else if (A == B)
    printf("==");

  return 0;
}
