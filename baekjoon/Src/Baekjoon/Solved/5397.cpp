#include <iostream>
#include <list>
#include <string>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Input */
  int n;
  cin >> n;
  for (int i = 0; i < n; i++) {
    /* Init & Input */
    list<char> li;
    list<char>::iterator it = li.begin();

    string str;
    cin >> str;

    /* Key Logger */
    for (auto j : str) {
      /* Alphabet & Number */
      if (('A' <= j && j <= 'Z') ||
          ('a' <= j && j <= 'z') ||
          ('0' <= j && j <= '9')) {
        li.insert(it, j);  // 아래 코드와의 차이점을 알아야 한다.
        // it = li.insert(it, j);
      }
      /* Backspace : '-' */
      else if (j == '-') {
        if (it != li.begin())
          it = li.erase(--it);
      }
      /* Arrow : < */
      else if (j == '<') {
        if (it != li.begin())
          it--;
      }
      /* Arrow : > */
      else if (j == '>') {
        if (it != li.end())
          it++;
      }
    }

    /* Output */
    for (auto j : li)
      cout << j;
    cout << '\n';
  }

  /* Return */
  return 0;
}

/*
li.insert(it, j); 일 경우,
Input : <<BP
Output : BP

it = li.insert(it, j); 일 경우,
Input : <<BP
Output : PB
*/
