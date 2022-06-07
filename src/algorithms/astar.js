export async function astar(grid,startNode,finishNode){
    // const pq=new PriorityQueue((x,y)=>y.distance-x.distance)
    // pq.enqueue(startNode)
    // pq.enqueue(finishNode)
    // console.log(startNode)
    const pq=[]
    pq.push(startNode)
    startNode.isVisited=true

    function pushPQ(node){
        let contain=false
        if(pq.length===0){
            console.log("Empty")
            pq.push(node)
            contain=true
            // break;
        }
        else{
            for(let i=0;i<pq.length;i++){
                console.log(pq.length,pq[i],node)
                
                if(pq[i].distance>node.distance){
                    pq.splice(i,0,node)
                    contain=true
                    break;
                }
            }
        }
        if(!contain){
            pq.push(node)
        }
    }

    while(pq.length!==0){
        const node=pq.shift()
        console.log(node)
        const adjacentNodes=getAdjacentNodes(node,grid)
        if(node===finishNode) break;

        await new Promise(done=>setTimeout(()=>done(),100))

        document.getElementById(`node-${node.row}-${node.col}`).className +=' node-visited';
        adjacentNodes.forEach((adjnode)=>{
            if(adjnode.isVisited===false){
                adjnode.isVisited=true
                adjnode.previousNode=node
                pushPQ(adjnode)
            }
        })
    }

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