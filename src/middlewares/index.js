const passport = require('passport');
// 로그인된 상태인지 확인하는 미들웨어

exports.isLoggedin = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (user) {
            req.user = user; // req.user에 사용자 정보를 설정
            next(); // 인증이 성공하면 다음 미들웨어로 이동
        } else {
            res.status(403).send('로그인 필요'); // 인증되지 않으면 에러 응답
        }
    })(req, res, next);
};

// 로그인되지 않은 상태인지 확인하는 미들웨어
exports.isNotLoggedin = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            next(); // 인증되지 않은 상태라면 다음 미들웨어로 이동
        } else {
            res.status(403).send('로그인한 상태입니다.'); // 이미 로그인된 상태라면 에러 응답
        }
    })(req, res, next);
};