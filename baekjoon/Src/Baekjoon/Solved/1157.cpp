#include <stdio.h>

void Capital_to_Small(char* str) {
  for (int i = 0; str[i] != '\0'; i++)
    if (str[i] >= 'A' && str[i] <= 'Z')
      str[i] += 32;
}

int main(void) {
  char str[1000002] = {0};
  int Alphabet[26] = {0};
  int Max = 0, Count = 0, Maxvalue = 0;

  scanf("%s", str);

  Capital_to_Small(str);

  for (int i = 0; str[i] != '\0'; i++)
    Alphabet[str[i] - 'a']++;

  Max = Alphabet[0];

  for (int i = 0; i <= 24; i++)
    if (Max < Alphabet[i + 1]) {
      Max = Alphabet[i + 1];
      Maxvalue = (i + 1);
    }

  for (int i = 0; i <= 25; i++)
    if (Max == Alphabet[i])
      Count++;
  // Count == 1 이면 해당하는 최대값 같는 알파벳 출력, Count>=2 이면  ? 출력

  if (Count == 1)
    printf("%c", Maxvalue + 65);

  else
    printf("?");

  return 0;
}
