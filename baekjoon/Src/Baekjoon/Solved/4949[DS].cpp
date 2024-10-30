#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Input */
  while (true) {
    /* Init */
    string str;
    getline(cin, str);
    if (str == ".") break;

    stack<char> s;

    bool isno = false;  // flag 변수

    /* Calculate */
    for (int i = 0; i < str.size(); i++) {
      if (str[i] == '(' || str[i] == '[') {
        s.push(str[i]);
      } else if (str[i] == ')' || str[i] == ']') {
        if (s.empty() || str[i] == ')' && s.top() == '[' ||
            str[i] == ']' && s.top() == '(') {
          isno = true;
          break;
        } else {
          s.pop();
        }
      }
    }

    /* Output */
    if (!s.empty() || isno == true)
      cout << "no" << '\n';
    else
      cout << "yes" << '\n';
  }

  /* End */
  return 0;
}

/*

9012번과 비슷한 풀이

'('과 ')'의 아스키코드 값의 차이와, '['과 ']'의 아스키코드 값의 차이가 일정하지
않아, str[i] == ')' && s.top() == '[' || str[i] == ']' && s.top() == '(' 와 같이
코드를 작성할 수 밖에 없다.

[반례]
input : [)]
output : no

북마크 참고하자.

*/
