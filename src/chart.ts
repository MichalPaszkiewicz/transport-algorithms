export var scatterPlot = (xData, yData, xHeader, yHeader, lineFunc, scaleX, scaleY) => {
    //60 across?
    var width = Math.max(...xData);
    var min = Math.min(...xData);
    var lineFuncIsArray = Array.isArray(lineFunc);
    var height = lineFunc 
        ? lineFuncIsArray 
            ? Math.max(...yData, ...lineFunc.map(lf => lf(width), ...lineFunc.map(lf => lf(min)))) 
            : Math.max(...yData, lineFunc(width), lineFunc(min)) 
        : Math.max(...yData);
    //adjust to see top row of data.
    height += height/100;
    var rows = 40 * (scaleY || 1);
    var cols = 70 * (scaleX || 1);

    var wVal = width / cols;
    var hVal = height / rows;

    for(var i = 0; i < rows; i++){
        //let str = ((rows - i) * hVal).toPrecision(3) + "\t|";
        let str = ` ${i >= yHeader.length ? " " : yHeader[i]} |`;
        for(var j = 0; j < cols; j++){
            var dataPlot = " ";
            for(var k = 0; k < xData.length; k++){
                if(yData[k] < (rows - i) * hVal && yData[k] > (rows - 1 - i) * hVal
                    && xData[k] > j * wVal && xData[k] < (j + 1) * wVal){
                        switch(dataPlot){
                            case " ":
                                dataPlot = ".";
                                break;
                            case ".":
                                dataPlot = ",";
                                break;
                            case ",":
                                dataPlot = ":"
                                break;
                            case ":":
                                dataPlot = ";";
                                break;
                            case ";":
                                dataPlot = "o";
                                break;
                            case "o":
                                dataPlot = "O";
                                break;
                            case "O":
                                dataPlot = "#";
                                break;
                            case "#":
                                dataPlot = "♦";
                                break;                                
                        }
                }
            }
            if(lineFuncIsArray){
                for(var lf = 0; lf < lineFunc.length; lf++){
                    let localLineFunc = lineFunc[lf];
                    if(localLineFunc(j * wVal) < (rows - i) *hVal && localLineFunc(j * wVal) > (rows - 1 - i) * hVal){
                        if(localLineFunc(j + 1) > localLineFunc(j)){
                            if(localLineFunc((j + 1) * wVal) < (rows - i) *hVal && localLineFunc((j + 1) * wVal) > (rows - 1 - i) * hVal){
                                dataPlot = "_";
                            }   
                            else{
                                dataPlot = "/";
                            }
                        }
                        else{
                            dataPlot = str.indexOf("\\") > -1 ? "_" : "\\";// dataPlot == " " ? "x" : "X";                        
                        }
                    }
                }
            }
            else if(lineFunc){
                if(lineFunc(j * wVal) < (rows - i) *hVal && lineFunc(j * wVal) > (rows - 1 - i) * hVal){
                    if(lineFunc(j + 1) > lineFunc(j)){
                        if(lineFunc((j + 1) * wVal) < (rows - i) *hVal && lineFunc((j + 1) * wVal) > (rows - 1 - i) * hVal){
                            dataPlot = "_";
                        }   
                        else{
                            dataPlot = "/";
                        }
                    }
                    else{
                        dataPlot = str.indexOf("\\") > -1 ? "_" : "\\";// dataPlot == " " ? "x" : "X";                        
                    }
                }
            }
            str += dataPlot;
        }
        console.log(str);
    }
    console.log(` ${i >= yHeader.length ? " " : yHeader[i]} |` + Array(cols + 2).join("_"));
    if(xHeader){console.log(Array(Math.floor(cols / 2) + 3).join(" "),`${xHeader}`)};
    console.log();
}