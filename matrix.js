var ma = [
    [1,2,3],
    [2,3,4],
    [2,3,4]
]
var mb = [
    [1,2,0],
    [0,0,1],
    [0,1,0]
]

function martixMutiply(ma, mb) {
    var result = [],
        m = ma[0].length, 
        n = mb.length,
        i = 0, j = 0,
        k = 0, ar, 
        sum = 0;

    if(m !== n) {
        return result;                  
    }

    for(i; i < ma.length; i++) {
        ar = [];
        for(j = 0; j < mb[0].length; j++) {
            for(k = 0, sum = 0; k < m; k++) {
                sum += ma[i][k] * mb[k][j];     
            }

            ar[j] = sum;
        }
        result.push(ar);
    }
    
    return result;
}