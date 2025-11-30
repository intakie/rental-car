export const formatMileage = (m: number) => {
  if (typeof m !== 'number') return '';
  return m.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' km';
};
