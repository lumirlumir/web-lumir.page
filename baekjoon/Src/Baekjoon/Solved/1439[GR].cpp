#pragma warning(disable : 4996)
#include <cstdio>
#define min(a, b) (((a) < (b)) ? (a) : (b))
using namespace std;

char S[1000000] = {};  //'\0'포함.
int count[2] = {};  // count[0] : 0 -> 1 의 횟수. count[1] : 1 -> 0의 횟수.

int main(int argc, char* argv[]) {
  /* Input */
  scanf("%s", S);

  /* Calculate */
  for (int i = 0; S[i] != '\0'; i++)  // O(n)의 시간복잡도.
    if (S[i] != S[i + 1]) count[(S[i] == '0' ? 0 : 1)]++;

  printf("%d", min(count[0], count[1]));

  /* End */
  return 0;
}

/*
[접근방법]
① 0 -> 1의 횟수 세기.
② 1 -> 0의 횟수 세기.

0 or 1 -> null(='\0')으로 가는 방법도 횟수를 세어줘야함.

①과 ②중 최솟값 찾기.
*/
