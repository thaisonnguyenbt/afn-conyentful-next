import React from 'react'
import ReactPlayerLoader from '@brightcove/react-player-loader';
import {defaultBrightcoveAccount} from '../../../utils/siteConfig'

const BrightcovePlayer = ({accountId, videoId = "5819230967001"}) => {
    
    if (!videoId) return <></>
    if (!accountId) {
        accountId = defaultBrightcoveAccount;
    }
    
    return <>
        <div className="m-recipe__video m-overview__hero -video">
            <div className="afn-video-container isRecipeHero">
                <div className="brc-align-center">
                    <div className="brightcove_player md-dropzone-video drop-target-player" data-emptytext="Add Player Here">
                        <div className="player-embed-wrap">
                            <div className="brightcove-container">
                                <ReactPlayerLoader accountId={accountId} videoId={videoId} playerId={"rvBzHXKy3"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </> 
}

export default BrightcovePlayer
