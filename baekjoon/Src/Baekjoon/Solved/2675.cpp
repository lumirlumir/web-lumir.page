#include <stdio.h>

int main(void) {
  char str[1000] = {0};
  char repeat_str[1000] = {0};
  int repeat, startpos = 0, testcase;

  scanf("%d", &testcase);

  for (int j = 0; j < testcase; j++) {
    scanf("%d", &repeat);
    scanf("%s", str);

    for (int i = 0; str[i] != '\0'; i++) {
      for (int k = 0; k < repeat; k++)
        repeat_str[startpos + k] = str[i];
      startpos += repeat;
    }
    repeat_str[startpos++] = '!';
  }

  for (int i = 0; repeat_str[i] != '\0'; i++) {
    if (repeat_str[i] == '!')
      printf("\n");
    else
      printf("%c", repeat_str[i]);
  }

  return 0;
}
