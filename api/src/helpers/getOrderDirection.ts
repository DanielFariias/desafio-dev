export function getOrderDirection(order?: string) {
  if (order?.toLowerCase() === 'desc') {
    return 'DESC';
  }

  return 'ASC';
}
