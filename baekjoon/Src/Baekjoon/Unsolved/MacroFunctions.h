#ifndef __MACROFUNC_H__
#define __MACROFUNC_H__

#define SWAP(a, b, type) \
  do {                   \
    type temp = a;       \
    a = b;               \
    b = temp;            \
  } while (0)

#define MIN_2(a, b) (((a) < (b)) ? (a) : (b))
#define MIN_3(a, b, c) \
  (((a) < (b)) ? ((a) < (c) ? (a) : (c)) : ((b) < (c) ? (b) : (c)))
#define MAX_2(a, b) (((a) > (b)) ? (a) : (b))
#define MAX_3(a, b, c) \
  (((a) > (b)) ? ((a) > (c) ? (a) : (c)) : ((b) > (c) ? (b) : (c)))

#endif
