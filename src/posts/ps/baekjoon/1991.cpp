#include <iostream>
using namespace std;

/* Struct */
struct node {
  char left;
  char right;
};

/* Global */
node tree[26];  // A(0)~Z(26) 까지 저장.

/* Fuction */
void preorder(char root) {
  if (root != '.') {
    cout << root;
    preorder(tree[root - 'A'].left);
    preorder(tree[root - 'A'].right);
  }
}

void inorder(char root) {
  if (root != '.') {
    inorder(tree[root - 'A'].left);
    cout << root;
    inorder(tree[root - 'A'].right);
  }
}

void postorder(char root) {
  if (root != '.') {
    postorder(tree[root - 'A'].left);
    postorder(tree[root - 'A'].right);
    cout << root;
  }
}

/* Main */
int main(int argc, char* argv[]) {
  /* Faster */
  ios::sync_with_stdio(0);
  cin.tie(0);
  cout.tie(0);

  /* Input & Init */
  int n;
  cin >> n;
  for (int i = 0; i < n; i++) {
    /* Input */
    char root, left, right;
    cin >> root >> left >> right;
    /* Tree */
    tree[root - 'A'].left = left;
    tree[root - 'A'].right = right;
  }

  /* Output */
  preorder('A');
  cout << '\n';
  inorder('A');
  cout << '\n';
  postorder('A');
  cout << '\n';

  /* Return */
  return 0;
}
