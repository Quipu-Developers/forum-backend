const { CodingBoard, FreeBoard, InfoBoard } = require('../models');  // 필요한 모델들을 가져옵니다.

class TopFivePostService {
    // 각 게시판에서 상위 5개의 게시글을 가져오는 함수
    static async getTop5PostsEachBoard() {
        try {
            // CodingBoard에서 상위 5개의 게시글 가져오기
            const top5CodingBoardPosts = await CodingBoard.findAll({
                limit: 5,
                order: [['createdAt', 'DESC']],  // 가장 최근의 게시글부터 가져옴
            });

            // FreeBoard에서 상위 5개의 게시글 가져오기
            const top5FreeBoardPosts = await FreeBoard.findAll({
                limit: 5,
                order: [['createdAt', 'DESC']],
            });

            // InfoBoard에서 상위 5개의 게시글 가져오기
            const top5InfoBoardPosts = await InfoBoard.findAll({
                limit: 5,
                order: [['createdAt', 'DESC']],
            });

            // 결과를 객체 형태로 반환
            return {
                codingBoard: top5CodingBoardPosts,
                freeBoard: top5FreeBoardPosts,
                infoBoard: top5InfoBoardPosts,
            };
        } catch (error) {
            console.error('Error fetching top 5 posts from boards:', error);
            throw error;
        }
    }

    static async getTop5PostsFromAll(){
        try {
            // CodingBoard에서 상위 5개의 게시글 가져오기
            const top5CodingBoardPosts = await CodingBoard.findAll({
                limit: 5,
                order: [['createdAt', 'DESC']],  // 가장 최근의 게시글부터 가져옴
            });

            // FreeBoard에서 상위 5개의 게시글 가져오기
            const top5FreeBoardPosts = await FreeBoard.findAll({
                limit: 5,
                order: [['createdAt', 'DESC']],
            });

            // InfoBoard에서 상위 5개의 게시글 가져오기
            const top5InfoBoardPosts = await InfoBoard.findAll({
                limit: 5,
                order: [['createdAt', 'DESC']],
            });

            const allPosts = [
                ...top5CodingBoardPosts,
                ...top5FreeBoardPosts,
                ...top5InfoBoardPosts,
            ];

            // 게시글들을 createdAt 기준으로 정렬
            allPosts.sort((a, b) => b.createdAt - a.createdAt);

            // 상위 5개의 게시글만 선택
            const top5Posts = allPosts.slice(0, 5);

            return top5Posts;
        } catch (error) {
            console.error('Error fetching top 5 posts from all boards:', error);
            throw error;
        }
    }
}

module.exports = TopFivePostService;