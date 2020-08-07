console.log('这是ying.js')

function ajax(option) {
    return new Promise((resolve, reject) => {
        const { data, url, method } = option;
        const request = new XMLHttpRequest();
        request.open(method, url);
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 400) {
                    resolve(request.response);
                } else {
                    reject('没有数据')
                }
            }
        }
        request.send(data);
    })

}
/*
// CORS
ajax({
    url: 'http://qq.com:8888/friends.json',
    method: 'GET'
}).then((data) => {
    data = JSON.parse(data);
    data.forEach(element => {
        const li = document.createElement("li");
        li.textContent = element.name;
        friendsList.appendChild(li);
    });
}).catch(console.log);
*/

/*JSONP*/
function jsonp(url, prve) {
    return new Promise((resolve, reject) => {
        const random = prve + Math.random();
        window[random] = function(data) {
            resolve(data);
        }
        const script = document.createElement('script');
        script.src = `${url}?callback=${random}`
        script.onload = () => {
            script.remove();
        }
        script.onerror = () => {
            reject();
        }
        document.head.appendChild(script);
    })
}


jsonp('http://qq.com:8888/friends.js', 'getQQData')
    .then((data) => {
        render(data);
    }).catch((err) => {
        console.log(err);
    })




function render(data) {
    if (!(data instanceof Array)) {
        data = JSON.parse(request.response);
    }
    data.forEach(element => {
        const li = document.createElement("li");
        li.textContent = element.name;
        friendsList.appendChild(li);
    });
}