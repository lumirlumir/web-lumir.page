#pragma warning(disable : 4996)
#include <stdio.h>

typedef struct {
  char alphabet[4];
} Dial;

int main(void) {
  Dial dial[9] = {// 빈공간은 0=NULL로 초기화 됨.
                  {'A', 'B', 'C'}, {'D', 'E', 'F'},     {'G', 'H', 'I'},
                  {'J', 'K', 'L'}, {'M', 'N', 'O'},     {'P', 'Q', 'R', 'S'},
                  {'T', 'U', 'V'}, {'W', 'X', 'Y', 'Z'}};

  int ch, sum = 0;
  while ((ch = fgetc(stdin)) != '\n')
    //(ch = fgetc(stdin))를 괄호로 안묶으면 오류 발생.
    for (int i = 0; i < 9; i++)
      for (int j = 0; j < 4; j++)
        if (ch == dial[i].alphabet[j]) sum += (i + 3);

  printf("%d", sum);

  return 0;
}

/*
다른 방식으로 풀더라도 어차피
PQRS와 WXYZ 부분에서 예외처리를 해주어야 하기 때문에,
위 방식도 나쁘지 않은듯.
*/
