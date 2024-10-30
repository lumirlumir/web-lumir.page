#include <stdio.h>

int main(void) {
  int n;
  scanf("%d", &n);

  for (int i = 0; i < n; i++) {
    for (int j = n - i; j < n; j++)
      printf(" ");
    for (int j = n - i; j >= 1; j--)
      printf("*");
    printf("\n");
  }
  return 0;
}
