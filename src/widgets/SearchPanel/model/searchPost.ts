import { Post } from "@/entities/Post";

interface searchPostProps {
    searchString?: string;
    posts?: Post[];
    section: string;
}


export const searchPost = (props: searchPostProps) => {
    const link = window.location.href.split("/")[4];


    if(link){
        console.log("section");
        
    }
    else{
        console.log("main")
    }
}