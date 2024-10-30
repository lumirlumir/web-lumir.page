#pragma warning(disable : 4996)
#include <cmath>
#include <cstdio>
#include <cstdlib>
#include <cstring>
using namespace std;

int compare(const void *a, const void *b) { return *(int *)b - *(int *)a; }

int main(int argc, char *argv[]) {
  /* Init */
  int AZweight[26] = {};  // A~Z에 해당하는 가중치 값 저장.

  /* Input & Weight Calculation */
  int N;
  scanf("%d", &N);
  for (int i = 0; i < N; i++) {
    char word[9];
    scanf("%s", word);

    for (int i = 0; i < strlen(word); i++)
      AZweight[word[i] - 65] += pow(10, strlen(word) - i - 1);
  }

  /* Sort */
  qsort(AZweight, sizeof(AZweight) / sizeof(int), sizeof(int), compare);

  /* Output */
  int sum = 0, num = 9;
  for (int i = 0; AZweight[i] != 0; i++) sum += AZweight[i] * num--;

  printf("%d", sum);

  /* End */
  return 0;
}

/*
문자열 뒤집기 알고리즘 공부.
북마크랑 종이 참고. 북마크에 적어둔 방식으로 문제를 풀었다.
*/
