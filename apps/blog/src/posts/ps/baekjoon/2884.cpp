#pragma warning(disable : 4996)
#include <stdio.h>
#include <stdlib.h>

typedef struct {
  int H;
  int M;
} time;

void time_minus(time* t, int M) {
  if (t->M - M >= 0)
    t->M = t->M - M;
  else {
    t->M = 60 - abs(t->M - M);
    t->H - 1 < 0 ? t->H = 24 - abs(t->H - 1) : t->H -= 1;
  }
}

int main(int argc, char* argv[]) {
  time t = {0};
  scanf("%d %d", &t.H, &t.M);

  time_minus(&t, 45);

  printf("%d %d\n", t.H, t.M);

  return 0;
}
