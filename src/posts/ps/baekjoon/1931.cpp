#pragma warning(disable : 4996)
#include <algorithm>
#include <cstdio>
#include <cstdlib>
#include <queue>

typedef struct {
  unsigned int start;
  unsigned int end;
} Conf;

int compare(const Conf& a, const Conf& b) {
  if (a.end == b.end)
    return a.start < b.start;
  else
    return a.end < b.end;
}

void activity_selection(Conf* arr, int n) {
  std::queue<int> q;
  q.push(0);
  int last = 0;
  int count = 1;

  for (int i = 1; i < n; i++) {
    if (arr[last].end <= arr[i].start) {
      q.push(i);
      last = i;
      count++;
    }
  }

  ///* Test */
  // while (!q.empty()) {
  //	printf("%d | ", q.front());
  //	q.pop();
  // }
  // printf("\n");

  printf("%d", count);
}

int main(void) {
  /* Input */
  int n;
  scanf("%d", &n);

  Conf* arr = (Conf*)calloc(n, sizeof(Conf));
  for (int i = 0; i < n; i++) scanf("%u %u", &arr[i].start, &arr[i].end);

  ///* Test */
  // for (int i = 0; i < n; i++)
  //	printf("%d = start:%u, end:%u\n", i, arr[i].start, arr[i].end);

  std::sort(arr, arr + n, compare);

  ///* Test */
  // for (int i = 0; i < n; i++)
  //	printf("%d = start:%u, end:%u\n", i, arr[i].start, arr[i].end);

  activity_selection(arr, n);

  return 0;
}
