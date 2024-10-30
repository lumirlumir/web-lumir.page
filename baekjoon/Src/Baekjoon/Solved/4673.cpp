#pragma warning(disable : 4996)
#include <stdio.h>

int main(int argc, char* argv[]) {
  int C;
  scanf("%d", &C);

  for (int i = 0; i < C; i++) {
    int grade[1000] = {};
    int avg = 0, count = 0;
    int N;
    scanf("%d", &N);

    /* 점수 총합 구하기 */
    for (int j = 0; j < N; j++) {
      scanf("%d", &grade[j]);
      avg += grade[j];
    }

    /* 평균 구하기 */
    avg /= N;

    /* 평균을 넘는 학생 수 구하기 */
    for (int j = 0; j < N; j++)
      if (grade[j] > avg)
        count++;

    /* 비율 출력하기 */
    printf("%.3f%%\n", (double)count / N * 100);
  }

  return 0;
}

/*
퍼센트(%) 기호 자체를 출력하기 위해서는 퍼센트 기호를
"2개 중복"해 주어야 한다.
*/
