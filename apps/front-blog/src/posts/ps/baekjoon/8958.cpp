#include <stdio.h>

int main(void) {
  char OX[100] = {0};
  int num = 0, result = 0, Count;

  scanf("%d", &Count);

  for (int j = 0; j < Count; j++) {
    scanf("%s", OX);  // 배열에 문자 들어감.

    for (int i = 0; OX[i] != '\0'; i++) {
      if (OX[i] == 'O')  // 배열에 들어있는 문자가 'O' 인경우
        num++;
      else  // 배열에 들어있는 문자가 'X' 인경우
        num = 0;
      result += num;
    }
    printf("%d\n", result);
    num = 0, result = 0;
  }
  return 0;
}
