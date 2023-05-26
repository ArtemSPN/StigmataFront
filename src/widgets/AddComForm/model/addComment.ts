import { REACT_APP_API_URL } from "@/shared/const/url";
import axios from "axios";

// eslint-disable-next-line max-len
const addComment = async (author: string,authorUrl: string, text: string, postId: string, file: Blob[], imgF?: Blob) => {
    const fileArr:string[] = [];
    const id = Date.now();
    if(imgF){
        const formData = new FormData();
        const nameFile = id+"$"+imgF.name.split(".")[0].replace(' ', '_').slice(0,100)+ "." + imgF.name.split('.')[1]
        // eslint-disable-next-line max-len
        const new_file = new File([imgF], "file$"+nameFile, {type: imgF.type});
        formData.append('file', new_file);
        await axios.post(`${REACT_APP_API_URL}/upload`, formData);
    }

    if(file){

        Array.from(file).forEach(async (fileItem) => {
            const formData = new FormData();
            // eslint-disable-next-line max-len
            const nameFile = Date.now()+"$"+fileItem.name.split(".")[0].replace(' ', '_').slice(0,100)+ "." + fileItem.name.split('.')[1]
            const new_file = new File([fileItem], "file$"+nameFile, {type: fileItem.type});
            formData.append('file', new_file);
            console.log(new_file.name);
            fileArr.push(new_file.name);
            await axios.post(`${REACT_APP_API_URL}/upload`, formData);
        })
    }
    
    
    await axios.post(`${REACT_APP_API_URL}/comment`, 
        {author,
            authorUrl,
            text,
            postId,
            img: imgF !== undefined && "file$"+id+"$"+imgF.name.split(".")[0].slice(0,100)+ "." + imgF.name.split('.')[1],
            fileArr}
    ).then(function (response) {
        console.log(response);
    })
        .catch(function (error) {
            console.log(error);
        });
}

export default addComment;