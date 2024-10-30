#pragma warning(disable : 4996)
#include <algorithm>
#include <cstdio>
#include <cstdlib>

/* Struct */
typedef struct {
  int p;
  int rank;
} NODE;

typedef struct {
  int u;
  int v;
  int weight;
} EDGE;

/* Function */
/* Disjoint Set*/
void DS_make(NODE* node, int u) {
  node[u].p = u;
  node[u].rank = 0;
}

int DS_find(NODE* node, int u) {
  if (node[u].p != u) node[u].p = DS_find(node, node[u].p);
  return node[u].p;
}

bool DS_merge(NODE* node, int u, int v) {
  int ur = DS_find(node, u);
  int vr = DS_find(node, v);
  if (ur == vr) return false;
  if (node[ur].rank > node[vr].rank)
    node[vr].p = ur;
  else {
    node[ur].p = vr;
    if (node[ur].rank == node[vr].rank) node[vr].rank += 1;
  }
  return true;
}

int compare(const EDGE& a, const EDGE& b) { return a.weight < b.weight; }

int main(void) {
  /* Input */
  int v, e;
  scanf("%d %d", &v, &e);

  EDGE* edge = (EDGE*)calloc(e, sizeof(EDGE));
  for (int i = 0; i < e; i++)
    scanf("%d %d %d", &edge[i].u, &edge[i].v, &edge[i].weight);

  NODE* node = (NODE*)calloc(v + 1, sizeof(NODE));

  ///* Test */
  // printf("\n");
  // for (int i = 0; i < e; i++)
  //	printf("%d %d %d\n", edge[i].u, edge[i].v, edge[i].weight);

  /* Make Set */
  for (int i = 0; i < v; i++) DS_make(node, i);

  /* Order */
  std::sort(edge, edge + e, compare);

  ///* Test */
  // printf("\n");
  // for (int i = 0; i < e; i++)
  //	printf("%d %d %d\n", edge[i].u, edge[i].v, edge[i].weight);

  /* Kruscal */
  int w = 0;
  for (int i = 0; i < e; i++) {
    if (DS_find(node, edge[i].u) != DS_find(node, edge[i].v)) {
      w += edge[i].weight;
      DS_merge(node, edge[i].u, edge[i].v);
    }
  }

  /* Output */
  printf("%d", w);

  return 0;
}
