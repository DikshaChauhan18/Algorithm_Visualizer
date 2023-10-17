async function selectionSort() {
  const bar = document.querySelectorAll(".bar");
  for (let i = 0; i < bar.length; i++) {
    let min_index = i;
    bar[i].style.background = "blue";
    for (let j = i + 1; j < bar.length; j++) {
      bar[j].style.background = "cyan";
      await waitforme(delay);
      if (
        parseFloat(bar[j].style.height) <
        parseFloat(bar[min_index].style.height)
      ) {
        if (min_index !== i) {
          bar[min_index].style.background = "red";
        }
        min_index = j;
      } else {
        bar[j].style.background = "red";
      }
      playNote(300 + array[j] * 2);
      playNote(300 + array[j] * 2);
    }
    await waitforme(delay);
    swap(bar[min_index], bar[i]);
    bar[min_index].style.background = "red";
    bar[i].style.background = "green";
  }
}

const Selectionbtn = document.querySelector(".selectionSort");
Selectionbtn.addEventListener("click", async function () {
  let start = new Date().getTime();
  displayAlgo("Selection Sort");
  disableSort();
  disableSize();
  disableNewArray();
  await selectionSort();
  enableSort();
  enableSize();
  enableNewArray();
  let end = new Date().getTime();
  let time = (end - start) * 0.001;
  displayTime(time + " s", "O(n<sup>2</sup>)");
});
