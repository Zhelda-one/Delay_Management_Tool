let graph2dZoomXOnly = false;
let graph2dZoomYOnly = false;
let graph2dSampleShift = false;

const GRAPH_MODE_ENUM = {
    POINT: 0,
    LINE: 1,
    BAR: 2,
    THICKBAR: 3,
    PDPLINES: 4
};

function Graph2d( canvas )
{
    this.labels = [];
    this.series_data = [];

    this.canvas = canvas;
    this.shift_x = 0;
    this.shift_y = 0;
    this.min_x   = 0;
    this.max_x   = 0;
    this.min_y   = 0;
    this.max_y   = 0;
    this.style   = 0;
    this.zoom_x  = 1;
    this.zoom_y  = 1;
    this.left_padding  = 0;
    this.right_padding = 0;
    this.top_padding   = 0;
    this.bottom_padding= 0;
    this.x_grid  = -1;
    this.y_grid  = -1;
    this.mode    = GRAPH_MODE_ENUM.POINT; // lines  alt.
    this.colors = [
        "#000000", "#0000FF", "#FF0000", "#007000",
        "#ff3399", "#ff9900", "#803330", "#9900cc",
        "#290a0a", "#000066", "#950707", "#45ca18",
        "#990066", "#d65f05", "#996666", "#4B0082",
        "#272c2e", "#2563bf", "#c10d0d", "#339966",
        "#990ca1", "#e4490d", "#ac5a50", "#6600cc",
        "#343a47", "#2922e1", "#780e0e", "#0f7a0c",
        "#d534e4", "#f87f0a", "#875d5d", "#6926b1",
        "#1e3333", "#3366cc", "#ec2b2b", "#058666",
        "#9708ae", "#cc802f", "#855245", "#481287",
        "#432a43", "#1f738f", "#bc0a0a", "#669966",
        "#bc0a92", "#f37716", "#8c4833", "#662883",
        "#695f6e",  "#5da2c3", "#8f1616", "#395310",
        "#cd09be", "#d14812", "#6e3a1d", "#59348f",
        "#837d88",  "#1986f8", "#b10000", "#257146",
        "#c105a5", "#e3761f", "#855b44", "#410b88"
    ];

    this.backgroundColor = "rgb(255,255,255)";
    this.legendColor = "rgb(53, 89, 143)";

    this.isMouseDown = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.radian = false;

    this.drawTrendline = false;
    this.trendlineData = [];
    this.trendlineLabels = [];

    this.isFullscreen = false;

    this.getLimits = function() {

        if ( this.labels.length !== 0 ) {
            this.max_x = this.labels.map(labelSeries=>labelSeries.max()).max();
            this.min_x = this.labels.map(labelSeries=>labelSeries.min()).min();

            if(this.min_x === this.max_x){
                this.min_x -= 0.5;
                this.max_x += 0.5;
            }
        }
        else {
            this.min_x = -1;
            this.max_x = Math.max(...this.series_data.map(series=>series.length)) - 1;
            if(this.max_x < 1) this.max_x = 1;
        }

        if ( this.series_data.length !== 0 ) {
            this.max_y = this.series_data.map(series=>series.max()).max();
            this.min_y = this.series_data.map(series=>series.min()).min();

            if (typeof this.max_y === "bigint" || typeof this.min_y === "bigint") {
                this.max_y = Number(this.max_y);
                this.min_y = Number(this.min_y);
                for (const series of this.series_data) {
                    for (let i = 0; i < series.length; i++) {
                        series[i] = Number(series[i]);
                    }
                }
            }

            if(this.min_y === this.max_y){
                this.min_y -= 0.5;
                this.max_y += 0.5;
            }
        }
        else {
            this.min_y = -1;
            this.max_y = 1;
        }
    }

    this.draw = function(labels2d, series2d, limits) {

        // TODO: Check if params are 2d arrays, if not, make them
        this.labels = labels2d;
        this.series_data = series2d;

        // Initialize series visibility array - used for PDP Prach plotting
        this.series_visibility = this.series_data.map(() => true);

        while(labels2d.length < series2d.length){
            labels2d.push([]);
        }

        this.labels = this.labels.map(label => label ?? []);
        this.series_data = this.series_data.map(series => series ?? []);

        for(let i = 0; i < this.series_data.length; i++){
            if(this.labels[i].length === 0){
                this.labels[i] = Array(this.series_data[i].length).fill(0).map((_, index) => index);
            }
        }

        for (let i = 0; i < this.series_data.length; i++) {
            const series = this.series_data[i];
            const labels = this.labels[i];

            for (let j = series.length - 1; j >= 0; j--) {
                if (series[j] === undefined) {
                    series.splice(j, 1);
                    labels.splice(j, 1);
                }
            }
        }

        this.num_series = this.series_data.length;

        if(limits === undefined){
            this.getLimits();
        } else {
            this.min_x = limits.min_x; this.max_x = limits.max_x;
            this.min_y = limits.min_y; this.max_y = limits.max_y;
        }

        this.calculateTrendline();

        this.onDraw();
    };

    this.drawRadianGrid = function (x0, y0, sx, sy,
                                    pmin_x, pmax_x, pmin_y, pmax_y, pdelta_main_x, pdelta_main_y,
                                    right_padding){

        const context = this.canvas.getContext('2d');
        const canvas_size_x = canvas.width;
        const canvas_size_y = canvas.height;
        context.fillStyle = this.colors[0];
        context.strokeStyle = "rgb(0,0,0)";

        context.lineWidth = 0.5;
        context.beginPath();
        context.setLineDash([]);

        const ry = y0 + this.shift_y;
        const rx = x0 + this.shift_x;

        context.moveTo( rx-1000, ry);
        context.lineTo( rx+1000, ry);

        context.moveTo( rx, ry-1000);
        context.lineTo( rx, ry+1000);

        const numberOfLines = 12;
        let j = canvas_size_x/sx;
        let line_difference = canvas_size_x/sx/numberOfLines;


        let amp1 = Math.sqrt((rx/sx)**2 + (ry/sy)**2);
        let amp2 = Math.sqrt(((rx-canvas_size_x)/sx)**2 + ((ry-canvas_size_y)/sy)**2);
        let amp3 = Math.sqrt(((rx/sx)**2 + ((ry-canvas_size_y)/sy)**2));
        let amp4 = Math.sqrt(((rx-canvas_size_x)/sx)**2 + (ry/sy)**2);

        let maxAmp = Math.max(amp1, amp2, amp3, amp4);
        let minAmp = 0;
        if(!(Math.sign(rx/sx) !== Math.sign((rx-canvas_size_x)/sx) && Math.sign(rx/sy) !== Math.sign((ry-canvas_size_y)/sy))){
            minAmp = Math.min(Math.abs(rx/sx), Math.abs(ry/sy), Math.abs((rx-canvas_size_x)/sx), Math.abs((ry-canvas_size_y)/sy));
            j = maxAmp;
            line_difference = (maxAmp - minAmp) / numberOfLines;
        }

        for(let k = numberOfLines; k > 0; k--, j -= line_difference){
            for(let i = 0; i < 360; i+=2){
                context.moveTo( Math.cos( Math.PI*i/180)*sx*j + rx, Math.sin( Math.PI*i/180)*sy*j + ry);
                context.lineTo( Math.cos( Math.PI*(i+1)/180)*sx*j + rx, Math.sin( Math.PI*(i+1)/180)*sy*j + ry);
            }

            context.fillText( j.toFixed(2), rx, ry - sy*j);
        }

        context.stroke();
        context.lineWidth = 1;
    }

    this.drawGrid = function( x0, y0, sx, sy,
                              pmin_x, pmax_x, pmin_y, pmax_y, pdelta_main_x, pdelta_main_y,
                              right_padding ) {
        const context = this.canvas.getContext('2d');
        const canvas_size_x = canvas.width;
        const canvas_size_y = canvas.height;

        // context.fillText( pmax_y.toFixed(4)+" " , 52, 10 );
        // context.fillText( pmin_y.toFixed(4) , 52, canvas_size_y-5 );
        context.fillText( this.max_x, canvas_size_x-30, canvas_size_y-5 );
        context.fillStyle = this.legendColor;

        const ry = y0 + this.shift_y;
        const rx = x0 + this.shift_x;

        if ( (ry>-3) && (ry<canvas_size_y+3) )// X axis
        {
            context.fillRect( 0,  ry-1, canvas_size_x, 2 );
            context.beginPath();
            context.moveTo( canvas_size_x, ry );
            context.lineTo( canvas_size_x-7, ry-5 );
            context.lineTo( canvas_size_x-7, ry+6 );
            context.fill();
        }
        if ( ( rx>+3 ) && ( rx<canvas_size_x+3 ) ) // Y axis
        {
            context.fillRect( rx-1, 0, 2, canvas_size_y );
            context.beginPath();
            context.moveTo( rx  , 0 );
            context.lineTo( rx-5, 7 );
            context.lineTo( rx+6, 7 );
            context.fill();
        }

        context.setLineDash([2,3]);
        context.strokeStyle = "rgb(120,120,120)";
        context.beginPath();
        {
            const printstep = -Math.floor( Math.log10( pdelta_main_y ) );
            const last_p = (1+y0+this.shift_y)/sy;

            for( let pmin0 = Math.floor((y0-canvas_size_y+this.shift_y+1)/sy/pdelta_main_y)*pdelta_main_y; pmin0<last_p; pmin0+=pdelta_main_y)
            {
                const y = y0-pmin0*sy+this.shift_y+1;
                context.moveTo(0,y);
                context.lineTo(canvas_size_x,y);
                context.font = "bold 10px sans-serif";
                context.fillText( this.nice_value( Math.round(pmin0/pdelta_main_y)*pdelta_main_y, printstep) , 2, y-2 );
            }
        }

        let lastTextPos = -10000;
        {
            const printstep = -Math.floor( Math.log10( pdelta_main_x ) );
            const last_p = (canvas_size_x-1-x0-this.shift_x)/sx;

            for( let pmin0 = Math.floor( pmin_x / pdelta_main_x )*pdelta_main_x; pmin0<last_p; pmin0+=pdelta_main_x)
            {
                const x = x0+pmin0*sx+this.shift_x+1;
                context.moveTo(x,0);
                context.lineTo( x,canvas_size_y);
                if (x>lastTextPos+45)
                {
//                context.fillText( (Math.round(pmin0/pdelta_main_x)*pdelta_main_x).toFixed(printstep)+"" , x-2, 12 );
                  context.fillText( this.nice_value(Math.round(pmin0/pdelta_main_x)*pdelta_main_x,printstep) , x-10, 12 );
                  lastTextPos=x;
                }
            }
        }

        context.closePath();
        context.stroke();
    };

    this.calcGrid = function( pdelta, scale ) {
        let pdelta_main = Math.pow( 10, Math.floor( Math.log10( pdelta ) ) )/10;
        while (pdelta_main*scale<19) {
            if (Math.round(pdelta_main/Math.pow(10,Math.floor( Math.log10(pdelta_main) ))) === 2)
                pdelta_main*=2.5;
            else
                pdelta_main*=2;
        }
        while (pdelta_main*scale>39) {
            if (Math.round(pdelta_main/Math.pow(10,Math.floor( Math.log10(pdelta_main) ))) === 2)
                pdelta_main/=2;
            else
                pdelta_main/=2.5;
        }
        return pdelta_main;
    };

    this.onDraw = function () {
        const canvas        = this.canvas;
        const context       = canvas.getContext('2d');
        const canvas_size_x = canvas.width;
        const canvas_size_y = canvas.height;

        context.fillStyle = this.backgroundColor;
        context.fillRect( 0,  0, canvas_size_x,  canvas_size_y );
        context.fillStyle = "rgb(0,0,0)";

        if(this.series_data.length === 0){
            const message = "No Data";
            context.fillText( message, canvas_size_x/2-context.measureText(message).width/2, canvas_size_y/2);
            return;
        }

        const max_y = this.max_y;
        const min_y = this.min_y;
        const dx = this.max_x-this.min_x;
        const dy =      max_y-     min_y;
        const sx = (canvas_size_x-this.left_padding-this.right_padding)/dx*this.zoom_x;
        const sy = (canvas_size_y-this.top_padding-this.bottom_padding)/dy*this.zoom_y;
        const x0 = this.left_padding-this.min_x*sx;
        const y0 = this.top_padding +     max_y*sy;
        const pmin_y =      min_y + this.shift_y/sy;
        const pmax_y =      max_y + this.shift_y/sy;
        const pmin_x = this.min_x - this.shift_x/sx;
        const pmax_x = this.max_x - this.shift_x/sx;
        let pdelta_main_y = this.calcGrid( max_y - min_y,           sy );
        let pdelta_main_x = this.calcGrid( this.max_x - this.min_x, sx );
        if ( this.x_grid !== -1 ) pdelta_main_x=this.x_grid;
        if ( this.y_grid !== -1 ) pdelta_main_y=this.y_grid;

        if(!this.radian){
            this.drawGrid( x0, y0, sx, sy,
                pmin_x, pmax_x, pmin_y, pmax_y, pdelta_main_x, pdelta_main_y,
                this.right_padding );
        }
        else{
            this.drawRadianGrid(x0, y0, sx, sy,
                pmin_x, pmax_x, pmin_y, pmax_y, pdelta_main_x, pdelta_main_y,
                this.right_padding);
        }

        for(let series = 0; series < this.num_series; series++){
            context.fillStyle = this.colors[series % this.colors.length];
            context.strokeStyle = this.colors[series % this.colors.length];
            context.setLineDash([]);

            const data  = this.series_data[series];
            const labels = this.labels[series] ?? data.map((_,i)=>i);

            switch(this.mode){
                case GRAPH_MODE_ENUM.POINT:{
                    for( let i = 0; i<data.length; i++) {
                        const x = x0 + labels[i] * sx + this.shift_x;
                        const y = y0 - data[i] * sy + this.shift_y;
                        context.fillRect( x,  y, 2,  2 );
                    }
                    break;
                }
                case GRAPH_MODE_ENUM.BAR:
                case GRAPH_MODE_ENUM.THICKBAR:{
                    let yzero = y0 + this.shift_y;
                    if (yzero > canvas_size_y) yzero = canvas_size_y;
                    if (yzero < 0)             yzero = 0;

                    for( let i = 0; i < data.length; i++)
                    {
                        const x = x0 + sx * labels[i] + this.shift_x;
                        const y = y0 - sy * data[i] + this.shift_y;
                        if (this.mode === GRAPH_MODE_ENUM.BAR){
                            context.fillRect( x,  y, 2,  yzero-y );
                        }
                        else
                        {
                            const width = x0 + sx * labels[i+1] + this.shift_x - x;
                            context.fillRect( x,  y, width,  yzero-y );
                            if (width>30) context.fillText( data[i]+"", x+width/2-context.measureText(data[i]+"").width/2, y );
                        }
                    }

                    break;
                }
                case GRAPH_MODE_ENUM.LINE:
                case GRAPH_MODE_ENUM.PDPLINES:{
                    if (this.mode === GRAPH_MODE_ENUM.PDPLINES && this.series_visibility[series] === false) continue;

                    context.beginPath();

                    context.moveTo( x0 + sx * labels[0] + this.shift_x, y0 - sy * data[0] +this.shift_y);
                    for( let i = 1; i < data.length; i++) {
                        const x = x0 + sx * labels[i] + this.shift_x;
                        const y = y0 - sy * data[i] + this.shift_y;
                        context.lineTo( x,  y );
                    }
                    context.stroke();

                    break;
                }
            }
        }

        if(this.drawTrendline){
            const data = this.trendlineData;
            const labels = this.trendlineLabels;

            context.strokeStyle = this.colors[this.colors.length - 4];
            context.fillStyle = this.colors[this.colors.length - 4];

            context.beginPath();

            context.moveTo( x0 + sx * labels[0] + this.shift_x, y0 - sy * data[0] +this.shift_y);
            for( let i = 1; i < data.length; i++) {
                const x = x0 + sx * labels[i] + this.shift_x;
                const y = y0 - sy * data[i] + this.shift_y;
                context.lineTo( x,  y );
            }
            context.stroke();
        }
    };

    this.nice_value = function( val, step )
    {
        if (( val>=1000000 ) && (val%1000000===0)) return Math.round(val/1000000).toFixed()+"M";
        if (( val>=100000  ) && (val%100000 ===0)) return           (val/1000000).toFixed(1)+"M";
        if (( val>=1000    ) && (val%1000   ===0)) return Math.round(val/1000).toFixed()+"k";
        if ( step<0 )                              return val + "";

        return val.toFixed(step)+"";
    }

    this.onMouseMove = function(e){
        if (this.isMouseDown === false) return;
        if (this.series_data.length === 0) return;

        const dx = this.mouseX - e.clientX;
        const dy = this.mouseY - e.clientY;

        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        this.shift_x -= dx;
        this.shift_y -= dy;

        this.onDraw();
    }

    this.onMouseDown = function(e){
        if(this.series_data.length === 0) return;

        this.isMouseDown = true;

        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    this.onMouseUp = function(e){
        if(this.series_data.length === 0) return;

        this.isMouseDown = false;
    }

    this.onMouseWheel = function (e)
    {
        e.preventDefault();

        if(this.series_data.length === 0) return;

        let canvas = this.canvas;

        const delta = e.deltaY;
        const scaleMultiplier = (delta > 0) ? 4/5 : 5/4;

        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        // x-scaling
        if(!graph2dZoomYOnly){
            const new_zoomX = this.zoom_x * scaleMultiplier;
            const canvas_size_x = canvas.width;
            const dx = this.max_x - this.min_x;
            const sx = (canvas_size_x - this.left_padding - this.right_padding) / dx * this.zoom_x;
            const x0 = this.left_padding - sx * this.min_x;

            const cpx = (x - x0 - this.shift_x) / sx;
            const nsx = (canvas_size_x - this.left_padding - this.right_padding) / dx * new_zoomX;
            const nx0 = this.left_padding - nsx * this.min_x;
            this.shift_x = x - (nx0 + cpx * nsx);
            this.zoom_x = new_zoomX;
        }

        // y-scaling
        if(!graph2dZoomXOnly){
            const new_zoomY = this.zoom_y * scaleMultiplier;
            const canvas_size_y = canvas.height;
            const dy = this.max_y - this.min_y;
            const sy = (canvas_size_y - this.top_padding - this.bottom_padding) / dy * this.zoom_y;
            const y0 = this.top_padding + sy * this.min_y;

            const mouse_pos_y = y + canvas.parentNode.scrollTop;
            const cpy = (mouse_pos_y - y0 - this.shift_y) / sy;
            const nsy = (canvas_size_y - this.top_padding - this.bottom_padding) / dy * new_zoomY;
            const ny0 = this.top_padding + nsy * this.min_y;
            this.shift_y = mouse_pos_y - (ny0 + cpy * nsy);
            this.zoom_y = new_zoomY;
        }


        this.onDraw();
    };

    this.setZoom = function(shift_x, shift_y, zoom_x, zoom_y){
        const changed = this.shift_x !== shift_x || this.shift_y !== shift_y ||
                                 this.zoom_x !== zoom_x || this.zoom_y !== zoom_y;

        this.shift_x = shift_x;
        this.shift_y = shift_y;
        this.zoom_x = zoom_x;
        this.zoom_y = zoom_y;

        if(changed) this.onDraw();
    }

    // Historic Valley
    // Not yet used in new BBA
    // Left as reference

    this.setXscaling = function( min_x, max_x, shift_x, zoom_x )
    {
        var changed = 0;
        if (min_x  !=this.min_x  ) { this.min_x=min_x;     changed = 1; }
        if (max_x  !=this.max_x  ) { this.max_x=max_x;     changed = 1; }
        if (shift_x!=this.shift_x) { this.shift_x=shift_x; changed = 1; }
        if (zoom_x !=this.zoom_x ) { this.zoom_x =zoom_x;  changed = 1; }
        if (changed) this.onDraw();
    }

    this.screenToXY = function( screen_x, screen_y )
    {
        const canvas_size_x = canvas.width;
        const canvas_size_y = canvas.height;
        const max_y = this.max_y;
        const min_y = this.min_y;
        const dx = this.max_x - this.min_x;
        const dy =      max_y-     min_y;
        const sx = (canvas_size_x - this.left_padding - this.right_padding) / dx *this.zoom_x;
        const sy = (canvas_size_y - this.top_padding - this.bottom_padding) / dy * this.zoom_y;
        const x0 = this.left_padding - sx * this.min_x;
        const y0 = this.top_padding + sy * max_y;
        const val_x =  (screen_x - x0 - this.shift_x) / sx;
        const val_y = -(screen_y - y0 - this.shift_y) / sy;

        return { "x": val_x, "y": val_y };
    };

    this.onMessage = function( message ) {
        switch (message) {
            case "barmode":
                this.setModeBar();
                break;
            case "thickbarmode":
                this.setModeThickbar();
                break;
            case "linemode":
                this.setModeLine();
                break;
            case "pointmode":
                this.setModePoint();
                break;
            case "pdpmode":
                this.setModePdplines();
                break;
            case "fullscreen":
                this.fullscreen();
                break;
            case "normalscreen":
                this.normalscreen();
                break;
            case "getdata":
                this.downloadData();
                break;
            case "addtrendline":
                this.setTrendline(true);
                break;
            case "removetrendline":
                this.setTrendline(false);
                break;
            case "rezoom":
                this.zoomReset();
                break;
            case "removetrend":
                this.trendRemove();
                break;
            case "differential":
                this.differential();
                break;
            case "sort":
                this.sortData();
                break;
            case "dist":
                this.toDistribution();
                break;
            /*
            case "removetrend2": // quadratic
            {
                var Y = this.series_data[0];
                if (this.hasOwnProperty('dataX'))
                    X = this.series_dataX[0];
                else
                    X = counts(0, 1, Y.length);
                var lr = v_poly_fit(X, Y, 3)
                Y = v_poly_rem(X, Y, lr);

                this.onDraw();
                break;
            }
            */
        }
    };

    this.collection__on_message = this.onMessage;

    this.calculateTrendline = function(){
        if(this.series_data.length === 0) return;

        const data = this.series_data[0];
        const labels = this.labels[0] ?? data.map((_,i)=>i);

        const lr = v_lin_reg(labels, data, 3);
        this.trendlineData = [];
        this.trendlineLabels = labels;

        for (let i = 0; i < data.length; i++)
            this.trendlineData.push(lr.coefs[0] + lr.coefs[1] * labels[i] + lr.coefs[2] * labels[i] * labels[i]);
    };

    this.setMode = function(graph_mode){
        this.mode = graph_mode;
        this.onDraw();
    }
    this.setModePoint = function(){
        this.setMode(GRAPH_MODE_ENUM.POINT);
    };
    this.setModeLine = function(){
        this.setMode(GRAPH_MODE_ENUM.LINE);
    };
    this.setModeBar = function(){
        this.setMode(GRAPH_MODE_ENUM.BAR);
    };
    this.setModeThickbar = function(){
        this.setMode(GRAPH_MODE_ENUM.THICKBAR);
    };
    this.setModePdplines = function(){
        this.setMode(GRAPH_MODE_ENUM.PDPLINES);
    };
    this.fullscreen = function(){
        if(this.isFullscreen === false){
            this.originalWidth = this.canvas.width;
            this.originalHeight = this.canvas.height;
            this.isFullscreen = true;

            this.canvas.height = window.innerHeight * 0.85;
            this.canvas.width = window.innerWidth * 0.75;
            this.onDraw();
        }
    };
    this.normalscreen = function(){
        if(this.isFullscreen === true){
            this.isFullscreen = false;

            this.canvas.width = this.originalWidth;
            this.canvas.height = this.originalHeight;
            this.onDraw();
        }
    };
    this.setTrendline = function(set){
        this.drawTrendline = set;

        this.onDraw();
    };
    this.trendRemove = function(){
        let data = this.series_data[0];
        if (this.hasOwnProperty('dataX'))
            dataX = this.series_dataX[0];
        else
            dataX = counts(0, 1, data.length);
        const lr = v_lin_reg(dataX, data, 3);

        if (this.hasOwnProperty('dataX')) {
            for (let i = 0; i < data.length; i++)
                this.series_data[0][i] -= lr.coefs[0] + lr.coefs[1] * dataX[i] + lr.coefs[2] * dataX[i] * dataX[i];
        }
        else {
            for (let i = 0; i < data.length; i++)
                this.series_data[0][i] -= (lr.coefs[0] + lr.coefs[1] * i + lr.coefs[2] * i * i);
        }
        this.onDraw();
        this.zoomReset();
        // debug( lr.coefs[0] + "+x*"+lr.coefs[1] );
    };
    this.differential = function(){
        let data = this.series_data[0];
        let data_differential = [0];
        for (let i = 1; i < data.length; i++)
            data_differential.push(data[i] - data[i - 1]);
        this.series_data[0] = data_differential;
        this.onDraw();
        this.zoomReset();
    };
    this.zoomReset = function(){
        this.getLimits();
        this.shift_x = 0;
        this.shift_y = 0;
        this.zoom_x = 1;
        this.zoom_y = 1;

        this.onDraw();
    };
    this.sortData = function(){
        v_sort(this.series_data[0]);
        this.calculateTrendline();

        this.onDraw();
    };
    this.downloadData = function(){
        let str = "";
        if (this.hasOwnProperty('dataX')) {
            str += "x=[ " + this.dataX[0].toString();
            for (let i = 1; i < this.dataX.length; i++) {
                str += ", " + this.dataX[i].toString();
            }
            str += "];\n ";
        }
        str += "y=[ "
        for (let series = 0; series < this.num_series; series++) {
            let data = this.series_data[series];
            if (series) str += ",\n  ";
            str += "[ " + data[0].toString();
            for (let i = 1; i < data.length; i++) {
                str += ", " + data[i].toString();
            }
            str += "] ";
        }
        str += "];\n";
        download("graph_data.m", str);
    };

    this.mouseToX = function()
    {
        const canvas = this.canvas
        const canvas_size_x = canvas.width;
        const dx = this.max_x - this.min_x;
        const sx = (canvas_size_x - this.left_padding - this.right_padding) / dx * this.zoom_x;
        const x0 = this.left_padding - sx * this.min_x;

        const mouse_pos_x = this.mouseX;
        const cpx = (mouse_pos_x - x0 - this.shift_x) / sx;
        return cpx;
    }

    this.findRowAtMousePoint = function(e) {
        const data = this.series_data[0];

        const rect = canvas.getBoundingClientRect();

        const canvasX = (e.clientX - rect.left - this.left_padding);
        const canvasY = (e.clientY - rect.top - this.top_padding);

        const sx = (this.canvas.width - this.left_padding - this.right_padding) / (this.max_x - this.min_x) * this.zoom_x;
        const sy = (this.canvas.height - this.top_padding - this.bottom_padding) / (this.max_y - this.min_y) * this.zoom_y;
        const x0 = this.left_padding - sx * this.min_x + this.shift_x;
        const y0 = this.top_padding + sy * this.max_y + this.shift_y;

        const cost = (idx, value) => {
            const dataX = x0 + value * sx;
            const dataY = y0 - data[idx] * sy;
            const dx = canvasX - dataX;
            const dy = canvasY - dataY;
            return dx * dx + dy * dy;
        };

        let bestCost = Number.MAX_VALUE;
        let bestX = 0;
        let bestY = 0;
        let bestIdx = 0;

        for (let i = 0; i < data.length; i++) {
            const value = this.labels.length !== 0
                    ? this.labels[0][i]
                    : lerp(i / data.length, this.min_x, this.max_x);

            const c = cost(i, value);

            if (c < bestCost) {
                bestCost = c;
                bestX = value;
                bestY = data[i];
                bestIdx = i;
            }
        }

        return [bestIdx, bestX, bestY];
    };

    this.onDblClick = function(ev)
    {
        const [index, _x, _y] = this.findRowAtMousePoint(ev);
        this.dblClickPoint(sortedPacketsIds[index]);
    }

    this.dblClickPoint = function(index)
    {
        const id = index;

        if(id === -1) {
            logError( 'Filer', 'No packet with that value found! Try to clear filters and try again!' );
            return;
        }
        const idStart = sortedPacketsIds.findIndex((x) => x === id);

        const rows_to_delete_and_add = packetTable_body.rows.length; //In case there are less than 200 packets rendered
        const start_render = sortedPacketsIds.length - idStart < rows_to_delete_and_add ? sortedPacketsIds.length-rows_to_delete_and_add : idStart;

        packetTable_selectedRowIdx = idStart - start_render;
        packetTable_startPktIdx = start_render;
        packetsTab_body.scrollTop = 1 + 13*(idStart-start_render);

        for(let i = 0; i < rows_to_delete_and_add; i++) packetTable_body.deleteRow( 0 );

        for(let i = start_render; i < Math.min(idStart+rows_to_delete_and_add, sortedPacketsIds.length); i++) {
            packetTable_addPacket( i );
        }

        packetTable_body.rows[packetTable_selectedRowIdx].classList.add( 'selected' );
    }

    this.toDistribution = function()
    {
        var num_steps = 100;
        if (this.num_series>1) throw "not supported for multiple series";

        var delta_y = this.max_y[0]-this.min_y[0];
        var counts = zeros(num_steps), x=[];
        for( var i=0; i<this.data.length; i++)
        {
            counts[ ((this.data[i]-this.min_y[0])*num_steps/delta_y)|0 ]++;
        }
        for( var i=0; i<=num_steps;i++)
            x[i]=this.min_y[0]+delta_y*i/num_steps;
        this.data = counts;
        this.dataX= x;
        this.series_dataX = [ this.dataX ];
        this.series_data = [ this.data ];
        this.getLimits();
        this.mode = GRAPH_MODE_ENUM.THICKBAR;
        this.onDraw();
    }

    this.setRadianMode = function(bool){
        this.radian = bool;
    }

    this.createClickableLabels = function (toggleAllContainerId, labelContainerId) {
        const toggleAllContainer = document.getElementById(toggleAllContainerId);
        toggleAllContainer.style.display = 'flex';
        toggleAllContainer.style.justifyContent = 'center';
        toggleAllContainer.innerHTML = '';

        const button = document.createElement('div');
        button.style.cursor = 'pointer';
        button.style.userSelect = 'none';
        button.textContent = 'Select / Deselect all roots';

        button.addEventListener('click', () => {
            for (let i = 0; i < document.getElementById(labelContainerId).childNodes.length; i++) {
                document.getElementById(labelContainerId).childNodes[i].click();
            }
        });

        toggleAllContainer.appendChild(button);

        const labelContainer = document.getElementById(labelContainerId);
        labelContainer.style.display = 'flex';
        labelContainer.style.flexWrap = 'wrap';
        labelContainer.style.gap = '1rem';
        labelContainer.innerHTML = '';

        this.series_data.forEach((series, index) => {
            const label = document.createElement('div');

            label.style.cursor = 'pointer';
            label.style.userSelect = 'none';
            label.style.color = this.colors[index];
            label.style.flexBasis = '7%';
            label.textContent = 'Root ' + (index + 1);

            label.addEventListener('click', () => {
                label.style.textDecoration = this.series_visibility[index] ? 'line-through' : 'none';
                label.style.textDecorationThickness = '2px';
                this.highlightSeries(index);
            });

            labelContainer.appendChild(label);
        });
    };

    this.highlightSeries = function (index) {
        this.series_visibility[index] = !this.series_visibility[index];
        this.onDraw();
    };

    this.onMouseOver = function(e) {
        if (this.isMouseOver || this.series_data.length === 0) {
            return;
        }

        this.isMouseOver = true;

        const tooltipText = document.createElement("p");
        tooltipText.classList.add("graph-hover-point-text");

        const highlightCircle = document.createElement("div");
        highlightCircle.classList.add("graph-hover-point-highlight");

        this.pointerMoveEventListener = (e) => {
            tooltipText.style.left = `${e.x + 20}px`;
            tooltipText.style.top = `${e.y + 20}px`;
            const [_i, x, y] = this.findRowAtMousePoint(e);
            tooltipText.textContent = `Nearest point:\r\nx: ${x} \r\ny: ${y}`;

            const canvasRect = this.canvas.getBoundingClientRect();
            const canvasX = this.left_padding + (x - this.min_x) * (this.canvas.width - this.left_padding - this.right_padding) / (this.max_x - this.min_x) * this.zoom_x + this.shift_x;
            const canvasY = this.top_padding + (this.max_y - y) * (this.canvas.height - this.top_padding - this.bottom_padding) / (this.max_y - this.min_y) * this.zoom_y + this.shift_y;

            const highlightX = canvasRect.left + canvasX;
            const highlightY = canvasRect.top + canvasY ;
            const highlightRadius = 3

            const withinX = highlightX >= canvasRect.left && highlightX <= canvasRect.right;
            const withinY = highlightY >= canvasRect.top && highlightY <= canvasRect.bottom;

            highlightCircle.hidden = !(withinX && withinY);
            tooltipText.hidden = !(withinX && withinY);

            highlightCircle.style.left = `${highlightX - highlightRadius}px`;
            highlightCircle.style.top = `${highlightY - highlightRadius}px`;
        };

        this.tooltipText = tooltipText;
        this.highlightCircle = highlightCircle;

        window.addEventListener("pointermove", this.pointerMoveEventListener);
        document.body.appendChild(tooltipText);
        document.body.appendChild(highlightCircle);
    };

    this.onMouseOut = function(e) {
        if (!this.isMouseOver) {
            return;
        }

        this.isMouseOver = false;

        window.removeEventListener("pointermove", this.pointerMoveEventListener);
        this.pointerMoveEventListener = null;

        this.tooltipText.remove();
        this.highlightCircle.remove();
    };

    this.describe = function() { return ""; }
    return this;
}
