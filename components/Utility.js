export function formatDate(date, sep = '  ') {
  date = new Date(date);
  const Month = [
    'Gen',
    'Feb',
    'Mar',
    'Apr',
    'Mag',
    'Giu',
    'Lug',
    'Ago',
    'Set',
    'Ott',
    'Nov',
    'Dic',
  ];
  const day = date.getDate();
  return Month[date.getMonth()] + sep + (day < 10 ? '0' + day : day.toString());
}
