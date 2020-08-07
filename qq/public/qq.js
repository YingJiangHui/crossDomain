console.log('这是qq.js')

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