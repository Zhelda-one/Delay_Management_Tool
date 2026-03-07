function graph2dDialog_onContextMenu(e){
    e.preventDefault();

    graph2d_selected = this;

    graph2dDialog_refreshView();
    graph2dDialog.open();
}

function Graph2dWebWrapper(canvas){

    this.constructor = function(){
        const graph2d = new Graph2d(canvas);

        this.onContextMenu      = graph2dDialog_onContextMenu.bind(graph2d);
        this.onMouseDownBind    = graph2d.onMouseDown.bind(graph2d);
        this.onMouseWheelBind   = graph2d.onMouseWheel.bind(graph2d);
        this.onMouseMoveBind    = graph2d.onMouseMove.bind(graph2d);
        this.onMouseUpBind      = graph2d.onMouseUp.bind(graph2d);
        this.onDblClick         = graph2d.onDblClick.bind(graph2d);
        this.onMouseOver        = graph2d.onMouseOver.bind(graph2d);
        this.onMouseOut        =  graph2d.onMouseOut.bind(graph2d);

        canvas.addEventListener('contextmenu',  this.onContextMenu);
        canvas.addEventListener('mousedown',    this.onMouseDownBind);
        canvas.addEventListener('wheel',        this.onMouseWheelBind);
        canvas.addEventListener('dblclick',     this.onDblClick);
        canvas.addEventListener('mouseover',    this.onMouseOver);
        canvas.addEventListener('mouseout',     this.onMouseOut);
        window.addEventListener('mousemove',    this.onMouseMoveBind);
        window.addEventListener('mouseup',      this.onMouseUpBind);

        this.graph2d = graph2d;
        this.canvas = canvas;
    }

    this.clear = function(){
        const canvas = this.canvas;

        canvas.removeEventListener('contextmenu',  this.onContextMenu);
        canvas.removeEventListener('mousedown',    this.onMouseDownBind);
        canvas.removeEventListener('wheel',        this.onMouseWheelBind);
        canvas.removeEventListener('dblclick',     this.onDblClick);
        canvas.removeEventListener('mouseover',    this.onMouseOver);
        canvas.removeEventListener('mouseout',     this.onMouseOut);
        window.removeEventListener('mousemove',    this.onMouseMoveBind);
        window.removeEventListener('mouseup',      this.onMouseUpBind);
    }



    this.constructor();
    return this;
}

function Graph2dGroup(){

    this.elements = [];

    this.add = function(canvas, labels2d, series2d){
        const newWrapper = new Graph2dWebWrapper(canvas);

        const groupMouseDownBind = this.onMouseWheel.bind({group: this, wrapper: newWrapper});
        newWrapper.canvas.addEventListener('wheel', groupMouseDownBind);

        this.elements.map(e=>e.wrapper).forEach(wrapper=>{
            wrapper.canvas.addEventListener('mousedown',    newWrapper.onMouseDownBind);

            newWrapper.canvas.addEventListener('mousedown',    wrapper.onMouseDownBind);
        })

        this.elements.push( {wrapper: newWrapper, labels2d, series2d, groupMouseDownBind} );
    }

    this.draw = function(){

        const min_xArr = [], max_xArr = [];
        const min_yArr = [], max_yArr = [];

        const labelsArr = this.elements.flatMap(element => element.labels2d);
        labelsArr.forEach(labels=>{
            min_xArr.push(labels.min());
            max_xArr.push(labels.max());
        });

        const seriesArr = this.elements.flatMap(element => element.series2d);
        seriesArr.forEach(series=>{
            min_yArr.push(series.min());
            max_yArr.push(series.max());
        })

        const limits = {
            min_x: min_xArr.min(),
            max_x: max_xArr.max(),
            min_y: min_yArr.min(),
            max_y: max_yArr.max(),
        }

        this.elements.forEach(element => {
            element.wrapper.graph2d.draw(element.labels2d, element.series2d, limits);
        })
    }

    this.onMouseWheel = function(e){
        e.preventDefault();

        const group = this.group;
        const originalGraph = this.wrapper.graph2d;

        group.elements.forEach(element =>{
            const graph = element.wrapper.graph2d;
            graph.setZoom(originalGraph.shift_x, originalGraph.shift_y, originalGraph.zoom_x, originalGraph.zoom_y);
        });
    }

    this.clear = function(){

        for(let i = 0; i < this.elements.length; ++i){
            const element = this.elements[i];
            element.wrapper.canvas.removeEventListener('wheel', element.groupMouseDownBind);

            for(let j = i+1; j < this.elements.length; ++j){
                const otherElement = this.elements[j];

                element.wrapper.canvas.removeEventListener('mousedown',    otherElement.wrapper.onMouseDownBind);
                otherElement.wrapper.canvas.removeEventListener('mousedown',    element.wrapper.onMouseDownBind);
            }

            element.wrapper.clear();
        }

        this.elements = [];
    }

    return this;
}