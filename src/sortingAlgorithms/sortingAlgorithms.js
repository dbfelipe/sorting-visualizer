export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) return;
  const pivotIdx = partition(array, startIdx, endIdx, animations);
  quickSortHelper(array, startIdx, pivotIdx - 1, animations); // Sort left side
  quickSortHelper(array, pivotIdx + 1, endIdx, animations);   // Sort right side
}

function partition(array, startIdx, endIdx, animations) {
  const pivotValue = array[endIdx];
  let pivotIdx = startIdx;

  for (let i = startIdx; i < endIdx; i++) {
    // Push comparison animations
    animations.push(["compare", i, endIdx]);
    animations.push(["revert", i, endIdx]);

    if (array[i] <= pivotValue) {
      // Push swap animations for elements smaller than pivot
      animations.push(["swap", i, array[pivotIdx]]);
      animations.push(["swap", pivotIdx, array[i]]);
      [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]]; // Actual swap
      pivotIdx++;
    }
  }

  // Final swap to place the pivot in its correct position
  animations.push(["swap", pivotIdx, array[endIdx]]);
  animations.push(["swap", endIdx, array[pivotIdx]]);
  [array[pivotIdx], array[endIdx]] = [array[endIdx], array[pivotIdx]];

  return pivotIdx;
}

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;

  // Build max heap
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array, array.length, i, animations);
  }

  // Extract elements from heap one by one
  for (let end = array.length - 1; end > 0; end--) {
    // Swap the root (maximum element) with the last element
    animations.push(["swap", 0, array[end]]);
    animations.push(["swap", end, array[0]]);
    [array[0], array[end]] = [array[end], array[0]];

    // Call heapify on the reduced heap
    heapify(array, end, 0, animations);
  }
  
  return animations;
}

function heapify(array, size, rootIdx, animations) {
  let largest = rootIdx;
  const leftChildIdx = 2 * rootIdx + 1;
  const rightChildIdx = 2 * rootIdx + 2;

  // If left child is larger than root
  if (leftChildIdx < size && array[leftChildIdx] > array[largest]) {
    largest = leftChildIdx;
  }

  // If right child is larger than largest so far
  if (rightChildIdx < size && array[rightChildIdx] > array[largest]) {
    largest = rightChildIdx;
  }

  // If largest is not root
  if (largest !== rootIdx) {
    // Swap root with the largest element
    animations.push(["swap", rootIdx, array[largest]]);
    animations.push(["swap", largest, array[rootIdx]]);
    [array[rootIdx], array[largest]] = [array[largest], array[rootIdx]];

    // Recursively heapify the affected subtree
    heapify(array, size, largest, animations);
  }
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;

  let n = array.length;
  let swapped;

  // Perform bubble sort
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      // Push comparison animation
      animations.push(["compare", i, i + 1]);
      animations.push(["revert", i, i + 1]);

      if (array[i] > array[i + 1]) {
        // Push swap animation if elements are out of order
        animations.push(["swap", i, array[i + 1]]);
        animations.push(["swap", i + 1, array[i]]);
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }
    n--; // Reduce the length of the array to check, as the largest element is now at the end
  } while (swapped);

  return animations;
}