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
  int T;
  cin >> T;

  /* Calculate */
  for (int i = 0; i < T; i++) {
    /* Init */
    string str;
    cin >> str;
    stack<bool> s;
    bool isno = false;  // flag 변수

    /* Calculate */
    for (int i = 0; i < str.size(); i++) {
      if (str[i] == '(') {
        s.push(true);
      } else if (str[i] == ')') {
        if (s.empty()) {
          isno = true;
          break;
        } else {
          s.pop();
        }
      }
    }

    /* Output */
    if (!s.empty() || isno == true)
      cout << "NO" << '\n';
    else
      cout << "YES" << '\n';
  }

  /* End */
  return 0;
}

/*
'\n' 이 "\n" 보다 속도가 빠르다.

사용한 자료구조 : stack
풀이 내용
1. '(' 일 때
        stack에 push
2. ')' 일 때
        stack이 비어있지 않다면 pop
        stack이 비어있다면 "NO"
3. 입력으로 온 문자열 확인 마친 경우
        stack이 비어있는 경우 "YES"
        stack이 비어있지 않은 경우 "NO"

*/
