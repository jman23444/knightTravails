function knightMoves(start, end) {
    // Define all possible knight moves (L-shape)
    const moves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    // Check if a position is on the 8x8 board
    function isValid(x, y) {
        return x >= 0 && x <= 7 && y >= 0 && y <= 7;
    }

    // Convert position array to string for hash map key (e.g., [3,3] -> "3,3")
    function posToString(pos) {
        return pos.join(",");
    }

    // BFS to find shortest path
    const queue = [start]; // Start with the starting position
    const visited = new Set([posToString(start)]); // Track visited squares
    const parent = new Map(); // Track parent of each position to reconstruct path
    parent.set(posToString(start), null); // Start has no parent

    // Convert end position to string for comparison
    const endStr = posToString(end);
    let found = false;
    let endPos = null;

    // BFS loop
    while (queue.length > 0) {
        const [x, y] = queue.shift(); // Get the next position
        const currentStr = posToString([x, y]);

        // If we reached the end, stop
        if (currentStr === endStr) {
            found = true;
            endPos = [x, y];
            break;
        }

        // Try all possible knight moves
        for (const [dx, dy] of moves) {
            const newX = x + dx;
            const newY = y + dy;
            const newPos = [newX, newY];
            const newPosStr = posToString(newPos);

            // If the new position is valid and not visited, add to queue
            if (isValid(newX, newY) && !visited.has(newPosStr)) {
                queue.push(newPos);
                visited.add(newPosStr);
                parent.set(newPosStr, [x, y]);
            }
        }
    }

    // If no path found, return message
    if (!found) {
        console.log("No path exists between the given squares.");
        return;
    }

    // Reconstruct the path from end to start
    const path = [];
    let current = endPos;
    while (current !== null) {
        path.push(current);
        current = parent.get(posToString(current));
    }
    path.reverse(); // Reverse to get start to end

    // Output the result
    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
    path.forEach(pos => console.log(pos));
    return path;
}

// Test cases
knightMoves([3, 3], [4, 3]);
knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [3, 3]);
knightMoves([0, 0], [7, 7]);