#pragma warning(disable : 4996)
#include <math.h>
#include <stdio.h>

int main(int argc, char* argv[]) {
  int A, B, V;
  scanf("%d %d %d", &A, &B, &V);

  printf("%d", (int)ceil((double)(V - B) / (A - B)));

  return 0;
}
