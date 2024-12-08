import React, { useState } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDialog from './AiOutputDialog';

function RoomDesignCard({ room }) {
    const [openDialog, setOpenDialog] = useState(false);

    const onClickHandler = () => {
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            {/* Card Section */}
            <div className="shadow-md rounded-md cursor-pointer" onClick={onClickHandler}>
                <ReactBeforeSliderComponent
                    firstImage={{ imageUrl: room?.aiImage }}
                    secondImage={{ imageUrl: room?.orgImg }}

                />
                <div className="p-4">
                    <h2>Room Type: {room.roomType}</h2>
                    <h2>Design Type: {room.designType}</h2>
                </div>
            </div>

            {/* Dialog Section */}
            {openDialog && (
                <AiOutputDialog
                    openDialog={openDialog}
                    aiImage={room.aiImage}
                    orgImage={room.orgImg}
                    closeDialog={closeDialog}
                />
            )}
        </div>
    );
}

export default RoomDesignCard;
