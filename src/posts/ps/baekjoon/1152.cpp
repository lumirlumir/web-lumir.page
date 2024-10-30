#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX_LEN 1000000

char* trim(char* str) {
  char* end;

  while (isspace((unsigned char)*str)) str++;

  if (*str == 0) return str;

  end = str + strlen(str) - 1;
  while (end > str && isspace((unsigned char)*end)) end--;

  end[1] = '\0';

  return str;
}

int main(int argc, char* argv[]) {
  int count = 0;
  char* str = (char*)calloc(MAX_LEN, sizeof(char));

  fgets(str, MAX_LEN, stdin);
  // printf("%s", str);

  if (strlen(str) == 2) {  // 만약 공백 하나만 입력되었을때를 위한 if 문 처리를
                           // 해주어서 0이 출력되게 함
    if (str[0] == ' ') {
      printf("0\n");
      return 0;
    }
  }

  char* tmp = trim(str);

  // printf("%s", tmp);

  for (int i = 0; i < MAX_LEN; i++)
    if (tmp[i] == ' ') count++;

  printf("%d\n", count + 1);

  free(str);

  return 0;
}
