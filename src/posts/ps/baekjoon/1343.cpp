#pragma warning(disable : 4996)
#include <stdbool.h>
#include <stdio.h>

int main(int argc, char* argv[]) {
  /* Input */
  char board[51];
  scanf("%s", board);  // '\0' 포함.

  /* Calculate */
  int s = 0, e = 0;       // start, end
  bool isunable = false;  // 덮을 수 없는 경우 체크.
  while (true) {
    /* e값 증가 : e는 '.' 혹은 '\0' 위치에 고정됨.*/
    while (board[e] != '.' && board[e] != '\0') e++;

    /* X가 홀수개인 경우 */
    if ((e - s) % 2 == 1) {
      isunable = true;
      break;
    }
    /* X가 짝수개(AAAA..AABB)인 경우 */
    else if ((e - s) % 4 == 2) {
      while (s < e - 2) board[s++] = 'A';
      while (s < e) board[s++] = 'B';
    }
    /* X가 짝수개(AAAA..AAAA)인 경우 */
    else {
      while (s < e) board[s++] = 'A';
    }

    /* 반복문 탈출 조건 */
    if (board[e] == '\0') break;

    /* s, e값 증가 */
    s++;
    e++;
  }

  /* Output */
  if (isunable == true)
    printf("%d", -1);
  else
    printf("%s", board);

  /* End */
  return 0;
}

/*
종이에 풀이 따로 안적음.

투포인터 알고리즘 이용.

[접근방법]
X가 짝수개이면 A or B로 모두 덮을 수 있다.
X가 4이상의 짝수이면, A를 먼저 최대한 많이 채우고, 나머지를 B로 채우면 된다.
(이렇게 하면 사전순으로 가장 앞서는 답이 출력된다.)
*/
