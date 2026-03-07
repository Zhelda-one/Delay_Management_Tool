
/** Vector creations ****************************************************************/

function zeros( l)
/* Create vector with zeros of size l */
/*   See also: ones, nans, rand, counts */
{
    return new Array(l).fill(0);
}

function ones( l, val)
/* Create vector with val of size l */
{
   if (l<0) { throw("Ones with l="+l); }
   if (arguments.length===1) val=1;
    return new Array(l).fill(val);
}

function uint8_ones( l, val)
/* Create vector with val of size l of type Uint8*/
{
    if (l<0) { throw("Ones with l="+l); }

    let arr = new Uint8Array(l);
    if (arguments.length === 1) val=1;
    if(val !== 0) arr.fill(val);
    return arr;
}

function nans( l )
/* Return vector with all NaN's of length l */
{
   var r=new Array();
   for( ; l; l--)
       r.push(NaN);
   return r;
}

function rand( l )
/* Vector with values uniformly distributed between 0 and 1 */
{
   var r=new Array();
   for( ; l; l--)
       r.push(Math.random());
   return r;
}

function bin_rand( l, v0, v1 )
/* Vector with random containing 2 values [ v0, v1] */
{
   var r=new Array();
   for( ; l; l--)
       r.push(Math.random()>0.5?v0:v1);
   return r;
}


function randn_bm() 
/* Return a number from normal distribution with stddev=1, using box-muller transform to generate */
{
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}


function v_rand( l, stddev )
/* Return vector with gaussian distribution numbers. Second parameter is optional */
{
    var r=[], m=(arguments.length<2)?1:stddev;

    while(l--) r.push(randn_bm()*stddev);
    return r;
}

function gauss( l )
/* Vector with values with gaussian distribution, using simple 4-sum approach. */
{
   var r=new Array();
   for( ; l; l--)
       r.push((Math.random()-0.5)+(Math.random()-0.5)+(Math.random()-0.5)+(Math.random()-0.5) );
   return r;
}


function counts( from, step, to)
/* Like [1:3:10]: counts(1,3,10) will return 1,4,7 . (10??? error here?) */
{
    var r=new Array();
    for(; from<to; from+=step)
        r.push(from);
    return r;
}

function setdiff( A, B, mode)
/* Return difference between vectors, sorted. If A vector contains multiple values the return will also contain them (unless they are in B) */
{
    var r=[], m=(arguments.length==2)?'sort':mode;

    for( var i=0; i<A.length; i++)
        if (B.indexOf(A[i])==-1) 
           r.push(A[i]);
    switch(m)
    {
        case 'stable': 
            return r;
        case 'sorted': 
        default:
            return v_sort(r);
    }
}

function powmod( base, count, mod, scale )
/* similar to powmod() in matlab.  */
/* Example: powmod(2,8,7,1) shall return [1,2,4,1,2,4,1,2] */
{
    var ret = [scale], acc=1;

    for( var i=1; i<count ;i++)
        ret.push( (acc=(acc*base)%mod)*scale );
    return ret;
}



function v_counts( from, step, to)
{
    var r=new Array();
    if (step>0)
        for(; from<=to; from+=step)
            r.push(from);
    else
        for(; from>=to; from-=step)
            r.push(from);
    return r;
}



/** Vector primitives: function that do some calculations on vector and return numbers **********/

function v_sum( v )
/* Sum elements of vector */
{
    if ( ( typeof v === "object" )&&( v.hasOwnProperty("v_i") ) )
    {
        return new M([ v_sum(v.v_i) ],[ v_sum(v.v_q) ]);
    }

    return v_sum_in_range(v,0,v.length);
}
function v_sum_dec( v )
{
    return v_sum_in_range_dec(v,0,v.length);
}

function v_sum_in_range( v, from, to )
/* Sum elements of vector in specified range: v_sum( v.slice(from,to) ) */
{
    let sum = 0;
    for( let i = from; i<to; ++i){
        sum += v[i];
    }
    return sum;
}
function v_sum_in_range_dec( v, from, to )
/* Sum elements of vector in specified range: v_sum_dec( v.slice(from,to) ) */
{
    let sum = new Decimal(0);
    for( let i = from; i<to; ++i){
        sum = sum.add(v[i]);
    }
    return sum;
}
function v_sumsq( v )
/* Sum squared elements of vector */
{
    return v_sum_mul( v, v);
}

function v_sum_mul( v1, v2)
/* Multiplies 2 vectors and return the sum; ret = sum(v1.*v2); */
{
    var i, ret = 0;

    for( i=0; i<v1.length; i++)
        ret+=v1[i]*v2[i];

    return ret;
}

function v_repeat( v1, length )
{
    var i, r=[];
    var v1_length = v1.length;
    for( i=0; i<length; i++)
        r.push( v1[i%v1_length] );
    return r;
}

function v_and( v1, val )
{
    var i;
    var a=[];
    for ( i=0; i<v1.length; i++)
        a.push( v1[i] & val );
    return a;
}

function v_shift( v1, val )
{
    var i;
    var a=[];
    if (val>=0)
        for ( i=0; i<v1.length; i++)
            a.push( v1[i]<<val );
    else
        for ( i=0; i<v1.length; i++)
            a.push( v1[i]>>-val );
    return a;
}


function v_mod( v1, val )
{
    var i;
    var a=[];
    for ( i=0; i<v1.length; i++)
        a.push( (v1[i]+16*val) % val );
    return a;
}


function v_meanabs_cplx( re, im )
{
    var i, ret = 0;

    for( i=0; i<re.length; i++)
        ret+=Math.sqrt( re[i]*re[i] + im[i]*im[i] );

    return ret/re.length;
}

function v_stddev( v1, mean)
{
    var i, ret = 0;

    for( i=0; i<v1.length; i++)
        ret+=(v1[i]-mean)*(v1[i]-mean);

    return Math.sqrt(ret/v1.length);
}


function v_stddev_in_range( v1, v1_start, v1_end, mean)
{
    var i, ret = 0;

    for( i=v1_start; i<v1_end; i++)
        ret+=(v1[i]-mean)*(v1[i]-mean);

    return Math.sqrt(ret);
}


function v_corr_in_range( v1, v2, v1_start, v2_start, length)
/* Calculate correlation. */
{
    var v1_mean   = v_sum_in_range   ( v1, v1_start, v1_start+length)/length;
    var v2_mean   = v_sum_in_range   ( v2, v2_start, v2_start+length)/length;
    var v1c=0,v2c=0;
    var v11s=0,v22s=0,v12s=0;
    var v1p=v1_start, v2p=v2_start;
    var i;


    for( i=0; i<length; i++)
    {
        v1c = v1[v1p++]-v1_mean;
        v2c = v2[v2p++]-v2_mean;
        v11s += v1c*v1c;
        v22s += v2c*v2c;
        v12s += v1c*v2c;
    }

    return v12s/Math.sqrt(v11s*v22s);
}

/* Return arithmetic mean of vector */
function v_mean( v )
{
   return v_sum(v)/v.length;
}
function v_mean_dec( v )
{
    return v_sum_dec(v).div(v.length);
}

/* Return arithmetic mean of vector */
function v_mean_sq( v )
{
   return v_sumsq(v)/v.length;
}

function v_limit( v, minval, maxval )
{
    var ret=[];
    for( var i=0; i<v.length; i++ )
    {
        var cv = v[i];
        if (cv>maxval) cv=maxval; else
        if (cv<minval) cv=minval; 
        ret.push(cv);
    }
    return ret;
}

function v_max( v )
/* v_max returns array containing maximum value [0] in vector and it's position [1] in vector */
{
    var pos = 0, val = v[0];
    for( var i=1; i<v.length; i++)
        if (val<v[i])
        {
            pos=i;
            val=v[i];
        }
    return [val,pos];
}

function v_min( v )
/* v_min returns array containing maximum value [0] in vector and it's position [1] in vector */
{
    var pos = 0, val = v[0];
    for( var i=1; i<v.length; i++)
        if (val>v[i])
        {
            pos=i;
            val=v[i];
        }
    return [val,pos];
}

function v_max_numbers( v )
/* v_max returns array containing maximum value [0] in vector and it's position [1] in vector */
{
    var pos = -1, val;
    if (Array.isArray(v[0]))
    {
        for( var i=0; i<v.length; i++)
        {
            var z=v_max_numbers(v[i]);
            if ((val<z[0])||(pos==-1)) { val=z[0]; pos=i; }
        }
    }
    else
    {
        for( var i=0; i<v.length; i++)
            if ((!isNaN(v[i]))&&((v[i]!='')||(v[i]==0))&&((val<v[i])||(pos==-1)))
            {
                pos=i;
                val=v[i];
            }
    }
    return [val,pos];
}


function v_min_numbers( v )
/* v_min returns array containing maximum value [0] in vector and it's position [1] in vector */
{
    var pos = -1, val;
    if (Array.isArray(v[0]))
    {
        for( var i=0; i<v.length; i++)
        {
            var z=v_min_numbers(v[i]);
            if ((val>z[0])||(pos==-1)) { val=z[0]; pos=i; }
        }
    }
    else
    {
        for( var i=0; i<v.length; i++)
            if (  (!isNaN(v[i]))  &&  ((v[i]!='')||(v[i]==0))  &&  ((pos==-1)||(val>v[i]))  )
            {
                pos=i;
                val=v[i];
            }
    }
    return [val,pos];
}




/** GF2 & scrambling ****************************************************************/

function v_rot( v, len )
/* "rotate". v_rot([1 2 3 4 5],1) shall return [2 3 4 5 1] */
{
    return v.slice( len, v.length).concat( v.slice(0,len));
}

function v_remove_nans( v )
/* Return new vector, removing NaN values from given; */
{
    var result = new Array();

    for( var i=0; i<v.length; i++)
        if ( !isNaN(v[i]) )
            result.push(v[i]);

    return result;
}

function v_scramble( v1, v2)
/* result = v1.^v2; if v1[] == NaN result will be NaN as well */
{
    let v = [];

    if (v1.length !== v2.length) return NaN;
    for( let i=0; i<v1.length; i++)
    {
       if (isNaN(v1[i])) 
           v.push(NaN);
       else
           v.push( v1[i]^v2[i] );
    }

    return v;
}


function v_select_rev( v, to)
/* result[to] = v */
{
    let r=[];
    for( let i=0; i < to.length; i++)
        r[to[i]]=v[i];
    return r;
}

function v_select( v, from, step, to)
/* Return seleected elements from vector;   */
/* result = v([from:step:to])  */
/* if given 2 arguments: */
/* result = v([from_vector]) */
{
    var r=new Array();

    if ( arguments.length==4 )
        for(; from<to; from+=step)
            r.push(v[from]);
    else if ( arguments.length==2 )
        for( var i=0; i<from.length; i++)
            r.push(v[from[i]]);

    return r;
}

function v_select_binary( v, selector )
{
    var r=[];
    for( var i=0; i<selector.length; i++)
        if ( selector[i] )
            r.push( v[i] );
    return r;
}

function v_compare( v1, v2)
/* Compare 2 vectors, return 1 if values inside are same */
/* Note: ignores NaN values in comparision.              */
{

    if (v1.length !== v2.length) return 0;

    for( let i=0; i<v1.length; i++)
        if ( (v1[i] !== v2[i]) && (!((isNaN(v1[i]))&&(isNaN(v2[i]))) ) )
            return 0;
    return 1;
}

function v_count_differences( v1, v2)
{
    var i, len=v1.length;
    var diff=0;

    if (v1.length!=v2.length) return 0;

    for( i=0; i<len; i++)
        if ( (v1[i]!=v2[i]) && (!((isNaN(v1[i]))&&(isNaN(v2[i]))) ) )
            diff++;
    return diff;
}


function v_compare_with_nan( v1, v2 )
/* Compare 2 vectors, retun object with following counts of elements that
 *  .ok     : are the same   
 *  .nok    : are different
 *  .nan    : either one or second value is NaN
 *  .metric : .ok / (.ok+.nok); NaNs are ignored. If all values are NaNs then .metric equals 1
 */
{
    var i;

    var x = {};
    x.metric = -1;
    x.ok  = 0;
    x.nan = 0;
    x.nok = 0;
    x.toString = function() { return "ok="+this.ok+" , "+  "nok="+this.nok+" , "+  "nan="+this.nan+" metric="+this.metric; }

    if (v1.length != v2.length) return x;
    for( i=0; i<v1.length; i++)
    {
        if ( ( isNaN(v1[i]) ) || ( isNaN(v2[i]) ) ) 
            x.nan++; 
        else if ( v1[i] - v2[i] == 0) 
            x.ok++;
        else
            x.nok++;
    }
    if ( ( x.ok == 0 ) && ( x.nok ==0 ) ) x.metric=1;
    else x.metric = x.ok / (x.ok+x.nok) ;

    return x;
}


function inverse_vector( indexes )
/* result: inversed permutation, similar to inv_perm */
{
    var i;
    var v= new Array();

    for( i=0; i<indexes.length; i++)
        v[ indexes[i] ] = i;

    return v;
}

function permutate( bits, indexes )
/* result = bits(indexes); that is, it does selection of elements of bits array with indexes given by indexes */
{
    var i, v= [];

    for( i=0; i<indexes.length; i++)
    {
        if ( isNaN (indexes[i]) )
            v[ i ] = NaN;
        else
            v[ i ] = bits[ indexes[i] ];
    }
    return v;
}

function v_copy( dest, dest_start, from, from_start, length )
{
    var i;
    for( i=0; i< length; i++)
        dest[ dest_start++ ] = from[ from_start++ ];
    return dest;
}

function v_copy_reversed( dest, dest_start, from, from_start, length )
{
    var i;

    dest_start += length;
    for( i=0; i< length; i++)
        dest[ --dest_start ] = from[ from_start++ ];
}

// inplace.
function v_reverse( v )
{
   var i, j, x, half=v.length/2;
   for( i=0, j=v.length-1; i<half; i++, j--)
   {
       x   = v[i];
       v[i]= v[j];
       v[j]= x;
   }
   return v;
}


// outplace
function v_reversed( v )
{
   var ret=[];
   for( var i=v.length-1; i>=0; i-- )
       ret.push( v[i] );
   return ret;
}


function v_rms( i, q)
{
    var n=0, result=0;
    for( n=0; n<i.length; n++)
        result += i[n]*i[n]+q[n]*q[n];
    return Math.sqrt( result/i.length );
}

// complex version
function v_dot_mul( a, b)
{
    if ( a.hasOwnProperty("v_i") )
    {
        var l = a.v_i.length;
        var r = {};
        r.v_i = [];
        r.v_q = [];
        for( var i =0; i<l; i++)
        {
            r.v_i[i] = a.v_i[i]*b.v_i[i] - a.v_q[i]*b.v_q[i];
            r.v_q[i] = a.v_i[i]*b.v_q[i] + a.v_q[i]*b.v_i[i];
        }
        return r;
    }

    var l = a.length;
    var r = new Array();
    for( var i =0; i<l; i++)
    {
        r[i] = a[i]*b[i];
    }
    return r;
}

//real version
function v_dot_div( a, b)
{
    var l = a.length;
    var r = new Array();
    for( var i =0; i<l; i++)
    {
        var c;
        if ( b[i]==0 ) c=0; else c=a[i]/b[i];
        r.push( c );
    }
    return r;
}


function v_dot_mul_const( a, b )
{
    var i;
    for( i=0; i<a.length; i++)
        a[i]*=b;
    return a;
}


function v_dot_add( a, cnst) 
/* new real vector plus constant */
{
    var l = a.length;
    var r = new Array();
    if ( Array.isArray(cnst) )
    {
        if ( cnst.length!=a.length )throw "v_dot_add: vector sizes does not match";
        for( var i =0; i<l; i++)
            r.push( a[i]+cnst[i] );
    }
    else
    {
        for( var i =0; i<l; i++)
            r.push( a[i]+cnst );
    }
   
    return r;
}


function v_add_v_real_inplace( a, b) 
/* real vector plus real vector, inplace */
{
    var l = a.length;
    for( var i =0; i<l; i++)
        a[i]+=b[i];
    return a;
}

// real vector plus real vector
function v_sub_v_real_inplace( a, b) 
{
    var l = a.length;
    for( var i =0; i<l; i++)
        a[i]-=b[i];
    return a;
}


function v_conj( a )
{
    var l = a.v_i.length;

    for( var i =0; i<l; i++)
       a.v_q[i]*=-1;
    return a;
}

function v_ccorr_cmplx_naive( a, b)
{
    var r={};
    var i,j;
    r.v_i = new Array();
    r.v_q = new Array();
    for( i=0; i<a.v_i.length; i++)   
    {
        var vi=0;
        var vq=0;
        for( j=0; j<b.v_i.length; j++)   
        {
            var k=(i+j)%a.v_i.length;
            vi += a.v_i[k]*b.v_i[j] - a.v_q[k]*b.v_q[j];
            vq += a.v_i[k]*b.v_q[j] + a.v_q[k]*b.v_i[j];
        }
        r.v_i.push(vi);
        r.v_q.push(vq);
    }
    return r;
}


function v_corr_cmplx_fft( a, b)
{
    var c = v_fft( a );
    var d = v_fft( a );
}

function v_diff( v )
{
   var r=[];
   for( var i=1; i<v.length; i++)
       r.push(v[i]-v[i-1]);
   return r;
}


function v_conj_diff_rot_inplace( vi, vq )
{
    var ti = vi[vq.length-1]*vi[0]+vq[vq.length-1]*vq[0];
    var tq = vi[vq.length-1]*vq[0]-vq[vq.length-1]*vi[0];

    for( var i=0; i<vi.length-1; i++)
    { 
        var pi = vi[i]*vi[i+1]+vq[i]*vq[i+1];
        var pq = vi[i]*vq[i+1]-vq[i]*vi[i+1];
       
        vi[i]=pi;
        vq[i]=pq;
    }
    vi[0]=ti;
    vq[0]=tq;
    return [vi,vq];
}

function v_sort( v )
/* Sort vector */
{
    return v.sort(function(a, b){return a-b});
}

function v_sort_text( v )
/* Sort vector textual */
{
    return v.sort(function(a, b){    if(a < b) return -1;    if(a > b) return 1;    return 0;});
}


function v_notin( v1, v2 )
{
    var r=[ ];
    for( i=0; i<v1.length; i++)
        if ( v2.indexOf(v1[i])==-1 )
	    r.push( v1[i] );
    return r;
}


function v_uniq( v )
{
    var r=[ v[0] ];
    var vp = v[0];
    for( i=1; i<v.length; i++)
        if ( v[i]!=vp ) r.push( vp=v[i]);
    return r;
}

function v_uniq_cnt( v )
{
    var r={};
    for( i=0; i<v.length; i++)
    {
        if (r.hasOwnProperty(v[i])) r[v[i]]++; else r[v[i]]=1;
    }
    return r;
}

function v_find( v1, v2 )
/* Find v2 in v1, return its indexes */
{
    var r=[];

    if (Array.isArray(v2))
        for( var i=0; i<v2.length; i++)
            r.push( v1.indexOf( v2[i] ) );
    else
        for( var i=0; i<v1.length; i++)
            if (v1[i]==v2) r.push( i );

    return r;
}

function v_flatten( v )
{
    if (Array.isArray(v))
    {
        var r=[];
        for( var i=0; i<v.length; i++)
        {
            var t;
            if (Array.isArray(v[i]))
                r=r.concat(v_flatten(v[i]));
            else
                r.push(v[i]);
        }
        return r;
    }
    return [v];
}


function v_angle( data )
{
    var i;
    var r=new Array();

    for( i=0; i<data.v_i.length; i++)
        r.push( Math.atan2(data.v_q[i],data.v_i[i]) );
    return r;
}

function v_abs( data )
{
    var i;
    var r=new Array();

    if ( ( typeof data === "object")  &&  ( data.hasOwnProperty("v_i") ) )
    {
        for( i=0; i<data.v_i.length; i++)
            r.push( Math.sqrt(data.v_q[i]*data.v_q[i]+data.v_i[i]*data.v_i[i]) );
    }
    else
    {
        for( i=0; i<data.length; i++)
            r.push( Math.abs(data[i]) );
    }
    return r;
}


function v_gen( len, fnct )
{
    var r=[];
    for( var x=0; x<len; x++)
        r.push(eval(fnct));
    return r;
}


function v_downsample( v, factor )
/* downsample, that is: get every n-th sample. If factor = 1 result=input. */
{           
    var r=[];
    for( var x=0; x<v.length; x+=factor)
        r.push( v[x] );
    return r;
}


function v_upsample( v, factor )
/* upsample, that is: put zeroes. If factor = 1 no zeroes are inserted. */
{
    var r=[];
    for( var x=0; x<v.length; x++)
    {
        r.push( v[x] );
        for( var y=1; y<factor; y++)
            r.push( 0 );
    }
    return r;
}


function v_foreach( v, fnct )
{
    for( var i=0; i<v.length; i++)
    {
        var x = v[i];
        v[i]=eval(fnct);
    }
    return v;
}

function v_stats_as_text( v )
{
    var m1 = v_min(v);
    var m2 = v_max(v);
    var r = "length:"+v.length+" sum:" +v_sum(v) + " range:"+m1[0]+"..."+m2[0]+" first 8:"+v.slice(0,8);
    return r;
}

function v_add_foreach_function( name, args, fcnt )
{
    var txt1 = ( "var "+name+"=function(v"+args+") "+
                "{ "+
                "   var r=[];"+
                "   for( var i=0; i<v.length;i++) "+
                "   {"+
                "       r.push("+fcnt+");"+
                "   }"+
                "   return r;"+
                "};" );
    var txt2 = ( "var "+name+"_inplace=function(v"+args+") "+
                "{ "+
                "   for( var i=0; i<v.length;i++) "+
                "   {"+
                "       v[i]=("+fcnt+");"+
                "   }"+
                "   return v;"+
                "};" );


    eval(txt1);
    eval(txt2);
}

function v_diff_ccorr( a, b )
{
    if (a.length!=b.length) throw "Different sizes";
    var r=[];
    for( var i=0; i<a.length; i++)
    {
        var s=0;
        for( var j=0; j<a.length; j++)
        {
            var z =  a[j]-b[(j+i)%a.length];
            s+=z*z; 
        }
        r.push(s);
    }
    return r;
}

/* Generic created function, finally seems a good way to go! */
v_add_foreach_function( "v_sqrt", "", "Math.sqrt(v[i])" );
v_add_foreach_function( "v_sin",  "", "Math.sin(v[i])" );
v_add_foreach_function( "v_cos",  "", "Math.cos(v[i])" );
v_add_foreach_function( "v_round","", "Math.round(v[i])" );
v_add_foreach_function( "v_neg",  "", "(!v[i])" );
