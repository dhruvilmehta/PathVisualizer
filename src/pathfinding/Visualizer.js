import React,{useState,useEffect} from 'react'
import Node from './Node/Node'
import './Visualizer.css'
import { dfs } from '../algorithms/dfs';
import { bfs } from '../algorithms/bfs';
import { astar } from '../algorithms/astar';


const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 30;
function Visualizer(props) {
  const [grid,setGrid]=useState([])
  const [mouseIsPressed,setMouseIsPressed]=useState(false)

  useEffect(()=>{
      // console.log("HEllo")
      setGrid(getInitialGrid());
    },[])

  const getInitialGrid = () => {
      const grid = [];
      for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
          // console.log(col)
          currentRow.push(createNode(col, row));
        }
        // console.log(currentRow)
        grid.push(currentRow);
      }
      return grid;
  };
  // console.log(grid)


  const createNode = (col, row) => {
    const distance=Math.max(Math.abs(row-FINISH_NODE_ROW),Math.abs(col-FINISH_NODE_COL))
    // console.log(row,col,distance)
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: distance,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  function visualizedfs(){
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    dfs(grid,startNode,finishNode)
  }

  function visualizebfs(){
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    bfs(grid,startNode,finishNode)
  }

  function visualizeastar(){
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    astar(grid,startNode,finishNode)
  }

  function handleMouseDown(row, col) {
    console.log("MouseDown")
    const newGrid = getWall(row, col);
    setGrid(newGrid)
    setMouseIsPressed(true)
  }

  function handleMouseEnter(row, col) {
    console.log("MouseEnter")
    if (!mouseIsPressed) return;
    console.log("NotReturned")
    const newGrid = getWall(row, col);
    setGrid(newGrid)
  }

  function handleMouseUp() {
    console.log("MouseUp")
    setMouseIsPressed(false)
  }

  function getWall(row,col){
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    // setGrid(newGrid)
    return newGrid
  }

  function reset(){
    const newgrid=grid.slice()
    newgrid.map((row)=>{
      row.map((node)=>{
        if(node.isVisited){
          if(node.isStart){
            document.getElementById(`node-${node.row}-${node.col}`).className ='node node-start';
          }
          else if(node.isFinish){
            document.getElementById(`node-${node.row}-${node.col}`).className ='node node-finish';
          }else{
            document.getElementById(`node-${node.row}-${node.col}`).className ='node';
          }
          node.isVisited=false
        }
      })
    })
    console.log(newgrid)
    setGrid(newgrid)
  }

  return (
    <div className="grid">
      <button onClick={visualizedfs}>DFS</button>
      <button onClick={visualizebfs}>BFS</button>
      <button onClick={visualizeastar}>ASTAR</button>
      <button onClick={reset}>RESET</button>
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const {row, col, isFinish, isStart, isWall} = node;
              return (
                <Node
                  key={nodeIdx}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isFinish={isFinish}
                  isWall={isWall}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={(row, col) => handleMouseDown(row, col)}
                  onMouseEnter={(row, col) =>handleMouseEnter(row, col)}
                  onMouseUp={() => handleMouseUp()}
                >
                </Node>
              );
            })}
          </div>
        );
      })}
    </div>
  )
}

export default Visualizer



// public void dfs(int s){
//     boolean[] visited=new boolean[v];
//     Stack<Integer> stack=new Stack<>();
//     stack.push(s);
//     visited[s]=true;
//     while(!stack.isEmpty()){
//         int u=stack.pop();
//         System.out.print(u+" ");
//         for(int v:adj[u]){
//             if(!visited[v]){
//                 visited[v]=true;
//                 stack.push(v);
//             }
//         }
//     }
// }

// public void bfs(int s){
//   boolean[] visited=new boolean[v];
//   Queue<Integer> q=new LinkedList<>();
//   visited[s]=true;
//   q.offer(s);

//   while(!q.isEmpty()){
//       int u=q.poll();
//       System.out.print(u+" ");
//       for(int v:adj[u]){
//           if(!visited[v]){
//               visited[v]=true;
//               q.offer(v);
//           }
//       }
//   }
// }