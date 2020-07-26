export const distinctIdArray = (array: any[]) => {
  return (array
    .filter((elem, index, arr) =>
      arr.findIndex(
        e => e.id === elem.id) === index))
}
