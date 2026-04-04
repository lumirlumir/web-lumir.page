#include <stdio.h>

int main(void) {
  char str[102] = {0};
  int count = 0;

  scanf("%s", str);

  for (int i = 0; str[i] != '\0'; i++) {
    if (str[i] == 'c') {
      if (str[i + 1] == '=')
        count++, i++;

      else if (str[i + 1] == '-')
        count++, i++;

      else
        count++;
    }

    else if (str[i] == 'd') {
      if (str[i + 1] == 'z' && str[i + 2] == '=')
        count++, i += 2;

      else if (str[i + 1] == '-')
        count++, i++;

      else
        count++;
    }

    else if (str[i] == 'l' && str[i + 1] == 'j')
      count++, i++;

    else if (str[i] == 'n' && str[i + 1] == 'j')
      count++, i++;

    else if (str[i] == 's' && str[i + 1] == '=')
      count++, i++;

    else if (str[i] == 'z' && str[i + 1] == '=')
      count++, i++;

    else
      count++;
  }

  printf("%d", count);
  return 0;
}
