#include <iostream>
#include <string>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  string str;
  cin >> str;
  int cnt = 0;  // 'P'가 연속으로 나타난 횟수.

  /* Calculate */
  for (int i = 0; i < str.size(); i++) {
    if (cnt < 2) {
      if (str[i] == 'P') {
        cnt++;
      } else if (str[i] == 'A') {
        cout << "NP";
        return 0;
      }
    } else if (cnt >= 2) {
      if (str[i] == 'P') {
        cnt++;
      } else if (str[i] == 'A') {
        if (str[i + 1] == 'P') {
          cnt--;
          i++;
        } else if (str[i + 1] == 'A') {
          cout << "NP";
          return 0;
        }
      }
    }
  }

  /* Output */
  if (cnt == 1)
    cout << "PPAP";
  else
    cout << "NP";

  /* End */
  return 0;
}

/* 북마크 없음. */
