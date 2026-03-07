function bitc(i)
/* Count set bits in integer */ {
    var r;
    for (r = 0; i; i >>= 1)
        r += i & 1;
    return r;
}

function bitp(i)
/* Check if number of set bits in integer is dividible by 2 */ {
    var r;
    for (r = 0; i; i >>= 1)
        r ^= i & 1;
    return r;
}


function revbin(x, len)
/* Binary reverse. revbin( 0xFA, 8) shall return 0x5F */ {
    var r = 0;
    for (var i = 0; i < len; i++, x >>= 1, r <<= 1)
        r |= x & 1;
    return r >> 1;
}


function v_equal_mul_const(v, c) {
    for (var i = 0; i < v.length; i++)
        v[i] *= c;
}

// [r1, i1] *= [r2, i2]
function viq_equal_mul_vect(r1, i1, r2, i2) {
    var re, im, i;
    for (i = 0; i < r1.length; i++) {
        re = r1[i] * r2[i] - i1[i] * i2[i];
        im = r1[i] * i2[i] + r2[i] * i1[i];
        r1[i] = re;
        i1[i] = im;
    }
}

function viq_angle(r1, i1) {
    var i;
    var ret = [];

    for (i = 0; i < r1.length; i++)
        ret.push(Math.atan2(i1[i], r1[i]));

    return ret;
}

function viq_abs(r1, i1) {
    var i;
    var ret = [];

    for (i = 0; i < r1.length; i++)
        ret.push(Math.sqrt(i1[i] * i1[i] + r1[i] * r1[i]));

    return ret;
}

function v_equal_rad2deg(v) {
    var i;
    for (i = 0; i < v.length; i++)
        v[i] *= 180 / Math.PI;
    return v;
}


function bits2val(v, off, len)
/* Convert binary vector to integer */ {
    var i, r;

    for (i = r = 0; i < len; i++)
        r = (r << 1) | v[i + off];

    return r;
}

// reversed ... :-(
function val2bits_reversed(val, len) {
    var i, retval = [];
    for (i = 0; i < len; i++) {
        retval.push((val & (1 << i)) >> i);
    }
    return retval;
}

function val2bits(val, len) {
    var i, retval = [];
    for (i = len - 1; i >= 0; i--) {
        retval.push((val & (1 << i)) >> i);
    }
    return retval;
}


function binint2string(val, len) {
    var str = "";
    for (i = len - 1; i >= 0; i--)
        str += (val >> i) & 1;
    return str;
}


function bits_to_int(bits, pos, len) {
    var i, sum = 0, pw = 1;
    for (i = pos; i < pos + len; i++, pw <<= 1)
        sum += bits[i] * pw;
    return sum;
}

// Takes array of bits, return array of modulation symbols for given bps
function bits2modsymb(bits, bps) {
    var a = []
    var i, j, v;

    for (i = 0; i < bits.length / bps; i++) {
        v = 0;
        for (j = 0; j < bps; j++)
            v = (v << 1) | bits[i * bps + j];
        a.push(v);
    }
    return a;
}


function v_unwrap_deg(v) {
    var i;
    var ret = [];

    ret[0] = v[0];
    for (i = 1; i < v.length; i++) {
        var diff = (v[i] - v[i - 1] + 360) % 360;
        if (diff < 180) {
            // go up
            ret[i] = ret[i - 1] + diff;
        } else {
            ret[i] = ret[i - 1] + diff - 360;
        }
    }
    return ret;
}

function v_c(X, Y, lr) {
    for (var i = 0; i < X.length; i++) {
        var v = 0;
        var p = 1;
        var Xi = X[i];
        for (var j = 0; j < lr; j++) {
            v += lr[j] * p;
            p *= Xi;
        }
        Y[i] -= v;
    }

    return Y;
}


function v_poly_rem(X, Y, lr)
/*
X=[0,1,2,3,4,5];
Y=[0,1,4,9,16,25];
lr=v_poly_fit(X,Y,3)
v_poly_val(X,lr);
v_poly_rem(X,Y,lr)

v_poly_rem(X,Y,v_poly_fit(X,Y,3))
*/ {
    if (X.hasOwnProperty('v_i')) X = X.v_i;
    if (lr.hasOwnProperty('v_i')) lr = lr.v_i;

    for (var i = 0; i < X.length; i++) {
        var v = 0;
        var p = 1;
        var Xi = X[i];
        for (var j = 0; j < lr.length; j++) {
            v += lr[j] * p;
            p *= Xi;
        }
        Y[i] -= v;
    }

    return Y;
}


/*
X=[0,1,2,3,4,5];
lr=v_poly_fit(X,[0,1,4,9,16,25],3)
v_poly_val(X,lr)
v_plot(v_poly_val(v_counts(-100,1,100),[0,-100,-1,0.03]))
*/

function v_poly_val(X, lr)
/* Calculates polynomial values given by lr over vector X */
/* I.e. v_poly_val([0,1,2,3,4],[0,0,1]) returns [0 1 4 9 16] */ {
    var Y = [];
    if (X.hasOwnProperty('v_i')) X = X.v_i;
    if (lr.hasOwnProperty('v_i')) lr = lr.v_i;
    for (var i = 0; i < X.length; i++) {
        var v = 0;
        var p = 1;
        var Xi = X[i];
        for (var j = 0; j < lr.length; j++) {
            v += lr[j] * p;
            p *= Xi;
        }
        Y[i] = v;
    }

    return Y;
}

function v_poly_fit(X, Y, level)
/* Refer to: https://en.wikipedia.org/wiki/Polynomial_regression */
/*   B = ( X^T * X ) ^ -1 * X^T *Y */ {
    /* If M-format is given, get to vector */
    if (X.hasOwnProperty('v_i')) X = X.v_i;
    if (Y.hasOwnProperty('v_i')) Y = Y.v_i;

    var XTv = [];
    for (var k = 0; k < X.length; k++)
        for (var j = 0; j < level; j++)
            XTv.push(Math.pow(X[k], j));  /* This can be heavilly optimized...  */
    var XT = new M(XTv, NaN, level, X.length); // cols: number of samples, rows: level

    var Mv = [];
    for (var i = 0; i < level; i++)
        for (var j = 0; j < level; j++) {
            var v = 0;
            for (var k = 0; k < X.length; k++)
                v += Math.pow(X[k], i) * Math.pow(X[k], j);  /* This can be heavilly optimized... -> resulting matrix is symmetric */
            Mv.push(v);
        }
    var XTX = new M(Mv, NaN, level, level);
    var XTXinv = XTX.inv();


    var Ym = new M(Y, NaN, Y.length, 1);
    return XTXinv.mul(XT).mul(Ym);
}


function v_lin_reg(X, Y, level) {
    var i, XX, XY;
    var mean_Y = v_mean(Y);
    var mean_X = v_mean(X);

    if (level === undefined) level = 2;

    for (i = XX = XY = 0; i < Y.length; i++) {
        XX += (X[i] - mean_X) * (X[i] - mean_X);
        XY += (Y[i] - mean_Y) * (X[i] - mean_X);
    }

    const t = {error: 0, alpha: 0, beta: 0, coefs: [0, 0, 0]};
    /* if ( level > 2 ) {
        const mean_XX = v_mean_sq(X);
        let XXX = 0,XXY = 0;
        for( i=XXX=XXY=0; i<Y.length; i++) {
            const e = (X[i]*X[i]-mean_XX );
            XXX += e*e;
            XXY += (Y[i]-mean_Y )*e;
        }
        t.coefs[2] = XXY/XXX;
    } */

    // y = a + bx;
    t.beta = XY / XX;
    t.alpha = mean_Y - t.beta * mean_X;//-t.coefs[2]*mean_XX;

    /* Calculate sum of absolute errors */
    for (i = 0; i < Y.length; i++) {
        t.error += Math.abs(Y[i] - (t.alpha + t.beta * X[i]));
    }

    t.coefs[0] = t.alpha;
    t.coefs[1] = t.beta;

    return t;
}
function v_lin_reg_dec(X, Y, level) {
    let XX = new Decimal(0), XY = new Decimal(0);
    let mean_Y = v_mean_dec(Y);
    let mean_X = v_mean_dec(X);

    if (level === undefined) level = 2;

    for (let i = 0; i < Y.length; ++i) {
        XX = XX.add( X[i].sub(mean_X).mul( X[i].sub(mean_X) ) );
        XY = XY.add( Y[i].sub(mean_Y).mul( X[i].sub(mean_X) ) );
    }

    const t = {};

    // y = a + bx;
    t.beta = XX.equals(0) ? new Decimal(0) : XY.div(XX);
    t.alpha = mean_Y.sub(t.beta.mul(mean_X));

    /* Calculate sum of absolute errors */
    t.error = new Decimal(0);
    for (let i = 0; i < Y.length; i++) {
        t.error = t.error.add( Y[i].sub( t.alpha.add(t.beta.mul(X[i])) ).abs() );
    }

    t.coefs = [t.alpha, t.beta];

    return t;
}


function v_poly_gen(X, R) {
    var i, j;
    var ret = [];

    for (i = 0; i < X.length; i++) {
        var v = 0, xsq = 1;
        for (j = 0; j < R.length; j++) {
            v += R[j] * xsq;
            xsq *= X[i];
        }
        ret.push(v);
    }
    return ret;
}

function v_fit(y) {
    var x = counts(0, 1, y.length);
    var R = v_lin_reg(x, y, 2).coefs;
    return v_poly_gen(x, R);
}


function v_lin_reg_angle(Y) {
    return v_lin_reg(counts(0, 1, Y.length), Y);
}

function hex_to_bitstream(hex) {
    var i, j;
    var ret = [];
    for (i = 0; i < hex.length; i++)
        for (j = 31; j >= 0; j--)
            ret.push((hex[i] >> j) & 1);
    return ret;
}

function v_to_string(v) {
    var retval = "";
    for (i = 0; i < v.length; i++) {
        if (i > 0) retval += ',';
        if (isNaN(v[i]))
            retval += "_";
        else
            retval += v[i];
    }
    return retval;
}


function v_asText(v) {
    var result = "";
    for (var i = 0; i < v.length; i++)
        result += (i ? ", " : "") + v[i];
    return result;
}

function v_asBinaryText(v) {
    var result = "";
    if (v == undefined) return undefined;
    for (var i = 0; i < v.length; i++) {
        result += v[i];
        if (31 == (i & 31)) result += " ";
    }
    return result;
}

function v_asBinaryHtml(v) {
    var result = "";
    if (v == undefined) return undefined;


    for (var i = 0; i < v.length; i++) {
        result += v[i];
        if (31 == (i & 31)) result += " ";
        if ((i == 31) && (v.length > 32))
            result += "<a href='#' onClick='unhide(\"consoleprint" + console_print_iterator + "\")'>" +
                "<font color='green'>[....]</font></a> <BR><div style='display: none;' id='consoleprint" + console_print_iterator + "'>";
    }
    if (v.length > 32)
        result += '</div>';
    console_print_iterator++;

    return result;
}


function limit(_min, val, _max, def) {
    if (isNaN(val)) return def;
    if (val < _min) val = _min;
    if (val > _max) val = _max;
    return val;
}


function meanavg_amplitude(real, imag) {
    var i;
    var amp;
    var len = real.length;

    for (i = amp = 0; i < len; i++)
        amp += Math.sqrt(real[i] * real[i] + imag[i] * imag[i]);
    return amp / len;
}

function minmax_amplitude(real, imag) {
    var i;
    var _min = 10, _max = -10;
    var len = real.length;

    for (i = 0; i < len; i++) {
        var amp = Math.sqrt(real[i] * real[i] + imag[i] * imag[i]);
        if (amp > _max) _max = amp;
        if (amp < _min) _min = amp;

    }
    this.min = _min;
    this.max = _max;

    return this;
}


function minmax(x) {
    var i;
    var _min = x[0], _max = x[0];
    var len = x.length;

    for (i = 0; i < len; i++) {
        var amp = x[i];
        if (amp > _max) _max = amp;
        if (amp < _min) _min = amp;

    }
    this.min = _min;
    this.max = _max;

    return this;
}


// unwraps vector through unwrap_value in-place.
function v_unwrap(v, unwrap_value) {
    var i, v0 = v[0], shift = 0;

    for (i = 0; i < v.length; i++) {
        var d = v[i] - v0;
        if (d > unwrap_value) shift -= 2 * unwrap_value;
        if (d < -unwrap_value) shift += 2 * unwrap_value;
        v0 = v[i];
        v[i] += shift;
    }
    return v;
}

function v_energy_in_window(v, length) {
    var i;
    var r = [];
    var sum = 0;

    for (i = 0; i < length; i++)
        sum += v[i];
    for (i = 0; i < v.length; i++) {
        r.push(sum);
        sum -= v[i];
        sum += v[(i + length) % v.length];
    }
    return r;
}

// calculated eigen values of real matrix 2x2 given as 4 element vector.
function m_eig(v) {
    var a = v[0];
    var b = v[1];
    var c = v[2];
    var d = v[3];
    var Delta = (a + d) * (a + d) - 4 * (a * d - b * c);
    if (Delta < 0) return NaN;
    var x1 = (a + d + Math.sqrt(Delta)) / 2;
    var x2 = (a + d - Math.sqrt(Delta)) / 2;
    return [x1, x2];
}

function v_cov(v1, v2) {
    var vm1 = v_mean(v1);
    var vm2 = v_mean(v2);
    var c11 = 0, c12 = 0, c22 = 0;
    if (v1.length != v2.length) return NaN;

    for (i = 0; i < v1.length; i++) {
        c11 += (v1[i] - vm1) * (v1[i] - vm1);
        c12 += (v1[i] - vm1) * (v2[i] - vm2);
        c22 += (v2[i] - vm2) * (v2[i] - vm2);
    }
    return [c11, c12, c12, c22];
}

