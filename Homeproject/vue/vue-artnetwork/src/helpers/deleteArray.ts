export const deleteFromArrayById = (array: any[], id: string): any[] => {
  let result = array;

  array.forEach((element, index) => {
    if (element.id === id) {
      result = [...array.slice(0, index), ...array.slice(index + 1)]
    }
  });

  return result
}
