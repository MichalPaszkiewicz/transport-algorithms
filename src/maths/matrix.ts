export type Matrix = number[][];

export var times = (a: Matrix, b: Matrix) => {
    if(size(a)[1] != size(b)[0]){
        throw new Error(`You can only multiply two matrices if they are of size [X, Y], [Y, Z]. The current matrices are of size [${size(a)}] and [${size(b)}]`)
    }
    var aNumRows = a.length, aNumCols = a[0].length,
        bNumRows = b.length, bNumCols = b[0].length,
        m = new Array(aNumRows);  // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols); // initialize the current row
        for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;             // initialize the current cell
            for (var i = 0; i < aNumCols; ++i) {
                m[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return m;
}

export var transpose = (matrix: Matrix) => {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

export var identity = (size: number) => {
    var identityMatrix = [];
    for(var i = 0; i< size; i++){
        identityMatrix.push([]);
        for(var j = 0; j < size; j++){
            identityMatrix[i][j] = i==j ? 1 : 0;
        }
    }
    return identityMatrix;
}

export var copy = (matrix: Matrix) => {
    var newMatrix = [];
    for(var i = 0; i < matrix.length; i++){
        newMatrix[i] = [...matrix[i]];
    }
    return newMatrix;
}

export var equals = (matrix1: Matrix, matrix2: Matrix) => {
    var size1 = size(matrix1);
    var size2 = size(matrix2);
    if(size1[0] != size2[0] || size1[1] != size2[1]){
        return false;
    }
    for(var i = 0; i < matrix1.length; i++){
        for(var j = 0; j < matrix1[0].length; j++){
            if(matrix1[i][j] != matrix2[i][j]){
                return false;
            }
        }
    }
    return true;
}

export var inverse = (matrix: Matrix) => {
    // identityMatrix use Gaussian Elimination to calculate the inverse:
    // (1) 'augment' the matrix (left) by the identity (on the right)
    // (2) Turn the matrix on the left into the identity by elemetry row ops
    // (3) The matrix on the right is the inverse (was the identity matrix)
    // There are 3 elementary row ops: (identityMatrix combine b and c in my code)
    // (a) Swap 2 rows
    // (b) Multiply a row by a scalar
    // (c) Add 2 rows
    
    if(matrix.length !== matrix[0].length){
        throw new Error("You can only get the inverse of a square Matrix");
    }
    
    var identityMatrix = identity(matrix.length);
    var copyMatrix = copy(matrix);

    var i=0, ii=0, j=0, size=matrix.length, t=0;
    
    // Perform elementary row operations
    for(i=0; i<size; i+=1){
        // get the element e on the diagonal
        let e = copyMatrix[i][i];
        
        // if we have a 0 on the diagonal (we'll need to swap with a lower row)
        if(e==0){
            //look through every row below the i'th row
            for(ii=i+1; ii<size; ii+=1){
                //if the ii'th row has a non-0 in the i'th col
                if(copyMatrix[ii][i] != 0){
                    //it would make the diagonal have a non-0 so swap it
                    for(j=0; j<size; j++){
                        e = copyMatrix[i][j];       //temp store i'th row
                        copyMatrix[i][j] = copyMatrix[ii][j];//replace i'th row by ii'th
                        copyMatrix[ii][j] = e;      //repace ii'th by temp
                        e = identityMatrix[i][j];       //temp store i'th row
                        identityMatrix[i][j] = identityMatrix[ii][j];//replace i'th row by ii'th
                        identityMatrix[ii][j] = e;      //repace ii'th by temp
                    }
                    //don't bother checking other rows since we've swapped
                    break;
                }
            }
            //get the new diagonal
            e = copyMatrix[i][i];
            //if it's still 0, not invertable (error)
            if(e==0){return}
        }
        
        // Scale this row down by e (so we have a 1 on the diagonal)
        for(j=0; j<size; j++){
            copyMatrix[i][j] = copyMatrix[i][j]/e; //apply to original matrix
            identityMatrix[i][j] = identityMatrix[i][j]/e; //apply to identity
        }
        
        // Subtract this row (scaled appropriately for each row) from ALL of
        // the other rows so that there will be 0's in this column in the
        // rows above and below this one
        for(ii=0; ii<size; ii++){
            // Only apply to other rows (we want a 1 on the diagonal)
            if(ii==i){continue;}
            
            // We want to change this element to 0
            e = copyMatrix[ii][i];
            
            // Subtract (the row above(or below) scaled by e) from (the
            // current row) but start at the i'th column and assume all the
            // stuff left of diagonal is 0 (which it should be if we made this
            // algorithm correctly)
            for(j=0; j<size; j++){
                copyMatrix[ii][j] -= e*copyMatrix[i][j]; //apply to original matrix
                identityMatrix[ii][j] -= e*identityMatrix[i][j]; //apply to identity
            }
        }
    }
    
    //we've done all operations, C should be the identity
    //matrix identityMatrix should be the inverse:
    return identityMatrix;
}

export var size = (matrix: Matrix) => {
    return [matrix.length, matrix[0].length];
}