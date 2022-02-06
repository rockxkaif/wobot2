import { createContext, useState } from "react";

export const VideoContext = createContext();

export const VideoProvider = props => {

    const [videoList, setVideoList] = useState([]);
    const [loading, setLoading] = useState(true);

    return <VideoContext.Provider value={[videoList, setVideoList, loading, setLoading]}>
        {props.children}
    </VideoContext.Provider>

}