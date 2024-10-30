#pragma warning(disable : 4996)
#include <stdbool.h>
#include <stdio.h>
#include <string.h>

int main(int argc, char* argv[]) {
  /* 선언 */
  char palin[7];  // '\0', '\n' 포함.

  while (true) {
    /* 팰린드롬 여부 판단 변수 선언 */
    bool ispalin = true;

    /* 문자열 입력 받은 후, 개행문자 제거 */
    fgets(palin, sizeof(palin), stdin);
    if (palin[strlen(palin) - 1] == '\n')
      palin[strlen(palin) - 1] = '\0';

    /* 0값이 입력된 경우, 종료 */
    if (strlen(palin) == 1 && palin[0] == '0')
      break;

    /* 팰린드롬 여부 판단 */
    for (int i = 0; i < strlen(palin); i++)
      if (palin[i] != palin[strlen(palin) - 1 - i])
        ispalin = false;

    /* 출력 */
    if (ispalin == false)
      printf("no\n");
    else if (ispalin == true)
      printf("yes\n");
  }

  return 0;
}
