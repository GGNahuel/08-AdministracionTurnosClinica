export function concatArrays(...arrays : unknown[][] ) : unknown[] {
  let returnedArray : unknown[] = []
  for (let index = 0; index < arrays.length; index++) {
    returnedArray = returnedArray.concat(arrays[index])
  }
  return returnedArray
}