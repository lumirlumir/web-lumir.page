#pragma warning(disable : 4996)  // visual studio scanf 오류 방지.
#include <stdio.h>

int main(int argc, char* argv[]) {
  int king, queen, rook, bishop, knight, pawn;
  scanf("%d %d %d %d %d %d", &king, &queen, &rook, &bishop, &knight, &pawn);
  printf("%d %d %d %d %d %d\n", 1 - king, 1 - queen, 2 - rook, 2 - bishop, 2 - knight, 8 - pawn);
  return 0;
}
