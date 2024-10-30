#include <stdio.h>

void Sort_Bubble(int* arr, int len) {
  int temp;

  for (int j = 0; j < len; j++) {
    for (int i = 0; i < len - j - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
}

int main(void) {
  int arr[1000] = {0};
  int inputN;

  scanf("%d", &inputN);

  for (int i = 0; i < inputN; i++)
    scanf("%d", &arr[i]);

  Sort_Bubble(arr, inputN);

  for (int i = 0; i < inputN; i++)
    printf("%d\n", arr[i]);

  return 0;
}
