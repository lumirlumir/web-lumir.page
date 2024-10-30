#pragma warning(disable : 4996)
#include <stdio.h>

typedef struct {
  int num0_cache;
  int num1_cache;
} Cache;

Cache C[41] = {{1, 0}, {0, 1}, {}};
// Cache(Memoization), C[0] C[1] 제외 멤버변수 모두 0으로 초기화.

void fibonacci(void) {
  for (int i = 2; i <= 40; i++) {  // 40보다 작거나 같은 자연수
    C[i].num0_cache = C[i - 1].num0_cache + C[i - 2].num0_cache;
    C[i].num1_cache = C[i - 1].num1_cache + C[i - 2].num1_cache;
  }
}

int main(int argc, char* argv[]) {
  fibonacci();

  int T;
  scanf("%d", &T);
  for (int i = 0; i < T; i++) {
    int N;
    scanf("%d", &N);
    printf("%d %d\n", C[N].num0_cache, C[N].num1_cache);
  }

  return 0;
}

/*
문제 상황에 따라 TD방식과 BU방식 중에서 어떤걸로 문제를 풀지
결정할 줄 알아야 한다.
*/
