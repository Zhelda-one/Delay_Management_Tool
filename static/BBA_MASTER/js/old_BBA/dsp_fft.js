function Naive_fft(v_i, v_q, is_ifft)
/* 'naive' fft, from definition. Slow, but universal. Note: preserves energy, that is, rms(fft(x))=rms(x)=rms(ifft(x)) */
{
    var fft_size = v_i.length;
    var mpi2 = is_ifft?2*Math.PI:-2*Math.PI;

    var i, k, n;
    this.v_i = new Float32Array(fft_size);
    this.v_q = new Float32Array(fft_size);
    var scale = Math.sqrt(fft_size);

    for(k=0; k<fft_size; k++) {
        var Xk_re = 0;
        var Xk_im = 0;
        for(n=0; n<fft_size; n++) 
        {
            var angle = mpi2*n*k/fft_size;
            var a_re = Math.cos(angle);
            var a_im = Math.sin(angle);
            var xn_re=v_i[n];
            var xn_im=v_q[n];

            Xk_re += xn_re*a_re - xn_im*a_im;
            Xk_im += xn_re*a_im + xn_im*a_re;
        }
        this.v_q[k]=Xk_im/scale;
        this.v_i[k]=Xk_re/scale;
    }

    return this;
}

function naive_fft_M( v_i, v_q, is_ifft)
{
   var ret = new Naive_fft( v_i, v_q, is_ifft );
   return new M( ret.v_i, ret.v_q );
}

function Ct_fft(v_i, v_q, is_ifft )
/* Cooley-Tukey FFT. Fast! */
/* (but not realtime... this is SPART...err.. javascript!) */
/* Works on input data and alters them! */
{

    var fft_size = v_q.length |0;
    var t=0;
    var scale = 1/Math.sqrt(fft_size);
    var pifft = is_ifft?-Math.PI:Math.PI;

    /* re-arrange */
    for( var p=0; p<fft_size; p++)
    {
        if (t>=p) /* Swap & scale */
        {
           var x;
           x=v_i[p]; v_i[p]=v_i[t]*scale; v_i[t]=x*scale;
           x=v_q[p]; v_q[p]=v_q[t]*scale; v_q[t]=x*scale;
        }
        var Mask = fft_size;
        /* Drop bits while bit is set */
        while( t & (Mask>>=1) )
            t &= ~Mask;
        t |= Mask;
    }

    /* fft */
    for ( var step=1; step < fft_size; step <<= 1)
    {
        var jump = step<<1;
        var delta = pifft/step; /* Angle increment */ 
        var Sine = Math.sin(delta*0.5);
        var mul_re = -2*Sine*Sine;
        var mul_im = Math.sin(delta);
        var fac_re = 1;
        var fac_im = 0;

        //   Iteration through groups of different transform factor
        for( var group=0; group<step; group++)
        {
            //   Iteration within group 
            for ( var pair = group; pair < fft_size; pair += jump)
            {
                //   Match position
                var Match = pair + step;
                var prod_re = (fac_re * v_i[Match] - fac_im * v_q[Match]);
                var prod_im = (fac_re * v_q[Match] + fac_im * v_i[Match]);

                v_i[Match] = v_i[pair] - prod_re;
                v_q[Match] = v_q[pair] - prod_im;

                v_i[pair] += prod_re;
                v_q[pair] += prod_im;

            }
            var fac_re_temp = fac_re +fac_re * mul_re - fac_im * mul_im;
                fac_im     +=         fac_re * mul_im + fac_im * mul_re;
            fac_re = fac_re_temp;
        }
    }

    this.v_q = new Float32Array(fft_size);
    this.v_i = new Float32Array(fft_size);
    for( var i=0; i<fft_size; i++)
    {
        this.v_q[i] = v_q[(fft_size-i)%fft_size];
        this.v_i[i] = v_i[(fft_size-i)%fft_size];
    }

    return this;
}

//The code below should be removed - the appropriate code is in tc.js
// /* Cooley-Tukey FFT. Fast! */
// /* (but not realtime... this is SPART...err.. javascript!) */
// function ct_fft_asm( stdlib, v_i_heap, v_q_heap )
// {
//     "use asm";
//
//     var sqrt = stdlib.Math.sqrt;
//     var v_i = new stdlib.Float64Array( v_i_heap );
//     var v_q = new stdlib.Float64Array( v_q_heap );
//
//         var fft_size = v_q.length |0;
//         var t=0;
//         var scale = 1/sqrt(fft_size*1.0);
//
//
//         /* re-arrange */
//         for( var p=0; p<fft_size; p++)
//         {
//             if (t>=p) /* Swap & scale */
//             {
//                 var x;
//                 x=v_i[p]; v_i[p]=v_i[t]*scale; v_i[t]=x*scale;
//                 x=v_q[p]; v_q[p]=v_q[t]*scale; v_q[t]=x*scale;
//             }
//             var Mask = fft_size;
//             /* Drop bits while bit is set */
//             while( t & (Mask>>=1) )
//                 t &= ~Mask;
//             t |= Mask;
//         }
//
//         /* fft */
//         for ( var step=1; step < fft_size; step <<= 1)
//         {
//             var jump = step<<1;
//             var delta = Math.PI/step; /* Angle increment */
//             var Sine = Math.sin(delta*0.5);
//             var mul_re = -2*Sine*Sine;
//             var mul_im = Math.sin(delta);
//             var fac_re = 1;
//             var fac_im = 0;
//
//             //   Iteration through groups of different transform factor
//             for( var group=0; group<step; group++)
//             {
//                 //   Iteration within group
//                 for ( var pair = group; pair < fft_size; pair += jump)
//                 {
//                     //   Match position
//                     var Match = pair + step;
//                     var prod_re = (fac_re * v_i[Match] - fac_im * v_q[Match]);
//                     var prod_im = (fac_re * v_q[Match] + fac_im * v_i[Match]);
//
//                     v_i[Match] = v_i[pair] - prod_re;
//                     v_q[Match] = v_q[pair] - prod_im;
//
//                     v_i[pair] += prod_re;
//                     v_q[pair] += prod_im;
//
//                 }
//                 var fac_re_temp = fac_re +fac_re * mul_re - fac_im * mul_im;
//                     fac_im     +=         fac_re * mul_im + fac_im * mul_re;
//                 fac_re = fac_re_temp;
//            }
//         }
//
//         this.v_q = new Float32Array(fft_size);
//         this.v_i = new Float32Array(fft_size);
//         for( var i=0; i<fft_size; i++)
//         {
//             this.v_q[i] = v_q[(fft_size-i)%fft_size];
//             this.v_i[i] = v_i[(fft_size-i)%fft_size];
//         }
//
//         return this;
// }


function chirp_mul( v, step )
/*               step*x^2*i
 *  Out = V .* e^
 */
{
    var N = v.v_i.length;
    var vi_in = v.v_i;
    var vq_in = v.v_q;
    var vi_out = [];
    var vq_out = [];
    var ret = {};
    for( var n=0; n<N; n++)
    {
        var angle = step*n*n;
        var ci  = Math.cos( angle );
        var cq  = Math.sin( angle );
        var vi    = vi_in[n];
        var vq    = vq_in[n];
        vi_out.push( ci*vi-cq*vq );
        vq_out.push( ci*vq+cq*vi );
    }
    ret.v_i = vi_out;
    ret.v_q = vq_out;
    return ret;
}

/*                (a*x^2+bx+c)*i
 *  Out = V .* e^
 */
function parabolic_mul( v, a, b, c)
{
    var N = v.v_i.length;
    var vi_in = v.v_i;
    var vq_in = v.v_q;
    var vi_out = [];
    var vq_out = [];
    var ret = {};
    for( var n=0; n<N; n++)
    {
        var angle = a*n*n+b*n+c;
        var ci  = Math.cos( angle );
        var cq  = Math.sin( angle );
        var vi    = vi_in[n];
        var vq    = vq_in[n];
        vi_out.push( ci*vi-cq*vq );
        vq_out.push( ci*vq+cq*vi );
    }
    ret.v_i = vi_out;
    ret.v_q = vq_out;
    return ret;
}


function naive_circular_conv( vv, vp )
/* Performs circular convolution "from definition". */
{
    var v_i = vv.v_i;
    var v_q = vv.v_q;
    var p_i = vp.v_i;
    var p_q = vp.v_q;
    var i, j;
    var N = v_i.length;
    var Np= p_i.length;
    var rv_i = [];
    var rv_q = [];
    for( i=0; i<N; i++)
    {
        var si = 0;
        var sq = 0;
        for( j=0; j<Np; j++)
        {
            var id = (i-j+Np)%Np;
            var iv = j%N;
            si+= v_i[ iv ] * p_i[ id ]  - v_q[ iv ] * p_q[ id ];
            sq+= v_i[ iv ] * p_q[ id ]  + v_q[ iv ] * p_i[ id ];
        }
        rv_i.push( si );
        rv_q.push( sq );
    }
    return new M( rv_i, rv_q );
}




function ct_circular_conv( vv, vp )
/*
 * Calculates convolution using convolution theorem:
 *     ,_.
 *   x |X| y = IFFT( FFT(x) * FFT(y) )
 *     '-`
 *  Note: as our implementation of FFT does maintain energy, some scaling has to be added. (why?)
 */
{
    var v  = new Ct_fft( vv.v_i, vv.v_q, 0 );
    var p  = new Ct_fft( vp.v_i, vp.v_q, 0 );
    var vp = v_dot_mul( v, p);
    var ret= new M(new Ct_fft( vp.v_i, vp.v_q, 1 ));
    ret.mul_inplace(2); //?
    return ret;
}


function chirpz_fft( v_i, v_q, is_ifft )
/* From DFT definition:
 *
 *         N-1       -(2 pi i)/N * k * n
 *  x    = sum  x  e
 *    k    n=0   n
 *
 * Bluestein noted, that if we substitute:
 *           - (n-k)^2     n^2   k^2
 *    n*k =  ----------  + --- + ---
 *               2          2     2
 *
 * We'll get following:
 *        -pi*i/N *k^2    N-1         -pi*i/N *n^2      pi*i/N *(k-n)^2
 * x  = e               * sum  x  * e               * e
 *  k                     n=0   n
 *
 * If we do following substitutions:
 *                           s*k^2               s*n^2             -s*n^2
 *  s = -pi*i/N     bstar = e             a = x e             b  = e
 *                       k                 n   n               n
 *
 * Then we'll get:
 *                N-1
 *  x  = bstar  * sum a  * b
 *   k        k   n=0  n    k-n
 *
 * Which can be calculated using convolution theorem.
 * To calculate convolution using power-of-two FFT we have to zero-pad a_n and b_n, and b has to be symmetric.
 *               
 * Note:  this function depends on complex_matrix class. remove dependency?                                                       
 * Note2: still experimental!
 */
{
    if ( v_q.length!=v_q.length ) { alert("v_i length != v_q length in chirpz_fft"+v_i.length+ " "+v_q.length ); return; }

    var v = {v_i: v_i, v_q: v_q}
    var N = v_i.length;
    var N2= 1<<(log2(N)+2);
    var zero_pad = zeros( N2-N );
    var step = is_ifft?-Math.PI/N:Math.PI/N;
    var correction = Math.sqrt(N2)/Math.sqrt(N)/2;

    var a     = chirp_mul        ( v, -step );
    var b     = M.prototype.chirp( N,  step );
    var bstar = M.prototype.chirp( N, -step );

    if ( Object.prototype.toString.call(a.v_i)==="[object Float32Array]" )
    {
        /* Change to normal JS array (concat won't work otherwise) */
        a.v_i=v_dot_add( a.v_i, 0);
        a.v_q=v_dot_add( a.v_q, 0);
    }
    a.v_i = a.v_i.concat( zero_pad );
    a.v_q = a.v_q.concat( zero_pad );
    b.v_i = b.v_i.concat( zero_pad );
    b.v_q = b.v_q.concat( zero_pad );
    /* b shall be symetric */
    for( var i =0; i<N; i++)
    { 
        b.v_i[N2-1-i] = b.v_i[ i+1];
        b.v_q[N2-1-i] = b.v_q[ i+1];
    }

    var ret = ct_circular_conv( a, b ).slice_inplace( 0, N );
    return ret.mul( bstar ).mul_inplace( correction );
}

function sparse_fft( v_i, v_q, N0, _N_, _M_ )
/*  DFT/IDFT definition:

 *         N-1            -k*n*2pi*i/N
 *  X(k) = sum [ x(n) * e              ]
 *         n=0  
 *
 *  If only part of x(n) is non-zero (say: from N0 to N1), then we get:

 *          N1           -k*n*2pi*i/N
 *  X(k) = sum [ x(n) * e              ]
 *         n=N0  

 * Which is non-optimal. Let's use different FFT size M, which:
 *  M = 2^m    (is power of two)
 *  M *p = N   (N is p-times greater than M, p is natural)
 *  M > N1-N0
 *  
 * Also, let substitute k:
 *  k = p*k0 + k1,   k0 = 0...M-1,  k1 = 0...p-1
 *
 * And exchange:
 *                   -k1*(n+N0) * 2PIi/N
 * y(n) = x(n+N0) * e
 *
 * ... after some lengthy calculations:
 
 *                -k0*N0*2pi*i/M    M         -k0*n * 2pi*i/M
 * X(p*k0+k1)  = e               * sum  y(n) e
 *                                 n=0
 
 * So algorithm is as follows:
 *   1. Take initial sequence, and zero-pad it to M
 *   2. For each k1:
 *       - rotate intitial sequence with linear phase -k1*2*pi/N * i, rotate -k1*N0*2pi*i/N
 *       - fft it with size M
 *       - rotate result with linear phase -k0*N0*2pi/M * i
 *   3. Combine result which is 'comb'
 */
{
    var v={};
    var zero_pad = zeros( _M_-v_i.length );
    var p = (_N_/_M_)|0;
    var k1_collection=[];
    var result_i = [], result_q = [];

    v.v_i = v_i.concat( zero_pad );
    v.v_q = v_q.concat( zero_pad );

    for( var k1=0; k1<p; k1++)
    {
        var v_rot           = parabolic_mul( v,         0, -k1*2*Math.PI/_N_, -k1*N0*2*Math.PI/_N_); /* Note: first sequence have no rotation	 */
        var v_rot_fft       = v_fft( v_rot );
        var v_rot_fft_derot = parabolic_mul( v_rot_fft, 0, -N0*2*Math.PI/_M_, 0 );
        k1_collection[k1]   = v_rot_fft_derot; 
    }
    /* Combine the result */
    for( var k0=0; k0<_M_; k0++)
        for( var k1=0; k1<p; k1++)    
        {
            result_i.push( k1_collection[k1].v_i[k0] );
            result_q.push( k1_collection[k1].v_q[k0] );
        }

    return new M( result_i, result_q );
} /* sparse_fft ... is there a known established name for this algorithm? */

function To_FloatArrayIQ(fft_size, v_i, v_q )
{
    this.v_q = new Float32Array(fft_size);
    this.v_i = new Float32Array(fft_size);
    for( var i=0; i<fft_size; i++)
    {
        this.v_q[i] = v_q[(fft_size-i)%fft_size];
        this.v_i[i] = v_i[(fft_size-i)%fft_size];
    }

    return this;
}


function fft( v_i, v_q )
/* FFT function. Uses cooley-tukey for sizes 2^N, and chirp-z otherwise. Returns this.v_i:Float32Array, this.v_q:Float32Array */
{
    var fft_size = v_i.length;
    var N;
 
    for( N=fft_size; (N) && !(N&1); N>>=1);

    /* If FFT size is 2^n */
    if (N==1) 
        return new Ct_fft( v_i, v_q, 0 );
    else if ( fft_size>64 )
    {
        var tmp = chirpz_fft( v_i, v_q, 1 );
        return new To_FloatArrayIQ( fft_size, tmp.v_i, tmp.v_q ); // Chripz is still experimental, take care!
    }

    var tmp = naive_fft_M( v_i, v_q, 0 );
    return new To_FloatArrayIQ( fft_size, tmp.v_i, tmp.v_q ); // Chripz is still experimental, take care!
}


function ifft( v_i, v_q )
/* IFFT function. Uses cooley-tukey for sizes 2^N, and chirp-z otherwise. Returns this.v_i:Float32Array, this.v_q:Float32Array */
{
    var fft_size = v_i.length;
    var N;
 
    for( N=fft_size; (N) && !(N&1); N>>=1);

    /* If FFT size is 2^n */
    if (N==1) 
        return new Ct_fft( v_i, v_q, 1 );
    else if ( fft_size>64 )
    {
        var tmp = chirpz_fft( v_i, v_q, 0 );
        return new To_FloatArrayIQ( fft_size, tmp.v_i, tmp.v_q ); // Chripz is still experimental, take care!
    }
    else
    {
        var tmp = naive_fft_M( v_i, v_q, 1 );
        return new To_FloatArrayIQ( fft_size, tmp.v_i, tmp.v_q ); // Chripz is still experimental, take care!
    }
}


/*
function runing_fft( v_i, v_q, fft_size, sc )
{
    var i, k, n;
    this.v_i = new Float32Array(v_i.length - fft_size);
    this.v_q = new Float32Array(v_q.length - fft_size);
    k = sc;
    var Xk_re = 0;
    var Xk_im = 0;
        for(n=0; n<fft_size; n++) 
        {
            var angle = -2*Math.PI*n*k/fft_size;
            var a_re = Math.cos(angle);
            var a_im = Math.sin(angle);
            var xn_re=v_i[n];
            var xn_im=v_q[n];

            Xk_re += xn_re*a_re - xn_im*a_im;
            Xk_im += xn_re*a_im + xn_im*a_re;
        }
    this.v_q[0]=Xk_im;
    this.v_i[0]=Xk_re;
    var angle  = -2*Math.PI*(fft_size-1)*k/fft_size;
    var angle2 = -2*Math.PI*1           *k/fft_size;
    var a_re2 = Math.cos(angle2);
    var a_im2 = Math.sin(angle2);
    for( n=0; n<v_i.length-fft_size; n++)
    {
        var a_re = 1;
        var a_im = 0;
        var xn_re=v_i[n];
        var xn_im=v_q[n];

        Xk_re -= xn_re*a_re - xn_im*a_im;
        Xk_im -= xn_re*a_im + xn_im*a_re;

        var xn_re=v_i[n+fft_size];
        var xn_im=v_q[n+fft_size];

        Xk_re += xn_re*a_re - xn_im*a_im;
        Xk_im += xn_re*a_im + xn_im*a_re;

        var Xk_re_prim = Xk_re*a_re2 - Xk_im*a_im2;
        var Xk_im_prim = Xk_re*a_im2 + Xk_im*a_re2;

        Xk_re = Xk_re_prim;
        Xk_im = Xk_im_prim;

        this.v_q[n+1]=Xk_im;
        this.v_i[n+1]=Xk_re;
    }
    return this;
}


*/

    // function DiagModule(stdlib) {
    //     "use asm";
    //
    //     var sqrt = stdlib.Math.sqrt;
    //
    //     function square(x) {
    //         x = +x;
    //         return +(x*x);
    //     }
    //
    //     function diag(x, y) {
    //         x = +x;
    //         y = +y;
    //         return +sqrt(square(x) + square(y));
    //     }
    //
    //     return { diag: diag };
    // }
    //
    // DiagModule(this);

function v_fft( o )
/* FFT function. Uses cooley-tukey for sizes 2^N, and chirp-z otherwise. Returns this.v_i:Float32Array, this.v_q:Float32Array */
{
    return fft( o.v_i, o.v_q );
}

function v_ifft( o )
/* IFFT function. Uses cooley-tukey for sizes 2^N, and chirp-z otherwise. Returns this.v_i:Float32Array, this.v_q:Float32Array */
{
    return ifft( o.v_i, o.v_q );
}
