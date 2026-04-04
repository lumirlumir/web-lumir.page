#include <iostream>
#include <vector>
using namespace std;

vector<int> node;

void DC(int l, int r) {
  /* Init */
  int i;
  for (i = l + 1; i <= r; i++)
    if (node[i] > node[l]) break;

  /* Base Case */
  if (l > r) return;

  /* Inductive Step */
  DC(l + 1, i - 1);
  DC(i, r);
  cout << node[l] << '\n';
}

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Input */
  while (true) {
    int x;
    if (!(cin >> x)) break;
    node.push_back(x);
  }

  /* Divide & Conquer */
  DC(0, node.size() - 1);

  /* Return */
  return 0;
}

/*
https://www.acmicpc.net/board/view/103352
https://ongveloper.tistory.com/295
https://rujang.tistory.com/entry/%EB%B0%B1%EC%A4%80-5639%EB%B2%88-%EC%9D%B4%EC%A7%84-%EA%B2%80%EC%83%89-%ED%8A%B8%EB%A6%AC
*/
