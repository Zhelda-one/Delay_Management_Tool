function calcPercentFixed2( a, b ) {
    if( b === 0 ) return '100.00%'
    if( a === 0 ) return '0.00%';
    return ( Math.floor( a * 10000 / b ) / 100 ).toFixed( 2 ) + '%';
}

function reverseString(s){
    return s.split("").reverse().join("");
}


function strToTime(str){
    const splitted = str.split('.');
    const seconds = Number(splitted[0]);
    let nanoseconds = 0;
    if(splitted.length > 1){
        while(splitted[1].length < 9) splitted[1] = splitted[1] + '0';
        nanoseconds = Number(splitted[1]);
    }
    return new Time(seconds, nanoseconds);
}
class Time {
    constructor(t_sec, t_nsec) {
        this.t_sec = BigInt(parseInt(t_sec));
        this.t_nsec = BigInt(parseInt(t_nsec));
    }
    toString(){
        let minus = '';
        let additionalZeros = '';
        if (this.t_nsec < 0) {
            this.t_nsec = -this.t_nsec;
            minus = '-';
        }
        let trimmedZeros = this.t_nsec;
        while((additionalZeros + trimmedZeros).length < 9) additionalZeros += '0';
        while(trimmedZeros !== 0n && trimmedZeros % 10n === 0n) {
            trimmedZeros = trimmedZeros/10n;
        }
        return minus + this.t_sec + '.' + additionalZeros + trimmedZeros;
    }
    toNanocesonds() {
        return this.t_sec * BigInt(10**9) + this.t_nsec;
    }
    toTimeFormat(){
        let d = new Date(Number(this.t_sec * 1000n + this.t_nsec / 1000000n));
        let str = d.toISOString().replace('T', ' ').replace('Z', '');
        const microseconds = ((this.t_nsec%1000000n)/1000n);
        if(microseconds > 0){
            str += 'm' + microseconds;
            const nanoseconds = this.t_nsec % 1000n;
            if(nanoseconds > 0){
                str += 'u' + nanoseconds + 'n';
            }
        }
        return str;
    }
    diff(a) {
        const nanoseconds = this.toNanocesonds() - a.toNanocesonds();
        return new Time(nanoseconds / BigInt(10**9), nanoseconds % BigInt(10**9));
    }
}