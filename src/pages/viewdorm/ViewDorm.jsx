// ViewDorm.jsx
import React from "react";
import SearchDorm from "../../components/search/SearchDorm";
import ImageCollage from '../../components/cards/ImageCollage';
import mainImage from '../../assets/imageDorm.png';
import smallImage1 from '../../assets/imageDorm1.png';
import smallImage2 from '../../assets/imageDorm2.png';
import smallImage3 from '../../assets/imageDorm3.png';
import smallImage4 from '../../assets/imageDorm4.png';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ListingInfo from "./ListingInfo";
import HousingName from "./HousingName"

const ViewDorm = () => {
    const mainImageUrl = mainImage;
    const smallImageUrls = [smallImage1, smallImage2, smallImage3, smallImage4];

    return (
        <>
        <div className="w-full h-full bg-white">
            <div className="p-9">
                <SearchDorm />
            </div>
            <HousingName />
            <div className="flex justify-center mt-8">
                <ImageCollage mainImage={mainImageUrl} smallImages={smallImageUrls} />
            </div>
            <ListingInfo />
        </div>

        </>
    );
};

export default ViewDorm;
