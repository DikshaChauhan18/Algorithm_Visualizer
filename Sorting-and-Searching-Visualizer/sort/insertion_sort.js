async function insertionSort() {
  const bar = document.querySelectorAll(".bar");
  bar[0].style.background = "green";
  for (let i = 1; i < bar.length; i++) {
    let j = i - 1;
    let key = bar[i].style.height;
    bar[i].style.background = "blue";

    await waitforme(delay);

    while (j >= 0 && parseFloat(bar[j].style.height) > parseFloat(key)) {
      bar[j].style.background = "blue";
      bar[j + 1].style.height = bar[j].style.height;
      playNote(300 + array[j] * 2);
      playNote(300 + array[j] * 2);
      j--;
      await waitforme(delay);
      for (let k = i; k >= 0; k--) {
        bar[k].style.background = "green";
      }
    }

    bar[j + 1].style.height = key;
    bar[i].style.background = "green";
  }
}

const inSortbtn = document.querySelector(".insertionSort");
inSortbtn.addEventListener("click", async function () {
  let start = new Date().getTime();
  displayAlgo("Insertion Sort");
  disableSort();
  disableSize();
  disableNewArray();
  await insertionSort();
  enableSort();
  enableSize();
  enableNewArray();
  let end = new Date().getTime();
  let time = (end - start) * 0.001;
  displayTime(time + " s", "O(n<sup>2</sup>)");
});
