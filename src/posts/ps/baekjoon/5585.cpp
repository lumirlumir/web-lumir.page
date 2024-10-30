#pragma warning(disable : 4996)
#include <stdio.h>

int main(int argc, char* argv[]) {
  /* Init */
  int changes_typ[6] = {500, 100, 50, 10, 5, 1};
  int changes_num = 0;  // changes? ??? ??.
  int n;
  scanf("%d", &n);
  n = 1000 - n;  // n? ??.

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
