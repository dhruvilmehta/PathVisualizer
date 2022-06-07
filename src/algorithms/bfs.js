export async function bfs(grid,startNode,finishNode){
    // console.log("DFS")
    const queue=[]
    queue.push(startNode)
    startNode.isVisited=true
    while(queue.length!==0){
        const node=queue.shift()
        console.log(node)

        await new Promise(done=>setTimeout(()=>done(),100))

        document.getElementById(`node-${node.row}-${node.col}`).className +=' node-visited';
        // console.log(node.previousNode)
        const adjacentNodes=getAdjacentNodes(node,grid)
        if(node===finishNode) break;
        adjacentNodes.forEach((adjnode)=>{
            if(adjnode.isVisited===false){
                adjnode.isVisited=true
                adjnode.previousNode=node
                queue.push(adjnode)
            }
        })
    }
    // console.log(finishNode.previousNode)
    const shortestPath=getShortestPath(finishNode)
    for(let shortest=0;shortest<shortestPath.length;shortest++){
        await new Promise(done=>setTimeout(()=>done(),100))
        const node=shortestPath[shortest]
        document.getElementById(`node-${node.row}-${node.col}`).className +=
        ' node-shortest-path';
    }
}


function getShortestPath(finishNode){
    const path=[]
    while(!finishNode.isStart){
        path.unshift(finishNode.previousNode)
        finishNode=finishNode.previousNode
    }
    // console.log(path)
    return path
}

function getAdjacentNodes(node,grid){
    const neighbors = [];
    const { col, row } = node;
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}