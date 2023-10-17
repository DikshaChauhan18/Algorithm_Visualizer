async function binarySearch() {
  const bar = document.querySelectorAll(".bar");
  selectedBar.style.background = "black";

  for (let i = 0; i < bar.length - 1; i++) {
    for (let j = 0; j < bar.length - i - 1; j++) {
      if (
        parseFloat(bar[j].style.height) >= parseFloat(bar[j + 1].style.height)
      ) {
        swap(bar[j], bar[j + 1]);
      }
    }
  }

  for (let i = 0; i < bar.length - 1; i++) {
    if (targetBar == bar[i].style.height) {
      selectedBar = bar[i];
      selectedBar.style.background = "blue";
    }
  }

  let targetValue = parseFloat(selectedBar.style.height);
  let start = 0,
    end = bar.length - 1;

  while (start <= end) {
    bar[start].style.background = "red";
    playNote(400 + array[start] * 2);
    playNote(400 + array[start] * 2);
    bar[end].style.background = "yellow";
    playNote(400 + array[end] * 2);
    playNote(400 + array[end] * 2);
    let mid = Math.floor((start + end) / 2);
    playNote(400 + array[mid] * 2);
    playNote(400 + array[mid] * 2);
    bar[mid].style.background = "green";
    if (parseFloat(bar[mid].style.height) == targetValue) {
      bar[start].style.background = "black";
      bar[end].style.background = "black";
      bar[mid].style.background = "green";
      break;
    } else if (parseFloat(bar[mid].style.height) < targetValue) {
      bar[start].style.background = "black";
      start = mid + 1;
    } else {
      bar[end].style.background = "black";
      end = mid - 1;
    }
    await waitforme(delay);
    bar[mid].style.background = "black";
  }
}

function swap(bar1, bar2) {
  let temp = bar1.style.height;
  bar1.style.height = bar2.style.height;
  bar2.style.height = temp;
}

const binSearch = document.querySelector(".binarySearch");
binSearch.addEventListener("click", async function () {
  let start = new Date().getTime();
  displayAlgo("Binary Search");
  disableSearch();
  disableSize();
  disableNewArray();
  await binarySearch();
  enableSearch();
  enableSize();
  enableNewArray();
  let end = new Date().getTime();
  let time = (end - start) * 0.001;
  displayTime(time + " s", "O(log n)");
});
