import req from 'superagent'

export const request = (url, param, handler, type='POST') => {
    let r = type=='POST' ? req.post(url) : req.get(url);
    r
    .query(param)
    .end((err, res) => {
        if (err) {
            console.error(url, err.toString());
            return handler([]);}
        else {
            return handler(JSON.parse(res.text));
        }})}
