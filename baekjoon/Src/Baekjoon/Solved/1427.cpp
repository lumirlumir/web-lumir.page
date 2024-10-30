#include <stdio.h>

int CountingCipher(int num);
void BubbleSortDES(int* array, int len);

int main(void) {
  int Cipher, num;      // Cipher는 입력한 수의 자릿수
  int arr[1000] = {0};  // arr[0] 은 10의 0승 자리, arr[1]은 10의 1승 자리, ...

  // printf("수를 입력하시오\n");
  scanf("%d", &num);
  Cipher = CountingCipher(num);

  for (int i = 0; i < Cipher; i++) {
    arr[i] = num % 10;
    num /= 10;
  }
  // 여기까지 해서 배열에 각자리 숫자 입력 완료.

  BubbleSortDES(arr, Cipher);  // Cipher == sizeof(arr) / sizeof(int)

  for (int i = 0; i < Cipher; i++)
    printf("%d", arr[i]);

  return 0;
}

int CountingCipher(int num) {
  int i;  // i 가 자릿수
  for (i = 0; num != 0; i++)
    num /= 10;
  return i;
}

void BubbleSortDES(int* array, int len)  // len == Cipher
{
  int temp;

  for (int j = 0; j < len - 1; j++)
    for (int i = 0; i < len - 1 - j; i++)
      if (array[i] < array[i + 1]) {
        temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
      }
}
