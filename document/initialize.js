const { User } = require('../src/models');

// 초기 데이터 삽입 함수
const insertInitialData = async () => {
    try {
        await User.bulkCreate([
            {
                user_id: 1,
                user_name: '재원',
                student_id: '2020920061',
                major: 'cs',
                email: 'dfd@gmail.com',
                password: 'dfd',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        console.log('Initial data inserted successfully.');
    } catch (error) {
        console.error('Error inserting initial data:', error);
    }
};

module.exports = insertInitialData;