async function partition(ele, l, r) {
  let i = l - 1;
  ele[r].style.background = "red";
  for (let j = l; j <= r - 1; j++) {
    ele[j].style.background = "yellow";
    await waitforme(delay);

    if (parseFloat(ele[j].style.height) < parseFloat(ele[r].style.height)) {
      i++;
      swap(ele[i], ele[j]);
      ele[i].style.background = "blue";
      if (i != j) ele[j].style.background = "blue";
      await waitforme(delay);
    } else {
      ele[j].style.background = "orange";
    }
    playNote(300 + array[j] * 2);
    playNote(300 + array[j] * 2);
  }
  i++;
  await waitforme(delay);
  swap(ele[i], ele[r]);
  playNote(300 + array[i] * 2);
  playNote(300 + array[i] * 2);
  ele[r].style.background = "orange";
  ele[i].style.background = "green";

  await waitforme(delay);
  return i;
}

async function quickSort(ele, l, r) {
  if (l < r) {
    let pivot_index = await partition(ele, l, r);
    await quickSort(ele, l, pivot_index - 1);
    await quickSort(ele, pivot_index + 1, r);
  } else {
    if (l >= 0 && r >= 0 && l < ele.length && r < ele.length) {
      ele[r].style.background = "green";
      ele[l].style.background = "green";
    }
  }
}

const quickSortbtn = document.querySelector(".quickSort");
quickSortbtn.addEventListener("click", async function () {
  let start = new Date().getTime();
  let ele = document.querySelectorAll(".bar");
  let l = 0;
  let r = ele.length - 1;
  displayAlgo("Quick Sort");
  disableSort();
  disableSize();
  disableNewArray();
  await quickSort(ele, l, r);
  enableSort();
  enableSize();
  enableNewArray();
  let end = new Date().getTime();
  let time = (end - start) * 0.001;
  displayTime(time + " s", "O(n log(n))");
});
