import { Card, Button, CardContent, CircularProgress, CardMedia } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import app_config from "../config";
import { VideoContext } from "../videoContext";


const VideoDetail = props => {

    const url = app_config.api_url;

    return (
        <Card>
            <CardMedia image={url + props.videoData.thumbnail} style={{ height: '18rem' }}>

            </CardMedia>
            <CardContent>
                <h3>{props.videoData.title}</h3>
                <p className="text-muted">{props.videoData.category}</p>
                <p className="">{props.videoData.description}</p>

                <Button component={Link} to={'/viewvideo/' + props.videoData._id} variant="contained" className="mt-2" color="primary">View More</Button>
            </CardContent>
        </Card>
    )
}


const ListVideos = () => {

    const url = app_config.api_url;

    const [videoList, setVideoList, loading, setLoading] = useContext(VideoContext);

    useEffect(() => {
        fetch(url + 'video/getall')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setVideoList(data);
                setLoading(false);
            })
    }, [])


    const showVideoList = () => {
        if (loading) {
            return <CircularProgress color="primary" />
        } else {
            return <div className="row">
                {
                    videoList.map((video) => {
                        return (
                            <div className="col-md-3">
                                <VideoDetail videoData={video} key={video._id}></VideoDetail>
                            </div>
                        )
                    })
                }
            </div>
        }

    }

    return (
        <div className="container-fluid">
            <h2 className="text-center mt-4">List of Added Product</h2>
            <hr />

            {showVideoList()}

        </div>
    )
}

export default ListVideos;