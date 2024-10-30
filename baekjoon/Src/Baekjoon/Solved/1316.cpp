#include <stdio.h>

int main(void) {
  int Wordnum, Answer = 0;
  char Word[100] = {0};
  int Alphabet[26] = {0};

  scanf("%d", &Wordnum);

  for (int i = 0; i < Wordnum; i++)  // Wordnum 만큼 반복
  {
    scanf("%s", Word);

    // 그룹단어 판단 START

    for (int j = 0; Word[j] != '\0'; j++)
      if (Word[j] != Word[j + 1])
        Alphabet[Word[j] - 'a']++;

    for (int j = 0; j < 26; j++) {
      if (Alphabet[j] >= 2)
        break;
      if (j == 25)
        Answer++;
    }

    for (int j = 0; j < 26; j++)
      Alphabet[j] = 0;

    // 그룹단어 판단 FINISH
  }
  printf("%d", Answer);
  return 0;
}
