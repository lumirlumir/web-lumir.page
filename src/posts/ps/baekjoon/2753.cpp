#pragma warning(disable : 4996)
#include <stdio.h>

int Y(int n) {
  if (n % 4 == 0) {
    if (n % 100 == 0) {
      if (n % 400 == 0)
        return 1;
      else
        return 0;
    }
    return 1;
  } else
    return 0;
}

int main(void) {
  int n;
  scanf("%d", &n);

  printf("%d", Y(n));

  return 0;
}
