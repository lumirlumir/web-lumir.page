#pragma warning(disable : 4996)
#include <stdio.h>

typedef struct {
  char alphabet[4];
} Alphabet;

int main(void) {
  Alphabet arr[9] = {{'A', 'B', 'C'}, {'D', 'E', 'F'},     {'G', 'H', 'I'},
                     {'J', 'K', 'L'}, {'M', 'N', 'O'},     {'P', 'Q', 'R', 'S'},
                     {'T', 'U', 'V'}, {'W', 'X', 'Y', 'Z'}};

  int ch, sum = 0;
  while ((ch = fgetc(stdin)) != '\n')
    for (int i = 0; i < 9; i++)
      for (int j = 0; j < 4; j++)
        if (ch == arr[i].alphabet[j]) sum += (i + 3);

  printf("%d", sum);

  return 0;
}
