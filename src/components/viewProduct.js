import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import app_config from "../config";

const ViewProduct = () => {

    const { id } = useParams();
    const url = app_config.api_url;
    const [videoData, setVideoData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(id);
        fetch(url + 'video/getbyid/' + id)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setVideoData(data);
                setLoading(false);
            })
    }, [])

    const showVideo = () => {
        if (loading) {
            return <h1></h1>
        } else {
            return <video src={url + videoData.file} controls></video>
        }
    }


    
}

export default ViewProduct;