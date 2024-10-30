#include <stdio.h>

int main(void) {
  char str[100] = {0};
  int numcount[26] = {0};

  gets(str);

  for (int i = 0; i < 26; i++)
    if (numcount[i] == 0)
      numcount[i] = (-1);

  for (int i = 0; str[i] != '\0'; i++) {
    if (numcount[str[i] - 97] == (-1))
      numcount[str[i] - 97] = i;
  }

  for (int i = 0; i < 26; i++)
    printf("%d ", numcount[i]);

  return 0;
}
