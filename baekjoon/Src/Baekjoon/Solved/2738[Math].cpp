#include <iostream>
using namespace std;

int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Init & Input */
  int n, m;
  cin >> n >> m;

  int** arr1 = new int*[n];
  int** arr2 = new int*[n];

  for (int i = 0; i < n; i++) {
    arr1[i] = new int[m];
    arr2[i] = new int[m];
  }

  for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++) cin >> arr1[i][j];
  for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++) cin >> arr2[i][j];

  /* Calculation */
  for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++) arr1[i][j] += arr2[i][j];

  /* Output */
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) cout << arr1[i][j] << ' ';
    cout << '\n';
  }

  /* Delete */
  for (int i = 0; i < n; i++) {
    delete[] arr1[i];
    delete[] arr2[i];
  }
  delete[] arr1;
  delete[] arr2;

  /* Return */
  return 0;
}

/*
단순한 행렬 덧셈 문제이다.
*/
