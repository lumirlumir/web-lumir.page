#pragma warning(disable : 4996)
#include <stdio.h>

int main(int argc, char* argv[]) {
  int num;
  int a, b;

  scanf("%d", &num);

  for (int i = 0; i < num; i++) {
    scanf("%d %d", &a, &b);
    printf("Case #%d: %d\n", i + 1, a + b);
  }

  return 0;
}
