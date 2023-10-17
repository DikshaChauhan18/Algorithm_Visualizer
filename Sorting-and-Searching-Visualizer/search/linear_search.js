async function linearSearch() {
  const bar = document.querySelectorAll(".bar");
  for (let i = 0; i < bar.length; i++) {
    bar[i].style.background = "green";
    playNote(400 + array[i] * 2);
    playNote(400 + array[i] * 2);
    if (bar[i].id == selectedBar.id) {
      break;
    }
    await waitforme(delay);
    bar[i].style.background = "black";
  }
}

const linSearch = document.querySelector(".linearSearch");
linSearch.addEventListener("click", async function () {
  let start = new Date().getTime();
  displayAlgo("Linear Search");
  disableSearch();
  disableSize();
  disableNewArray();
  await linearSearch();
  enableSearch();
  enableSize();
  enableNewArray();
  let end = new Date().getTime();
  let time = (end - start) * 0.001;
  displayTime(time + " s", "O(n)");
});
