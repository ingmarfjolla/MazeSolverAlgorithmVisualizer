// just bwecause ajacency list need visited to make sure not 
///vsited again
const dfs = (adjacencyList,start,end,correctPath,visited=new Set()) => { 
    if(start === end){
      //drawNodeWithStrings(end,"red");
      enqueueTask(drawNodeWithStrings,end,"red")
      return [start];
    }
    if(visited.has(start)){
      return []; 
    }
    visited.add(start);
    //drawNodeWithStrings(start,"yellow");
    enqueueTask(drawNodeWithStrings,start,"yellow");
  
    const neighbors = adjacencyList[start];
    for(let neighbor of neighbors){
      // visiting neighbor
      ///IF ITS TRUE DO STUFF 
      enqueueTask(drawEdgeWithStrings, start, neighbor, "yellow");
      const path = dfs(adjacencyList,neighbor,end,correctPath,visited);
      // if(path){
      //   correctPath.push(neighbor);
      // }
      if(path.length>0){
        // correctPath.push(neighbor);
        // correctPath.push(start, ...path);
        return[start, ...path];
      }
     
      
    }
    //correctPath.push(start);
    //console.log(correctPath);
    return [];
  }
  
  const bfs = (adjacencyList,start,end, visited=new Set()) =>{
    const queue = [];
    // const path = [];
    
    //this is how we will maintain ALL paths, by pushing them each time
    //and when we deque we just deque the current path and if its 
    //the right path, we return it so we can paint it
    //we will also paint ALL paths explored
    // path.push(start);
  
    queue.push([start]);
    //const previous = start;
    
    while(queue.length>0){
      // console.log(queue);
      const currPath = queue.shift();
      //console.log(currPath);
      currNode = currPath[currPath.length-1];
      //console.log(currNode);
      if(currNode ===end){
        console.log(currPath);
        
        drawNodeWithStrings(end,"red");
        //drawPath(currPath);
        return currPath; 
      }
      if(visited.has(currNode)){
        continue;
      }
      drawNodeWithStrings(currNode,"yellow");
      
      visited.add(currNode);
  
      const neighbors = adjacencyList[currNode];
      for(let neighbor of neighbors){
        if(visited.has(neighbor)){
          continue;
        }
  
        drawEdgeWithStrings(currNode,neighbor,"yellow");
        const newPath = currPath.concat([neighbor])
        queue.push(newPath);
      }
  
    }
    return;
  
  }
  