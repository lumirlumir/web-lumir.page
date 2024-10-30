#pragma warning(disable : 4996)
#include <stdio.h>
#include <stdlib.h>

int main(void) {
  int A, B, C = 0;

  scanf("%d %d %d", &A, &B, &C);

  printf("%d\n%d\n%d\n%d", (A + B) % C, ((A % C) + (B % C)) % C, (A * B) % C, ((A % C) * (B % C)) % C);

  return 0;
}
