#pragma warning(disable : 4996)
#include <stdbool.h>
#include <stdio.h>

int main(int argc, char* argv[]) {
  bool flag[31] = {};  // 0=false로 초기화

  for (int i = 0; i < 28; i++) {
    int tmp;
    scanf("%d", &tmp);
    flag[tmp] = true;
  }

  for (int i = 1; i <= 30; i++)
    if (flag[i] == false)
      printf("%d\n", i);

  return 0;
}
