const User = require('../models/user')
const bcrypt = require('bcrypt');
//const General_member = require('../models/general_member');

//회원가입
exports.join = async (req, res, next) => {
    const { student_id, password, } = req.body;
    try {
        const checkmember = await General_member.findOne({ where: {student_id}});
        //아직 General_member 모델 안 받아서 안됌.
        if (!checkmember){
            return res.statusCode(400).send('퀴푸 회원이 아님');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({

        })
    } catch(error) {
        console.error(error);
        next(error);
    }
}
//로그인
exports.login = () => {

}
//로그아웃
exports.logout = () => {

}
