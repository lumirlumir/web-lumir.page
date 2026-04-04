#include <stdio.h>

int main(void) {
  char str[100] = {0};
  int count = 0;

  gets(str);

  for (int i = 0; str[i] != '\0'; i++) {
    printf("%c", str[i]);
    count++;
    if (count == 10) {
      printf("\n");
      count = 0;
    }
  }
  return 0;
}
