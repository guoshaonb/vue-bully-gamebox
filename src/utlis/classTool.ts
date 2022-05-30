export function hasClass(id: string, cls: string) {
  const elem: any = document.querySelector(`#${id}`)
  if (!elem) return
  if (elem.className.indexOf(cls) > -1) {
    return true
  }
  return false;
}

export function addClass(id: string, cls: string) {
  const elem: any = document.querySelector(`#${id}`)
  if (!elem) return
  elem.className = (elem.className == '' || elem.className == undefined) ? cls : elem.className + ' ' + cls;
}

export function removeClass(id: string, cls: string) {
  const elem: any = document.querySelector(`#${id}`)
  if (!elem) return
  var newClass = ' ' + elem.className.replace(/[	]/g, '') + ' ';
  while (newClass.indexOf(' ' + cls + ' ') >= 0) {
    newClass = newClass.replace(' ' + cls + ' ', ' ');
  }
  elem.className = newClass.replace(/^s+|s+$/g, '');
}