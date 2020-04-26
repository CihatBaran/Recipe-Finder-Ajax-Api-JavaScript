export default class Likes {
    constructor() {
        this.likes = [];
    }
    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        }

        this.likes.push(like)
        this.persistData();

        return like
    }
    readStorage() {
        const getValueFromLS = JSON.parse(localStorage.getItem('likes'));
        if (getValueFromLS) getValueFromLS.forEach(el => this.likes.push(el))
    }
    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
        this.persistData();
    }
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    getNumOfLikes(id) {
        return this.likes.length;
    }
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }

}