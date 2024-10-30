#include <iostream>
#include <queue>
#include <stack>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  int n;
  cin >> n;

  queue<int> seq;
  for (int i = 0; i < n; i++) {
    int tmp;
    cin >> tmp;
    seq.push(tmp);
  }

  stack<int> s;
  queue<char> ans;

  /* Calculate */
  for (int i = 1; !seq.empty();) {
    if (s.empty()) {
      s.push(i++);
      ans.push('+');
    } else if (s.top() == seq.front()) {
      seq.pop();
      s.pop();
      ans.push('-');
    } else if (s.top() < seq.front()) {
      s.push(i++);
      ans.push('+');
    } else if (s.top() > seq.front()) {
      cout << "NO";
      return 0;
    }
  }

  /* Output */
  while (!ans.empty()) {
    cout << ans.front() << '\n';
    ans.pop();
  }

  /* End */
  return 0;
}
