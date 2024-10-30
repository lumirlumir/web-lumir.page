#include <iostream>
#include <unordered_set>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  unordered_set<int> us;

  /* Input */
  int n;
  cin >> n;
  while (n--) {
    int x;
    cin >> x;
    us.insert(x);
  }

  int m;
  cin >> m;
  while (m--) {
    int x;
    cin >> x;

    if (us.find(x) == us.end())  // 찾지 못한경우
      cout << '0' << '\n';
    else
      cout << '1' << '\n';
  }

  /* Return */
  return 0;
}

/*
https://blog.naver.com/PostView.nhn?blogId=yoochansong&logNo=222089528785&parentCategoryNo=&categoryNo=10&viewDate=&isShowPopularPosts=true&from=search\
https://holicaz.tistory.com/5
*/
