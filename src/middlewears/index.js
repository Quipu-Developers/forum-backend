exports.isLoggedin = (req, res, next) => {
    if (req.isAuthorized()){ //passport를 통해 로그인을 했는지
        next();
    }   else{
        res.status(403).send('로그인 필요');
    }
}

exports.isLoggedin = (req, res, next) => {
    if (!req.isAuthorized()){
        next();
    }   else{
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`); //그냥 오류코드로 수정하면 될듯
    }
}