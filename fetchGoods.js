var request = require('request');
var Emailer = require('./mail')

let fetchGoods = {
    sendMessage: '',//如果有值，就发邮件
    fetch: function(item){
        return new Promise(resolve => {
            request(item.url, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    let resList = JSON.parse(body).d_list;
                    const {name, unit_price, exterior_wear} = resList[0]
                    let message = `${name}最低价格为${unit_price},磨损为${exterior_wear}`
                    if(resList[0].unit_price < item.price){
                        message += '，符合预期'
                        fetchGoods.sendMessage += message + '\n'
                    }
                    console.log(message);
                    resolve('ok')
                }
            });
        })
    },
    startArr: async function(arr){
        fetchGoods.sendMessage = ''; //重置
        Promise.all(
            arr.map(v => {
                return new Promise(async resolve => {
                    await fetchGoods.fetch(v);
                    resolve('ok');
                })
            })
        ).then(() => {
            if(!!fetchGoods.sendMessage){
                Emailer.sendEmail({text: fetchGoods.sendMessage})
            }else{
                console.log('未发送邮件');
            }
        })
    }
}
module.exports = fetchGoods;
