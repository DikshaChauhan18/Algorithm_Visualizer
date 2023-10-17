async function bubbleSort() {
  const bar = document.querySelectorAll(".bar");
  for (let i = 0; i < bar.length - 1; i++) {
    for (let j = 0; j < bar.length - i - 1; j++) {
      bar[j].style.background = "blue";
      bar[j + 1].style.background = "blue";
      if (
        parseFloat(bar[j].style.height) >= parseFloat(bar[j + 1].style.height)
      ) {
        await waitforme(delay);
        swap(bar[j], bar[j + 1]);
      }
      playNote(300 + array[j] * 2);
      playNote(300 + array[j] * 2);
      bar[j].style.background = "red";
      bar[j + 1].style.background = "red";
    }
    bar[bar.length - 1 - i].style.background = "green";
  }
  bar[0].style.background = "green";
}

const bubblebtn = document.querySelector(".bubbleSort");
bubblebtn.addEventListener("click", async function () {
  let start = new Date().getTime();
  displayAlgo("Bubble Sort");
  disableSort();
  disableSize();
  disableNewArray();
  await bubbleSort();
  enableSort();
  enableSize();
  enableNewArray();
  let end = new Date().getTime();
  let time = (end - start) * 0.001;
  displayTime(time + " s", "O(n<sup>2</sup>)");
});
