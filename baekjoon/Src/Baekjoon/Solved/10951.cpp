#pragma warning(disable : 4996)
#include <stdio.h>

int main(int argc, char* argv[]) {
  int ch1, ch2;
  while (true) {
    scanf("%d %d", &ch1, &ch2);
    if (feof(stdin) != 0)
      break;
    printf("%d\n", ch1 + ch2);
  }

  return 0;
}
