#include <iostream>
#include <string>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Input */
  string str;
  cin >> str;

  /* Output */
  cout << str.size();

  /* End */
  return 0;
}

/*
string class 연습 겸 풀어본 문제.
*/
