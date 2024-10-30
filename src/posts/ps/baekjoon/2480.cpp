#include <stdio.h>
#define MAX3(a, b, c) (((a) > (b)) ? ((a) > (c) ? (a) : (c)) : ((b) > (c) ? (b) : (c)))

int main(int argc, char* argv[]) {
  int a, b, c = 0;
  scanf("%d %d %d", &a, &b, &c);

  if (a == b && b == c) {
    printf("%d", 10000 + (a * 1000));
  } else if (a == b || b == c || c == a) {
    if (a == b)
      printf("%d", 1000 + (a * 100));
    else if (b == c)
      printf("%d", 1000 + (b * 100));
    else if (c == a)
      printf("%d", 1000 + (c * 100));
  } else {
    printf("%d", MAX3(a, b, c) * 100);
  }

  return 0;
}
