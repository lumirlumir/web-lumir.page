#pragma warning(disable : 4996)
#include <stdbool.h>
#include <stdio.h>

#include <stack>
using namespace std;
int main(void) {
  int n, tmp, sum = 0;
  stack<int> stack;

  scanf("%d", &n);
  for (int i = 0; i < n; i++) {
    scanf("%d", &tmp);
    if (tmp != 0)
      stack.push(tmp);
    else
      stack.pop();
  }
  while (!stack.empty()) {
    sum += stack.top();
    stack.pop();
  }
  printf("%d", sum);

  return 0;
}
