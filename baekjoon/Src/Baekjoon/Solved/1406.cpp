#include <iostream>
#include <list>
#include <string>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init & Init */
  list<char> li;
  list<char>::iterator it = li.end();

  string str;
  cin >> str;
  for (int i = 0; i < str.size(); i++)
    li.push_back(str[i]);

  /* Command */
  int m;
  cin >> m;
  for (int i = 0; i < m; i++) {
    /* Input */
    char c;
    cin >> c;

    switch (c) {
      /* L */
      case 'L': {
        if (it == li.begin()) continue;
        it--;

        break;
      }
      /* D */
      case 'D': {
        if (it == li.end()) continue;
        it++;

        break;
      }
      /* B */
      case 'B': {
        if (it == li.begin()) continue;
        it = li.erase(--it);

        break;
      }
      /* P */
      case 'P': {
        char ch;
        cin >> ch;
        li.insert(it, ch);

        break;
      }
    }
  }

  /* Output */
  for (auto i : li)
    cout << i;

  /* Return */
  return 0;
}

/*
커서의 위치 : abc 라는 문자열이 주어진 경우.
^a^b^c^ : ^가 커서가 위치할 수 있는 자리이다.

li.erase(iter)는 iter가 가리키는 원소를 삭제한 후,
삭제한 원소의 다음 원소를 가리키는 iterator를 반환한다.
따라서, li.erase(--it); 가 아닌
it = li.erase(--it); 를 통해 it값을 업데이트 해주어야 한다.
*/
