var tree = [13,23,34,56,18,56,40,68,12,32,56,78,21,23,45,233];
    tree.sort(function(a, b){return a > b}).reverse();
    console.log(tree)

var treeMap = getTreeMap(tree, 150, 50, 800, 600);


function getTreeMap(tree, x, y, width, height) {
    var arRect = [], sum = 0, crtR = Infinity, tpR, crtBound,
        w, h, crtVal, crtA = [], tpSum, r, tp, tp2,
        crtDir;

    for(var i = 0; i < tree.length; i++) {
        sum += tree[i];
    }
    r = (width * height) / sum;
    crtBound = [x, y , width + x, height+ y];

    for(i = 0; i < tree.length; i++, tpSum = 0, tp = tp2 = 0) {
        crtVal = tree[i];
        h = crtBound[3] - crtBound[1];
        w = crtBound[2] - crtBound[0];
        crtA.push(i);
        crtDir = w > h ? true : false;
    
        if(crtDir) {

            if(crtA.length > 1) {
               tpR = calcMaxRatio(h);
            } else {
               tpR = calcRatio(h, (crtVal * r)/ h);
            }   
        
            if(tpR < crtR) {
                if(i == tree.length - 1) {
                    arRect.push(crtBound);
                }
                crtR = tpR;
                continue;
            } else {
                // fill the arRect then change the current boudary
                crtA.pop();
                for(j = 0; j < crtA.length; j++) {
                   tpSum += tree[crtA[j]];
                }
                tp = (tpSum * r ) / h;
                crtBound = [crtBound[0] + tp, crtBound[1], crtBound[2], crtBound[3]];
                tp2 = crtBound[1];
                for(j = 0; j < crtA.length; j++) {
                   arRect.push([crtBound[0] - tp, tp2, crtBound[0], tp2 + tree[crtA[j]] * r / tp]);
                   tp2 += tree[crtA[j]] * r / tp;
                }
                crtA = [];
                crtR = Infinity;
                i--;
                continue;
            }

        } else {

            if(crtA.length > 1) {
               tpR = calcMaxRatio(w);
            } else {
               tpR = calcRatio(w, (crtVal * r)/ w);
            }   
            if(tpR < crtR) {
                if(i == tree.length - 1) {
                    arRect.push(crtBound);
                }
                crtR = tpR;
                continue;
            } else {
                // fill the arRect then change the current boudary
                crtA.pop();
                
                for(j = 0; j < crtA.length; j++) {
                   tpSum += tree[crtA[j]];
                }
                tp = (tpSum * r ) / w;
                crtBound = [crtBound[0], crtBound[1], crtBound[2], crtBound[3] - tp];
                tp2 = crtBound[0];
                for(j = 0; j < crtA.length; j++) {
                   arRect.push([tp2, crtBound[3], tp2 + tree[crtA[j]] * r / tp, crtBound[3] + tp]);
                   tp2 += tree[crtA[j]] * r / tp;
                }
                crtA = [];
                crtR = Infinity;
                i--;
                continue;
            }

        }

    }

    return arRect;
    
    function calcMaxRatio(edge) {
        var i, sum = 0, otedge, arRatio = [];
        for(i = 0; i < crtA.length; i++) {
            sum += tree[crtA[i]];
        }
        otedge = (sum * r / edge);
        for(i = 0; i < crtA.length; i++) {
            arRatio.push(calcRatio(otedge, tree[crtA[i]] * r / otedge));
        }
        return Math.max.apply(null, arRatio);
    }

    function calcRatio(a, b) {
        if(a > b) {
            return a / b;
        } else {
            return b / a;
        }
    }
}

// with the help of D3.js,
var svg = d3.select("body").append("svg");
    
var x = d3.scale.category20b();

svg.selectAll("rect").data(treeMap).enter().append("rect").attr("x",function(d){return d[0]}).attr("y",function(d){return d[1]})
.attr("width", function(d){return d[2] - d[0]}).attr("height", function(d){return d[3] - d[1]}).attr("fill",function(){

    return x(Math.random() * 100);
});