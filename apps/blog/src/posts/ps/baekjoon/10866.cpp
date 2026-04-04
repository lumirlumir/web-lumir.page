#include <deque>
#include <iostream>
#include <string>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  deque<int> dq;

  /* Input */
  int n;
  cin >> n;
  while (n--) {
    string str;
    cin >> str;

    if (str == "push_front") {
      int x;
      cin >> x;
      dq.push_front(x);
    } else if (str == "push_back") {
      int x;
      cin >> x;
      dq.push_back(x);
    } else if (str == "pop_front") {
      if (dq.empty()) {
        cout << "-1" << '\n';
        continue;
      }

      cout << dq.front() << '\n';
      dq.pop_front();
    } else if (str == "pop_back") {
      if (dq.empty()) {
        cout << "-1" << '\n';
        continue;
      }

      cout << dq.back() << '\n';
      dq.pop_back();
    } else if (str == "size") {
      cout << dq.size() << '\n';
    } else if (str == "empty") {
      cout << dq.empty() << '\n';
    } else if (str == "front") {
      if (dq.empty()) {
        cout << "-1" << '\n';
        continue;
      }

      cout << dq.front() << '\n';
    } else if (str == "back") {
      if (dq.empty()) {
        cout << "-1" << '\n';
        continue;
      }

      cout << dq.back() << '\n';
    }
  }

  /* Return */
  return 0;
}
