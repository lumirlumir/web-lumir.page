#include <stdio.h>

int main(void) {
  int A, B, Count = 0;
  int Arev[3], Brev[3];

  scanf("%d %d", &A, &B);

  while (A) {
    Arev[Count++] = A % 10;
    A /= 10;
  }

  Count = 0;

  while (B) {
    Brev[Count++] = B % 10;
    B /= 10;
  }

  for (int i = 0; i < 3; i++) {
    if (Arev[i] == Brev[i])
      continue;
    else if (Arev[i] < Brev[i]) {
      for (int j = 0; j < 3; j++)
        printf("%d", Brev[j]);
      break;
    } else {
      for (int j = 0; j < 3; j++)
        printf("%d", Arev[j]);
      break;
    }
  }
  return 0;
}
