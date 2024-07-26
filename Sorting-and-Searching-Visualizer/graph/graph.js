document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("grid");
    const newGridBtn = document.getElementById("new_grid");
    const bfsBtn = document.querySelector(".bfs");
    const dfsBtn = document.querySelector(".dfs");
    const dijktraBtn = document.querySelector(".dijkstra");
    const resetBtn = document.querySelector(".reset");
    const gridSizeInput = document.getElementById("grid_size");
    const visSpeedInput = document.getElementById("vis_speed");

    let grid = [];
    let startNode = null;
    let endNode = null;
    let delay = parseInt(visSpeedInput.value);

    const createGrid = (size) => {
        gridContainer.innerHTML = "";
        grid = [];
        gridContainer.style.gridTemplateColumns = `repeat(${size}, 20px)`;
        for (let row = 0; row < size; row++) {
            const gridRow = [];
            for (let col = 0; col < size; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener("click", () => selectNode(cell));
                gridContainer.appendChild(cell);
                gridRow.push(cell);
            }
            grid.push(gridRow);
        }
    };

    const selectNode = (cell) => {
        if (!startNode) {
            startNode = cell;
            cell.classList.add("start");
        } else if (!endNode) {
            endNode = cell;
            cell.classList.add("end");
        }
    };

    const resetGrid = () => {
        grid.forEach(row => row.forEach(cell => {
            cell.className = "cell";
        }));
        startNode = null;
        endNode = null;
    };

    const visualizePath = (path) => {
        path.forEach((cell, index) => {
            setTimeout(() => {
                cell.classList.add("path");
            }, delay * index);
        });
    };

    const getNeighbors = (row, col) => {
        const neighbors = [];
        if (row > 0) neighbors.push(grid[row - 1][col]); // Up
        if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
        if (col > 0) neighbors.push(grid[row][col - 1]); // Left
        if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
        return neighbors;
    };

    const bfs = async () => {
        if (!startNode || !endNode) return;
        const queue = [startNode];
        const visited = new Set();
        const parent = new Map();
        const start = Date.now();
        visited.add(startNode);

        while (queue.length) {
            const cell = queue.shift();
            if (cell === endNode) {
                const path = [];
                let current = cell;
                while (current) {
                    path.unshift(current);
                    current = parent.get(current);
                }
                visualizePath(path);
                const end = Date.now();
                document.getElementById("timeExec").innerText = `${(end - start) / 1000} s`;
                document.getElementById("notation").innerText = "O(V + E)";
                return;
            }
            const [row, col] = [parseInt(cell.dataset.row), parseInt(cell.dataset.col)];
            const neighbors = getNeighbors(row, col);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor) && !neighbor.classList.contains("start")) {
                    visited.add(neighbor);
                    parent.set(neighbor, cell);
                    queue.push(neighbor);
                    neighbor.classList.add("visited");
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
    };

    const dfs = async () => {
        if (!startNode || !endNode) return;
        const stack = [startNode];
        const visited = new Set();
        const parent = new Map();
        const start = Date.now();
        visited.add(startNode);

        while (stack.length) {
            const cell = stack.pop();
            if (cell === endNode) {
                const path = [];
                let current = cell;
                while (current) {
                    path.unshift(current);
                    current = parent.get(current);
                }
                visualizePath(path);
                const end = Date.now();
                document.getElementById("timeExec").innerText = `${(end - start) / 1000} s`;
                document.getElementById("notation").innerText = "O(V + E)";
                return;
            }
            const [row, col] = [parseInt(cell.dataset.row), parseInt(cell.dataset.col)];
            const neighbors = getNeighbors(row, col);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor) && !neighbor.classList.contains("start")) {
                    visited.add(neighbor);
                    parent.set(neighbor, cell);
                    stack.push(neighbor);
                    neighbor.classList.add("visited");
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
    };
    const dijkstra = async () => {
        if (!startNode || !endNode) return;
    
        const dist = new Map(); // Distance from start node to each node
        const prev = new Map(); // Previous node for each node
        const unvisited = new Set(); // Nodes that haven't been visited yet
        const priorityQueue = new PriorityQueue(); // Priority queue to pick the node with the smallest distance
        const start = Date.now();
    
        // Initialize distances and priority queue
        document.querySelectorAll('.cell').forEach(cell => {
            dist.set(cell, Infinity);
            prev.set(cell, null);
            unvisited.add(cell);
            priorityQueue.enqueue(cell, Infinity); // Add to priority queue with initial distance
        });
    
        dist.set(startNode, 0);
        priorityQueue.enqueue(startNode, 0); // Add start node to priority queue with distance 0
    
        while (!priorityQueue.isEmpty()) {
            const cell = priorityQueue.dequeue();
    
            if (cell === endNode) {
                const path = [];
                let current = cell;
                while (current) {
                    path.unshift(current);
                    current = prev.get(current);
                }
                visualizePath(path);
                const end = Date.now();
                document.getElementById("timeExec").innerText = `${(end - start) / 1000} s`;
                document.getElementById("notation").innerText = "O((V + E) log V)";
                return;
            }
    
            unvisited.delete(cell);
            const [row, col] = [parseInt(cell.dataset.row), parseInt(cell.dataset.col)];
            const neighbors = getNeighbors(row, col);
    
            for (const neighbor of neighbors) {
                if (!unvisited.has(neighbor) || neighbor.classList.contains("start")) continue;
    
                const weight = getWeight(cell, neighbor); // Fetch the weight of the edge
                const newDist = dist.get(cell) + weight;
    
                if (newDist < dist.get(neighbor)) {
                    dist.set(neighbor, newDist);
                    prev.set(neighbor, cell);
                    priorityQueue.enqueue(neighbor, newDist); // Update priority queue with new distance
                    neighbor.classList.add("visited");
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
    };
    
    // PriorityQueue class to manage nodes with their distances
    class PriorityQueue {
        constructor() {
            this.queue = [];
        }
    
        enqueue(item, priority) {
            this.queue.push({ item, priority });
            this.queue.sort((a, b) => a.priority - b.priority);
        }
    
        dequeue() {
            return this.queue.shift().item;
        }
    
        isEmpty() {
            return this.queue.length === 0;
        }
    }
    
    // Function to get the weight of an edge (example implementation)
    const getWeight = (cell1, cell2) => {
        // Assume a default weight of 1 if weights are not set
        return 1;
    };
    
    
    

    newGridBtn.addEventListener("click", () => {
        const size = parseInt(gridSizeInput.value);
        createGrid(size);
    });

    bfsBtn.addEventListener("click", bfs);
    dfsBtn.addEventListener("click", dfs);
    dijktraBtn.addEventListener("click", dijkstra);
    
    resetBtn.addEventListener("click", resetGrid);

    visSpeedInput.addEventListener("input", (e) => {
        delay = parseInt(e.target.value);
    });

    // Initialize the grid
    createGrid(parseInt(gridSizeInput.value));
});
