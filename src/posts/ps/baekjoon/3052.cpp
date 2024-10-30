#pragma warning(disable : 4996)
#include <stdbool.h>
#include <stdio.h>

int main(int argc, char* argv[]) {
  int input;
  bool output[42] = {};  // 나머지에 해당하는 값 체크.

  /* 서로 다른 나머지 개수 세기 */
  for (int i = 0; i < 10; i++) {
    scanf("%d", &input);
    input %= 42;
    output[input] = true;
  }

  /* 출력 */
  int count = 0;
  for (int i = 0; i < 42; i++)
    if (output[i] == true) count++;

  printf("%d", count);

  /* 마무리 */
  return 0;
}
