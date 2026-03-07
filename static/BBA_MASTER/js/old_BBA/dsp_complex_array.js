function array_from( v )
/* Returns array from any other array-like entity. */
{
    var x;
    try {
       x = Array.from(v);
    }
    catch(err)
    {
        x=[]; 
        for( var i=0; i<v.length; i++) x.push(v[i]);
    }
    return x;
}

// note: array elements are arranged verticaly, that is: elements in col does have increasing element numbers!
function M( real, imag, rows, cols )
{
    this.isreal = 0;
    if ( (arguments.length === 1) && ( typeof real === "object" ) &&
         ( real.hasOwnProperty("v_i") ) &&  ( real.hasOwnProperty("v_q") ) )
    {
        this.v_i = real.v_i;
        this.v_q = real.v_q;
        rows = this.v_i.length;
        cols = 1;
    }
    else
    {
        if ( arguments.length>0 )
        {
            if ( real.constructor === Array )
            {
                this.v_i = real;
            }
            else if ( real instanceof Float32Array )
            {
                
                this.v_i = array_from( real );
            }
            else
            {
                this.v_i = zeros( rows*cols );
            }
        }
        else
            this.v_i = [0];

        if ( arguments.length>1 )
        {
            if ( imag.constructor === Array )
            {
                this.v_q = imag;
            }
            else if ( imag instanceof Float32Array )
            {
                this.v_q = array_from( imag );
            }
            else
            {
                this.v_q = zeros( this.v_i.length );
                this.isreal = 1;
            }
        }
        else
        {
            this.v_q = zeros( this.v_i.length );
            this.isreal = 1;
        }
        this.rows = NaN;
        this.cols = NaN;

        if ( arguments.length>2 )
        {
            this.rows = rows;
        }
        if ( arguments.length>3 )
        {
            this.cols = cols;
        }
    }
    if ( ( isNaN(this.rows) ) && ( isNaN(this.cols) ) )
    {
        this.rows = 1;
        this.cols = this.v_i.length;
    }

    if (this.v_i.length!=this.v_q.length)
    {
        throw "M "+
              "real.length = "+real.length+
            ", imag.length = "+imag.length;
    }

    return this;
}


M.prototype.abs = function()
/* Return new matrix of same size with amplitudes (abs) of all cells. */
{
    var ret = new M( NaN, NaN, this.rows, this.cols );
    var len = this.v_i.length;
    var i;

    if (this.is_real)
        for( i=0; i<len; i++)
             ret.v_i[i] = Math.abs(this.v_i[i]);
    else
        for( i=0; i<len; i++)
             ret.v_i[i] = Math.sqrt( this.v_i[i]*this.v_i[i] + this.v_q[i]*this.v_q[i] );

    return ret;
}

M.prototype.T = function()
/* TODO. */
{
}

M.prototype.inv = function()
/* Inverts a matrix */
{
    if (this.rows!=this.cols) throw "Not a square matrix";
    if (this.isreal==0) throw "Cannot invert non-real matrix. Todo.";
    var ret = this.eye(this.rows);
    var tr  = this.rows|0;
    var copy= this.v_i.slice(0);
    for( var row = 0; row<tr; row++)
    {
        if ( copy[row+row*tr]==0 ) 
        {
            /* Search for non-zero energy */
            for( var nrow=row+1; nrow<tr; nrow++)
                if ( copy[row+nrow*tr]!=0 ) break;
            if ( nrow==tr )  throw "Inversion failed";
            /* Reverse 2 vectors... ugly. */
            for( var l=0; l<tr; l++)
            {
                var ex;
                var f=row+l*tr, t=nrow+l*tr;

                ex = ret.v_i[f];ret.v_i[f] = ret.v_i[t]; ret.v_i[t] = ex;
                ex = copy[f];   copy[f]    = copy[t];    copy[t]    = ex;
            }
        }
        var v = 1/copy[row+row*tr];
        // normalize
        for( var col=0; col<tr; col++)
        {
             copy    [row+col*tr]*=v;
             ret .v_i[row+col*tr]*=v;
        }

        for( var row2=0; row2<tr; row2++)
        {
            if (row==row2) continue;
            v = copy[row2+row*tr];
            for( var col=0; col<tr; col++)
            {
                copy    [row2+col*tr]-=copy    [row+col*tr]*v;
                ret .v_i[row2+col*tr]-=ret .v_i[row+col*tr]*v;
            }
        }
    }
    return ret;
}


M.prototype.rank_binary = function()
{
    var tr  = this.rows|0;
    var copy= this.v_i.slice(0);
    var rank= tr;

    for( var i=0; i<tr*tr; i++)
       if ((this.v_i[i]!=0)&&(this.v_i[i]!=1))
          throw "Non binary matrix at "+i;

    for( var row = 0; row<tr; row++)
    {
        if ( copy[row+row*tr]==0 ) 
        {
            /* Search for non-zero energy */
            for( var nrow=row+1; nrow<tr; nrow++)
                if ( copy[nrow+row*tr]!=0 ) break;
            if ( nrow==tr ) { continue; rank--; }

            /* Reverse 2 vectors... ugly. */
            for( var l=0; l<tr; l++)
            {
                var ex;
                var f=row+l*tr, t=nrow+l*tr;

                //ex = ret.v_i[f];ret.v_i[f] = ret.v_i[t]; ret.v_i[t] = ex;
                ex = copy[f];   copy[f]    = copy[t];    copy[t]    = ex;
            }
        }
        for( var row2=0; row2<tr; row2++)
        {
            if (row==row2) continue;
            if (copy[row2+row*tr]==0) continue;

            for( var col=0; col<tr; col++)
            {
                copy    [row2+col*tr]^=copy    [row+col*tr];
                //ret .v_i[row2+col*tr]^=ret .v_i[row+col*tr];
            }
        }
    }
    return copy;
}


M.prototype.inv_binary = function()
{
    if (this.rows!=this.cols) throw "Not a square matrix";
    if (this.isreal==0) throw "Cannot invert non-real matrix. Todo.";
    var ret = this.eye(this.rows);
    var tr  = this.rows|0;
    var copy= this.v_i.slice(0);
    for( var i=0; i<tr*tr; i++)
       if ((this.v_i[i]!=0)&&(this.v_i[i]!=1))
          throw "Non binary matrix at "+i;
    for( var row = 0; row<tr; row++)
    {
        if ( copy[row+row*tr]==0 ) 
        {
            /* Search for non-zero energy */
            for( var nrow=row+1; nrow<tr; nrow++)
                if ( copy[row+nrow*tr]!=0 ) break;
            if ( nrow==tr )  throw "Inversion failed at "+row;

            /* Reverse 2 vectors... ugly. */
            for( var l=0; l<tr; l++)
            {
                var ex;
                var f=row+l*tr, t=nrow+l*tr;

                ex = ret.v_i[f];ret.v_i[f] = ret.v_i[t]; ret.v_i[t] = ex;
                ex = copy[f];   copy[f]    = copy[t];    copy[t]    = ex;
            }
        }
        for( var row2=0; row2<tr; row2++)
        {
            if (row==row2) continue;
            if (copy[row2+row*tr]==0) continue;
//console("scrambling "+row+" to "+row2+" because "+copy[row2+row*tr]+" at "+(row2+row*tr)+"<BR>");
            for( var col=0; col<tr; col++)
            {
                copy    [row2+col*tr]^=copy    [row+col*tr];
                ret .v_i[row2+col*tr]^=ret .v_i[row+col*tr];
            }
        }
    }
    return ret;
}

M.prototype.bitp_inplace = function()
{
    if (this.isreal==0) throw "Bitc non-real matrix. Todo.";
    for( var i=0; i<this.v_i.length; i++)
        this.v_i[i] = bitp(this.v_i[i]);
    return this;
}

M.prototype.and_inplace = function(a)
{
    if (this.isreal==0) throw "Bitc non-real matrix. Todo.";
    for( var i=0; i<this.v_i.length; i++)
        this.v_i[i] &= a;
    return this;
}


M.prototype.normalize = function()
/* All complex samples magnitute is set to 1. */
{
    var ret = new M( NaN, NaN, this.rows, this.cols );

    if (this.isreal) { throw "Cannot normalize real array, that does not make sense"; return; }
    for( var i=0; i<this.v_i.length; i++)
    {
        var amp = Math.sqrt( this.v_i[i]*this.v_i[i] + this.v_q[i]* this.v_q[i] );
        if (amp==0) 
        {
             ret.v_i[i] = 1;
             ret.v_q[i] = 0;
        }
        else
        {
             ret.v_i[i] = this.v_i[i]/amp;
             ret.v_q[i] = this.v_q[i]/amp;
        }
    }
    return ret;
}

M.prototype.angle = function()
/* Returns new matrix with angles of all cells. Note: matrix has to be complex.  */
{
    var ret = new M( NaN, NaN, this.rows, this.cols );
    var len = this.v_i.length;

    for( var i=0; i<len; i++)
        ret.v_i[i] = Math.atan2( this.v_q[i], this.v_i[i] );

    return ret;
}

M.prototype.angleI = function()
{
    var len = this.v_i.length;

    for( i=0; i<len; i++)
    {
        this.v_i[i] = Math.atan2( this.v_q[i], this.v_i[i] );
    }

    return this;
}


M.prototype.slice_vector = function( from, to )
/* Slice from-to */
{
    var ret = new M( NaN, NaN, to-from, 1 );
    var i;

    ret.isreal = this.isreal;
    ret.v_i = this.v_i.slice( from, to );
    if (!this.isreal)
        ret.v_q = this.v_q.slice( from, to );

    return ret;
}



M.prototype.diff = function()
{
    var ret;
    if (this.cols==1) ret = new M( NaN, NaN, this.rows-1, this.cols ); else
    if (this.rows==1) ret = new M( NaN, NaN, this.rows, this.cols-1 ); else
    alert("Not implemented: diff on non-vector");
    //TODO: per column rather than global if non-1 dimension
    ret.v_i = v_diff( this.v_i );
    if (!this.isreal) 
        ret.v_q = v_diff( this.v_q );
    ret.isreal = this.isreal;
    return ret;
}


/*M.prototype.conjdiff = function()
{
    if (this.isreal)  return this.diff();
    if (this.cols!=1) throw "this.cols != 1 in conjdiff: not supported";

    var ret = new M( NaN, NaN, this.rows-1, this.cols );
    ret.isreal=0;
    ret.v_i=[];
    ret.v_q=[];
    for( var i=0; i<this.rows-1; i++)
    {
        var ar = this.v_i[i];
        var ai = this.v_q[i];
        var br = this.v_i[i+1];
        var bi = this.v_q[i+1];
        ret.v_i[i] = ar*br+ai*bi;
        ret.v_q[i] =-ar*bi+ai*br;
    }

    return ret;
} */


M.prototype.muldiff = function()
{
    var v_i=[], v_q=[];


    if ((this.isreal) && (this.cols==1))
    {
        var r=[];
        for( var i=0; i<this.rows-1; i++)
        {
            r.push( this.v_i[i] * this.v_i[i+1] );
        }
        return new M( r, NaN, this.rows-1, this.cols );
    }

    if ( ( this.cols>1 ) && ( this.rows>1) )
    {
        for( var col=0; col<this.cols; col++)
        {
            for( var row=0; row<this.rows-1; row++)
            {            
                var pi1= this.v_i[row+col*(this.rows-1+1)];
                var pq1= this.v_q[row+col*(this.rows-1+1)];
                var pi2= this.v_i[row+col*(this.rows-1+1)+1];
                var pq2= this.v_q[row+col*(this.rows-1+1)+1];

                v_i.push( pi1*pi2-pq1*pq2 );
                v_q.push( pi1*pq2+pi2*pq1 );
            }
        }
        return new M( v_i, v_q, this.rows-1, this.cols);
    }

    for( var row=0; row<this.v_i.length-1; row++)
    {            
        var pi1= this.v_i[row];
        var pq1= this.v_q[row];
        var pi2= this.v_i[row+1];
        var pq2= this.v_q[row+1];

        v_i.push( pi1*pi2-pq1*pq2 );
        v_q.push( pi1*pq2+pi2*pq1 );
    }

    if ( this.cols==1 ) return new M( v_i,v_q,this.rows-1,1 );
    if ( this.rows==1 ) return new M( v_i,v_q,1,this.cols-1 );
    throw "muldiff error";
}


M.prototype.exp = function()
{
    var ret = new M( NaN, NaN, this.rows, this.cols );
    var len = this.v_i.length;
    var i;

    ret.isreal = this.isreal;

    if (this.isreal)
        for( i=0; i<len; i++)
            ret.v_i[i] = Math.exp( this.v_i[i] );
    else
        for( i=0; i<len; i++)
        {
            var amp = Math.exp( this.v_i[i] );
            var angle = this.v_q[i];
            ret.v_i[i] = amp*Math.cos( angle );
            ret.v_q[i] = amp*Math.sin( angle );
        }
    return ret;
}


M.prototype.round = function()
/* Returns new matrix, from one which is given rounded to nearest integer. If matrix is complex, both real and imaginary are rounded. */
{
    var ret = new M( NaN, NaN, this.rows, this.cols );
    var len = this.v_i.length;
    var i;

    ret.isreal = this.isreal;
    for( i=0; i<len; i++)
        ret.v_i[i] = Math.round( this.v_i[i] );
    if (!this.isreal)
        for( i=0; i<len; i++)
            ret.v_q[i] = Math.round( this.v_q[i] );

    return ret;
}



M.prototype.mod = function( mv )
/* Returns new matrix, which is given one modulo mv. If matrix is complex, both real and imaginary are mod. */
{
    var ret = new M( NaN, NaN, this.rows, this.cols );
    var len = this.v_i.length;
    var i;

    ret.isreal = this.isreal;
    for( i=0; i<len; i++)
        ret.v_i[i] = this.v_i[i]%mv;
    if (!this.isreal)
        for( i=0; i<len; i++)
            ret.v_q[i] = this.v_q[i]%mv;

    return ret;
}


function floatToString(a)
{
    if (a==(a|0) ) return ""+a;
    return a.toPrecision(8);
}

M.prototype.describe = function( maxlen)
{
    var ret = "";
    ret = (this.isreal?"Real":"Complex")+" array RxC "+this.rows+" x "+this.cols+" ("+this.v_i.length+")= <table width=100%>";

    var rowlen = this.rows;
    var collen = this.cols;
    var mlen;
    if ( arguments.length == 0) mlen=8; else mlen=maxlen;
    if ( rowlen>mlen) rowlen=mlen;
    if ( collen>mlen) collen=mlen;

    for( var j=0; j<rowlen; j++)
    {
        ret+= "<tr><td>{</td>";
        for( var i=0; i<collen; i++)
        {
            if ( ( ( i==collen-1 ) && ( collen<this.cols ) )  || ( ( j==rowlen-1 ) && ( rowlen<this.rows ) ) ) { ret+="<TD>...</TD>"; continue; }
            if ( i>=this.v_i.length ) break;
            ret+= "<td>"+floatToString( this.v_i[i*this.rows+j] ); 
            var imag = this.v_q[i*this.rows+j];
            if ( imag>0 ) ret+=" +"+floatToString( imag )+"i"; else
            if ( imag<0 ) ret+=" "+floatToString( imag )+"i"; 
            
            ret+="</td>";
        }
        ret+= "<td>}</td></tr>\n";
    }
    return ret+"</table>";
}


M.prototype.select = function( selector )
/* Select from matrix. Select index = index within column. */
/*  selector can be: */
/*     a vector with column indexes starting from zero  */
/*     object: selector.cols, selector.rows */
/*     4 numbers: col_min, col_max, row_min, row_max  */
{
    if (M.isreal==0) throw "select: M is not a real matrix";

    if (Array.isArray(selector))
    {
        var v_i=[], v_q=[];
        for( var i=0; i<selector.length; i++)
        {
            v_i.push( this.v_i[selector[i]] );
            if (!this.isreal)
                v_q.push( this.v_q[selector[i]] ); 
        }
        if (this.isreal) return new M(v_i);
        return new M(v_i,v_q);
    }
    else if (arguments.length==4)
    {
        var col_min = arguments[0];
        var col_max = arguments[1];
        var row_min = arguments[2];
        var row_max = arguments[3];
        var ncol = col_max-col_min+1;
        var nrow = row_max-row_min+1;


        var ret = M.prototype.zeros( nrow, ncol );
        for( var col = col_min; col <= col_max; col++)
            for( var row = row_min; row <= row_max; row++)
            {
                var to  = (col-col_min)*nrow + (row-row_min);
                var from= col*this.rows+row;
                ret.v_i[ to ] =  this.v_i[ from ];
                if (!this.isreal)
                    ret.v_q[ to ] =  this.v_q[ from ];
            }
    }
    else
    {
        var ret = M.prototype.zeros( selector.rows, selector.cols );
        if (!(ret.isreal=this.isreal) ) ret.v_q = ret.v_i.slice(0);

        for( var col = 0; col < selector.cols; col++)
            for( var row = 0; row < selector.rows; row++)
            {
                var to  = col*selector.rows   + row;
                var from= col*this.rows+ selector.v_i[to];
                ret.v_i[ to ] =  this.v_i[ from ];
                if (!this.isreal)
                    ret.v_q[ to ] =  this.v_q[ from ];
            }
    }

    return ret;
}

M.prototype.row = function( row_selector )
/* Return matrix from given rows. */
{
    var ret = new M( [], NaN, 1, 1 );
    var rows_list = row_selector; // todo
    var cols = this.cols;
    var rows = rows_list.length;
    var i;

    if (!this.isreal) throw "M.prototype.row does not support imaginary matrices yet";

    for( var c=0; c<cols; c++)
    {
        i = c*this.rows;
        for( var r=0; r<rows; r++)
            ret.v_i.push( this.v_i[ i+rows_list[r] ] );
    }
    ret.rows = rows;
    ret.cols = cols;
    return ret;
}


M.prototype.col = function( col_selector )
/* Return column vector for given column of matrix. */
{
    var ret = new M( [], NaN, 1, 1 );
    ret.rows = this.rows;
    var shift = col_selector*this.rows;
    ret.v_i = this.v_i.slice( shift, shift+this.rows );//[ i+shift ];
    if ( !this.isreal )
    {
        ret.v_q = this.v_q.slice( shift, shift+this.rows );
        ret.isreal = 0;
    }
    return ret;
}

M.prototype.fft = function( )
/* Perform FFT of given matrix, column-by-column. If matrix is a vector, returns its fft. */
{
    return this._fft( 0 );
}

M.prototype.ifft = function( )
/* Perform IFFT of given matrix, column-by-column. If matrix is a vector, returns its ifft. */
{
    return this._fft( 1 );
}

M.prototype._fft = function( is_ifft)
{
    const collen = this.cols;
    const rowlen = this.rows;
    const v_i = [];
    const v_q = [];

    if ( ( this.rows === 1 ) || ( this.cols === 1 ) )
    {
        const ret = this.clone();
        return new M((is_ifft)?v_ifft( ret ):v_fft( ret ));
    }
    else
    {
        for( let i=0; i<collen; i++)
        {
            let col = (is_ifft)?v_ifft( this.col( i ) ):v_fft( this.col( i ) );
            for( let j=0; j<rowlen; j++)
            {
                v_i[ j+i*rowlen ] = col.v_i[j];
                v_q[ j+i*rowlen ] = col.v_q[j];
            }
        }
        return new M( v_i, v_q, this.rows, this.cols );
    }
}

M.prototype.max = function()
{
    if (this.isreal==0) throw "Matrix not real for MAX function";
    if ( (this.rows<2)||(this.cols<2)) throw "M.max on vector not implemented yet";
    var max_val = [];
    var max_pos = [];
    var i,j,p,cmax,cpos,cval;
    for( j=p=0; j<this.cols; j++)
    {
        for( i=0; i<this.rows; i++, p++)
        {
            cval=this.v_i[p];
            if ((cval>cmax)||(!i)) { cmax=cval; cpos=i; }
        }
        max_val.push(cmax);
        max_pos.push(cpos);
    }
    return new M( max_val.concat(max_pos), NaN, max_val.length, 2);
}


M.prototype.maxabs = function()
/* Calculated maxabs() of complex vector. Returns array with value and position */
{
    if (this.isreal==1) throw "Implement me: Matrix not real for MAXabs function";
    if ( (this.rows>1)&&(this.cols>1)) throw "M.maxabs not on vector";
    var i,p,cmax,cpos,cval;
    for( i=p=0; i<this.v_i.length; i++, p++)
    {
        cval=Math.sqrt( this.v_i[p]*this.v_i[p] + this.v_q[p]*this.v_q[p]  );
        if ((cval>cmax)||(!i)) { cmax=cval; cpos=i; }
    }
    
    return new M( [ cmax, cpos ], NaN, 1, 2);
}

M.prototype.min = function()
/* Perform min(vector) of given matrix using column-by-column order. Does not work on complex matrices. Not implemented on vector matrix. */
{
    if (this.isreal==0) throw "Matrix not real for MAX function";
    if ( (this.rows<2)||(this.cols<2)) throw "M.max on vector not implemented yet";
    var max_val = [];
    var max_pos = [];
    var i,j,p,cmax,cpos,cval;
    for( j=p=0; j<this.cols; j++)
    {
        for( i=0; i<this.rows; i++, p++)
        {
            cval=this.v_i[p];
            if ((cval>cmax)||(!i)) { cmax=cval; cpos=i; }
        }
        max_val.push(cmax);
        max_pos.push(cpos);
    }
    return new M( max_val.concat(max_pos), NaN, max_val.length, 2);
}


/* SIMPLE MATRIX CREATORS */

M.prototype.empty_cplx_vector = function()
{
    var thiz = new M();
    thiz.v_i = []; 
    thiz.v_q = []; 
    thiz.isreal=0;
    thiz.rows=0; 
    thiz.cols=1;
    return thiz;
}

M.prototype.zeros = function( rows, cols )
{
    var m_cols = cols;
    if ( arguments.length<1 )
        throw "M.prototype.zeros: no args!";
    if ( arguments.length<2 )
        m_cols = rows;
    return new M( NaN, NaN, rows, m_cols );
}

M.prototype.eye = function( size )
/* Returns eye matrix of given size. */
{
    if ( arguments.length==0 )
       throw "M.prototype.eye() no parameters";

    var thiz = new M( zeros(size*size), NaN, size, size );

    for( var i=0; i<size; i++)
        thiz.v_i[ i+i*size ] = 1;
    return thiz;
}


M.prototype.diag = function( arg1, arg2 )
{
    if ( arguments.length==0 )
       throw "M.prototype.diag() no parameters";

    if (Array.isArray( arg1 ) )
    {
        var size = arg1.length;
        var thiz = new M( NaN, NaN, size, size );

        for( var i=0; i<size; i++)
            thiz.v_i[ i+i*size ] = arg1[i];
        if (Array.isArray( arg2 ) )
        {
            for( var i=0; i<size; i++)
                thiz.v_q[ i+i*size ] = arg2[i];
            thiz.isreal = 0;
        }
        return thiz;
    }

    if (!isNaN( arg1 ) )
    {
        var thiz = new M( NaN, NaN, 1, 1 );
        thiz.v_i[ 0 ] = arg1;
        return thiz;
    }
    throw "M.prototype.diag(): undefined parameters";
}


M.prototype.rand = function( rows, cols, stddev )
/* Create real matrix of given size with normal distribution */
/* cols/stddev are optional parameters */
{
    var c = (arguments.length>1)?cols:1;
    var s = (arguments.length>2)?stddev:1;
    return new M( v_rand( rows*c, s ), NaN, rows, c );
}

M.prototype.rand_cplx = function( rows, cols, stddev )
/* Create complex matrix of given size, with its amplitude deviation = stddev */
/* cols/stddev are optional parameters */
{
    var c = (arguments.length>1)?cols:1;
    var s = ((arguments.length>2)?stddev:1)/Math.sqrt(2);
    return new M( v_rand( rows*c, s ), v_rand( rows*c, s ), rows, c );
}

M.prototype.ones = function( rows, cols, i, q )
/* Return ones matrix of size rows x cols. If i,q are not given, all cells are set to 1. */
{
    var exp_rows, exp_cols, exp_val_real=1, exp_val_imag = 0;
    if ( arguments.length>0 )
    {
        if (isNaN(rows)) throw "M.prototype.ones: size is NaN! "+size_rows;
        exp_rows=exp_cols=rows;
    }
    if ( arguments.length>1 )
    {
        if (isNaN(cols)) throw "M.prototype.ones: size_cols is NaN! "+size_cols;
        exp_cols=cols;
    }
    if ( arguments.length>2 )
    {
        exp_val_real = i;
    }
    if ( arguments.length>3 )
    {
        exp_val_imag = q;
    }
    var thiz = new M( NaN, NaN, exp_rows, exp_cols );
    thiz.v_i = ones( exp_rows*exp_cols, exp_val_real );
    if ( exp_val_imag )
    {
        thiz.v_q = ones( exp_rows*exp_cols, exp_val_imag );
        thiz.isreal = 0;
    }

    return thiz;
}

M.prototype.concat = function( x )
/* Concatenates 2 matrices to form one bigger, in a form of vector. */
{
    return new M( this.v_i.concat(x.v_i), this.v_q.concat(x.v_q) );
}

/* SPECIAL MATRICES */

M.prototype.walsh = function( N )
/* Return famous walsh matrix of size N. Note: N has to be power of 2. */
{
    var Nlog2 = Math.floor( Math.log2(N) );
    if ((1<<Nlog2)!=N) throw "walsh: "+N+" is NPOT";

    var thiz = M.prototype.ones(N);
    for( row = 0; row<N; row++)
        for( col = 0; col<N; col++)
            if (bitp(row&col))
                thiz.v_i[ row+col*N ] = -1;
    return thiz;
}


M.prototype.chirp = function ( N, step, shift )
/* chirp column vector.            2  */
/*                     step * i * k   */
/*            x(k) = e                */
{
    var vi_out = [];
    var vq_out = [];
    var thiz = new M();
    var _shift =0;
    if ( arguments.length>2 ) _shift=shift;


    for( var n=0; n<N; n++)
    {
        var rn = (n+_shift)%N;
        var angle = step*rn*rn;
        var ci  = Math.cos( angle );
        var cq  = Math.sin( angle );
        vi_out.push( ci );
        vq_out.push( cq );
    }
    thiz.v_i = vi_out;
    thiz.v_q = vq_out;
    thiz.cols = N;
    thiz.rows = 1;
    thiz.isreal=0;
    
    return thiz;
}


M.prototype.create = function ( rows, cols, func_real, func_imag )
{
    var thiz = new M(NaN, NaN, rows, cols ), row, col;

    if ( arguments.length == 3 )
    {
        eval(
           " var t=function(thiz) {"+
           " var row, col; "+
           " for( row = 0; row<thiz.rows; row++) "+
           "     for( col = 0; col<thiz.cols; col++) "+
           "     { "+ 
           "         thiz.v_i[ row + col*thiz.rows ] = ("+func_real+");"+
           "     } "+
           " return thiz;"+
           "}");
        return t(thiz);
    }
    else if ( arguments.length == 4 )
    {
        thiz.v_q = thiz.v_i.slice(0);
        thiz.isreal = 0;
/*        for( row = 0; row<thiz.rows; row++)
            for( col = 0; col<thiz.cols; col++)
            {
                 thiz.v_i[ row + col*thiz.rows ] = eval(func_real);
                 thiz.v_q[ row + col*thiz.rows ] = eval(func_imag);
            }*/
        /* Below code works MUCH faster - only one eval() call */
        eval(
           " var t=function(thiz) {"+
           " var row, col; "+
           " for( row = 0; row<thiz.rows; row++) "+
           "     for( col = 0; col<thiz.cols; col++) "+
           "     { "+ 
           "         thiz.v_i[ row + col*thiz.rows ] = ("+func_real+");"+
           "         thiz.v_q[ row + col*thiz.rows ] = ("+func_imag+");"+
           "     } "+
           " return thiz;"+
           "}");
        return t(thiz);
    }
    return thiz;
}

M.prototype.create_angle = function( rows, cols, func_angle)
{
     return M.prototype.create( rows, cols, "Math.cos("+func_angle+")", "Math.sin("+func_angle+")" );
}


M.prototype.mul_inplace = function( op )
{
    if ( !isNaN(op) ) // constant
    {
        var size = this.rows * this.cols;
        for( var i=0; i<size; i++)
        {
            this.v_i[i]*=op;
            this.v_q[i]*=op;
        }
    }
    else 
        throw "mul_inplace not implemented for op:"+op;
    return this;
}

M.prototype.clone = function(  )
/* Return clone of current matrix. */
{
    var ret = new M( NaN, NaN, this.rows, this.cols );
    ret.v_i = this.v_i.slice(0);
    ret.v_q = this.v_q.slice(0);
    ret.isreal = this.isreal;
    return ret;
}

M.prototype.reshape = function ( nrows, ncols )
/* Inplace( nrows,ncols) */
{
    if ( nrows*ncols != this.rows*this.cols )
    {
        throw "Reshape: "+ this.rows +"x"+this.cols +" not possible to " +nrows+"x"+ncols;
        return;
    }
    this.rows = nrows;
    this.cols = ncols;
    return this;
}

M.prototype.extend_private = function( inp, row0, col0, row_s, col_s )
{
    var ret = zeros( row_s*col_s );
    var r,c;
    for( c=0; c<this.cols; c++)
        for( r=0; r<this.rows; r++)
            ret[ r+row0+c*(row_s+col0) ] = inp[ r+c*this.rows ];
    return ret;
}

M.prototype.resize = function( row0, col0, row_s, col_s )
/* Resize array. Unused spaced are filled with zeroes. */
{
    this.v_i = this.extend_private( this.v_i, row0, col0, row_s, col_s );
    if (!this.isreal)
        this.v_q = this.extend_private( this.v_q, row0, col0, row_s, col_s );

    this.rows = row_s;
    this.cols = col_s;
    return this;
}

M.prototype.real = function ()
/* Return _vector_ with REAL */
{
    return this.v_i;
} 

// should return M?
M.prototype.imag = function ()
{
    if (this.isreal) return zeros( this.rows*this.cols );

    return this.v_i;
} 


M.prototype.toRgImage = function()
{
    var len = this.rows*this.cols;
    var ret = new Float32Array(this.rows*this.cols*4);
    var i;
    for( i=0; i<len; i++)
        ret[4*i]=this.v_i[i];
    if (!this.isreal)
        for( i=0; i<len; i++)
            ret[4*i+1]=this.v_q[i];
    return ret;
}


M.prototype.fromRgImage = function( rg_image )
{
    var len = rg_image.length;
    var dim = Math.floor( Math.sqrt(len/4) );
    if ( 4*dim*dim !=len ) throw "fromRgImage: incorrect length "+len;

    var thiz = new M( [], [], 1, 1 );
    thiz.rows=thiz.cols = dim;
    len/=4;
    for( var i=0; i<len; i++)
    {
        thiz.v_i[ i ] = rg_image[ 4*i   ];
        thiz.v_q[ i ] = rg_image[ 4*i+1 ];
    }
    thiz.isreal=0;
    return thiz;
}

M.prototype.gfft = function ()
{
    if (this.rows!=this.cols) throw "Matrix is not square";
    var Nlog2 = Math.floor( Math.log2(this.rows) );
    if ( (1<<Nlog2) != this.rows ) throw "Matrix is NPOT";
    var g = new Gpu_fft(1<<Nlog2);
    var out_pixels = g.calculate( this.toRgImage() );
    return M.prototype.fromRgImage( out_pixels );
}


M.prototype.add = function( a )
// add is inplace.
{
    if ( !isNaN( a ) ) { // a is a number.
        var len = this.v_i.length;
        for( var i=0; i<len; i++) this.v_i[i]+=a;
        return this;
    }
    if (typeof a === "object")
    {
        if ( ( a.hasOwnProperty("v_i") ) &&  ( a.hasOwnProperty("v_q") ) )
        {
            if ( ( a.v_i.length!=this.v_i.length ) || ( a.rows!=this.rows ) )
                throw "Cannot add matrices with different size";
            var len = this.v_i.length;
            for( var i=0; i<len; i++) this.v_i[i]+=a.v_i[i];
            if (( this.isreal == 1 ) && ( a.isreal == 0 ))
                this.v_q = a.v_q.clone(0);
            else
                if (( this.isreal == 0 ) && ( a.isreal == 0 ))
                    for( var i=0; i<len; i++) this.v_q[i]+=a.v_q[i];
            return this;
        }
    }
    throw "Unsupported parameter type";
}

M.prototype.sub = function( a )
{
    var ret = new M( NaN, NaN, this.rows, this.cols );

    if ( !isNaN( a ) ) { // a is a number.
        var len = this.v_i.length;
        for( var i=0; i<len; i++) ret.v_i[i]=this.v_i[i]-a;
        if (!(ret.isreal=this.isreal))
            ret.v_q = this.v_q.slice(0);
        return ret;
    }
    if (typeof a === "object")
    {
        if ( a.hasOwnProperty("v_i") )
        {
            var len = this.v_i.length;
            if ( ( a.v_i.length!=this.v_i.length ) || ( a.rows!=this.rows ) )
            {
                if ( a.v_i.length==1 ) // sub constant, that's ok
                {
                    for( var i=0; i<len; i++) ret.v_i[i]=this.v_i[i]-a.v_i[0];
                    if ( ( a.isreal==0 ) && ( this.isreal==0 ) )
                        for( var i=0; i<len; i++) ret.v_q[i]=this.v_q[i]-a.v_q[0];
                    else if ( a.isreal==0 ) 
                        for( var i=0; i<len; i++) ret.v_q[i]=-a.v_q[0];
                    return ret;
                }
                else
                    throw "Cannot sub matrices with different size";
            }
            for( var i=0; i<len; i++) ret.v_i[i]=this.v_i[i]-a.v_i[i];
            ret.isreal=this.isreal;
            if (( this.isreal == 1 ) && ( a.isreal == 0 ))
            {
                 for( var i=0; i<len; i++) ret.v_q[a]=-a.v_q[i];
                 ret.isreal=0;
            }
            else
                if (( this.isreal == 0 ) && ( a.isreal == 0 ))
                    for( var i=0; i<len; i++) ret.v_q[i]=this.v_q[i]-a.v_q[i];
            return ret;
        }
    }
    throw "Unsupported parameter type";
}


M.prototype.dotinv = function()
{
    if ( ( typeof this === "object") && ( this.hasOwnProperty("v_i") ) &&  ( this.hasOwnProperty("v_q") ) ) 
    {
        var ri=[],rq=[];
        for( var i=0; i<this.v_i.length; i++)
        {
            var re = this.v_i[i];
            var im = this.v_q[i];
            var sq = re*re+im*im;
            ri.push( re/sq );
            rq.push(-im/sq );
        }
        return new M( ri, rq, this.rows, this.cols );
    }
    throw "dotinv: not implemented"+ ( typeof this === "object") +","+ ( this.hasOwnProperty("v_i") ) +","+ ( this.hasOwnProperty("v_q") );
}

M.prototype.extend_vector = function( nlen )
{
    if ( ( typeof this === "object") && ( this.hasOwnProperty("v_i") ) &&  ( this.hasOwnProperty("v_q") ) ) 
    {
        var ri=[],rq=[];
        for( var j=0; j<nlen; j++)
            for( var i=0; i<this.v_i.length; i++)
            {
                ri.push( this.v_i[i]);
                rq.push( this.v_q[i]);
            }
       if (this.rows==1)
           return new M( ri, rq, nlen, this.cols );
       if (this.cols==1)
           return new M( ri, rq, this.rows, nlen );
       throw "extend_vector: not a vector";
    }
    throw "extend_vector: not implemented"+ ( typeof this === "object") +","+ ( this.hasOwnProperty("v_i") ) +","+ ( this.hasOwnProperty("v_q") );
}

M.prototype.dotdiv = function( b )
{
    if ( ( typeof b === "object") && ( b.hasOwnProperty("v_i") ) &&  ( b.hasOwnProperty("v_q") ) ) 
    {
        if ( b.isreal ) 
        {
            if ( ( b.cols!=this.cols ) || ( b.rows!=this.rows ) )
                throw "dotdiv: matrix sizes does not match: "+b.cols+"x"+b.rows+":"+this.cols+"x"+this.rows;
            var ri=[],rq=[];
            for( var i=0; i<this.v_i.length; i++)
            {
                ri.push( this.v_i[i]/b.v_i[i] );
                rq.push( this.v_q[i]/b.v_i[i] );
            }
            return new M( ri, rq, this.rows, this.cols );
        }

        throw "dotdiv: not implemented when b.isreal==1";

    }
    throw "dotdiv: not implemented";
}

M.prototype.dotmul = function( b )
{
    if ( ( typeof b === "object") && ( b.hasOwnProperty("v_i") ) &&  ( b.hasOwnProperty("v_q") ) ) 
    {
         /* simple multiply: every matrix have same dimensions, multiply one-by-one */
         if ( (this.rows==b.rows) && (this.cols==b.cols) )
         {
             var ret = b.clone();

             if (( b.isreal==1 ) && ( this.isreal==0 ))
             {
                 ret.isreal=0; ret.v_i=[]; ret.v_q=[];
                 for( var k=0; k<this.v_i.length; k++)
                 {
                     ret.v_i[k] = b.v_i[k]*this.v_i[k];
                     ret.v_q[k] = b.v_i[k]*this.v_q[k];
                 }
                 return ret;
             } 
             else if ( ( b.isreal==0 ) && ( this.isreal==0 ) )
             {
                 for( var k=0; k<this.v_i.length; k++)
                 {
                     ret.v_i[k] = b.v_i[k]*this.v_i[k] - b.v_q[k]*this.v_q[k];
                     ret.v_q[k] = b.v_i[k]*this.v_q[k] + b.v_q[k]*this.v_i[k];
                 }
                 return ret;
             }
             else if ( ( b.isreal==1 ) && ( this.isreal==1 ) )
             {
                 for( var k=0; k<this.v_i.length; k++)
                 {
                     ret.v_i[k] = b.v_i[k]*this.v_i[k];
                 }
                 return ret;
             }
             throw "dotmul not implmented";
         }

         /* We have one row */
         if ( (this.rows==1) && (this.cols==b.rows) ) 
         {
             var ar = this.rows|0;
             var ac = this.cols|0;
             var br =    b.rows|0;
             var bc =    b.cols|0;
             var ret = b.clone();

             for( var i=0; i<bc; i++)
                 for( var j=0; j<br; j++)
                 {
                     var k=j+i*br;

                     ret.v_i[k] = b.v_i[k]*this.v_i[j] - b.v_q[k]*this.v_q[j];
                     ret.v_q[k] = b.v_i[k]*this.v_q[j] + b.v_q[k]*this.v_i[j];
                 }
             return ret;
         }

         /* We have one col */
         if ( (b.cols==1) && (this.rows==b.rows) ) 
         {
             var ar = this.rows|0;
             var ac = this.cols|0;
             var br =    b.rows|0;
             var bc =    b.cols|0;
             var ret = b.clone();

             for( var i=0; i<bc; i++)
                 for( var j=0; j<br; j++)
                 {
                     var k=j+i*br;

                     ret.v_i[k] = b.v_i[k]*this.v_i[j] - b.v_q[k]*this.v_q[j];
                     ret.v_q[k] = b.v_i[k]*this.v_q[j] + b.v_q[k]*this.v_i[j];
                 }
             return ret;
         }

         /* We have one row */
/*         if ( (this.rows==1) && (this.cols==b.rows) ) 
         {
             var ar = this.rows|0;
             var ac = this.cols|0;
             var br =    b.rows|0;
             var bc =    b.cols|0;
             var ret = b.clone();

             for( var i=0; i<bc; i++)
                 for( var j=0; j<br; j++)
                 {
                     var k=j+i*br;

                     ret.v_i[k] = b.v_i[k]*this.v_i[j] - b.v_q[k]*this.v_q[j];
                     ret.v_q[k] = b.v_i[k]*this.v_q[j] + b.v_q[k]*this.v_i[j];
                 }
             return ret;
         }*/

    }
    throw "dotmul: not implemented: "+this.rows+"x"+this.cols+".*"+b.rows+"x"+b.cols;

    return NaN;
}


M.prototype.select_columns = function( from, step, to )
{
     var v_i=[];
     var v_q=[];
     var colcount=0;

     if (arguments.length==2) to=this.cols-1;
     for( var col=from; col<=to; col+=step,colcount++)
         for( var row=0; row<this.rows; row++)
         {
             var k=row+col*this.rows;
             v_i.push( this.v_i[k] );
             v_q.push( this.v_q[k] );
         }
    return new M( v_i, v_q, this.rows, colcount);
}

M.prototype.mul = function ( b )
{
    if ( ( typeof b === "object") && 
         ( b.hasOwnProperty("v_i") ) &&  
         ( b.hasOwnProperty("v_q") ) ) 
    {
        // A(rows1,cols1)*B(rows2=cols1,cols2) = C(rows1,cols2)
        if ( this.cols == b.rows )
        {
            var ret = new M( NaN, NaN, this.rows, b.cols );
            var ar = this.rows|0;
            var ac = this.cols|0;
            var br =    b.rows|0;
            var bc =    b.cols|0;
            var i=0, j=0; k=0;

            if ( ( this.isreal==0 ) && ( b.isreal == 0 ) )
            {
                for( var j=0; j<ar; j++)
                    for( var k=0; k<bc; k++)
                    {
                        var accum_i = 0;
                        var accum_q = 0;
                        var aindex = j|0;   // row from matrix A, step ++
                        var bindex = k*br;          // column from matrix B, step += bc
                        for( var i=0; i<ac; i++, aindex+=ar, bindex++ )
                        {
                            accum_i += this.v_i[aindex]*b.v_i[bindex] - this.v_q[aindex]*b.v_q[bindex];
                            accum_q += this.v_i[aindex]*b.v_q[bindex] + this.v_q[aindex]*b.v_i[bindex];
                        }
                        ret.v_i[j+k*ar] = accum_i;
                        ret.v_q[j+k*ar] = accum_q;
                    }
                ret.isreal = 0;
                return ret;
            }

            if ( ( this.isreal==1 ) && ( b.isreal == 0 ) )
            {
                for( var j=0; j<ar; j++)
                    for( var k=0; k<bc; k++)
                    {
                        var accum_i = 0;
                        var accum_q = 0;
                        var aindex = j|0;   // row from matrix A, step ++
                        var bindex = k*br;          // column from matrix B, step += bc
                        for( var i=0; i<ac; i++, aindex+=ar, bindex++ )
                        {
                            accum_i += this.v_i[aindex]*b.v_i[bindex];
                            accum_q += this.v_i[aindex]*b.v_q[bindex];
                        }
                        ret.v_i[j+k*ar] = accum_i;
                        ret.v_q[j+k*ar] = accum_q;
                    }
                ret.isreal = 0;
                return ret;
            }
            if ( ( this.isreal==0 ) && ( b.isreal == 1 ) )
            {
                for( var j=0; j<ar; j++)
                    for( var k=0; k<bc; k++)
                    {
                        var accum_i = 0;
                        var accum_q = 0;
                        var aindex = j|0;   // row from matrix A, step ++
                        var bindex = k*br;          // column from matrix B, step += bc
                        for( var i=0; i<ac; i++, aindex+=ar, bindex++ )
                        {
                            accum_i += this.v_i[aindex]*b.v_i[bindex] ;
                            accum_q += this.v_q[aindex]*b.v_i[bindex];
                        }
                        ret.v_i[j+k*ar] = accum_i;
                        ret.v_q[j+k*ar] = accum_q;
                    }
                ret.isreal = 0;
                return ret;
            }
            if ( ( this.isreal==1 ) && ( b.isreal == 1 ) )
            {
                for( var j=0; j<ar; j++)
                    for( var k=0; k<bc; k++)
                    {
                        var accum_i = 0;
                        var aindex = j|0;   // row from matrix A, step ++
                        var bindex = k*br;          // column from matrix B, step += bc
                        for( var i=0; i<ac; i++, aindex+=ar, bindex++ )
                        {
                            accum_i += this.v_i[aindex]*b.v_i[bindex] ;
                        }
                        ret.v_i[j+k*ar] = accum_i;
                    }
                ret.isreal = 1;
                return ret;
            }
            throw "M.prototype.mul lack of implementation: "+this.isreal+","+b.isreal;
        }
        /* dot-mul 2 vectors, only cmplx*cmplx at the moment */
        if ( ( this.cols == b.cols ) && ( this.rows==1 ) && ( b.rows == 1 ) )
        {
            var ret = new M( NaN, NaN, 1, b.cols );
            var ac = this.cols|0;
            for( var j=0; j<ac; j++)
            {
                ret.v_i[j] = this.v_i[j] * b.v_i[j] - this.v_q[j] * b.v_q[j];
                ret.v_q[j] = this.v_i[j] * b.v_q[j] + this.v_q[j] * b.v_i[j];
            }
            ret.isreal = 0;
            return ret;
        }
    }
    if (!isNaN(b) && (arguments.length==1)) /* b is a number. */
    {
         var ret = new M( NaN, NaN, this.rows, this.cols );
         for( var i=this.v_i.length-1; i>=0; i--)
             ret.v_i[i] = this.v_i[i]*b;
         if (!this.isreal)
             for( var i=this.v_i.length-1; i>=0; i--)
                 ret.v_q[i] = this.v_q[i]*b;
         ret.isreal = this.isreal;
         return ret;
    }
    if (!isNaN(b) && (arguments.length==2)) /* b is a number. */
    {
         var ret = new M( NaN, NaN, this.rows, this.cols );
         var c=arguments[1];

         if (this.isreal) throw "mul not implemented";

         for( var i=this.v_i.length-1; i>=0; i--)
         {
             ret.v_i[i] = this.v_i[i]*b - this.v_q[i]*c;
             ret.v_q[i] = this.v_q[i]*b + this.v_i[i]*c;
         }
         ret.isreal = this.isreal;
         return ret;
    }
    throw "M.prototype.mul lack of implementation: "+this.isreal+","+b.isreal+","+this.rows+"x"+this.cols+","+b.rows+"x"+b.cols;
}


M.prototype.sum = function()
/* Sum elements of array in column. If only one col or row: sum all */
{
    var v_i=[], v_q=[];

    if ( ( this.cols>1 ) && ( this.rows>1) )
    {
        for( var col=0; col<this.cols; col++)
        {
            var pi=0, pq=0;
            for( var row=0; row<this.rows; row++)
            {
                pi+=this.v_i[row+col*this.rows];
                pq+=this.v_q[row+col*this.rows];
            }
            v_i.push( pi );
            v_q.push( pq );
        }
        return new M( v_i, v_q, v_i.length, 1);
    }

    var pi=0, pq=0;
    for( var row=0; row<this.v_i.length; row++)
    {
        pi+=this.v_i[row];
        pq+=this.v_q[row];
    }
    return new M( [pi],[pq] );
}


M.prototype.cumsum = function()
/* cumsum elements of array in column. If only one col or row: cumsum all */
{
    var v_i=[], v_q=[];

    if ( ( this.cols>1 ) && ( this.rows>1) )
    {
        for( var col=0; col<this.cols; col++)
        {
            var pi=0, pq=0;
            for( var row=0; row<this.rows; row++)
            {
                pi+=this.v_i[row+col*this.rows];
                pq+=this.v_q[row+col*this.rows];
                v_i.push( pi );
                v_q.push( pq );
            }
        }
    }
    else
    {
        var pi=0, pq=0;
        for( var row=0; row<this.v_i.length; row++)
        {
            pi+=this.v_i[row];
            pq+=this.v_q[row];
            v_i.push( pi );
            v_q.push( pq );

        }
    }
    return new M( v_i, this.isreal?NaN:v_q, this.rows, this.cols );
}




M.prototype.rms = function()
/* Sum elements of array in column. */
{
    var v_i=[], v_q=[];

    if ( ( this.cols>1 ) && ( this.rows>1) )
    {
        for( var col=0; col<this.cols; col++)
        {
            var pi=0;
            for( var row=0; row<this.rows; row++)
            {
                pi+=this.v_i[row+col*this.rows]*this.v_i[row+col*this.rows];
                pi+=this.v_q[row+col*this.rows]*this.v_q[row+col*this.rows];
            }
            v_i.push( Math.sqrt(pi/this.rows) );
        }
        return new M( v_i, NaN, v_i.length, 1);
    }

    return v_rms( this.v_i, this.v_q );
}

M.prototype.papr = function()
/* Calculated papr on complex vector, return the number: papr */
{
    if ( ( this.cols>1 ) && ( this.rows>1) )
        throw "papr is not implemented on array";
    if ( this.isreal==1 )
        throw "papr is not implemented on real vector";
    var rms = v_rms( this.v_i, this.v_q );
    var vmax= this.maxabs().v_i[0];
    return vmax/rms;
}

/* Diff elements of array in column. aka DEROT */
M.prototype.conjdiff = function()
{
    var v_i=[], v_q=[];

    if ( ( this.cols>1 ) && ( this.rows>1) )
    {
        for( var col=0; col<this.cols; col++)
        {
            for( var row=0; row<this.rows-1; row++)
            {            
                var pi1= this.v_i[row+col*(this.rows-1+1)];
                var pq1= this.v_q[row+col*(this.rows-1+1)];
                var pi2= this.v_i[row+col*(this.rows-1+1)+1];
                var pq2=-this.v_q[row+col*(this.rows-1+1)+1];

                v_i.push( pi1*pi2-pq1*pq2 );
                v_q.push( pi1*pq2+pi2*pq1 );
            }
        }
        return new M( v_i, v_q, this.rows-1, this.cols);
    }

    for( var row=0; row<this.v_i.length-1; row++)
    {            
        var pi1= this.v_i[row];
        var pq1= this.v_q[row];
        var pi2= this.v_i[row+1];
        var pq2=-this.v_q[row+1];

        v_i.push( pi1*pi2-pq1*pq2 );
        v_q.push( pi1*pq2+pi2*pq1 );
    }

    if ( this.cols==1 ) return new M( v_i,v_q,this.rows-1,1 );
    if ( this.rows==1 ) return new M( v_i,v_q,1,this.cols-1 );
    throw "conjdiff error";
}

M.prototype.conj = function()
/* Return new matrix with negated imaginary component */
{
    var ret = this.clone();         
    for( var i=0; i<ret.v_q.length; i++)
       ret.v_q[i]*=-1;
    return ret;
}

M.prototype.mean = function()
{
    if (( this.isreal==1 ) && ((this.cols==1)||(this.rows==1))) return new M( [v_mean(this.v_i)] );
    if (( this.isreal==0 ) && ((this.cols==1)||(this.rows==1))) return new M( [v_mean(this.v_i)], [v_mean(this.v_q)] );
    if ( this.isreal==1 ) {
        
    }
    if ( ( this.cols>1 ) && ( this.rows>1) )
    {
        var v_i=[], v_q=[];
        for( var col=0; col<this.cols; col++)
        {
            var pi=0, pq=0;
            for( var row=0; row<this.rows; row++)
            {
                pi+=this.v_i[row+col*this.rows];
                pq+=this.v_q[row+col*this.rows];
            }
            v_i.push( pi/this.rows );
            v_q.push( pq/this.rows );
        }
        return new M( v_i, v_q, v_i.length, 1);
    }

    throw "Mean on non 1xdiv matrix. implement me";
}

M.prototype.transpose_vector = function( v, r,c)
{
    var ret=[];

    for( var j=0; j<r; j++)
        for( var i=0; i<c; i++)
            ret.push( v [ i*r+j ] );
    return ret;
}

M.prototype.transpose_inplace = function()
{
    var rows = this.rows;
    var cols = this.cols;
    
    if ((rows!=1) && (cols!=1))
    {
        this.v_i = this.transpose_vector( this.v_i, rows, cols );
        if (this.isreal==0 )
            this.v_q = this.transpose_vector( this.v_q, rows, cols );
    } 

    this.rows = cols;
    this.cols = rows;

    return this;
}


M.prototype.t = function()
/* Transposition */
{
    var rows = this.rows;
    var cols = this.cols;
    var ret = this.clone();
    
    if ((rows!=1) && (cols!=1))
    {
        ret.v_i = ret.transpose_vector( ret.v_i, rows, cols );
        if (ret.isreal==0 )
            ret.v_q = ret.transpose_vector( ret.v_q, rows, cols );
    } 

    ret.rows = cols;
    ret.cols = rows;

    return ret;
}


M.prototype.slice_inplace = function( start, stop )
/* Select subarray from array */
{
    if ( stop>this.v_i.length )
    {
        var vi=[], vq=[];
        var pos = start;
        var vlen = this.v_i.length;
        while( pos<stop )
        {
            var block_start = pos%vlen;
            var todo = stop-pos;
            if (block_start+todo>vlen) todo = vlen-block_start;
            vi = vi.concat( this.v_i.slice(block_start,block_start+todo) );
            if ( !this.isreal )
                vq = vq.concat( this.v_q.slice(block_start,block_start+todo) );
            pos+=todo;
        }
        this.v_i=vi;
        if ( !this.isreal )
            this.v_q=vq;
    }
    else
    {
        this.v_i = this.v_i.slice( start, stop );
        if ( !this.isreal )
            this.v_q = this.v_q.slice( start, stop );
    }
    this.rows = 1;
    this.cols = this.v_i.length;
    return this;
}

M.prototype.plot = function()
/* Show matrix graph in console window */
{
     v_plot( this );
}

M.prototype.plot3d = function()
/* Show matrix graph in console window */
{
     v_plot3d( this.v_i, this.rows );
}


M.prototype.decimate = function( step, shift )
/* Decimate vector. Second argument is optional (defaults to 0) */
{
     var _shift=0; 
     if (arguments.length>1) _shift=shift;
     if (!((this.cols==1)||(this.rows==1))) throw "decimate not implemented for non-vector matrixes";
     if (!this.isreal)
         return new M( v_select( this.v_i, _shift, step, this.v_i.length), v_select( this.v_q, _shift, step, this.v_q.length) );
         return new M( v_select( this.v_i, _shift, step, this.v_i.length) );
}


M.prototype.concat_inplace = function(a)
{
    if (a.isreal!=this.isreal) throw "concat_inplace: real vs unreal";
    this.v_i = this.v_i.concat(a.v_i);
    if (!this.isreal)
        this.v_q = this.v_q.concat(a.v_q);
    this.rows = 1;
    this.cols = this.v_i.length;
    return this;
}


M.prototype.toCHex = function ()
{
    retval = "";
    if ( this.isreal ) 
    {
        for( var i=0; i<this.v_i.length; i++)
        {
            if ((i&15)==0) retval += "\n    ";
            retval += "0x"+itoc_8bit_unsigned( this.v_i[i] );
            if ( i<this.v_i.length-1 ) retval+=", ";
        }
    }
    else
    {
        for( var i=0; i<this.v_i.length; i++)
        {
            if ((i&7)==0) retval += "\n    ";
            retval += "0x"+itoc_16bit_signed( this.v_i[i] ) +  itoc_16bit_signed( this.v_q[i] ) ;
            if ( i<this.v_i.length-1 ) retval+=", ";
        }
    }
    return retval;
}

M.prototype.toMatlab = function()
{
    var retval = "[";

    for( var c=0; c<this.cols; c++)
    {
        for( var r=0; r<this.rows; r++)
        {
            var i = r*this.cols+c;
            retval += this.v_i[i];
            if (!this.isreal)
            {
                var v=this.v_q[i];
                if ( v<0 ) retval += v+"i";
                else if ( v>0 ) retval += "+"+v+"i";
            }
            if ( r<this.rows-1 ) retval += ", ";
        }
        if ( c<this.cols-1 ) retval += ";\r\n";
    }
    return retval+"]";
}

M.prototype.toArray = function()
{
    if (!this.isreal) throw "toArray: not a real matrix";
    var result=[],i=0;
    for( var c=0; c<this.cols; c++)
    {
        var v=[];
        for( var r=0; r<this.rows; r++)
            v.push( this.v_i[i++] );
        result.push(v);
    }
    return result;
}

M.prototype.save = function( filename, format )
/* Save (download) a matrix */
{
    switch( format )
    {
        case "chex": download( filename, this.toCHex() ); break;
        case "matlab": 
        default: download( filename, this.toMatlab() ); break;
    }   
}

function M_abs( a )
{
    if ( !isNaN( a ) ) { // a is a number.
        return Math.abs(a);
    }
    if ( Array.isArray(a) ) { // a is an array of real values.
        var i;
        var ret = [];
        for( i=0; i<a.length; i++)
            ret.push( Math.abs(a[i]));
        return ret;
    }
    if (typeof a === "object")
    {
        if ( ( a.hasOwnProperty("v_i") ) &&  ( a.hasOwnProperty("v_q") ) )
        {
            var i;
            var ret = new M( NaN, NaN, a.rows, a.cols );
            for( i=0; i<ret.v_i.length; i++)
            {
                ret.v_i[i] = Math.sqrt(a.v_i[i]*a.v_i[i]+a.v_q[i]*a.v_q[i]);
            }
            ret.isreal = 1;
            return ret;
        }
    }
    throw "M_abs: Unknown object type: " + (typeof a);
}


function M_angle( a )
{
    if ( !isNaN( a ) ) { // a is a number.
        return 0;
    }
    if ( Array.isArray(a) ) { // a is an array of real values.
        var i;
        var ret = [];
        for( i=0; i<a.length; i++)
            ret.push( 0 );
        return ret;
    }
    if (typeof a === "object")
    {
        if ( ( a.hasOwnProperty("v_i") ) &&  ( a.hasOwnProperty("v_q") ) )
        {
            var i;
            var ret = new M( NaN, NaN, a.rows, a.cols );
            for( i=0; i<ret.v_i.length; i++)
            {
                ret.v_i[i] = Math.atan2(a.v_q[i],a.v_i[i]);
                ret.v_q[i] = 0;
            }
            ret.isreal = 1;
            return ret;
        }
    }
    throw "M_angle: Unknown object type: " + (typeof a);
}


function M_round( a )
{
    if ( !isNaN( a ) ) { // a is a number.
        return Math.round(a);
    }
    if ( Array.isArray(a) ) { // a is an array of real values.
        var i;
        var ret = [];
        for( i=0; i<a.length; i++)
            ret.push( Math.round(a[i]) );
        return ret;
    }
    if (typeof a === "object")
    {
        if ( ( a.hasOwnProperty("v_i") ) &&  ( a.hasOwnProperty("v_q") ) )
        {
            var i;
            var ret = new M( NaN, NaN, a.rows, a.cols );
            for( i=0; i<ret.v_i.length; i++)
            {
                ret.v_i[i] = Math.round(a.v_i[i]);
                ret.v_q[i] = Math.round(a.v_q[i]);
            }
            ret.isreal = a.isreal;
            return ret;
        }
    }
    throw "M_round: Unknown object type: " + (typeof a);
}

// mul is outplace.
function M_mul( a, b)
{
    if ( ( !isNaN( a ) ) && (!isNaN( b ) ) ) { // a and b are numbers.
        return a*b;
    }
    if ( ( Array.isArray(a) ) && (!isNaN( b ) ) ) { // a is an array of real values, b is a number
        var ret = [];
        for( var i=0; i<a.length; i++)
            ret.push( a[i]*b );
        return ret;
    }
    if ( ( Array.isArray(b) ) && (!isNaN( a ) ) ) { // b is an array of real values, a is a number
        var ret = [];
        for( var i=0; i<b.length; i++)
            ret.push( b[i]*a );
        return ret;
    }
    if ( ( Array.isArray(a) ) && ( Array.isArray(b) ) ) { // a and b are arrays.
        var ret = [];
        if ( a.length != b.length )
        {
            throw "M_mul: a and b have different lengths:" +a.length+","+b.length;
        }
        for( var i=0; i<a.length; i++)
            ret.push( b[i]*a[i] );
        return ret;
    }

    if ( ( typeof a === "object") && 
         ( a.hasOwnProperty("v_i") ) &&  
         ( a.hasOwnProperty("v_q") ) && 
         (!isNaN( b ) ) ) // M * const
    {

        var ret = new M( NaN, NaN, a.rows, a.cols );
        for( i=0; i<ret.v_i.length; i++)
        {
            ret.v_i[i] = a.v_i[i]*b;
            ret.v_q[i] = a.v_q[i]*b;
        }
        ret.isreal = a.isreal;
        return ret;
    }

    if ( ( typeof a === "object") &&  /* M*M */
         ( a.hasOwnProperty("v_i") ) &&  
         ( a.hasOwnProperty("v_q") ) && 
         ( typeof b === "object") && 
         ( b.hasOwnProperty("v_i") ) &&  
         ( b.hasOwnProperty("v_q") ) ) 
    {
        // A(rows1,cols1)*B(rows2=cols1,cols2) = C(rows1,cols2)
        if ( a.cols == b.rows )
        {
            var ret = new M( NaN, NaN, a.rows, b.cols );
            var ar = a.rows|0;
            var bc = b.cols|0;
            var ac = a.cols|0;
            var i=0, j=0; k=0;

            for( var j=0; j<ar; j++)
                for( var k=0; k<bc; k++)
                {
                    var accum_i = 0;
                    var accum_q = 0;
                    var aindex = (j*ac)|0;   // row from matrix A, step ++
                    var bindex = k;          // column from matrix B, step += bc
                    for( var i=0; i<ac; i++, aindex++, bindex+=bc )
                    {
                        accum_i += a.v_i[aindex]*b.v_i[bindex] - a.v_q[aindex]*b.v_q[bindex];
                        accum_q += a.v_i[aindex]*b.v_q[bindex] + a.v_q[aindex]*b.v_i[bindex];
                    }
                    ret.v_i[j*ac+k] = accum_i;
                    ret.v_q[j*ac+k] = accum_q;
                }
            ret.isreal = 0;
            return ret;
        }
        if ( ( a.cols==1 ) && (a.rows==1) ) // multiply by constant
        {
            if (a.isreal) return M_mul( b, a.v_i[0]);
            var ret = new M( NaN, NaN, b.rows, b.cols );
            var vi = a.v_i[0];
            var vq = a.v_q[0];
            ret.isreal=0;
            for( i=0; i<ret.v_i.length; i++)
            {

                ret.v_i[i] = b.v_i[i]*vi - b.v_q[i]*vq;
                ret.v_q[i] = b.v_i[i]*vq + b.v_q[i]*vi;
            }
            return ret;
        }
        if ( ( b.cols==1 ) && (b.rows==1) ) // multiply by constant
            return M_mul( b,a );
/*        for( i=0; i<ret.v_i.length; i++)
        {
            ret.v_i[i] = a.v_i[i]*b;
            ret.v_q[i] = a.v_q[i]*b;
        }
        ret.isreal = a.isreal;
        return ret;*/
    }

    throw "M_mul: Cannot multiply/Unknown object types: " + (typeof a) + "," + (typeof b);
}

function M_reshape( a, nrows, ncols  )
{
    if ( ( typeof a === "object") && 
         ( a.hasOwnProperty("v_i") ) &&  
         ( a.hasOwnProperty("v_q") ) )
    {
       var M = a.clone();
       M.reshape( nrows, ncols);
       return M;
    }
    throw "Cannot reshape non-M object";
}


