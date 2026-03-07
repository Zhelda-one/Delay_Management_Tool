const statistics = {
    TabClicked: 0,
    numberOfSend: 0,
    data_to_send:{},
    statistics_save_new_session(){
        const browserW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
        const browserH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        this.data_to_send.usageStartTime = new Date().getTime();
        this.data_to_send.screen = {browser: {height: browserH, width: browserW}, window: {height: window.screen.height, width: window.screen.width}}
        statistics.post_to_statistics_server();
    },
    add_parameters_to_session(parameters){
        for (const [key, value] of Object.entries(parameters)) {
            this.data_to_send[key] = value;
        }
    },
    post_to_statistics_server(){
        let xhr = new XMLHttpRequest();
        xhr.open("post", 'http://bba.ans-tools.devops-fwk.dynamic.nsn-net.net/statistics/add_data', true);
        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/JSON");

        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                let response = JSON.parse(this.responseText);
                if(response.hasOwnProperty("id")) statistics.id = response.id;
                statistics.data_to_send = {};
            }
        }

        if(this.hasOwnProperty("id")) {
            this.data_to_send._id = this.id;
        }
        else if(!this.hasOwnProperty("id") && this.numberOfSend > 0){
            return; //do not send because without id sever cannot assign it to the existing session
        }


        if("memory" in window.performance){
            this.data_to_send.currentMemory = {
                "jsHeapSizeLimit": window.performance.memory.jsHeapSizeLimit,
                "totalJSHeapSize": window.performance.memory.totalJSHeapSize,
                "usedJSHeapSize": window.performance.memory.usedJSHeapSize
            }
        }
        this.numberOfSend++;
        xhr.send(JSON.stringify(this.data_to_send));
    },
    errors: [],
    send_error_to_server(errorMsg, errorObj){
        let xhr = new XMLHttpRequest();
        xhr.open("post", 'http://bba.ans-tools.devops-fwk.dynamic.nsn-net.net/statistics/send_error', true);
        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/JSON");

        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log("Error message successfully send");
            }
        }

        xhr.send(JSON.stringify({message: errorMsg, parameters: errorObj}));
    },
    sendErrorInterval: () => {
        if(statistics.errors.length !== 0){
            statistics.send_error_to_server("Interval 30 sec errors", statistics.errors);
            statistics.errors = [];
        }

    }
}

const telemetry = {
    numberOfSend: 0,
    data_to_send: {},

    post_to_telemetry_server(){
        let xhr = new XMLHttpRequest();
        xhr.open("post", 'http://bba.ans-tools.devops-fwk.dynamic.nsn-net.net/statistics/add_data', true);
        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/JSON");

        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                let response = JSON.parse(this.responseText);
                if(response.hasOwnProperty("id")) telemetry.id = response.id;
                telemetry.data_to_send = {};
            }
        }

        if(this.hasOwnProperty("id")) {
            this.data_to_send._id = this.id;
        }
        else if(!this.hasOwnProperty("id") && this.numberOfSend > 0){
            return; //do not send because without id sever cannot assign it to the existing session
        }

        this.numberOfSend++;
        xhr.send(JSON.stringify(this.data_to_send));
    },
}

// Add event listeners to all tab buttons (Main/Packets/IQ/Generator)
const tabButtons = document.querySelectorAll("input[name='root_header_menu']");
for (const button of tabButtons) {
    button.addEventListener("click", () => {
        telemetry.data_to_send.clickedTab =  button.value;
        telemetry.post_to_telemetry_server();
    });
}

// Add event listeners to buttons_header (Load/Save/Analyze/Modify/Configure/Log/Settings)
const headerButtons = document.querySelector("#buttons_header").getElementsByTagName("input");
for(const button of headerButtons){
    button.addEventListener("click", () => {
        telemetry.data_to_send.clickedHeader = button.value;
        telemetry.post_to_telemetry_server();
    });
}

const logHeaderButton = document.querySelector("#buttons_header").getElementsByTagName("button");
for(const button of logHeaderButton){
    button.addEventListener("click", () => {
        telemetry.data_to_send.clickedHeader = button.value;
        telemetry.post_to_telemetry_server();
    });
}