#pragma warning(disable : 4996)
#include <stdio.h>

int min(int a, int b) {
  return a > b ? b : a;
}

int main(int argc, char* argv[]) {
  int x, y, w, h;
  scanf("%d %d %d %d", &x, &y, &w, &h);

  printf("%d", min(min(w - x, x), min(h - y, y)));

  return 0;
}
