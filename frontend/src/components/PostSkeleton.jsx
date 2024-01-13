import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
// import Masonry from 'react-masonry-css';
import Skeleton from 'react-loading-skeleton';
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";

const PostSkeleton = () => {
    const isLargeScreen = useMediaQuery("(min-width: 800px)");
    const isMediumScreen = useMediaQuery("(min-width: 576px)");
    
    const getColumnCount = () => {
        if (isLargeScreen) {
            return 6;
        } else if (isMediumScreen) {
            return 3;
        } else {
            return 2;
        }
    };

    return (
        <div>
            <div className="container-fluid postContainer d-flex flex-wrap">
                <Box sx={{ width: '100%', maxHeight: 600 }}>
                    <Masonry columns={getColumnCount()} spacing={2}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="card postCard">
                                <Skeleton height={200} style={{ borderRadius: '8px' }} />
                            </div>
                        ))}
                    </Masonry>
                </Box>
            </div>
        </div>
    );
}

export default PostSkeleton;
