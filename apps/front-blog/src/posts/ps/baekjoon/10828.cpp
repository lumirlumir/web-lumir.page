#pragma warning(disable : 4996)
#include <stdio.h>
#include <string.h>

int main(int argc, char* argv[]) {
  int n = 0;
  char buf[6] = {0};

  int idx = 0;
  int arr[10000] = {0};

  scanf("%d", &n);

  for (int i = 0; i < n; i++) {
    scanf("%s", buf);

    if (strcmp(buf, "push") == 0)
      scanf("%d\n", &arr[idx++]);
    else if (strcmp(buf, "pop") == 0)
      printf("%d\n", idx == 0 ? -1 : arr[(idx--) - 1]);
    else if (strcmp(buf, "size") == 0)
      printf("%d\n", idx);
    else if (strcmp(buf, "empty") == 0)
      printf("%d\n", idx == 0 ? 1 : 0);
    else if (strcmp(buf, "top") == 0) {
      printf("%d\n", idx == 0 ? -1 : arr[idx - 1]);
    }
  }

  return 0;
}
