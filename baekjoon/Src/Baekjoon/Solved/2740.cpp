#include <iostream>
using namespace std;

int mat1[100][100] = {};
int mat2[100][100] = {};

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init */
  int n, m, k;

  /* Mat1 */
  cin >> n >> m;
  for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++)
      cin >> mat1[i][j];

  /* Mat2 */
  cin >> m >> k;
  for (int i = 0; i < m; i++)
    for (int j = 0; j < k; j++)
      cin >> mat2[i][j];

  /* Output */
  for (int _n = 0; _n < n; _n++) {
    for (int _k = 0; _k < k; _k++) {
      int mul = 0;

      for (int _m = 0; _m < m; _m++)
        mul += mat1[_n][_m] * mat2[_m][_k];

      cout << mul << ' ';
    }
    cout << '\n';
  }

  /* Return */
  return 0;
}
