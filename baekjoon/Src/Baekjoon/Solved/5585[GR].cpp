#pragma warning(disable : 4996)
#include <stdio.h>

int main(int argc, char* argv[]) {
  /* Init */
  int changes_typ[6] = {500, 100, 50, 10, 5, 1};
  int changes_num = 0;  // changes는 잔돈의 개수.
  int n;
  scanf("%d", &n);
  n = 1000 - n;  // n은 잔돈.

  /* Calculate */
  for (int i = 0; i < 6; i++) {
    changes_num += n / changes_typ[i];
    n %= changes_typ[i];
  }

  /* Ouptput */
  printf("%d", changes_num);

  /* End */
  return 0;
}

/*
종이에 따로 풀이 안적음.
*/
