#pragma warning(disable : 4996)
#include <cstdio>
#include <cstring>
using namespace std;

int main(int argc, char* argv[]) {
  /* Init */
  int AZalp[26] = {};  // A~Z까지의 알파벳의 개수를 담을 배열.
  char str[51];
  scanf("%s", str);  //'\0'포함.

  /* 개수세기 */
  for (int i = 0; str[i] != '\0'; i++) AZalp[str[i] - 65]++;

  /* 홀수 개수 파악 */
  int oddnum = 0;
  for (int i = 0; i < 26; i++)
    if (AZalp[i] % 2 == 1)
      if (++oddnum >= 2) {
        printf("I'm Sorry Hansoo");
        return 0;
      }

  /* 배치 */
  int str_idx = 0;
  // ①
  for (int AZalp_idx = 0; AZalp_idx < 26; AZalp_idx++)
    while (AZalp[AZalp_idx] >= 2) {
      str[str_idx] = str[strlen(str) - str_idx - 1] = AZalp_idx + 65;
      AZalp[AZalp_idx] -= 2;
      str_idx++;
    }
  // ②
  for (int AZalp_idx = 0; AZalp_idx < 26; AZalp_idx++)
    if (AZalp[AZalp_idx] == 1) str[str_idx] = AZalp_idx + 65;

  /* Output */
  printf("%s", str);

  /* End */
  return 0;
}
