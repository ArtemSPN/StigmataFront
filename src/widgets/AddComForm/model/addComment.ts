import axios from "axios";

const addComment = async (author: string, text: string, postId: string) => {
    await axios.post(`http://localhost:4444/comment`, {author,text,postId}).then(function (response) {
        console.log(response);
    })
        .catch(function (error) {
            console.log(error);
        });
}

export default addComment;