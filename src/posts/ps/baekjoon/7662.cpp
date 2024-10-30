#include <iostream>
#include <set>
using namespace std;

class double_priority_queue {
 private:
  multiset<int> ms;

 public:
  /* Constructor & Destructor */
  double_priority_queue() {}
  ~double_priority_queue() {}

  /* Method */
  void insert(int x) { ms.insert(x); }
  int top_max() { return *(--ms.end()); }
  int top_min() { return *ms.begin(); }
  void pop_max() { ms.erase(--ms.end()); }
  void pop_min() { ms.erase(ms.begin()); }
  bool empty() { return ms.empty(); }
};

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Input */
  int t;
  cin >> t;
  while (t--) {
    /* Init */
    double_priority_queue dpq;

    /* Input */
    int k;
    cin >> k;
    while (k--) {
      /* Input */
      char c;
      cin >> c;

      /* I */
      if (c == 'I') {
        int x;
        cin >> x;
        dpq.insert(x);
      }

      /* D */
      else if (c == 'D') {
        int x;
        cin >> x;

        if (dpq.empty()) continue;

        if (x == 1)
          dpq.pop_max();
        else if (x == -1)
          dpq.pop_min();
      }
    }

    /* Output */
    if (dpq.empty())
      cout << "EMPTY\n";
    else
      cout << dpq.top_max() << ' ' << dpq.top_min() << '\n';
  }

  /* Return */
  return 0;
}

/*
구글에 다른 풀이 한번 찾아보자.
https://donggoolosori.github.io/2020/09/24/boj-7662/
*/
