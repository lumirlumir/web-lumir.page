#include <stdio.h>

int Sigma_from_one(int num);

int main(void) {
  int num;

  scanf("%d", &num);

  printf("%d", Sigma_from_one(num));
  return 0;
}

int Sigma_from_one(int num) {
  if (num == 1)
    return 1;
  return num + Sigma_from_one(num - 1);
}
