#include <cmath>
#include <deque>
#include <iostream>
#include <string>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Input */
  int t;
  cin >> t;
  for (int i = 0; i < t; i++) {
    /* Init */
    deque<int> dq;

    /* Input */
    string p;
    cin >> p;
    int n;
    cin >> n;

    /* Parsing */
    string pars;
    cin >> pars;
    char num[3];
    int idx = 0;  //'일', '십, 일', '백, 십, 일'의 자리 순서대로 저장.

    for (auto c : pars) {
      /* '0' ~ '9' */
      if ('0' <= c && c <= '9') num[idx++] = c;

      /* ',' & ']' */
      else if (c == ',' || c == ']') {
        int sum = 0;
        for (int j = 0; idx != 0; j++) sum += (num[j] - '0') * (int)pow(10, (idx--) - 1);
        if (sum != 0) dq.push_back(sum);
      }
    }

    /* Function */
    bool error = false;
    bool FR = false;  // false = Front & true = Rear

    for (auto c : p) {
      /* 'R' */
      if (c == 'R') {
        FR = !FR;
      }
      /* 'D' */
      else if (c == 'D') {
        if (dq.empty())
          error = true;
        else
          FR ? dq.pop_back() : dq.pop_front();
      }
      /* Break */
      if (error) break;
    }

    /* Output */
    if (error) {
      cout << "error" << '\n';
    } else {
      cout << '[';
      while (!dq.empty()) {
        if (!FR) {
          cout << dq.front();
          dq.pop_front();
        } else {
          cout << dq.back();
          dq.pop_back();
        }

        if (!dq.empty()) cout << ',';
      }
      cout << ']' << '\n';
    }
  }

  /* Return */
  return 0;
}
