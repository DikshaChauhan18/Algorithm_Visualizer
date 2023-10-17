//let delay = 30;
async function merge(bar, low, mid, high) {
  const n1 = mid - low + 1;
  const n2 = high - mid;
  let left = new Array(n1);
  let right = new Array(n2);

  for (let i = 0; i < n1; i++) {
    await waitforme(delay);
    bar[low + i].style.background = "red";
    left[i] = bar[low + i].style.height;
    playNote(300 + array[i] * 2);
    playNote(300 + array[i] * 2);
  }
  for (let i = 0; i < n2; i++) {
    await waitforme(delay);
    bar[mid + 1 + i].style.background = "blue";
    right[i] = bar[mid + 1 + i].style.height;
    playNote(300 + array[i] * 2);
    playNote(300 + array[i] * 2);
  }
  await waitforme(delay);
  let i = 0,
    j = 0,
    k = low;
  while (i < n1 && j < n2) {
    await waitforme(delay);

    if (parseInt(left[i]) <= parseInt(right[j])) {
      if (n1 + n2 === bar.length) {
        bar[k].style.background = "green";
      } else {
        bar[k].style.background = "lightgreen";
      }

      bar[k].style.height = left[i];
      i++;
      k++;
    } else {
      if (n1 + n2 === bar.length) {
        bar[k].style.background = "green";
      } else {
        bar[k].style.background = "lightgreen";
      }
      bar[k].style.height = right[j];
      j++;
      k++;
    }
    playNote(300 + array[i] * 2);
    playNote(300 + array[i] * 2);
  }
  while (i < n1) {
    await waitforme(delay);
    if (n1 + n2 === bar.length) {
      bar[k].style.background = "green";
    } else {
      bar[k].style.background = "lightgreen";
    }
    bar[k].style.height = left[i];
    i++;
    k++;
  }
  while (j < n2) {
    await waitforme(delay);
    if (n1 + n2 === bar.length) {
      bar[k].style.background = "green";
    } else {
      bar[k].style.background = "lightgreen";
    }
    bar[k].style.height = right[j];
    j++;
    k++;
  }
}

async function mergeSort(bar, l, r) {
  if (l >= r) {
    return;
  }
  const m = l + Math.floor((r - l) / 2);
  await mergeSort(bar, l, m);
  await mergeSort(bar, m + 1, r);
  await merge(bar, l, m, r);
}

const mergeSortbtn = document.querySelector(".mergeSort");
mergeSortbtn.addEventListener("click", async function () {
  let start = new Date().getTime();
  let bar = document.querySelectorAll(".bar");
  let l = 0;
  let r = parseInt(bar.length) - 1;
  displayAlgo("Merge Sort");
  disableSort();
  disableSize();
  disableNewArray();
  await mergeSort(bar, l, r);
  enableSort();
  enableSize();
  enableNewArray();
  let end = new Date().getTime();
  let time = (end - start) * 0.001;
  displayTime(time + " s", "O(n log(n))");
});
